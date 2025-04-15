import React, { useState } from "react";
import { useUsers } from "./UserContext";
import { findConnectionPath } from "./utils/findConnectionPath";

const SearchComponent = () => {
  const { users } = useUsers();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [result, setResult] = useState(null);

  const handleSearch = () => {
    const path = findConnectionPath(users, Number(from), Number(to));
    setResult(path);
  };

  return (
    <div className="p-4 border rounded-xl bg-white shadow">
      <h3 className="text-lg font-semibold mb-2">🔍 Search Connection</h3>
      <div className="flex gap-2 mb-2">
        <select value={from} onChange={e => setFrom(e.target.value)} className="border p-2 rounded">
          <option value="">Kimdan</option>
          {users.map(u => (
            <option key={u.id} value={u.id}>{u.name}</option>
          ))}
        </select>
        <select value={to} onChange={e => setTo(e.target.value)} className="border p-2 rounded">
          <option value="">Kimga</option>
          {users.map(u => (
            <option key={u.id} value={u.id}>{u.name}</option>
          ))}
        </select>
        <button onClick={handleSearch} className="bg-blue-500 text-white px-4 rounded">Top</button>
      </div>

      {result ? (
        <div className="text-sm text-green-700">
          Yo‘l: {result.map(id => users.find(u => u.id === id)?.name).join(" → ")}
        </div>
      ) : (
        from && to && <div className="text-sm text-red-600">Aloqa topilmadi</div>
      )}
    </div>
  );
};

export default SearchComponent;
