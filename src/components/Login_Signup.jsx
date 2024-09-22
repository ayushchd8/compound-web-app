import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, registerUser } from '../services/apiManager';

const LoginSignup = ({ setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            if (isLogin) {
                const response = await loginUser({ username, password });
                const { access } = response.data;
                setToken(access);
                localStorage.setItem('token', access);
                localStorage.setItem('username', username);
                navigate('/dashboard');
            } else {
                await registerUser({ username, password, email });
                alert('Registration successful! Please log in.');
                setIsLogin(true);
            }
        } catch (error) {
            if(error.response?.data?.message){
                setError(error.response?.data?.message || (isLogin ? "Login failed" : "Registration failed"));
            } else {
            console.error(isLogin ? "Login failed:" : "Registration failed:", error);
            alert(isLogin ? "Login failed. Please try again." : "Registration failed. Please try again.");
            }
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-5">{isLogin ? 'Login' : 'Register'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    className="p-2 border rounded w-full"
                    required
                />
                {!isLogin && (
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email"
                        className="p-2 border rounded w-full"
                        required
                    />
                )}
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="p-2 border rounded w-full"
                    required
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
                    {isLogin ? 'Login' : 'Register'}
                </button>
            </form>
            <p className="mt-4 text-center">
                {isLogin ? "Don't have an account?" : "Already have an account?"}
                <button
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-blue-500 ml-2"
                >
                    {isLogin ? 'Register' : 'Login'}
                </button>
            </p>
        </div>
    );
};

export default LoginSignup;