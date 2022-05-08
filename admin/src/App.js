import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Outlet } from "react-router-dom";
import RouterConfig from "./navigation/RouterConfig";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <RouterConfig />
      </BrowserRouter>
      <Outlet />
      <ToastContainer
        hideProgressBar
        position="top-center"
        autoClose={2000}
        closeButton={false}
      />
    </div>
  );
}

export default App;
