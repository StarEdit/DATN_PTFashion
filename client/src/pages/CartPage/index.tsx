import React from "react";
import { Table, Card, Button, Row, Col } from "antd";
import {
  DeleteOutlined,
  MinusCircleOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import Header from "components/Header";
import Footer from "components/Footer";

import "./style.css";
import { Link } from "react-router-dom";

const CartPage = () => {
  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
    },
    {
      title: "Loại sản phẩm",
      dataIndex: "category",
    },
    {
      title: "Màu sắc",
      dataIndex: "color",
    },
    {
      title: "Kích cỡ",
      dataIndex: "size",
    },
    {
      title: "Giá sản phẩm",
      dataIndex: "price",
    },
    {
      title: "Số lượng",
      width: 200,
      render: (quantity: number) => {
        return (
          <div className="cart-qty-action">
            <a>
              <MinusCircleOutlined />
            </a>
            <div>
              <span>1</span>
            </div>
            <a>
              <PlusCircleOutlined />
            </a>
          </div>
        );
      },
    },
    {
      title: "Xóa sản phẩm",
      width: 100,
      render: () => (
        <div style={{ textAlign: "center" }}>
          <DeleteOutlined />
        </div>
      ),
    },
  ];

  const data = [
    {
      key: "1",
      name: "John Brown",
      category: 98,
      color: 60,
      size: 70,
      price: 699000,
    },
    {
      key: "2",
      name: "Jim Green",
      category: 98,
      color: 66,
      size: 89,
      price: 699000,
    },
    {
      key: "3",
      name: "Joe Black",
      category: 98,
      color: 90,
      size: 70,
      price: 699000,
    },
    {
      key: "4",
      name: "Jim Red",
      category: 88,
      color: 99,
      size: 89,
      price: 699000,
    },
  ];

  return (
    <>
      <Header />
      <div className="cart">
        <Row gutter={[16, 16]}>
          <Col span={18}>
            <Table pagination={false} columns={columns} dataSource={data} />
          </Col>
          <Col span={6}>
            <Card
              title="Tổng đơn hàng"
              style={{ width: 300, textAlign: "left", fontSize: "1.6rem" }}
            >
              <div style={{ padding: "1rem 0" }}>Tổng sản phẩm: </div>
              <div style={{ padding: "1rem 0" }}>Tổng tiền: </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  padding: "2rem 0",
                }}
              >
                <Link to="/order">
                  <Button type="primary">Mua ngay </Button>
                </Link>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;
