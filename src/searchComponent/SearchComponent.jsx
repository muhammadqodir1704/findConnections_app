import React, { useState } from "react";
import { useUsers } from "../context/UserContext.jsx";
import { findConnectionPath } from "../utils/findConnectionPath";
import { FaSearch, FaSpinner } from "react-icons/fa";       
                                  
const SearchComponent = () => {
  const { users } = useUsers();
  const [fromName, setFromName] = useState("");
  const [toName, setToName] = useState("");
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const withoutSpaces = () => {
    const trimmedFromName = fromName.trim();
    const trimmedToName = toName.trim();
    
    setFromName(trimmedFromName);
    setToName(trimmedToName);
    
    const filteredUsers = users.filter(user => 
      user.name.toLowerCase().includes(trimmedFromName.toLowerCase()) ||
      user.name.toLowerCase().includes(trimmedToName.toLowerCase())
    );
    
    return filteredUsers;
  };
  const handleSearch = () => {
    setError("");
    setIsLoading(true);
    setResults(null);

    const fromUser = users.find(u => u.name.toLowerCase() === fromName.toLowerCase());
    const toUser = users.find(u => u.name.toLowerCase() === toName.toLowerCase());

    if (!fromUser || !toUser) {
      setError("Foydalanuvchi topilmadi");
      setResults(null);
      setIsLoading(false);
      return;
    }

    setTimeout(() => {
      const paths = findConnectionPath(users, fromUser.id, toUser.id);
      setResults(paths);
      setIsLoading(false);
    }, 3000);
  };

  return (
    <div style={{ backgroundColor: "#6560af" }} className="p-4 rounded-lg shadow-md text-white">
      <h3 className="text-lg font-semibold mb-2"> Search Connection</h3>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          placeholder="1-shaxsni kiriting"
          value={fromName}
          onChange={e => setFromName(e.target.value)}
          onBlur={withoutSpaces}
          className="border p-2 rounded w-full bg-white text-black"
        />
        <input
          type="text"
          placeholder="2-shaxsni kiriting"
          value={toName}
          onChange={e => setToName(e.target.value)}
          onBlur={withoutSpaces}
          className="border p-2 rounded w-full bg-white text-black"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600 transition-colors"
          disabled={isLoading}
        >
          <div className="flex items-center gap-2">
            <FaSearch />
            <span>Search</span>
          </div>
        </button>
      </div>
      {isLoading ? (
        <div className="text-sm text-white p-2 rounded shadow flex items-center justify-center">
          <FaSpinner className="animate-spin mr-2" size={35} />
        </div>
      ) : error ? (
        <div className="text-sm text-red-600 bg-white p-2 rounded shadow">{error}</div>
      ) : results && results.length > 0 ? (
        <div className="space-y-2">
          {results.map((path, index) => (
            <div key={index} className="text-sm text-gray-800 bg-white p-2 rounded shadow">
              Yo'l {index + 1}: {path.map(id => users.find(u => u.id === id)?.name).join(" → ")}
            </div>
          ))}
        </div>
      ) : results && results.length === 0 ? (
        <div className="text-sm text-yellow-600 bg-white p-2 rounded shadow">Bog'lanish yo'li topilmadi</div>
      ) : null}
    </div>
  );
};

export default SearchComponent;
