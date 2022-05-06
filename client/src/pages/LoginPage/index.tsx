import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";

import bannerLoginImg from "../../assets/images/banner-login.png";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "redux/store";
import { bindActionCreators } from "redux";
import { State } from "redux/reducers";

const LoginPage = () => {
  const formItemLayout = {
    labelCol: { span: 8, offset: 5 },
    wrapperCol: { span: 14, offset: 5 },
  };

  const navigate = useNavigate();

  const [form] = Form.useForm();

  const dispatch = useDispatch();

  const { login } = bindActionCreators(userAction, dispatch);

  const userInfo = useSelector((state: State) => state.userReducer.userInfo);

  useEffect(() => {
    if (userInfo !== undefined && userInfo._id) {
      navigate("/");
    }
  }, [navigate, userInfo]);

  const handleLogin = () => {
    const { email, password } = form.getFieldsValue();
    login(email, password);
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
          <Form {...formItemLayout} style={{ textAlign: "left" }} form={form}>
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
            <Form.Item>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Link className="login-form-forgot" to="/">
                  Forgot password
                </Link>
                <Link className="login-form-forgot" to="/">
                  Vào trang chủ
                </Link>
              </div>
            </Form.Item>

            <Form.Item style={{ textAlign: "center" }}>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                onClick={handleLogin}
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

export default LoginPage;
