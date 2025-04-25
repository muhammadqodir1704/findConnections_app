import React from "react";
import ForceGraph2D from "react-force-graph-2d";
import { useUsers } from "../context/UserContext.jsx";
import { findConnectionPath } from "../utils/findConnectionPath.js";

const Graphics = ({ fromId, toId }) => {
  const { users } = useUsers();

  if (!users || users.length === 0) {
    return <div className="text-center p-4">Loading...</div>;
  }

  const nodes = users.map(user => ({
    id: user.id,
    name: user.name,
  }));

  const links = users.flatMap(user =>
    user.connections
      .filter(connect => users.some(u => u.id === connect.target))
      .map(connect => ({
        source: user.id,
        target: connect.target,
        type: connect.type,
      }))
  );

  const graphData = { nodes, links };

  const allPaths = fromId && toId ? findConnectionPath(users, fromId, toId) : [];
  const highlightPath = allPaths && allPaths.length > 0 ? allPaths[0] : [];

  const highlightLinks = [];
  for (let i = 0; i < highlightPath.length - 1; i++) {
    highlightLinks.push({
      source: highlightPath[i],
      target: highlightPath[i + 1],
    });
  }

  return (
    <div className="h-[500px] border rounded-2xl overflow-hidden bg-white shadow-xl my-6 p-4 transition-all duration-300 hover:shadow-2xl">
    <ForceGraph2D
      graphData={graphData}
      nodeLabel="name"
      nodeAutoColorBy="id"
      linkLabel="type"
      linkDirectionalArrowLength={6}
      linkDirectionalArrowRelPos={1}
      linkColor={link =>
        highlightLinks.some(
          hl =>
            (hl.source === link.source && hl.target === link.target) ||
            (hl.source === link.target && hl.target === link.source)
        )
          ? "red"
          : "#ccc"
      }
      nodeCanvasObject={(node, ctx, globalScale) => {
        const label = node.name;
        const fontSize = 14 / globalScale;
        ctx.font = `bold ${fontSize}px Sans-Serif`;
        ctx.fillStyle = highlightPath.includes(node.id) ? "#e11d48" : "#1f2937"; 
        ctx.beginPath();
        ctx.arc(node.x, node.y, 6, 0, 2 * Math.PI, false);
        ctx.fill();
        ctx.fillText(label, node.x + 8, node.y + 4);
      }}
    />
  </div>
  
  );
};

export default Graphics;
