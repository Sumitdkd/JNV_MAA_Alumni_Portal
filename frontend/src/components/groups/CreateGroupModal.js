import React, { useState } from 'react';
import groupService from '../../services/groupService';
import toast from 'react-hot-toast';

export default function CreateGroupModal({ setIsOpen, onGroupCreated }) {
    const [formData, setFormData] = useState({ name: '', description: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name.trim() || !formData.description.trim()) {
            toast.error("Please fill out both fields.");
            return;
        }
        setLoading(true);
        try {
            await groupService.createGroup(formData);
            toast.success("Group created successfully!");
            onGroupCreated(); 
            setIsOpen(false);  
        } catch (error) { 
            toast.error(error.response?.data?.message || "Failed to create group."); 
        } finally { 
            setLoading(false); 
        }
    };

    return (
        <div 
            className="fixed inset-0 bg-black/30 z-50 flex justify-center items-center p-4"
            onClick={() => setIsOpen(false)} 
        >
            <div 
                className="bg-surface rounded-xl shadow-2xl p-8 w-full max-w-md" 
                onClick={(e) => e.stopPropagation()} 
            >
                <h2 className="text-2xl font-bold mb-4 text-on-surface">Create a New Group</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-muted">Group Name</label>
                        <input 
                            id="name" 
                            name="name" 
                            placeholder="E.g., Batch of 2015" 
                            required 
                            onChange={handleChange} 
                            className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-muted">Description</label>
                        <textarea 
                            id="description" 
                            name="description" 
                            placeholder="What is this group about?" 
                            required 
                            rows="4" 
                            onChange={handleChange} 
                            className="mt-1 w-full px-4 py-3 border border-gray-300 rounded-md bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary">
                        </textarea>
                    </div>
                    <div className="flex justify-end gap-4 pt-4">
                        <button 
                            type="button" 
                            onClick={() => setIsOpen(false)} 
                            className="px-4 py-2 bg-gray-200 text-on-surface rounded-lg hover:bg-gray-300 font-semibold transition"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            disabled={loading} 
                            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark font-semibold transition disabled:bg-primary-light"
                        >
                            {loading ? "Creating..." : "Create Group"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}