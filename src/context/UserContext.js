import React , {createContext , use, useContext , useEffect ,useState} from "react";
import axios from "axios";

const UserContext = createContext();

export const useUsers = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3001/users").then((res) => {
          setUsers(res.data);
        });
      }, []);
    
      return (
        <UserContext.Provider value={{ users }}>
          {children}
        </UserContext.Provider>
      );
}