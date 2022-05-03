import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

import bannerRegisterImg from "../../assets/images/banner-login.png";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { registerAction } from "redux/store";
import { State } from "redux/reducers";

const RegisterPage = () => {
  const formItemLayout = {
    labelCol: { span: 8, offset: 5 },
    wrapperCol: { span: 14, offset: 5 },
  };

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const { register } = bindActionCreators(registerAction, dispatch);
  const message = useSelector((state: State) => state.registerReducer.message);

  const [form] = Form.useForm();

  useEffect(() => {
    if (message === "success") {
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    }
  }, [message]);

  const handleSubmit = async () => {
    console.log(form.getFieldsValue());
    const { email, password, confirmPassword } = form.getFieldsValue();
    register(email, password);
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
          <Form {...formItemLayout} style={{ textAlign: "left" }} form={form}>
            <Form.Item
              name="email"
              hasFeedback
              rules={[{ required: true, message: "Please input your Email!" }]}
            >
              <Input
                prefix={<MailOutlined className="site-form-item-icon" />}
                placeholder="Email"
              />
            </Form.Item>
            <Form.Item
              name="password"
              hasFeedback
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
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true, message: "Please input your Password!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "The two passwords that you entered do not match!"
                      )
                    );
                  },
                }),
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Confirm Password"
              />
            </Form.Item>

            <Form.Item style={{ textAlign: "center" }}>
              <Button
                type="primary"
                htmlType="submit"
                className="register-form-button"
                onClick={handleSubmit}
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
