import React from 'react';
import { useNotifications } from '../context/NotificationContext';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { BellIcon } from '@heroicons/react/24/solid';

const API_URL = process.env.REACT_APP_API_URL.replace("/api", "");

export default function NotificationsPage() {
    const { notifications } = useNotifications();

    const getNotificationInfo = (n) => {
        let text = '';
        let link = '/';
        let isValidLink = false;
        
        switch (n.type) {
            case 'new_like':
                text = <><strong>{n.sender.fullName}</strong> liked your post: <strong>"{n.post?.title || 'your post'}"</strong></>;
                if (n.post?._id) {
                    link = `/posts/${n.post._id}`;
                    isValidLink = true;
                }
                break;

            case 'new_comment':
                text = <><strong>{n.sender.fullName}</strong> commented on your post.</>;
                if (n.post?._id) {
                    link = `/posts/${n.post._id}`;
                    isValidLink = true;
                }
                break;

            case 'new_post':
                text = <><strong>{n.sender.fullName}</strong> created a new post: "{n.post?.title || 'a new post'}"</>;
                if (n.post?._id) {
                    link = `/posts/${n.post._id}`;
                    isValidLink = true;
                }
                break;

            case 'mention_comment':
                text = <><strong>{n.sender.fullName}</strong> mentioned you in a comment.</>;
                if (n.post?._id) {
                    link = `/posts/${n.post._id}`;
                    isValidLink = true;
                }
                break;

            case 'mention_chat':
                text = <><strong>{n.sender.fullName}</strong> mentioned you in a group chat.</>;
                if (n.group?._id) {
                    link = `/groups/${n.group._id}`;
                    isValidLink = true;
                }
                break;

            default:
                text = "You have a new notification.";
        }
        
        // If no valid link, disable the link
        if (!isValidLink) {
            link = '#';
        }
        
        return { text, link, isValidLink };
    };

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
            <h1 className="text-3xl font-bold text-on-surface mb-6">All Notifications</h1>
            <div className="bg-surface rounded-xl shadow-lg">
                <ul className="divide-y divide-gray-200">
                    {notifications.length > 0 ? notifications.map(n => {
                        const { text, link, isValidLink } = getNotificationInfo(n);

                        const profileImageUrl = n.sender.profilePicture?.startsWith('http')
                            ? n.sender.profilePicture
                            : n.sender.profilePicture && n.sender.profilePicture !== 'no-photo.jpg'
                                ? `${API_URL}${n.sender.profilePicture}`
                                : `https://ui-avatars.com/api/?name=${n.sender.fullName}&background=8344AD&color=fff`;

                        return (
                            <li key={n._id}>
                                {isValidLink ? (
                                    <Link to={link} className={`block p-4 hover:bg-gray-50 ${!n.read ? 'bg-primary-light/10' : ''}`}>
                                        <div className="flex items-center">
                                            <img
                                                className="h-10 w-10 rounded-full object-cover"
                                                src={profileImageUrl}
                                                alt={n.sender.fullName}
                                            />
                                            <div className="ml-4">
                                                <p className="text-sm text-on-surface">{text}</p>
                                                <p className="text-xs text-muted mt-1">
                                                    {formatDistanceToNow(new Date(n.createdAt))} ago
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                ) : (
                                    <div className={`block p-4 ${!n.read ? 'bg-primary-light/10' : ''}`}>
                                        <div className="flex items-center">
                                            <img
                                                className="h-10 w-10 rounded-full object-cover"
                                                src={profileImageUrl}
                                                alt={n.sender.fullName}
                                            />
                                            <div className="ml-4">
                                                <p className="text-sm text-on-surface">{text}</p>
                                                <p className="text-xs text-muted mt-1">
                                                    {formatDistanceToNow(new Date(n.createdAt))} ago
                                                </p>
                                                <p className="text-xs text-gray-400 mt-1">
                                                    (Content no longer available)
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </li>
                        );
                    }) : (
                        <div className="text-center p-10 text-muted">
                            <BellIcon className="w-12 h-12 mx-auto mb-2" />
                            <p>No notifications yet.</p>
                        </div>
                    )}
                </ul>
            </div>
        </div>
    );
}
