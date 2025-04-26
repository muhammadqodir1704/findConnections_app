import React, { useEffect, useState } from "react";
import { UserProvider } from "./context/UserContext.jsx";
import Graphics from "./graphVisulazer/Graphics";
import SearchComponent from "./searchComponent/SearchComponent";
import axios from "axios";
const App = () => {
  const [message, setMessage] = useState("");

  useEffect(() => {
    axios.get('http://localhost:5000/')
      .then(response => setMessage(response.data))
      .catch(error => console.error('Xatolik:', error));
  }, []);
  return (
    <UserProvider>
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        <SearchComponent />
        <Graphics />
      </div>
      <h1>{message}</h1>
    </UserProvider>
  );
};

export default App;
