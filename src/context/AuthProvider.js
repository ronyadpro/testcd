import React, { createContext } from 'react';
import useAuthService from '../hooks/useAuthService';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const allContext = useAuthService();
    return (
        <AuthContext.Provider value={allContext}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
