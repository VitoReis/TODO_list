import "./App.css";
import { useState } from "react"
// ROUTES
import { Outlet } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <Outlet />
    </div>
  );
}

export default App;
