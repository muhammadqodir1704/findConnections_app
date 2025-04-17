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
      const targetId = conn.target; 
      
      if (!visited.has(targetId)) {
        visited.add(targetId);
        path.push(targetId);
        dfs(targetId, path);
        path.pop();
        visited.delete(targetId);
      }
    }
  }

  visited.add(fromId);
  dfs(fromId, [fromId]);
  
  return allPaths.length > 0 ? allPaths : null;
}
