import React, {useState, createContext, FC, ReactPortal, ReactNode} from 'react';
import {AuthContextType, IAuth} from '@/types/user';

export const AuthContext = createContext<AuthContextType>(null);

const defaultAuth = {
    phone: '',

    name: '',
    address: '',
    email: '',
    gender: '',
    login: false,
};

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState<IAuth>(defaultAuth);

    const updateAuth = (auth: IAuth) => {
        setAuth((prevState) => ({
            ...prevState,
            ['id']: auth.phone,
            ['phone']: auth.phone,
            ['name']: auth.name,

            ['email']: auth.email,
            ['gender']: auth.gender,
            ['address']: auth.address,
        }));
    };

    const loginAuth = (token: string) => {
        setAuth((prevState) => ({
            ...prevState,
            ['login']: true,
            ['token']: token,
        }));
    };

    const resetAuth = () => {
        setAuth(defaultAuth);
    };

    return <AuthContext.Provider value={{auth, updateAuth, loginAuth, resetAuth}}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
