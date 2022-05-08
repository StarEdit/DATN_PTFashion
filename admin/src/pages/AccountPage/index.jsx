import React, { useEffect, useState } from "react";
import {
  Row,
  Col,
  Table,
  Tooltip,
  Button,
  Modal,
  Form,
  Input,
  Radio,
} from "antd";
import Header from "../../components/Header";
import LeftSidebar from "../../components/LeftSidebar";
import axios from "axios";
import { GET_ACCOUNT, ADD_ACCOUNT } from "../../api";
import { FormOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

const AccountPage = () => {
  const userInfo = localStorage.getItem("userInfo");
  const token = JSON.parse(userInfo).token;
  const [accounts, setAccounts] = useState([]);
  const [isModalVisibleAdd, setIsModalVisibleAdd] = useState(false);
  const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);
  const [isModalVisibleDelete, setIsModalVisibleDelete] = useState(false);
  const { accountId } = useParams();
  const [formEdit] = Form.useForm();

  const navigate = useNavigate();

  const showModal = () => {
    setIsModalVisibleAdd(true);
  };
  const handleOk = () => {
    setIsModalVisibleAdd(false);
  };
  const handleCancel = () => {
    setIsModalVisibleAdd(false);
  };

  const showModalEdit = () => {
    setIsModalVisibleEdit(true);
  };
  const handleOkEdit = () => {
    setIsModalVisibleEdit(false);
  };
  const handleCancelEdit = () => {
    setIsModalVisibleEdit(false);
    navigate("/admin/account");
  };

  const showModalDelete = () => {
    setIsModalVisibleDelete(true);
  };
  const handleOkDelete = () => {
    setIsModalVisibleDelete(false);
  };
  const handleCancelDelete = () => {
    setIsModalVisibleDelete(false);
    navigate("/admin/account");
  };

  useEffect(() => {
    callbackAccount();
  }, []);

  const callbackAccount = async () => {
    const res = await axios.get(GET_ACCOUNT, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.data) {
      setAccounts(res.data.user);
    }
  };

  const deleteAccount = async (id) => {
    try {
      const res = await axios.delete(`${ADD_ACCOUNT}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res) {
        toast.success("Xóa thành công");
        callbackAccount();
        navigate("/admin/account");
        handleCancelDelete();
      }
    } catch (error) {
      toast.error("Xóa không thành công");
      navigate("/admin/account");
      handleCancelDelete();
    }
  };

  const addAccount = async (value) => {
    try {
      const res = await axios.post(
        ADD_ACCOUNT,
        {
          full_name: value.userName,
          email: value.email,
          password: value.password,
          isAdmin: value.level,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data) {
        toast.success("Thêm thành công");
        callbackAccount();
        handleCancel();
      }
    } catch (error) {
      toast.error("Thêm không thành công");
      handleCancel();
    }
  };

  const editAccount = async (value) => {
    try {
      const res = await axios.put(
        `${ADD_ACCOUNT}/${accountId}`,
        {
          full_name: value.userName,
          email: value.email,
          isAdmin: value.level,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data) {
        toast.success("Sửa thành công");
        callbackAccount();
        handleCancelEdit();
        navigate("/admin/account");
      }
    } catch (error) {
      toast.error("Sửa không thành công");
      handleCancelEdit();
    }
  };

  const columns = [
    {
      title: "Tên người dùng",
      dataIndex: "full_name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Quyền",
      dataIndex: "isAdmin",
      render: (isAdmin) => {
        switch (isAdmin) {
          case true:
            return "Quản trị viên";
          case false:
            return "Khách hàng";
          default:
            return "";
        }
      },
    },
    {
      title: "Sửa",
      render: () => {
        return (
          <div className="cart-qty-action" style={{ fontSize: "2rem" }}>
            <Tooltip placement="top" title="Sửa">
              <EditOutlined />
            </Tooltip>
          </div>
        );
      },
      onCell: (record) => {
        return {
          onClick: () => {
            navigate(`/admin/account/${record._id}`);
            showModalEdit();
            formEdit.setFieldsValue({
              userName: record.full_name,
              email: record.email,
            });
          },
        };
      },
    },
    {
      title: "Xóa",
      render: () => {
        return (
          <div className="cart-qty-action" style={{ fontSize: "2rem" }}>
            <Tooltip placement="top" title="Xóa">
              <DeleteOutlined />
            </Tooltip>
          </div>
        );
      },
      onCell: (record) => {
        return {
          onClick: () => {
            navigate(`/admin/account/${record._id}`);
            showModalDelete();
          },
        };
      },
    },
  ];

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  };
  return (
    <div style={{ margin: "0 2rem" }}>
      <Row gutter={[32, 32]} justify="space-between">
        <Col span={4}>
          <LeftSidebar />
        </Col>
        <Col span={20}>
          <Row>
            <Col span={24}>
              <Header />
            </Col>
            <Col span={24}>
              <div style={{ paddingTop: "14vh", paddingBottom: "2rem" }}>
                <Row>
                  <Col span={6} style={{ textAlign: "left" }}>
                    Quản lý tài khoản PTFashion
                  </Col>
                  <Col offset={14} span={4} style={{ textAlign: "right" }}>
                    <Button onClick={showModal}>
                      <FormOutlined />
                      Thêm mới
                    </Button>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col span={24}>
              <Table
                pagination={false}
                dataSource={accounts}
                columns={columns}
                rowKey={(record) => record._id}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      {/* Thêm modal */}
      <Modal
        title="Thêm tài khoản"
        footer={null}
        visible={isModalVisibleAdd}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <Form {...formItemLayout} name="add" onFinish={addAccount}>
          <Form.Item
            label="Họ và tên"
            name="userName"
            rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Vui lòng nhập email!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Quyền"
            name="level"
            rules={[{ required: true, message: "Vui lòng chọn quyền!" }]}
          >
            <Radio.Group>
              <Radio value="false">Client</Radio>
              <Radio value="true">Admin</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 14, span: 10 }}>
            <Button type="primary" onClick={handleCancel}>
              Hủy
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginLeft: "2rem" }}
            >
              Xác nhận
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {/* Sửa modal */}
      <Modal
        title="Sửa tài khoản"
        footer={null}
        visible={isModalVisibleEdit}
        onOk={handleOkEdit}
        onCancel={handleCancelEdit}
        destroyOnClose={true}
      >
        <Form
          {...formItemLayout}
          form={formEdit}
          name="edit"
          onFinish={editAccount}
        >
          <Form.Item
            label="Họ và tên"
            name="userName"
            rules={[{ required: true, message: "Vui lòng nhập họ và tên!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: "Vui lòng nhập email!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Quyền"
            name="level"
            rules={[{ required: true, message: "Vui lòng chọn quyền!" }]}
          >
            <Radio.Group>
              <Radio value="false">Client</Radio>
              <Radio value="true">Admin</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 14, span: 10 }}>
            <Button type="primary" onClick={handleCancelEdit}>
              Hủy
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginLeft: "2rem" }}
            >
              Xác nhận
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {/* Xóa modal */}
      <Modal
        title="Xóa tài khoản"
        footer={null}
        visible={isModalVisibleDelete}
        onOk={handleOkDelete}
        onCancel={handleCancelDelete}
        destroyOnClose={true}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button type="primary" onClick={handleCancelDelete}>
            Hủy
          </Button>
          <Button
            type="primary"
            danger
            htmlType="submit"
            style={{ marginLeft: "2rem" }}
            onClick={() => deleteAccount(accountId)}
          >
            Xác nhận
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default AccountPage;
