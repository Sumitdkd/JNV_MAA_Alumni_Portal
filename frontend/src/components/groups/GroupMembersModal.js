import React, { useState } from 'react';
import { XMarkIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';
import groupService from '../../services/groupService';
import toast from 'react-hot-toast';

const API_URL = process.env.REACT_APP_API_URL.replace("/api", "");

export default function GroupMembersModal({ group, onClose, onLeaveGroup }) {
    const [loading, setLoading] = useState(false);

    const handleLeaveGroup = async () => {
        if (window.confirm(`Are you sure you want to leave the group "${group.name}"?`)) {
            setLoading(true);
            try {
                await groupService.leaveGroup(group._id);
                toast.success("You have left the group.");
                onLeaveGroup(); // Refresh the groups list
                onClose(); // Close the modal
            } catch (error) {
                toast.error("Failed to leave group.");
            } finally {
                setLoading(false);
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4" onClick={onClose}>
            <div className="bg-surface rounded-xl shadow-2xl w-full max-w-md animate-zoomIn" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-bold text-on-surface">Members of "{group.name}"</h2>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200"><XMarkIcon className="w-6 h-6" /></button>
                </div>

                <ul className="divide-y divide-gray-200 p-4 max-h-[60vh] overflow-y-auto">
                    {group.members.map(member => {
                        const profileImageUrl = member.profilePicture?.startsWith('http') ? member.profilePicture : member.profilePicture && member.profilePicture !== 'no-photo.jpg' ? `${API_URL}${member.profilePicture}` : `https://ui-avatars.com/api/?name=${member.fullName}&background=8344AD&color=fff`;
                        return (
                            <li key={member._id} className="py-3 flex items-center">
                                <img className="h-10 w-10 rounded-full object-cover" src={profileImageUrl} alt={member.fullName} />
                                <span className="ml-3 font-medium text-on-surface">{member.fullName}</span>
                            </li>
                        );
                    })}
                </ul>

                <div className="p-4 bg-gray-50 border-t rounded-b-xl">
                    <button onClick={handleLeaveGroup} disabled={loading} className="w-full flex justify-center items-center gap-2 px-4 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition disabled:bg-red-300">
                        <ArrowRightOnRectangleIcon className="w-5 h-5" />
                        {loading ? 'Leaving...' : 'Leave Group'}
                    </button>
                </div>
            </div>
        </div>
    );
}

