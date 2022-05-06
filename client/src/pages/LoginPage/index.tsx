import React, { useEffect, useState } from "react";
import { Form, Input, Button, Modal } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import bannerLoginImg from "../../assets/images/banner-login.png";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userAction } from "redux/store";
import { bindActionCreators } from "redux";
import { State } from "redux/reducers";
import axios from "axios";
import { FORGOT_PASS } from "api";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [email, setEmail] = useState<string>();
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

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleForgot = async () => {
    const res = await axios.post(FORGOT_PASS, { email: email });

    if (res.data) {
      toast.success("Vui lòng kiểm tra email của bạn để lấy mật khẩu");
    }
  };

  console.log("aaa", email);

  return (
    <>
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
                rules={[
                  { required: true, message: "Please input your Email!" },
                ]}
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
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div
                    className="login-form-forgot"
                    onClick={showModal}
                    style={{ cursor: "pointer", color: "#1890ff" }}
                  >
                    Forgot password
                  </div>
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
      <Modal
        title="Quên mật khẩu"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Input
          size="large"
          placeholder="Nhập email của bạn"
          prefix={<MailOutlined />}
          type="email"
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
        />
        <div
          style={{
            marginTop: "2rem",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button type="primary" onClick={handleForgot}>
            Xác nhận
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default LoginPage;
