import React, { useState } from "react";
import { useUsers } from "../context/UserContext.jsx";
import { findConnectionPath } from "../utils/findConnectionPath";

const SearchComponent = () => {
  const { users } = useUsers();
  const [fromName, setFromName] = useState("");
  const [toName, setToName] = useState("");
  const [result, setResult] = useState(null);

  const handleSearch = () => {
    const fromUser = users.find(u => u.name.toLowerCase() === fromName.toLowerCase());
    const toUser = users.find(u => u.name.toLowerCase() === toName.toLowerCase());

    if (!fromUser || !toUser) {
      setResult(null);
      return;
    }

    const path = findConnectionPath(users, fromUser.id, toUser.id);
    setResult(path);
  };

  return (
    <div className="p-4 border rounded-xl bg-white shadow">
      <h3 className="text-lg font-semibold mb-2">🔍 Aloqani qidirish</h3>
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
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white px-4 rounded"
        >
          Top
        </button>
      </div>

      {result ? (
        <div className="text-sm text-green-700">
          Yo‘l: {result.map(id => users.find(u => u.id === id)?.name).join(" → ")}
        </div>
      ) : (
        fromName && toName && <div className="text-sm text-red-600">Aloqa topilmadi</div>
      )}
    </div>
  );
};

export default SearchComponent;
