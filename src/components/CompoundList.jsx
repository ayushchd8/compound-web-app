import React from 'react';
import ShareCompound from './ShareCompound';

const CompoundList = ({ compounds, onDelete, onEdit, onShare, token }) => {
    const currentUser = localStorage.getItem('username');
    
    const calculateTimeRemaining = (expirationTime) => {
        if (!expirationTime) return 'No expiration';
        const now = new Date();
        const expiration = new Date(expirationTime);
        const diffInSeconds = Math.floor((expiration - now) / 1000);
        
        if (diffInSeconds <= 0) {
            return 'Expired';
        }

        const days = Math.floor(diffInSeconds / (3600 * 24));
        const hours = Math.floor((diffInSeconds % (3600 * 24)) / 3600);
        const minutes = Math.floor((diffInSeconds % 3600) / 60);

        return `${days}d ${hours}h ${minutes}m`;
    };

    return (
        <div>
            <h2 className="text-lg font-semibold mt-4">Compound Listing & Information</h2>
            <ul>
                {compounds.map(compound => { 

                    return (
                        <li key={compound.id} className="flex justify-between items-center p-2 border-b">
                            <div>
                                <h3 className="font-bold">{compound.name}</h3>
                                <p>{compound.smiles}</p>
                                <p className="text-sm text-gray-500">Owner: {compound.owner}</p>
                                {compound.shared_with && compound.shared_with.length > 0 && (
                                <div className="text-sm text-gray-500">
                                    {compound.shared_with.map((share, index) => (
                                        <div key={index}>
                                            <div>Shared with:{share.user}</div>
                                            <div className="ml-2">
                                                Expires in: {calculateTimeRemaining(share.expiration_time)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                )}
                            </div>
                            <div>
                                {compound.owner === currentUser ? (
                                    <>
                                        <button onClick={() => onEdit(compound)} className="text-blue-500 mr-2">Edit</button>
                                        <button onClick={() => onDelete(compound.id)} className="text-red-500 mr-2">Delete</button>
                                        <ShareCompound token={token} compoundId={compound.id} onShareSuccess={onShare} />
                                    </>
                                ) : (
                                    <p>Not the owner</p> // Debugging line
                                )}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default CompoundList;