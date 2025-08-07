import React, { useState, useEffect } from 'react';
import postService from '../../services/postService';
import toast from 'react-hot-toast';
import Spinner from '../common/Spinner';

export default function PendingPosts() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPendingPosts = async () => {
        try {
            const res = await postService.getPendingPosts();
            setPosts(res.data.data);
        } catch (error) {
            toast.error("Failed to fetch pending posts.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPendingPosts();
    }, []);

    const handleApprove = async (id) => {
        try {
            await postService.approvePost(id);
            toast.success("Post approved!");
            fetchPendingPosts();
        } catch (error) {
            toast.error("Failed to approve post.");
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            try {
                await postService.deletePost(id);
                toast.success("Post deleted!");
                fetchPendingPosts();
            } catch (error) {
                toast.error("Failed to delete post.");
            }
        }
    };

    if (loading) return <Spinner />;

    return (
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
                {posts.length > 0 ? posts.map((post) => (
                    <li key={post._id}>
                        <div className="px-4 py-4 sm:px-6">
                            <div className="flex items-center justify-between">
                                <p className="text-sm font-medium text-brand-blue truncate">{post.title}</p>
                                <div className="ml-2 flex-shrink-0 flex space-x-2">
                                    <button onClick={() => handleApprove(post._id)} className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 hover:bg-green-200">Approve</button>
                                    <button onClick={() => handleDelete(post._id)} className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800 hover:bg-red-200">Reject</button>
                                </div>
                            </div>
                            <div className="mt-2">
                                <p className="text-sm text-gray-600">{post.content.substring(0, 100)}...</p>
                                <p className="text-sm text-gray-500 mt-2">By: {post.user.fullName}</p>
                            </div>
                        </div>
                    </li>
                )) : <p className="p-4 text-gray-500">No pending posts.</p>}
            </ul>
        </div>
    );
}
