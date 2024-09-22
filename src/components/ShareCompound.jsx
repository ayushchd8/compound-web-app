import React, { useState, useEffect } from 'react';
import { shareCompound, debouncedSearchUser } from '../services/apiManager';

const ShareCompound = ({ token, compoundId, onShareSuccess }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [isSharing, setIsSharing] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (searchQuery.length >= 2) {
            debouncedSearchUser(token, searchQuery, (results) => {
                setSearchResults(results);
            });
        } else {
            setSearchResults([]);
        }
    }, [searchQuery, token]);

    const handleShare = async () => {
        if (!selectedUser) return;
        setIsSharing(true);
        setError('');
        try {
            const recipientData = { user_id: selectedUser.id };
            await shareCompound(token, compoundId, recipientData);
            onShareSuccess();
            setSearchQuery('');
            setSelectedUser(null);
        } catch (error) {
            setError(error.response?.data?.message || "Error sharing compound");
        }
        setIsSharing(false);
    };

    return (
        <div className="inline-block relative">
            <input 
                type="text" 
                value={searchQuery} 
                onChange={(e) => setSearchQuery(e.target.value)} 
                placeholder="Search users to share with" 
                className="p-1 border rounded mr-2"
            />
            {searchResults.length > 0 && (
                <ul className="absolute z-10 bg-white border rounded mt-1 max-h-40 overflow-y-auto">
                    {searchResults.map(user => (
                        <li 
                            key={user.id} 
                            className="p-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => {
                                setSelectedUser(user);
                                setSearchQuery(user.username);
                                setSearchResults([]);
                            }}
                        >
                            {user.username}
                        </li>
                    ))}
                </ul>
            )}
            <button 
                onClick={handleShare} 
                className="bg-green-500 text-white p-1 rounded"
                disabled={isSharing || !selectedUser}
            >
                {isSharing ? 'Sharing...' : 'Share'}
            </button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
        </div>
    );
};

export default ShareCompound;