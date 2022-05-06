import React from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { Form, Input, Button } from "antd";
import axios from "axios";
import { userInfo } from "types/user.types";
import { CHANGE_PASS } from "api";
import { toast } from "react-toastify";

const ChangePassword = () => {
  const token = localStorage.getItem("token");

  const onFinish = (values: any) => {
    const { oldPass, newPass, confirm } = values;
    changePass(oldPass, newPass, confirm);
  };

  const changePass = async (
    oldPassword: any,
    newPassword: any,
    confirmPassword: any
  ) => {
    const res = await axios.put(
      CHANGE_PASS,
      {
        oldPassword: oldPassword,
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.data) {
      toast.success(res.data.message);
    }
  };

  return (
    <>
      <Header />
      <hr />
      <div
        className="change-password"
        style={{ height: "40vh", marginTop: "10rem" }}
      >
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 8 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="Mật khẩu cũ"
            name="oldPass"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu cũ" }]}
            hasFeedback
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Mật khẩu mới"
            name="newPass"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu mới!" }]}
            hasFeedback
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="confirm"
            label="Xác nhận mật khẩu"
            dependencies={["newPass"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Vui lòng xác nhận mật khẩu của bạn",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPass") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Mật khẩu không khớp"));
                },
              }),
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 8 }}>
            <Button type="primary" htmlType="submit">
              Xác nhận
            </Button>
          </Form.Item>
        </Form>
      </div>

      <Footer />
    </>
  );
};

export default ChangePassword;
