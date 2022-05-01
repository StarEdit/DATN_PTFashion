import React from "react";
import { Button, Col, Form, Input, Radio, Row } from "antd";
import Footer from "components/Footer";
import Header from "components/Header";

import "./style.css";

const OrderPage = () => {
  return (
    <>
      <Header />
      <div className="order">
        <div className="order-title">THANH TOÁN</div>
        <Form
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
              <Form.Item
                name={"phone"}
                rules={[{ required: true, type: "number" }]}
              >
                <Input placeholder="Số điện thoại" />
              </Form.Item>
              <Form.Item name={"address"} rules={[{ required: true }]}>
                <Input.TextArea placeholder="Địa chỉ" />
              </Form.Item>
            </Col>
            <Col span={8} offset={2}>
              <Form.Item name={"payment"}>
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
                >
                  Đặt hàng ngay
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
      <Footer />
    </>
  );
};

export default OrderPage;
