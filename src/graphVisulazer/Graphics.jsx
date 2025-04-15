import React from "react";
import ForceGraph2D from "react-force-graph-2d";
import { useUsers } from "../context/UserContext.jsx";

const Graphics = () => {
  const { users } = useUsers();

  const graphData = {
    nodes: users.map(user => ({
      id: user.id,
      name: user.name,
    })),
    links: users.flatMap(user =>
      user.connections.map(conn => ({
        source: user.id,
        target: conn.target,
        type: conn.type,
      }))
    )
  };

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
