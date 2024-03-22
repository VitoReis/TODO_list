import "./App.css";
// ROUTES
import { Outlet } from "react-router-dom";


function App() {
  return (
    <div className="App">
      <header>
        <h1>TODO List</h1>
      </header>
      
      <Outlet />
      
      <footer>
        <h5>Vitor Silva Reis</h5>
      </footer>
    </div>
  );
}

export default App;
