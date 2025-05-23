import React from "react";
import { UserProvider } from "./context/UserContext.jsx";
import Graphics from "./graphVisulazer/Graphics";
import SearchComponent from "./searchComponent/SearchComponent";

const App = () => {
  return (
    <UserProvider>
      <div className="max-w-5xl mx-auto p-6 space-y-6">
        <SearchComponent />
        <Graphics />
      </div>
    </UserProvider>
  );
};

export default App;
