export function findConnectionPath(users, fromId, toId) {
  const allPaths = [];
  const visited = new Set();
  
  function dfs(currentId, path) {
    if (currentId === toId) {
      allPaths.push([...path]);
      return;
    }

    const currentUser = users.find(u => u.id === currentId);
    if (!currentUser || !currentUser.connections) return;

    for (const conn of currentUser.connections) {
      if (!visited.has(conn.target)) {
        visited.add(conn.target);
        path.push(conn.target);
        dfs(conn.target, path);
        path.pop();
        visited.delete(conn.target);
      }
    }
  }

  visited.add(fromId);
  dfs(fromId, [fromId]);
  
  return allPaths.length > 0 ? allPaths : null;
}
