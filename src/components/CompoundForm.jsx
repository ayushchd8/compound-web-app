import React, { useState, useEffect } from 'react';
import { createCompound, updateCompound } from '../services/apiManager';

const CompoundForm = ({ token, fetchCompounds, compoundToEdit, onCancelEdit }) => {
    const [name, setName] = useState('');
    const [smiles, setSmiles] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (compoundToEdit) {
            setName(compoundToEdit.name);
            setSmiles(compoundToEdit.smiles);
        } else {
            setName('');
            setSmiles('');
        }
    }, [compoundToEdit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (compoundToEdit) {
                await updateCompound(token, compoundToEdit.id, { name, smiles });
            } else {
                await createCompound(token, { name, smiles });
            }
            fetchCompounds();
            setName('');
            setSmiles('');
            if (compoundToEdit) {
                onCancelEdit();
            }
        } catch (error) {
            setError(error.response?.data?.message || "Error submitting compound");
        }
    };

    const handleCancel = () => {
        setName('');
        setSmiles('');
        onCancelEdit();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 mb-4">
            <input 
                type="text" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Compound Name" 
                className="p-2 border rounded w-full"
                required
            />
            <input 
                type="text" 
                value={smiles} 
                onChange={(e) => setSmiles(e.target.value)} 
                placeholder="SMILES" 
                className="p-2 border rounded w-full"
                required
            />
            <div className="flex justify-between">
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    {compoundToEdit ? 'Update' : 'Submit'}
                </button>
                {compoundToEdit && (
                    <button type="button" onClick={handleCancel} className="bg-gray-300 text-gray-700 p-2 rounded">
                        Cancel
                    </button>
                )}
            </div>
            {error && <p className="text-red-500">{error}</p>}
        </form>
    );
};

export default CompoundForm;