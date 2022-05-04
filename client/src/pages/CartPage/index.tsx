import React, { useEffect, useState } from "react";
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
import { ProductInCart } from "types/cart.types";
import axios from "axios";
import {
  ADD_CART,
  DELETE_PRODUCT,
  GET_TOTAL,
  MINUS_PRODUCT,
  PLUS_PRODUCT,
} from "api";
import { userInfo } from "types/user.types";

const CartPage = () => {
  const [data, setData] = useState();
  const [total, setTotal] = useState();
  const [totalProduct, setTotalProduct] = useState();

  const userInfoFromStorage: userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") + "")
    : undefined;

  useEffect(() => {
    getCart();
    getTotal();
  }, []);

  const getCart = async () => {
    const res = await axios.get(ADD_CART, {
      headers: {
        Authorization: `Bearer ${userInfoFromStorage.token}`,
      },
    });

    if (res.data) {
      setData(res.data.products);
    }
  };

  const plusProduct = async (id: String) => {
    const res = await axios.patch(
      `${PLUS_PRODUCT}/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${userInfoFromStorage.token}`,
        },
      }
    );

    if (res.data) {
      getCart();
      getTotal();
    }
  };

  const minusProduct = async (id: String) => {
    const res = await axios.patch(
      `${MINUS_PRODUCT}/${id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${userInfoFromStorage.token}`,
        },
      }
    );

    if (res.data) {
      getCart();
      getTotal();
    }
  };

  const deleteProduct = async (id: String) => {
    const res = await axios.delete(`${DELETE_PRODUCT}/${id}`, {
      headers: {
        Authorization: `Bearer ${userInfoFromStorage.token}`,
      },
    });

    if (res.data) {
      getCart();
      getTotal();
    }
  };

  const getTotal = async () => {
    const res = await axios.get(GET_TOTAL, {
      headers: {
        Authorization: `Bearer ${userInfoFromStorage.token}`,
      },
    });

    if (res.data) {
      setTotal(res.data.total);
      setTotalProduct(res.data.totalProduct);
    }
  };

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
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
      title: "Giảm giá",
      dataIndex: "percentSale",
    },
    {
      title: "Giá",
      dataIndex: "price",
    },
    {
      title: "Giảm",
      render: () => {
        return (
          <div className="cart-qty-action" style={{ textAlign: "center" }}>
            <MinusCircleOutlined />
          </div>
        );
      },
      onCell: (record: any) => {
        return {
          onClick: () => {
            minusProduct(record.productId);
          },
        };
      },
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
    },

    {
      title: "Tăng",
      render: () => {
        return (
          <div className="cart-qty-action" style={{ textAlign: "center" }}>
            <PlusCircleOutlined />
          </div>
        );
      },
      onCell: (record: any) => {
        return {
          onClick: () => {
            plusProduct(record.productId);
          },
        };
      },
    },
    {
      title: "Xóa",
      render: () => (
        <div style={{ textAlign: "center" }}>
          <DeleteOutlined />
        </div>
      ),
      onCell: (record: any) => {
        return {
          onClick: () => {
            deleteProduct(record.productId);
          },
        };
      },
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
              <div style={{ padding: "1rem 0" }}>
                Tổng sản phẩm: {totalProduct && totalProduct}
              </div>
              <div style={{ padding: "1rem 0" }}>
                Tổng tiền: {total && total}
              </div>
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
