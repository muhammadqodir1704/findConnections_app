import React from "react";
import ForceGraph2D from "react-force-graph-2d";
import { useUsers } from "../context/UserContext.jsx";

const Graphics = () => {
  const { users } = useUsers();

  if (!users || users.length === 0) {
    return <div className="text-center p-4">Loading...</div>;
  }

  // Node'lar (foydalanuvchilar)
  const nodes = users.map(user => ({
    id: user.id,
    name: user.name,
  }));

  // Link'lar (aloqalar)
  const links = users.flatMap(user =>
    user.connections
      .filter(conn => users.some(u => u.id === conn.target)) // faqat mavjud target
      .map(conn => ({
        source: user.id,
        target: conn.target,
        type: conn.type,
      }))
  );

  const graphData = { nodes, links };

  return (
    <div className="h-[500px] border rounded-xl overflow-hidden bg-gray-50 shadow my-4">
      <ForceGraph2D
        graphData={graphData}
        nodeLabel="name"
        nodeAutoColorBy="id"
        linkLabel="type"
        linkDirectionalArrowLength={4}
        linkDirectionalArrowRelPos={1}
      />
    </div>
  );
};

export default Graphics;
