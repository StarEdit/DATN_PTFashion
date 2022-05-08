import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Row, Col } from "antd";
import {
  UserSwitchOutlined,
  LineChartOutlined,
  MenuOutlined,
  DingtalkOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import logo from "../../assets/images/logo.jpg";

function getItem(label, key, icon, route) {
  return {
    label,
    key,
    icon,
    route,
  };
}

const items = [
  getItem(
    "Thống kê",
    "1",
    <LineChartOutlined style={{ fontSize: "2rem", marginRight: "1rem" }} />,
    ""
  ),
  getItem(
    "Danh mục",
    "2",
    <MenuOutlined style={{ fontSize: "2rem", marginRight: "1rem" }} />,
    "/category"
  ),
  getItem(
    "Sản phẩm",
    "3",
    <DingtalkOutlined style={{ fontSize: "2rem", marginRight: "1rem" }} />,
    "/product"
  ),
  getItem(
    "Đơn hàng",
    "4",
    <DollarOutlined style={{ fontSize: "2rem", marginRight: "1rem" }} />,
    "/order"
  ),
  getItem(
    "Tài khoản",
    "5",
    <UserSwitchOutlined style={{ fontSize: "2rem", marginRight: "1rem" }} />,
    "/account"
  ),
];

const LeftSidebar = () => {
  const navigate = useNavigate();

  const navigation = (route) => {
    navigate(`/admin${route}`);
  };

  return (
    <Row style={{ position: "fixed", left: "0", right: "83.3%", zIndex: "10" }}>
      <Col span={24} style={{ height: "10vh" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img src={logo} alt="logo" width={78} />
          <span style={{ fontSize: "2rem", fontWeight: "700" }}>PTFashion</span>
        </div>
      </Col>
      <Col span={24}>
        <Menu
          mode="inline"
          theme="dark"
          style={{
            height: "90vh",
            fontSize: "2rem",
            fontWeight: "700",
            paddingTop: "2rem",
          }}
          items={items}
          onSelect={(selectItem) => navigation(selectItem.item.props.route)}
        />
      </Col>
    </Row>
  );
};

export default LeftSidebar;
