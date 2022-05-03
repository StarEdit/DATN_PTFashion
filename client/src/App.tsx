import "./App.css";
import { BrowserRouter, Outlet } from "react-router-dom";
import RouterConfig from "./navigation/RouterConfig";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <RouterConfig />
      </BrowserRouter>
      <Outlet />
    </div>
  );
}

export default App;
