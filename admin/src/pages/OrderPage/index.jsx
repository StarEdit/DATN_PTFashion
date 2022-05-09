import React, { useEffect, useState } from "react";
import { Row, Col, Table, Tooltip, Button, Modal, Form, Select } from "antd";
import Header from "../../components/Header";
import LeftSidebar from "../../components/LeftSidebar";
import axios from "axios";
import { GET_ORDER } from "../../api";
import {
  FormOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

const { Option } = Select;

const OrderPage = () => {
  const userInfo = localStorage.getItem("userInfo");
  const token = JSON.parse(userInfo).token;
  const [orders, setOrders] = useState([]);
  const [order, setOrder] = useState({});
  const [editValue, setEditValue] = useState({});
  const [isModalVisibleAdd, setIsModalVisibleAdd] = useState(false);
  const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);
  const [isModalVisibleDelete, setIsModalVisibleDelete] = useState(false);
  const { orderId } = useParams();

  const navigate = useNavigate();

  const showModal = () => {
    setIsModalVisibleAdd(true);
  };
  const handleOk = () => {
    setIsModalVisibleAdd(false);
  };
  const handleCancel = () => {
    setIsModalVisibleAdd(false);
    navigate("/admin/order");
  };

  const showModalEdit = () => {
    setIsModalVisibleEdit(true);
  };
  const handleOkEdit = () => {
    setIsModalVisibleEdit(false);
  };
  const handleCancelEdit = () => {
    setIsModalVisibleEdit(false);
    navigate("/admin/order");
  };

  const showModalDelete = () => {
    setIsModalVisibleDelete(true);
  };
  const handleOkDelete = () => {
    setIsModalVisibleDelete(false);
  };
  const handleCancelDelete = () => {
    setIsModalVisibleDelete(false);
    navigate("/admin/order");
  };

  useEffect(() => {
    callbackOrder();
  }, []);

  const callbackOrder = async () => {
    const res = await axios.get(GET_ORDER, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.data) {
      setOrders(res.data.orders);
    }
  };

  const deleteAccount = async (id) => {
    try {
      const res = await axios.delete(`${GET_ORDER}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res) {
        toast.success("Xóa thành công");
        callbackOrder();
        navigate("/admin/order");
        handleCancelDelete();
      }
    } catch (error) {
      toast.error("Xóa không thành công");
      navigate("/admin/order");
      handleCancelDelete();
    }
  };

  const viewDetailOrder = async (id) => {
    try {
      const res = await axios.get(`${GET_ORDER}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data) {
        setOrder(res.data);
      }
    } catch (error) {
      handleCancel();
    }
  };

  const updateStatus = async (value) => {
    try {
      const res = await axios.patch(
        `${GET_ORDER}/${orderId}`,
        {
          status: value.status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data) {
        toast.success("Xác nhận thành công");
        callbackOrder();
        handleCancelEdit();
        navigate("/admin/order");
      }
    } catch (error) {
      toast.error("Không thể thay đổi những đơn hàng đã thanh toán");
      handleCancelEdit();
    }
  };

  const columns = [
    {
      title: "Tên người dùng",
      dataIndex: "userName",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: (status) => {
        switch (status) {
          case 0:
            return "Chờ xét duyệt";
          case 1:
            return "Đang giao hàng";
          case 2:
            return "Đã thanh toán";
          default:
            return "";
        }
      },
    },
    {
      title: "Tổng tiền",
      dataIndex: "total",
    },
    {
      title: "Xem",
      render: () => {
        return (
          <div className="cart-qty-action" style={{ fontSize: "2rem" }}>
            <Tooltip placement="top" title="Xem chi tiết">
              <EyeOutlined />
            </Tooltip>
          </div>
        );
      },
      onCell: (record) => {
        return {
          onClick: () => {
            navigate(`/admin/order/${record._id}`);
            viewDetailOrder(record._id);
            showModal();
          },
        };
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
            navigate(`/admin/order/${record._id}`);
            showModalEdit();
            setEditValue(record.status);
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
            navigate(`/admin/order/${record._id}`);
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

  const viewDetailCol = [
    {
      title: "Tên sản phẩm",
      dataIndex: "productName",
    },
    {
      title: "Màu sắc",
      dataIndex: "color",
    },
    {
      title: "Kích cỡ",
      dataIndex: "size",
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
    },
    {
      title: "Giá tiền",
      dataIndex: "price",
    },
    {
      title: "Phần trăm khuyến mãi",
      dataIndex: "percentSale",
    },
  ];

  const renderSwitch = (param) => {
    switch (param) {
      case 0:
        return "Chờ xét duyệt";
      case 1:
        return "Đang giao hàng";
      case 2:
        return "Đã thanh toán";
      default:
        return "";
    }
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
                    Quản lý đơn hàng PTFashion
                  </Col>
                </Row>
              </div>
            </Col>
            <Col span={24}>
              <Table
                pagination={false}
                dataSource={orders}
                columns={columns}
                rowKey={(record) => record._id}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      {/* Xem chi tiết */}
      <Modal
        title="Xem chi tiết"
        footer={null}
        visible={isModalVisibleAdd}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <div>Mã người dùng: {order && order?.userId}</div>
        <div>Mã giỏ hàng: {order && order?.cartId}</div>
        <div>Tên khách hàng: {order && order?.userName}</div>
        <div>Địa chỉ: {order && order?.address}</div>
        <div>Số điện thoại: {order && order?.phoneNumber}</div>
        <div>Email: {order && order?.email}</div>
        <div>Trạng thái: {order && renderSwitch(order?.status)}</div>
        <div>Tổng tiền: {order && order?.total}</div>
        <Table
          pagination={false}
          dataSource={order.products}
          columns={viewDetailCol}
          rowKey={(record) => record._id}
        />
      </Modal>
      {/* Sửa modal */}
      <Modal
        title="Xác nhận đơn"
        footer={null}
        visible={isModalVisibleEdit}
        onOk={handleOkEdit}
        onCancel={handleCancelEdit}
        destroyOnClose={true}
      >
        <Form {...formItemLayout} name="edit" onFinish={updateStatus}>
          <Form.Item label="Trạng thái" name="status">
            <Select defaultValue={renderSwitch(editValue)}>
              <Option value="0">Chờ xét duyệt</Option>
              <Option value="1">Đang giao</Option>
              <Option value="2">Đã thanh toán</Option>
            </Select>
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
        title="Xóa đơn hàng"
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
            onClick={() => deleteAccount(orderId)}
          >
            Xác nhận
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default OrderPage;
