import "./App.css";
import { BrowserRouter, Outlet } from "react-router-dom";
import RouterConfig from "./navigation/RouterConfig";
import { BackTop } from "antd";
import { UpOutlined } from "@ant-design/icons";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <RouterConfig />
      </BrowserRouter>
      <Outlet />
      <BackTop>
        <div
          style={{
            height: 40,
            width: 40,
            lineHeight: "40px",
            borderRadius: 4,
            backgroundColor: "#1088e9",
            color: "#fff",
            textAlign: "center",
            fontSize: 14,
          }}
        >
          <UpOutlined />
        </div>
      </BackTop>
    </div>
  );
}

export default App;
