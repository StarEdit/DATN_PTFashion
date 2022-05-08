import React, { useState } from "react";
import { Row, Col } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { LOGOUT } from "../../api";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./style.css";

const Header = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(!show);
  };

  const navigate = useNavigate();

  const logout = async () => {
    const res = await axios.post(LOGOUT);

    if (res.data) {
      localStorage.clear();
      navigate("/admin/login");
    }
  };

  const userInfo = localStorage.getItem("userInfo");
  return (
    <Row
      align="middle"
      style={{
        backgroundColor: "#001628",
        position: "fixed",
        right: "0",
        left: "16.7%",
        zIndex: "10",
        height: "10vh",
      }}
    >
      <Col span={20}>
        <div style={{ fontSize: "3rem", fontWeight: "700", color: "white" }}>
          QUẢN LÝ PTFashion
        </div>
      </Col>
      <Col span={4}>
        <div className="header-user" onClick={handleShow}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "1.8rem",
              color: "white",
            }}
          >
            <UserOutlined />
            <div style={{ paddingLeft: "1rem" }}>
              {userInfo ? JSON.parse(userInfo).name : "Tài khoản"}
            </div>
          </div>
          <div
            className="header-user-action"
            style={{ visibility: show ? "visible" : "" }}
          >
            {userInfo ? (
              <div style={{ color: "white", cursor: "no-drop" }}>Đăng nhập</div>
            ) : (
              <Link to="/admin/login">
                <div style={{ color: "white" }}>Đăng nhập</div>
              </Link>
            )}

            <div onClick={logout} style={{ cursor: "pointer" }}>
              Đăng xuất
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Header;
