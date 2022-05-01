import React, { useState } from "react";
import { Input, Menu } from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import logo from "../../assets/images/logo.jpg";

import "./style.css";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;

const Header = () => {
  const [active, setActive] = useState(false);

  const handleActive = () => {
    setActive(!active);
  };
  return (
    <div className="header">
      <div className="header-logo">
        <img src={logo} alt="logo" width={78} />
        <div className="header-title">PTFashion</div>
      </div>
      <div className="header-menu">
        <Menu
          mode="horizontal"
          style={{ border: "none", fontSize: "2rem" }}
          selectable={false}
        >
          <Menu.Item key="home" className="active">
            Trang chủ
          </Menu.Item>
          <SubMenu key="SubMenu" title="Sản phẩm">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
          </SubMenu>
          <Menu.Item key="product">Về chúng tôi</Menu.Item>
        </Menu>
      </div>
      <div className="header-user">
        <div className="header-user-search">
          <Input
            bordered={false}
            name="search"
            placeholder="Tìm kiếm"
            style={{ border: "none", borderBottom: "1px solid black" }}
          />
          <SearchOutlined />
        </div>

        <div className="header-user-action">
          <div className="action-title" onClick={() => handleActive()}>
            <UserOutlined /> Tài khoản
          </div>
          <ul className={active ? "action-list active" : "action-list"}>
            <li className="action-list-item">Thông tin</li>
            <li className="action-list-item">Thông tin</li>
            <li className="action-list-item">Thông tin</li>
          </ul>
        </div>
        <div className="header-user-cart">
          <Link to="/cart">
            <ShoppingCartOutlined />
          </Link>
          <div className="header-user-cart-count">1</div>
        </div>
      </div>
    </div>
  );
};

export default Header;
