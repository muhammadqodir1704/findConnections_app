import React, { useState } from "react";
import { useUsers } from "../context/UserContext.jsx";
import { findConnectionPath } from "../utils/findConnectionPath";
import { FaSearch } from "react-icons/fa";


const SearchComponent = () => {
  const { users } = useUsers();
  const [fromName, setFromName] = useState("");
  const [toName, setToName] = useState("");
  const [results, setResults] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = () => {
    setError("");
    setIsLoading(true);

    const fromUser = users.find(u => u.name.toLowerCase() === fromName.toLowerCase());
    const toUser = users.find(u => u.name.toLowerCase() === toName.toLowerCase());

    if (!fromUser || !toUser) {
      setError("Foydalanuvchi topilmadi");
      setResults(null);
      setIsLoading(false);
      return;
    }

    const paths = findConnectionPath(users, fromUser.id, toUser.id);
    setResults(paths);
    setIsLoading(false);
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
          className="border p-2 rounded w-full bg-white text-black"
        />
        <input
          type="text"
          placeholder="2-shaxsni kiriting"
          value={toName}
          onChange={e => setToName(e.target.value)}
          className="border p-2 rounded w-full bg-white text-black"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 rounded hover:bg-blue-600 transition-colors"
          disabled={isLoading}
        >
          {isLoading ? "Qidirilmoqda..." : (
            <div className="flex items-center gap-2">
              <FaSearch />
              <span>Search</span>
            </div>
          )}
        </button>
      </div>
      {isLoading ? (
        <div className="text-sm text-blue-600">Qidirilmoqda...</div>
      ) : error ? (
        <div className="text-sm text-red-600">{error}</div>
      ) : results && results.length > 0 ? (
        <div className="space-y-2">
          {results.map((path, index) => (
            <div key={index} className="text-sm text-gray-800 bg-white p-2 rounded shadow">
              Yo'l {index + 1}: {path.map(id => users.find(u => u.id === id)?.name).join(" → ")}
            </div>
          ))}
        </div>
      ) : null}

    </div>
  );
};

export default SearchComponent;
