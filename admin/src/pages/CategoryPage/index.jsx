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
        toast.success("Xóa thành công");
        callbackCategory();
        navigate("/admin/category");
        handleCancelDelete();
      }
    } catch (error) {
      toast.error("Xóa không thành công");
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
        toast.success("Thêm thành công");
        callbackCategory();
        handleCancel();
      }
    } catch (error) {
      toast.error("Thêm không thành công");
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
        toast.success("Sửa thành công");
        callbackCategory();
        handleCancelEdit();
        navigate("/admin/category");
      }
    } catch (error) {
      toast.error("Sửa không thành công");
      handleCancelEdit();
      navigate("/admin/category");
    }
  };

  const columns = [
    {
      title: "ID danh mục",
      dataIndex: "_id",
    },
    {
      title: "Tên danh mục",
      dataIndex: "category_name",
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
            navigate(`/admin/category/${record._id}`);
            showModalEdit();
            setEditValue(record.category_name);
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
                    Quản lý danh mục PTFashion
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
                dataSource={categories}
                columns={columns}
                rowKey={(record) => record._id}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      {/* Thêm modal */}
      <Modal
        title="Thêm danh mục"
        footer={null}
        visible={isModalVisibleAdd}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <Form name="add" onFinish={addCategory}>
          <Form.Item
            label="Tên danh mục"
            name="category"
            rules={[{ required: true, message: "Vui lòng nhập tên danh mục" }]}
          >
            <Input />
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
        title="Sửa danh mục"
        footer={null}
        visible={isModalVisibleEdit}
        onOk={handleOkEdit}
        onCancel={handleCancelEdit}
        destroyOnClose={true}
      >
        <Form name="edit" onFinish={editCategory}>
          <Form.Item
            label="Tên danh mục"
            name="category"
            rules={[{ required: true, message: "Vui lòng nhập tên danh mục" }]}
          >
            <Input defaultValue={editValue} />
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
        title="Xóa danh mục"
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
            onClick={() => deleteCategory(categoryId)}
          >
            Xác nhận
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default CategoryPage;
