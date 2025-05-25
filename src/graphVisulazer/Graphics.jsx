import React from "react";
import ForceGraph2D from "react-force-graph-2d";
import { useUsers } from "../context/UserContext.jsx";
import { findConnectionPath } from "../utils/findConnectionPath.js";
import { BsHandIndex } from "react-icons/bs";

const Graphics = ({ fromId, toId }) => {
  const { users } = useUsers();
  console.log(users);

  if (!users || users.length === 0) {
    return <div className="text-center p-4">Loading...</div>;
  }
  const colors = [
    "#f87171",
    "#60a5fa",
    "#34d399",
    "#fbbf24",
    "#a78bfa",
    "#f472b6",
  ];

  const nodes = users.map((user ,index) => ({
    id: user.id,
    name: user.name,
    color: colors[index % colors.length],
  }));

  const links = users.flatMap((user) =>
    user.connections
      .filter((connect) => users.some((u) => u.id === connect.target))
      .map((connect) => ({
        source: user.id,
        target: connect.target,
        type: connect.type,
      }))
  );

  const graphData = { nodes, links };

  const allPaths =
    fromId && toId ? findConnectionPath(users, fromId, toId) : [];
  const highlightPath = allPaths && allPaths.length > 0 ? allPaths[0] : [];

  const highlightLinks = [];
  for (let i = 0; i < highlightPath.length - 1; i++) {
    highlightLinks.push({
      source: highlightPath[i],
      target: highlightPath[i + 1],
    });
  }
  return (
    <div className="h-[500px] border rounded-2xl overflow-hidden bg-white shadow-xl  transition-all duration-300 hover:shadow-2xl">
      <ForceGraph2D
        graphData={graphData}
        nodeLabel="name"
        nodeAutoColorBy="id"
        linkLabel="type"
        linkDirectionalArrowLength={7}
        linkDirectionalArrowRelPos={1}
        linkColor={(link) =>
          highlightLinks.some(
            (hl) =>
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
          ctx.textAlign = "left";
          ctx.textBaseline = "middle";

          ctx.fillStyle = node.color; 

          ctx.beginPath();
          ctx.arc(node.x, node.y, 7, 0, 2 * Math.PI, false);
          ctx.fill();

          ctx.fillText(label, node.x + 10, node.y);
        }}
      />
    </div>
  );
};

export default Graphics;
