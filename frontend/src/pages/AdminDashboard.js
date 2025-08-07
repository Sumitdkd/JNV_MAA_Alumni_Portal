import React, { useState } from 'react';
import PendingUsers from '../components/admin/PendingUsers';
import PendingPosts from '../components/admin/PendingPosts';
import ViewFeedback from '../components/admin/ViewFeedback';

export default function AdminDashboard() {
    const [activeTab, setActiveTab] = useState('users');
    const tabs = [
        { id: 'users', name: 'Pending Registrations' },
        // { id: 'posts', name: 'Pending Posts' },
        { id: 'feedback', name: 'View Feedback' }
    ];

    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-on-surface mb-6">Admin Dashboard</h1>

            {/* Mobile Dropdown Menu */}
            <div className="sm:hidden mb-4">
                <label htmlFor="tabs" className="sr-only">Select a tab</label>
                <select id="tabs" name="tabs" className="block w-full rounded-md border-gray-300 focus:border-primary focus:ring-primary" onChange={(e) => setActiveTab(e.target.value)} value={activeTab}>
                    {tabs.map((tab) => (<option key={tab.id} value={tab.id}>{tab.name}</option>))}
                </select>
            </div>

            {/* Desktop Tab Navigation */}
            <div className="hidden sm:block">
                <div className="border-b border-gray-200">
                    <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                        {tabs.map((tab) => (
                            <button key={tab.name} onClick={() => setActiveTab(tab.id)}
                                className={`${activeTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-muted hover:text-on-surface hover:border-gray-300'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}>
                                {tab.name}
                            </button>
                        ))}
                    </nav>
                </div>
            </div>

            <div className="mt-6">
                {activeTab === 'users' && <PendingUsers />}
                {activeTab === 'posts' && <PendingPosts />}
                {activeTab === 'feedback' && <ViewFeedback />}
            </div>
        </div>
    );
}
