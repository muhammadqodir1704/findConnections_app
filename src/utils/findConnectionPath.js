// Breadth-First Search to find connection path
export const findConnectionPath = (users, startId, targetId) => {
    const queue = [[startId]];
    const visited = new Set();
  
    while (queue.length > 0) {
      const path = queue.shift();
      const current = path[path.length - 1];
      if (current === targetId) return path;
  
      if (!visited.has(current)) {
        visited.add(current);
        const user = users.find(u => u.id === current);
        if (user) {
          user.connections.forEach(c => {
            if (!visited.has(c.target)) {
              queue.push([...path, c.target]);
            }
          });
        }
      }
    }
  
    return null; // yo‘l topilmadi
  };
  