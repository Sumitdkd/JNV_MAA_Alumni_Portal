import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import messageService from '../services/messageService';
import groupService from '../services/groupService';
import useAuth from '../hooks/useAuth';
import { useSocket } from '../context/SocketContext';
import toast from 'react-hot-toast';
import Spinner from '../components/common/Spinner';
import { PaperAirplaneIcon, ArrowLeftIcon } from '@heroicons/react/24/solid';
import NotMemberModal from '../components/groups/NotMemberModal';
import { MentionsInput, Mention } from 'react-mentions';
import userService from '../services/userService';
import StyledText from '../components/common/StyledText';
import '../components/posts/mentionStyle.css';

const API_URL = process.env.REACT_APP_API_URL.replace("/api", "");

export default function GroupChat() {
    const { id: groupId } = useParams();
    const { user: authUser } = useAuth();
    const socket = useSocket();

    const [group, setGroup] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [loading, setLoading] = useState(true);
    const messagesEndRef = useRef(null);

    const [isGroupMember, setIsGroupMember] = useState(false);
    const [isNotMemberModalOpen, setNotMemberModalOpen] = useState(false);

    const CloseNotMemberModal = () => {
        setNotMemberModalOpen(false);
        window.location.href = '/groups';
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        const fetchGroupData = async () => {
            setLoading(true);
            try {
                const [groupRes, messagesRes] = await Promise.all([
                    groupService.getGroupDetails(groupId),
                    messageService.getMessages(groupId),
                ]);
                setGroup(groupRes.data.data);
                setMessages(messagesRes.data.data);
            } catch (error) {
                toast.error("Failed to load chat data.");
                console.error(error);
                setNotMemberModalOpen(true);
            } finally {
                setLoading(false);
            }
        };
        fetchGroupData();
    }, [groupId]);

    useEffect(() => {
        if (socket) {
            socket.emit('join_group', groupId);
            const messageListener = (receivedMessage) => {
                if (receivedMessage.group === groupId) {
                    setMessages((prevMessages) => [...prevMessages, receivedMessage]);
                }
            };
            socket.on('receive_message', messageListener);
            return () => {
                socket.off('receive_message', messageListener);
            };
        }
    }, [socket, groupId]);

    useEffect(() => {
        const checkGroupMembership = async () => {
            try {
                const res = await groupService.isGroupMember(groupId);
                setIsGroupMember(res.data.isMember);
                if (!res.data.isMember) {
                    setNotMemberModalOpen(true);
                }
            } catch (error) {
                console.error("Error checking group membership:", error);
                setIsGroupMember(false);
            }
        };
        checkGroupMembership();
    }, [groupId]);

    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!socket || !socket.connected) {
            toast.error("You are not connected to the chat. Please refresh.");
            return;
        }
        if (!newMessage.trim() || !authUser) return;

        socket.emit('send_message', {
            groupId,
            text: newMessage,
        });
        setNewMessage('');
    };

    const fetchUsersForMention = (query, callback) => {
        if (!query) return;
        userService.searchUsers(query)
            .then(res => callback(res.data.data))
            .catch(() => callback([]));
    };

    if (loading) return <Spinner />;

    if (!group) return (
        <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-muted">Group not found.</h2>
            <Link to="/groups" className="mt-4 inline-block text-primary hover:underline">
                &larr; Back to all groups
            </Link>
        </div>
    );

    if (!isGroupMember && !loading) {
        return (
            <NotMemberModal
                isOpen={isNotMemberModalOpen}
                onClose={CloseNotMemberModal}
            />
        );
    }

    return (
        <div className="h-[75vh] sm:h-[80vh] flex flex-col bg-surface rounded-xl sm:rounded-2xl shadow-2xl">
            <div className="p-3 sm:p-4 border-b flex items-center space-x-3 sm:space-x-4 sticky top-0 bg-surface rounded-t-xl sm:rounded-t-2xl">
                <Link to="/groups" className="text-primary hover:text-primary-dark p-1.5 sm:p-2 rounded-full hover:bg-gray-100">
                    <ArrowLeftIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                </Link>
                <h1 className="text-lg sm:text-2xl font-bold text-on-surface truncate">{group.name}</h1>
            </div>

            <div className="flex-1 p-3 sm:p-6 overflow-y-auto">
                {messages.length > 0 ? (
                    messages.map(msg => {
                        const isMyMessage = msg.sender?._id === authUser?._id;
                        const profileImageUrl = msg.sender?.profilePicture?.startsWith('http')
                            ? msg.sender.profilePicture
                            : msg.sender?.profilePicture && msg.sender.profilePicture !== 'no-photo.jpg'
                                ? `${API_URL}${msg.sender.profilePicture}`
                                : `https://ui-avatars.com/api/?name=${msg.sender?.fullName}&background=8344AD&color=fff`;

                        return (
                            <div key={msg._id} className={`flex my-2 items-end gap-2 ${isMyMessage ? 'justify-end' : 'justify-start'}`}>
                                {!isMyMessage && (
                                    <img src={profileImageUrl} alt={msg.sender?.fullName} className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover self-start flex-shrink-0" />
                                )}

                                <div className={`p-2.5 sm:p-3 rounded-2xl max-w-[75%] sm:max-w-lg ${isMyMessage ? 'bg-primary text-white rounded-br-none' : 'bg-gray-200 text-on-surface rounded-bl-none'}`}>
                                    {!isMyMessage && (
                                        <p className="font-bold text-xs mb-1 text-primary-dark truncate">
                                            {msg.sender?.fullName}
                                        </p>
                                    )}
                                    <StyledText text={msg.text} />
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <div className="text-center text-muted py-8 sm:py-10">
                        <p className="text-sm sm:text-base">No messages yet.</p>
                        <p className="text-xs sm:text-sm">Be the first to start the conversation!</p>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className="p-3 sm:p-4 border-t bg-gray-50 rounded-b-xl sm:rounded-b-2xl">
                <form onSubmit={handleSendMessage} className="grid grid-cols-[1fr_auto] gap-3 sm:gap-4 w-full max-w-full">
                    <div className="w-full max-w-full overflow-hidden pr-1">
                        <MentionsInput
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="mentions"
                            a11ySuggestionsListLabel={"Suggested users for mention"}
                            style={{ width: '100%', maxWidth: '100%', overflow: 'hidden' }}
                        >
                            <Mention
                                trigger="@"
                                data={fetchUsersForMention}
                                markup="@[__display__]"
                                displayTransform={(id, display) => `@${display}`}
                                className="mentions__mention"
                            />
                        </MentionsInput>
                    </div>
                    <button 
                        type="submit" 
                        className="p-2.5 sm:p-3 bg-primary rounded-full text-white hover:bg-primary-dark transition-colors disabled:opacity-50" 
                        disabled={!newMessage.trim()}
                        style={{ minWidth: '44px', width: '44px', height: '44px', flexShrink: 0 }}
                    >
                        <PaperAirplaneIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </button>
                </form>
            </div>
        </div>
    );
}
