import React, { useState } from "react";
import { useUsers } from "../context/UserContext.jsx";
import { findConnectionPath } from "../utils/findConnectionPath";

const SearchComponent = () => {
  const { users } = useUsers();
  const [fromName, setFromName] = useState("");
  const [toName, setToName] = useState("");
  const [results, setResults] = useState(null);

  const handleSearch = () => {
    const fromUser = users.find(u => u.name.toLowerCase() === fromName.toLowerCase());
    const toUser = users.find(u => u.name.toLowerCase() === toName.toLowerCase());

    if (!fromUser || !toUser) {
      setResults(null);
      return;
    }

    const paths = findConnectionPath(users, fromUser.id, toUser.id);
    setResults(paths);
  };

  return (
    <div className="p-4 border rounded-xl bg-white shadow">
      <h3 className="text-lg font-semibold mb-2">🔍 Search Connection</h3>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          placeholder="Kimdan"
          value={fromName}
          onChange={e => setFromName(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input
          type="text"
          placeholder="Kimga"
          value={toName}
          onChange={e => setToName(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button onClick={handleSearch} className="bg-blue-500 text-white px-4 rounded">Top</button>
      </div>

      {results ? (
        <div className="space-y-2">
          {results.map((path, index) => (
            <div key={index} className="text-sm text-green-700">
              Yo'l {index + 1}: {path.map(id => users.find(u => u.id === id)?.name).join(" → ")}
            </div>
          ))}
        </div>
      ) : (
        fromName && toName && <div className="text-sm text-red-600">Aloqa topilmadi</div>
      )}
    </div>
  );
};

export default SearchComponent;
