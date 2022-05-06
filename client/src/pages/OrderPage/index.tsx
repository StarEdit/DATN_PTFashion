import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Input, Radio, Row } from "antd";
import Footer from "components/Footer";
import Header from "components/Header";
import { toast } from "react-toastify";
import axios from "axios";
import { CREATE_ORDER, GET_TOTAL } from "api";
import { userInfo } from "types/user.types";
import PayPal from "components/PayPal";
import { formatMoney } from "utils/converMoney";

import "./style.css";

const OrderPage = () => {
  const [total, setTotal] = useState<any>();
  const [totalProduct, setTotalProduct] = useState();
  const [form] = Form.useForm<any>();
  const [checkout, setCheckOut] = useState(false);
  const [data, setData] = useState<any>();

  useEffect(() => {
    getTotal();
  }, []);

  const userInfoFromStorage: userInfo = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") + "")
    : undefined;
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

  const createOrder = async (
    name: String,
    address: String,
    phone: String,
    email: String,
    total: String
  ) => {
    const res = await axios.post(
      CREATE_ORDER,
      {
        userName: name,
        address: address,
        email: email,
        phoneNumber: phone,
        total: total,
      },
      {
        headers: {
          Authorization: `Bearer ${userInfoFromStorage.token}`,
        },
      }
    );

    if (res.data) {
      setTotal(res.data.total);
      setTotalProduct(res.data.totalProduct);
    }
  };

  const handleCreateOrder = () => {
    const { name, address, phone, email } = form.getFieldsValue();
    if (name && address && phone && email && total) {
      createOrder(name, address, phone, email, total);
      toast.success("Đặt hàng thành công");
    } else {
      toast.error("Vui lòng nhập thông tin trước khi đặt hàng ");
    }
  };

  const handlePayOnl = () => {
    const { name, address, phone, email } = form.getFieldsValue();
    if (name && address && phone && email && total) {
      setCheckOut(true);
      setData(form.getFieldsValue());
    } else {
      toast.error("Vui lòng nhập thông tin trước khi đặt hàng ");
    }
  };

  return (
    <>
      <Header />
      <div className="order">
        <div className="order-title">Đặt hàng</div>
        <Form
          form={form}
          name="nest-messages"
          style={{ marginTop: "4rem", textAlign: "left" }}
        >
          <Row gutter={[16, 16]}>
            <Col span={8} offset={4}>
              <Form.Item name={"name"} rules={[{ required: true }]}>
                <Input placeholder={"Họ và Tên"} />
              </Form.Item>
              <Form.Item
                name={"email"}
                rules={[{ required: true, type: "email" }]}
              >
                <Input placeholder="Địa chỉ Email" />
              </Form.Item>
              <Form.Item name={"phone"} rules={[{ required: true }]}>
                <Input placeholder="Số điện thoại" />
              </Form.Item>
              <Form.Item name={"address"} rules={[{ required: true }]}>
                <Input.TextArea placeholder="Địa chỉ" />
              </Form.Item>
              <Form.Item>
                <Button
                  style={{
                    marginTop: "4rem",
                    display: "flex",
                    alignItems: "flex-start",
                  }}
                  type="primary"
                  htmlType="submit"
                  onClick={handleCreateOrder}
                >
                  Đặt hàng ngay
                </Button>
              </Form.Item>
              {checkout ? (
                <PayPal
                  name={data && data.name}
                  address={data && data.address}
                  phone={data && data.phone}
                  email={data && data.email}
                  money={total && total}
                />
              ) : (
                <Button
                  onClick={handlePayOnl}
                  style={{
                    marginTop: "2rem",
                    display: "flex",
                    alignItems: "flex-start",
                  }}
                >
                  Thanh toán Online
                </Button>
              )}
            </Col>
            <Col span={8} offset={2}>
              {/* <Form.Item name={"payment"}>
                <Radio.Group
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <Radio value={1} style={{ marginBottom: "2rem" }}>
                    Thanh toán trực tiếp
                  </Radio>
                  <Radio value={2} style={{ marginBottom: "2rem" }}>
                    Thanh toán qua thẻ ngân hàng
                  </Radio>
                  <Radio value={3} style={{ marginBottom: "2rem" }}>
                    Thanh toán qua PayPal
                  </Radio>
                </Radio.Group>
              </Form.Item> */}
              <Card
                title="Tổng đơn hàng"
                style={{ width: 300, textAlign: "left", fontSize: "1.6rem" }}
              >
                <div style={{ padding: "1rem 0" }}>
                  Tổng sản phẩm: {totalProduct && totalProduct}
                </div>
                <div style={{ padding: "1rem 0" }}>
                  Tổng tiền: {total && formatMoney(total)}
                </div>
              </Card>
            </Col>
          </Row>
        </Form>
      </div>
      <Footer />
    </>
  );
};

export default OrderPage;
