import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext();
export const useUsers = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchUsers = async () => {
            try {
              const response = await axios.get(`${API_URL}/api/users`);
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