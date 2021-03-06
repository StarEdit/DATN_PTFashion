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
import { GET_TOTAL } from "api";
import axios from "axios";
import { userInfo } from "types/user.types";
import { toast } from "react-toastify";

const Header = () => {
  const [active, setActive] = useState(false);
  const [wordEntered, setWordEntered] = useState<any>();
  const [totalProduct, setTotalProduct] = useState();

  const handleActive = () => {
    setActive(!active);
  };

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { logout } = bindActionCreators(userAction, dispatch);
  const { search } = bindActionCreators(SearchAction, dispatch);

  const userInfoFromStorage: userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") + "")
    : undefined;

  useEffect(() => {
    if (userInfoFromStorage) {
      getTotal();
    }
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
    setActive(false);
  };

  const searchProduct = async () => {
    if (wordEntered !== "") {
      search(wordEntered);
      navigate(`/search?name=${wordEntered}`);
      setWordEntered("");
    }
  };

  const getTotal = async () => {
    const res = await axios.get(GET_TOTAL, {
      headers: {
        Authorization: `Bearer ${userInfoFromStorage.token}`,
      },
    });

    if (res.data) {
      setTotalProduct(res.data.totalProduct);
    }
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
            <Link to="/"> Trang ch???</Link>
          </Menu.Item>

          <Menu.Item key="product">
            <Link to="/product-page">S???n ph???m</Link>
          </Menu.Item>
          <Menu.Item key="about">
            <Link to="/about-us">V??? ch??ng t??i</Link>
          </Menu.Item>
        </Menu>
      </div>
      <div className="header-user">
        <div className="header-user-search">
          <Input
            bordered={false}
            name="search"
            placeholder="T??m ki???m"
            style={{ border: "none", borderBottom: "1px solid black" }}
            value={wordEntered}
            onChange={(e) => setWordEntered(e.target.value)}
            onPressEnter={searchProduct}
          />
          <SearchOutlined />
        </div>

        <div className="header-user-action">
          <div className="action-title" onClick={() => handleActive()}>
            <UserOutlined />{" "}
            {userInfoFromStorage ? userInfoFromStorage.name : "T??i kho???n"}
          </div>
          <ul className={active ? "action-list active" : "action-list"}>
            <li className="action-list-item">
              <Link to="/login" style={{ color: "black" }}>
                ????ng nh???p
              </Link>
            </li>
            {userInfoFromStorage ? (
              <>
                <hr />
                <li className="action-list-item">
                  <Link to="/user/change-password" style={{ color: "black" }}>
                    ?????i m???t kh???u
                  </Link>
                </li>
                <hr />
                <li className="action-list-item">
                  <Link to="/user/my-order" style={{ color: "black" }}>
                    ????n h??ng c???a t??i
                  </Link>
                </li>
              </>
            ) : (
              ""
            )}

            <hr />
            <li className="action-list-item" onClick={handleLogout}>
              ????ng xu???t
            </li>
          </ul>
        </div>
        <div className="header-user-cart">
          {userInfoFromStorage ? (
            <Link to="/cart">
              <ShoppingCartOutlined />
            </Link>
          ) : (
            <Link to="/">
              <ShoppingCartOutlined
                onClick={() => toast.info("????ng nh???p ????? xem gi??? h??ng")}
              />
            </Link>
          )}

          <div className="header-user-cart-count">
            {totalProduct ? totalProduct : 0}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
