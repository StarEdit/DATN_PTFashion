import React from "react";
import { Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";

import bannerRegisterImg from "../../assets/images/banner-login.png";
import "./style.css";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const formItemLayout = {
    labelCol: { span: 8, offset: 5 },
    wrapperCol: { span: 14, offset: 5 },
  };

  return (
    <div className="register">
      <div className="register-left">
        <img
          src={bannerRegisterImg}
          alt="bannerRegister"
          className="register-left-image"
        />
      </div>
      <div className="register-right">
        <div className="register-right-title">
          <div>ĐĂNG KÝ TÀI KHOẢN</div>
        </div>
        <div className="register-right-form">
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
              name="email"
              rules={[{ required: true, message: "Please input your Email!" }]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Email"
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
            <Form.Item
              name="confirmPassword"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Confirm Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="agree" valuePropName="checked" noStyle>
                <Checkbox>Đồng ý với điều khoản và dịch vụ</Checkbox>
              </Form.Item>
            </Form.Item>

            <Form.Item style={{ textAlign: "center" }}>
              <Button
                type="primary"
                htmlType="submit"
                className="register-form-button"
              >
                Đăng Ký
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="register-right-login">
          Bạn đã có tài khoản?
          <Link to="/login"> Đăng nhập ngay</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
