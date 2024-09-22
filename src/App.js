import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { fetchCompounds, deleteCompound } from './services/apiManager';
import CompoundForm from './components/CompoundForm';
import CompoundList from './components/CompoundList';
import SearchCompound from './components/SearchCompound';
import LoginSignup from './components/Login_Signup';
import NavBar from './components/NavBar';

const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [username, setUsername] = useState(localStorage.getItem('username') || '');
    const [compounds, setCompounds] = useState([]);
    const [compoundToEdit, setCompoundToEdit] = useState(null);
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
      const storedUsername = localStorage.getItem('username');
      if (storedUsername) {
          setUsername(storedUsername);
      }
    }, []);

    const fetchUserCompounds = async () => {
        if (token) {
            try {
                const response = await fetchCompounds(token);
                setCompounds(response.data);
            } catch (error) {
                console.error("Error fetching compounds:", error);
            }
        }
    };

    useEffect(() => {
        fetchUserCompounds();
    }, [token]);

    const handleDelete = async (id) => {
        try {
            await deleteCompound(token, id);
            fetchUserCompounds();
        } catch (error) {
            console.error("Error deleting compound:", error);
        }
    };

    const handleEdit = (compound) => {
        setCompoundToEdit(compound);
    };

    const handleCancelEdit = () => {
      setCompoundToEdit(null);
    };

    const handleSearchResults = (results) => {
        setSearchResults(results);
    };

    const handleShare = () => {
        fetchUserCompounds();
    };

    return (
        <Router>
            <div className="container mx-auto p-4">
                <NavBar token={token} setToken={setToken} />
                <h1 className="text-2xl font-bold mb-4">Compound Manager</h1>
                <Routes>
                    <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} />
                    <Route path="/login" element={<LoginSignup setToken={setToken} />} />
                    <Route path="/dashboard" element={
                        token ? (
                            <>
                                <CompoundForm 
                                    token={token} 
                                    fetchCompounds={fetchUserCompounds} 
                                    compoundToEdit={compoundToEdit} 
                                    onCancelEdit={handleCancelEdit}
                                />
                                <SearchCompound token={token} onSearchResults={handleSearchResults} />
                                <CompoundList 
                                    compounds={searchResults.length > 0 ? searchResults : compounds} 
                                    onDelete={handleDelete} 
                                    onEdit={handleEdit}
                                    onShare={handleShare}
                                    token={token}
                                />
                                {compoundToEdit && (
                                    <div className="mt-4">
                                        <h2 className="text-lg">Editing: {compoundToEdit.name}</h2>
                                    </div>
                                )}
                            </>
                        ) : (
                            <Navigate to="/login" />
                        )
                    } />
                </Routes>
            </div>
        </Router>
    );
};

export default App;