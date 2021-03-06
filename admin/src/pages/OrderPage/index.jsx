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
        toast.success("X??a th??nh c??ng");
        callbackOrder();
        navigate("/admin/order");
        handleCancelDelete();
      }
    } catch (error) {
      toast.error("X??a kh??ng th??nh c??ng");
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
        toast.success("X??c nh???n th??nh c??ng");
        callbackOrder();
        handleCancelEdit();
        navigate("/admin/order");
      }
    } catch (error) {
      toast.error("Kh??ng th??? thay ?????i nh???ng ????n h??ng ???? thanh to??n");
      handleCancelEdit();
    }
  };

  const columns = [
    {
      title: "T??n ng?????i d??ng",
      dataIndex: "userName",
    },
    {
      title: "?????a ch???",
      dataIndex: "address",
    },
    {
      title: "S??? ??i???n tho???i",
      dataIndex: "phoneNumber",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Tr???ng th??i",
      dataIndex: "status",
      render: (status) => {
        switch (status) {
          case 0:
            return "Ch??? x??t duy???t";
          case 1:
            return "??ang giao h??ng";
          case 2:
            return "???? thanh to??n";
          default:
            return "";
        }
      },
    },
    {
      title: "T???ng ti???n",
      dataIndex: "total",
    },
    {
      title: "Xem",
      render: () => {
        return (
          <div className="cart-qty-action" style={{ fontSize: "2rem" }}>
            <Tooltip placement="top" title="Xem chi ti???t">
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
      title: "S???a",
      render: () => {
        return (
          <div className="cart-qty-action" style={{ fontSize: "2rem" }}>
            <Tooltip placement="top" title="S???a">
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
      title: "X??a",
      render: () => {
        return (
          <div className="cart-qty-action" style={{ fontSize: "2rem" }}>
            <Tooltip placement="top" title="X??a">
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
      title: "T??n s???n ph???m",
      dataIndex: "productName",
    },
    {
      title: "M??u s???c",
      dataIndex: "color",
    },
    {
      title: "K??ch c???",
      dataIndex: "size",
    },
    {
      title: "S??? l?????ng",
      dataIndex: "quantity",
    },
    {
      title: "Gi?? ti???n",
      dataIndex: "price",
    },
    {
      title: "Ph???n tr??m khuy???n m??i",
      dataIndex: "percentSale",
    },
  ];

  const renderSwitch = (param) => {
    switch (param) {
      case 0:
        return "Ch??? x??t duy???t";
      case 1:
        return "??ang giao h??ng";
      case 2:
        return "???? thanh to??n";
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
                    Qu???n l?? ????n h??ng PTFashion
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
      {/* Xem chi ti???t */}
      <Modal
        title="Xem chi ti???t"
        footer={null}
        visible={isModalVisibleAdd}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <div>M?? ng?????i d??ng: {order && order?.userId}</div>
        <div>M?? gi??? h??ng: {order && order?.cartId}</div>
        <div>T??n kh??ch h??ng: {order && order?.userName}</div>
        <div>?????a ch???: {order && order?.address}</div>
        <div>S??? ??i???n tho???i: {order && order?.phoneNumber}</div>
        <div>Email: {order && order?.email}</div>
        <div>Tr???ng th??i: {order && renderSwitch(order?.status)}</div>
        <div>T???ng ti???n: {order && order?.total}</div>
        <Table
          pagination={false}
          dataSource={order.products}
          columns={viewDetailCol}
          rowKey={(record) => record._id}
        />
      </Modal>
      {/* S???a modal */}
      <Modal
        title="X??c nh???n ????n"
        footer={null}
        visible={isModalVisibleEdit}
        onOk={handleOkEdit}
        onCancel={handleCancelEdit}
        destroyOnClose={true}
      >
        <Form {...formItemLayout} name="edit" onFinish={updateStatus}>
          <Form.Item label="Tr???ng th??i" name="status">
            <Select defaultValue={renderSwitch(editValue)}>
              <Option value="0">Ch??? x??t duy???t</Option>
              <Option value="1">??ang giao</Option>
              <Option value="2">???? thanh to??n</Option>
            </Select>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 14, span: 10 }}>
            <Button type="primary" onClick={handleCancelEdit}>
              H???y
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              style={{ marginLeft: "2rem" }}
            >
              X??c nh???n
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {/* X??a modal */}
      <Modal
        title="X??a ????n h??ng"
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
            H???y
          </Button>
          <Button
            type="primary"
            danger
            htmlType="submit"
            style={{ marginLeft: "2rem" }}
            onClick={() => deleteAccount(orderId)}
          >
            X??c nh???n
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default OrderPage;
