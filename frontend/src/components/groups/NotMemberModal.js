import React from 'react';

const NotMemberModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm text-center">
        <h2 className="text-xl font-semibold mb-4">Access Denied</h2>
        <p className="mb-6">You are not a member of this group.</p>
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default NotMemberModal;
