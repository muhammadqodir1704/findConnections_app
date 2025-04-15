import React, { useEffect, useState } from "react";
import { fetchUsers } from "../service/api";

const Graph = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers()
      .then((res) => setUsers(res.data))
      .catch((err) => console.error("Xatolik:", err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Odamlar Aloqalari</h2>
      <div className="space-y-4">
        {users.map((user) => (
          <div key={user.id} className="p-4 rounded-xl bg-white shadow">
            <h3 className="text-lg font-semibold text-indigo-600">{user.name}</h3>
            <p className="text-sm text-gray-500 mb-2">{user.occupation}</p>
            <div className="ml-4">
              <strong>Aloqalar:</strong>
              <ul className="list-disc list-inside text-sm">
                {user.connections.map((conn, i) => {
                  const target = users.find((u) => u.id === conn.target);
                  return (
                    <li key={i}>
                      {conn.type} → {target ? target.name : "Noma'lum"}
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Graph;
