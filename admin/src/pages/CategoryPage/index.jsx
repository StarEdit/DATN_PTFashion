import React, { useEffect, useState } from "react";
import { Row, Col, Table, Tooltip, Button, Modal, Form, Input } from "antd";
import Header from "../../components/Header";
import LeftSidebar from "../../components/LeftSidebar";
import axios from "axios";
import { GET_CATEGORY } from "../../api";
import { FormOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

const CategoryPage = () => {
  const userInfo = localStorage.getItem("userInfo");
  const token = JSON.parse(userInfo).token;
  const [categories, setCategories] = useState([]);
  const [isModalVisibleAdd, setIsModalVisibleAdd] = useState(false);
  const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);
  const [isModalVisibleDelete, setIsModalVisibleDelete] = useState(false);
  const { categoryId } = useParams();
  const [editValue, setEditValue] = useState("");

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
    navigate("/admin/category");
  };

  const showModalDelete = () => {
    setIsModalVisibleDelete(true);
  };
  const handleOkDelete = () => {
    setIsModalVisibleDelete(false);
  };
  const handleCancelDelete = () => {
    setIsModalVisibleDelete(false);
    navigate("/admin/category");
  };

  useEffect(() => {
    callbackCategory();
  }, []);
  const callbackCategory = async () => {
    const res = await axios.get(GET_CATEGORY, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.data) {
      setCategories(res.data.categories);
    }
  };

  const deleteCategory = async (id) => {
    try {
      const res = await axios.delete(`${GET_CATEGORY}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res) {
        toast.success("X??a th??nh c??ng");
        callbackCategory();
        navigate("/admin/category");
        handleCancelDelete();
      }
    } catch (error) {
      toast.error("X??a kh??ng th??nh c??ng");
      navigate("/admin/category");
      handleCancelDelete();
    }
  };

  const addCategory = async (value) => {
    try {
      const res = await axios.post(
        GET_CATEGORY,
        {
          category_name: value.category,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data) {
        toast.success("Th??m th??nh c??ng");
        callbackCategory();
        handleCancel();
      }
    } catch (error) {
      toast.error("Th??m kh??ng th??nh c??ng");
      handleCancel();
    }
  };

  const editCategory = async (value) => {
    try {
      const res = await axios.put(
        `${GET_CATEGORY}/${categoryId}`,
        {
          category_name: value.category,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data) {
        toast.success("S???a th??nh c??ng");
        callbackCategory();
        handleCancelEdit();
        navigate("/admin/category");
      }
    } catch (error) {
      toast.error("S???a kh??ng th??nh c??ng");
      handleCancelEdit();
      navigate("/admin/category");
    }
  };

  const columns = [
    {
      title: "ID danh m???c",
      dataIndex: "_id",
    },
    {
      title: "T??n danh m???c",
      dataIndex: "category_name",
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
            navigate(`/admin/category/${record._id}`);
            showModalEdit();
            setEditValue(record.category_name);
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
            navigate(`/admin/category/${record._id}`);
            showModalDelete();
          },
        };
      },
    },
  ];
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
                    Qu???n l?? danh m???c PTFashion
                  </Col>
                  <Col offset={14} span={4} style={{ textAlign: "right" }}>
                    <Button onClick={showModal}>
                      <FormOutlined />
                      Th??m m???i
                    </Button>
                  </Col>
                </Row>
              </div>
            </Col>
            <Col span={24}>
              <Table
                pagination={false}
                dataSource={categories}
                columns={columns}
                rowKey={(record) => record._id}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      {/* Th??m modal */}
      <Modal
        title="Th??m danh m???c"
        footer={null}
        visible={isModalVisibleAdd}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <Form name="add" onFinish={addCategory}>
          <Form.Item
            label="T??n danh m???c"
            name="category"
            rules={[{ required: true, message: "Vui l??ng nh???p t??n danh m???c" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 14, span: 10 }}>
            <Button type="primary" onClick={handleCancel}>
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
      {/* S???a modal */}
      <Modal
        title="S???a danh m???c"
        footer={null}
        visible={isModalVisibleEdit}
        onOk={handleOkEdit}
        onCancel={handleCancelEdit}
        destroyOnClose={true}
      >
        <Form name="edit" onFinish={editCategory}>
          <Form.Item
            label="T??n danh m???c"
            name="category"
            rules={[{ required: true, message: "Vui l??ng nh???p t??n danh m???c" }]}
          >
            <Input defaultValue={editValue} />
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
        title="X??a danh m???c"
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
            onClick={() => deleteCategory(categoryId)}
          >
            X??c nh???n
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default CategoryPage;
