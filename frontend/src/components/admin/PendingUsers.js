import React, { useState, useEffect } from 'react';
import userService from '../../services/userService';
import toast from 'react-hot-toast';
import Spinner from '../common/Spinner';
import { format } from 'date-fns';

export default function PendingUsers() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPendingUsers = async () => {
        try {
            const res = await userService.getPendingUsers();
            setUsers(res.data.data);
        } catch (error) {
            toast.error("Failed to fetch pending users.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPendingUsers();
    }, []);

    const handleApprove = async (id) => {
        try {
            await userService.approveUser(id);
            toast.success("User approved!");
            fetchPendingUsers();
        } catch (error) {
            toast.error("Failed to approve user.");
        }
    };

    const handleDelete = async (id) => {
        try {
            await userService.deleteUser(id);
            toast.success("User rejected and deleted!");
            fetchPendingUsers();
        } catch (error) {
            toast.error("Failed to delete user.");
        }
    };


    if (loading) return <Spinner />;

    return (
        <div className="bg-surface shadow overflow-hidden sm:rounded-xl">
            <ul className="divide-y divide-gray-200">
                {users.length > 0 ? users.map((user) => (
                    <li key={user.email} className="p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                            <div className="flex-1 mb-4 sm:mb-0">
                                <p className="text-lg font-bold text-primary truncate">{user.fullName}</p>
                                <div className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-sm text-muted">
                                    <p><strong>Email:</strong> {user.email}</p>
                                    <p><strong>Batch:</strong> {user.batchYear}</p>
                                    <p><strong>Admission No:</strong> {user.admissionNumber}</p>
                                    <p><strong>DOB:</strong> {format(new Date(user.dateOfBirth), 'dd MMM yyyy')}</p>
                                </div>
                            </div>
                            <div className="flex-shrink-0 flex space-x-2 self-end sm:self-center">
                                <button onClick={() => handleApprove(user._id)} className="px-3 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 hover:bg-green-200">Approve</button>
                                <button onClick={() => handleDelete(user._id)} className="px-3 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800 hover:bg-red-200">Reject</button>
                            </div>
                        </div>
                    </li>
                )) : <p className="p-6 text-muted">No pending registrations.</p>}
            </ul>
        </div>
    );
}