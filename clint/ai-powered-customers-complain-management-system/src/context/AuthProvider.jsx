import React, { useState } from 'react';
import { AuthContext } from './AuthContext';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        try {
            return storedUser ? JSON.parse(storedUser) : null;
        } catch {  
            return null;
        }
    });

    const [loading, setLoading] = useState(false); // এখন আর ট্রু রাখার দরকার নেই কারণ ডাটা আগেই পাওয়া গেছে

    const logOut = () => {
        localStorage.removeItem('user');
        setUser(null);
    };

    const authInfo = {
        user,
        loading,
        setUser,
        setLoading,
        logOut
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;