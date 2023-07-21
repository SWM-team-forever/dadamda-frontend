import { createContext, useState } from "react";
import React from 'react';
import { USER } from "../config";

const UserContext = createContext({
    user: null,
    userLogin: () => { },
    userLogout: () => { },
});

interface UserProps {
    user: {
        name: string,
        profile_url: string,
    },
}

const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const userLogin = () => {
        setUser(USER);
    }

    const userLogout = () => {
        setUser(null);
    }

    return (
        <UserContext.Provider
            value={{ user, userLogin, userLogout }}>{children}</UserContext.Provider>
    );
};

export { UserContext, UserProvider };