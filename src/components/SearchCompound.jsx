import React, { useState } from 'react';
import { searchCompound } from '../services/apiManager';

const SearchCompound = ({ token, onSearchResults }) => {
    const [query, setQuery] = useState('');
    const [error, setError] = useState('');

    const handleSearch = async (e) => {
        e.preventDefault();
        setError('');
        if (query.trim()) {
            try {
                const response = await searchCompound(token, query);
                onSearchResults(response.data);
            } catch (error) {
                setError(error.response?.data?.message || "Error searching compounds");
            }
        }
    };

    const handleClear = () => {
        setQuery('');
        onSearchResults([]);
    };

    return (
        <div className="space-y-4">
            <input 
                type="text" 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                placeholder="Search Compounds" 
                className="p-2 border rounded w-full"
            />
            <button onClick={handleSearch} className="bg-yellow-500 text-white p-2 rounded ml-2">Search</button>
            <button onClick={handleClear} className="bg-red-500 text-white p-2 rounded ml-2">Clear</button>
            {error && <p className="text-red-500">{error}</p>}
        </div>
    );
};

export default SearchCompound;
