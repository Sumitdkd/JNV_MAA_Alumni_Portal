import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import useAuth from '../hooks/useAuth';
import { useSocket } from './SocketContext';
import notificationService from '../services/notificationService';

const NotificationContext = createContext();
export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
    const { user } = useAuth();
    const socket = useSocket();
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchNotifications = useCallback(async () => {
        if (user) {
            try {
                setLoading(true);
                setError(null);
                const res = await notificationService.getNotifications();
                setNotifications(res.data.data);
                setUnreadCount(res.data.data.filter(n => !n.read).length);
            } catch (error) { 
                console.error("Failed to fetch notifications:", error);
                setError("Failed to load notifications. Please try again.");
            } finally {
                setLoading(false);
            }
        }
    }, [user]);

    useEffect(() => { fetchNotifications(); }, [fetchNotifications]);

    useEffect(() => {
        if (socket) {
            const handleNewNotification = (newNotification) => {
                setNotifications(prev => [newNotification, ...prev]);
                setUnreadCount(prev => prev + 1);
            };

            const handleSocketError = (error) => {
                console.error('Socket error:', error);
                setError("Connection lost. Notifications may not be real-time.");
            };

            const handleSocketReconnect = () => {
                console.log('Socket reconnected, refreshing notifications...');
                setError(null);
                fetchNotifications();
            };

            socket.on('new_notification', handleNewNotification);
            socket.on('connect_error', handleSocketError);
            socket.on('reconnect', handleSocketReconnect);

            return () => {
                socket.off('new_notification', handleNewNotification);
                socket.off('connect_error', handleSocketError);
                socket.off('reconnect', handleSocketReconnect);
            };
        }
    }, [socket, fetchNotifications]);

    const markAllAsRead = async () => {
        if (unreadCount === 0) return;
        try {
            await notificationService.markAsRead();
            setNotifications(notifications.map(n => ({ ...n, read: true })));
            setUnreadCount(0);
        } catch (error) { 
            console.error("Failed to mark notifications as read:", error);
            // Don't update state if the API call failed
        }
    };

    const value = { 
        notifications, 
        unreadCount, 
        loading, 
        error, 
        markAllAsRead, 
        refreshNotifications: fetchNotifications,
        clearError: () => setError(null)
    };
    return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
};

