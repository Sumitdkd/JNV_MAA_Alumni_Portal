import React, { createContext, useContext, useEffect, useState } from 'react';
import io from 'socket.io-client';
import useAuth from '../hooks/useAuth';

const SocketContext = createContext();
export const useSocket = () => useContext(SocketContext);
const SOCKET_URL = process.env.REACT_APP_API_URL.replace("/api", "");

export const SocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        if (user?._id) {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No authentication token found for socket connection');
                return;
            }

            const newSocket = io(SOCKET_URL, {
                transports: ['websocket', 'polling'],
                reconnection: true,
                reconnectionAttempts: 5,
                reconnectionDelay: 1000,
                auth: {
                    token: token
                }
            });

            newSocket.on('connect', () => {
                console.log('Socket connected successfully');
            });

            newSocket.on('connect_error', (error) => {
                console.error('Socket connection error:', error.message);
                if (error.message.includes('Authentication error')) {
                    // Handle authentication errors
                    console.log('Socket authentication failed, token may be invalid');
                }
            });

            setSocket(newSocket);

            return () => {
                newSocket.close();
            };
        } else {
            if (socket) {
                socket.close();
                setSocket(null);
            }
        }
    }, [user]);

    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};