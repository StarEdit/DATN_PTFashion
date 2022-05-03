import React, { useEffect, useState } from "react";
import { Input, Menu } from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import logo from "../../assets/images/logo.jpg";

import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { SearchAction, userAction } from "redux/store";
import { State } from "redux/reducers";

const Header = () => {
  const [active, setActive] = useState(false);
  const [wordEntered, setWordEntered] = useState<any>();

  const handleActive = () => {
    setActive(!active);
  };

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { logout } = bindActionCreators(userAction, dispatch);
  const { search } = bindActionCreators(SearchAction, dispatch);

  const userInfo = useSelector((state: State) => state.userReducer.userInfo);

  useEffect(() => {
    if (userInfo?.token === "") {
      navigate("/login");
    }
  }, [userInfo, navigate]);

  const handleLogout = () => {
    logout();
  };

  const searchProduct = async () => {
    if (wordEntered !== "") {
      search(wordEntered);
      navigate(`/search?name=${wordEntered}`);
      setWordEntered("");
    }
    console.log(wordEntered);
  };

  return (
    <div className="header">
      <div className="header-logo">
        <Link to="/">
          <img src={logo} alt="logo" width={78} />
        </Link>
        <div className="header-title">PTFashion</div>
      </div>
      <div className="header-menu">
        <Menu
          mode="horizontal"
          style={{ border: "none", fontSize: "2rem" }}
          selectable={false}
        >
          <Menu.Item key="home" className="active">
            <Link to="/"> Trang chủ</Link>
          </Menu.Item>

          <Menu.Item key="product">
            <Link to="/product-page">Sản phẩm</Link>
          </Menu.Item>
          <Menu.Item key="about">
            <Link to="/about-us">Về chúng tôi</Link>
          </Menu.Item>
        </Menu>
      </div>
      <div className="header-user">
        <div className="header-user-search">
          <Input
            bordered={false}
            name="search"
            placeholder="Tìm kiếm"
            style={{ border: "none", borderBottom: "1px solid black" }}
            value={wordEntered}
            onChange={(e) => setWordEntered(e.target.value)}
            onPressEnter={searchProduct}
          />
          <SearchOutlined />
        </div>

        <div className="header-user-action">
          <div className="action-title" onClick={() => handleActive()}>
            <UserOutlined /> Tài khoản
          </div>
          <ul className={active ? "action-list active" : "action-list"}>
            <li className="action-list-item">Thông tin cá nhân</li>
            <li className="action-list-item">Cập nhật thông tin</li>
            <li className="action-list-item" onClick={handleLogout}>
              Đăng xuất
            </li>
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
