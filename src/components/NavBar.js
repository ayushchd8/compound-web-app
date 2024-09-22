import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = ({ token, setToken }) => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, [token]);

    const handleLogout = () => {
        setToken('');
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setUsername('');
        navigate('/login');
    };

    return (
        <nav className="flex justify-between items-center p-4 bg-gray-100 mb-4">
            <div className="flex items-center">
                {token && <Link to="/dashboard" className="text-blue-500 mr-4">Dashboard</Link>}
                {username && <span className="text-gray-700">Welcome, {username}</span>}
            </div>
            {token ? (
                <button onClick={handleLogout} className="bg-red-500 text-white p-2 rounded">Logout</button>
            ) : (
                <Link to="/login" className="text-blue-500">Login</Link>
            )}
        </nav>
    );
};

export default NavBar;