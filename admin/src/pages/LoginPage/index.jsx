import React, { useEffect, useState } from "react";
import { Form, Input, Button } from "antd";
import { Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import "./style.css";
import axios from "axios";
import { LOGIN } from "../../api";
import { toast } from "react-toastify";

const LoginPage = () => {
  const navigate = useNavigate();

  const [form] = Form.useForm();

  const login = async () => {
    const { username, password } = form.getFieldsValue();
    try {
      const res = await axios.post(LOGIN, {
        email: username,
        password: password,
      });

      if (res.data) {
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        navigate("/admin/category");
      }
    } catch (error) {
      toast.error("Tài khoản hoặc mật khẩu không chính xác!");
    }
  };

  return (
    <>
      <div className="login">
        <Row justify="center">
          <Col span={24}>
            <div
              className="login-title"
              style={{ fontSize: "3rem", padding: "5% 0", color: "white" }}
            >
              <div style={{ paddingTop: "2rem", fontSize: "5rem" }}>
                ĐĂNG NHẬP
              </div>
            </div>
          </Col>
          <Col span={12}>
            <div className="login-form">
              <Form
                form={form}
                name="basic"
                wrapperCol={{
                  span: 12,
                  offset: 6,
                }}
                onFinish={login}
              >
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tài khoản của bạn!",
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Username"
                  />
                </Form.Item>

                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập mật khẩu của bạn!",
                    },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined className="site-form-item-icon" />}
                  />
                </Form.Item>

                <Form.Item
                  wrapperCol={{
                    span: 24,
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    Đăng nhập
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default LoginPage;
