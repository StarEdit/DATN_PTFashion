import { GET_ORDER } from "api";
import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import axios from "axios";
import { userInfo } from "types/user.types";
import { Table, Row, Col } from "antd";
import { formatMoney } from "utils/converMoney";

const MyOrder = () => {
  const userInfoFromStorage: userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") + "")
    : undefined;
  const [orders, setOrders] = useState();
  useEffect(() => {
    getOrder();
  }, []);
  const getOrder = async () => {
    const res = await axios.get(GET_ORDER, {
      headers: {
        Authorization: `Bearer ${userInfoFromStorage.token}`,
      },
    });

    if (res.data) {
      setOrders(res.data);
    }
  };

  console.log(orders);
  const columns = [
    {
      title: "Tên",
      dataIndex: "userName",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
    },
    {
      title: "Điện thoại",
      dataIndex: "phoneNumber",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (status: any) => {
        switch (status) {
          case 0:
            return "Đang chờ";
          case 1:
            return "Đang giao hàng";
          case 2:
            return "Đã thanh toán";
          default:
            return "Đang chờ";
        }
      },
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Sản phẩm",
      dataIndex: "products",
      render: (products: any) =>
        products
          .map(
            (product: any) => `${product.productName}:${product.quantity} đôi`
          )
          .join(),
      key: "products",
    },
    {
      title: "Tổng",
      dataIndex: "total",
      render: (total: any) => {
        return formatMoney(total);
      },
    },
  ];
  return (
    <>
      <Header />
      <div>
        <Row>
          <Col span={24}>
            <Table pagination={false} columns={columns} dataSource={orders} />
          </Col>
        </Row>
      </div>
      <Footer />
    </>
  );
};

export default MyOrder;
