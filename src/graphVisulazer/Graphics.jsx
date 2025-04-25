import React from "react";
import ForceGraph2D from "react-force-graph-2d";
import { useUsers } from "../context/userContext.jsx";
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
    <div className="h-[500px] border rounded-xl overflow-hidden bg-gray-50 shadow my-4">
      <ForceGraph2D
        graphData={graphData}
        nodeLabel="name"
        nodeAutoColorBy="id"
        linkLabel="type"
        linkDirectionalArrowLength={4}
        linkDirectionalArrowRelPos={1}
        linkColor={link =>
          highlightLinks.some(
            hl =>
              (hl.source === link.source && hl.target === link.target) ||
              (hl.source === link.target && hl.target === link.source)
          )
            ? "red"
            : "#999"
        }
        nodeCanvasObject={(node, ctx, globalScale) => {
          const label = node.name;
          const fontSize = 12 / globalScale;
          ctx.font = `${fontSize}px Sans-Serif`;
          ctx.fillStyle = highlightPath.includes(node.id) ? "red" : "black";
          ctx.beginPath();
          ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI, false);
          ctx.fill();
          ctx.fillText(label, node.x + 6, node.y + 3);
        }}
      />
    </div>
  );
};

export default Graphics;
