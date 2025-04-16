import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext();

export const useUsers = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("http://localhost:3001");
                setUsers(Array.isArray(response.data) ? response.data : []);
            } catch (err) {
                setError(err.message);
                console.error("Error fetching users:", err);
                setUsers([]);
            }
        };
        fetchUsers();
    }, []);
    
    return (
        <UserContext.Provider value={{ users, error }}>
            {children}
        </UserContext.Provider>
    );
}