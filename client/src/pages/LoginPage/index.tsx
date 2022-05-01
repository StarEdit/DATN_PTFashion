import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import bannerLoginImg from "../../assets/images/banner-login.png";
import "./style.css";
import { Link } from "react-router-dom";

const loginPage = () => {
  const formItemLayout = {
    labelCol: { span: 8, offset: 5 },
    wrapperCol: { span: 14, offset: 5 },
  };

  return (
    <div className="login">
      <div className="login-left">
        <img
          src={bannerLoginImg}
          alt="bannerLogin"
          className="login-left-image"
        />
      </div>
      <div className="login-right">
        <div className="login-right-title">
          <span>Chào mừng trở lại</span>
          <div>ĐĂNG NHẬP</div>
        </div>
        <div className="login-right-form">
          <Form {...formItemLayout} style={{ textAlign: "left" }}>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
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
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>

              <Link
                className="login-form-forgot"
                to="/"
                style={{ paddingLeft: "12.2rem" }}
              >
                Forgot password
              </Link>
            </Form.Item>

            <Form.Item style={{ textAlign: "center" }}>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
              >
                Đăng Nhập
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="login-right-register">
          Bạn chưa có tài khoản?
          <Link to="/register"> Đăng ký ngay</Link>
        </div>
      </div>
    </div>
  );
};

export default loginPage;
