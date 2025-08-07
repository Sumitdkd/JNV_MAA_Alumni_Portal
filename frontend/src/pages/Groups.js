
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import groupService from '../services/groupService';
import toast from 'react-hot-toast';
import Spinner from '../components/common/Spinner';
import { UsersIcon, ArrowRightIcon, PlusIcon, UserGroupIcon, ChatBubbleLeftIcon } from '@heroicons/react/24/solid';
import useAuth from '../hooks/useAuth';
import CreateGroupModal from '../components/groups/CreateGroupModal';
import GroupMembersModal from '../components/groups/GroupMembersModal'; 

export default function Groups() {
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [joiningGroupId, setJoiningGroupId] = useState(null); 
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [viewingMembersOf, setViewingMembersOf] = useState(null); 

    const { user } = useAuth();

    const fetchGroups = async () => {
        setLoading(true);
        try {
            const res = await groupService.getGroups();
            setGroups(res.data.data);
        } catch (error) {
            toast.error("Could not fetch groups.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchGroups();
    }, []);

    const handleJoinGroup = async (groupId) => {
        setJoiningGroupId(groupId); // Disable button
        try {
            await groupService.joinGroup(groupId);
            toast.success("Successfully joined group!");
            fetchGroups();
        } catch (error) {
            toast.error("Failed to join group.");
        } finally {
            setJoiningGroupId(null);
        }
    };

    if (loading) return <Spinner />;

    return (
        <div>
            <div className="flex flex-col md:flex-row justify-between md:items-center text-center md:text-left mb-8">
                <div className="mb-4 md:mb-0">
                    <h1 className="text-4xl font-extrabold text-on-surface">Interest Groups</h1>
                    <p className="mt-2 text-lg text-muted max-w-2xl">This is your space! Create a group for your batch, your city, your hobby, or anything else.</p>
                </div>
                <button
                    onClick={() => setCreateModalOpen(true)}
                    className="inline-flex items-center self-center gap-2 px-4 py-2 bg-primary text-white font-semibold rounded-lg shadow-md hover:bg-primary-dark transition-transform transform hover:scale-105"
                >
                    <PlusIcon className="w-5 h-5" /> Create Group
                </button>
            </div>

            {groups.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {groups.map(group => {

                        const isMember = group.members.some(member => member._id === user._id);
                        const isJoining = joiningGroupId === group._id;

                        return (
                            <div key={group._id} className="bg-surface rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col">
                                <div className="p-6 flex-grow">
                                    <h2 className="text-2xl font-bold text-on-surface">{group.name}</h2>
                                    <p className="text-muted mt-2 flex-grow">{group.description}</p>
                                </div>
                                <div className="bg-gray-50 p-4 flex justify-between items-center rounded-b-xl">
                                    <button disabled={!isMember} onClick={() => isMember && setViewingMembersOf(group)} className="flex items-center text-muted disabled:cursor-default enabled:hover:text-primary transition-colors">
                                        <UsersIcon className="w-5 h-5 mr-2" />
                                        <span className="text-sm font-medium">{group.members.length} members</span>
                                    </button>
                                    {isMember ? (
                                        <Link to={`/groups/${group._id}`} className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-secondary hover:bg-opacity-80 transition">
                                            Open Chat <ArrowRightIcon className="w-4 h-4 ml-2" />
                                        </Link>
                                    ) : (
                                        <button
                                            onClick={() => handleJoinGroup(group._id)}
                                            disabled={isJoining}
                                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark transition disabled:bg-primary-light disabled:cursor-not-allowed"
                                        >
                                            {isJoining ? 'Joining...' : 'Join Group'}
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="text-center py-20 bg-surface rounded-xl shadow-lg">
                    <h3 className="text-2xl font-bold text-on-surface">No Groups Found</h3>
                    <p className="text-muted mt-2">Be the first to create a group and start a new community!</p>
                </div>
            )}

            {isCreateModalOpen && <CreateGroupModal setIsOpen={setCreateModalOpen} onGroupCreated={fetchGroups} />}
            {viewingMembersOf && <GroupMembersModal group={viewingMembersOf} onClose={() => setViewingMembersOf(null)} onLeaveGroup={fetchGroups} />}

        </div>
    );
}
