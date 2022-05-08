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
  Select,
} from "antd";
import Header from "../../components/Header";
import LeftSidebar from "../../components/LeftSidebar";
import axios from "axios";
import { GET_PRODUCT, GET_CATEGORY } from "../../api";
import { FormOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

const { Option } = Select;

const ProductPage = () => {
  const userInfo = localStorage.getItem("userInfo");
  const token = JSON.parse(userInfo).token;
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalVisibleAdd, setIsModalVisibleAdd] = useState(false);
  const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);
  const [isModalVisibleDelete, setIsModalVisibleDelete] = useState(false);
  const { productId } = useParams();
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
    navigate("/admin/product");
  };

  const showModalDelete = () => {
    setIsModalVisibleDelete(true);
  };
  const handleOkDelete = () => {
    setIsModalVisibleDelete(false);
  };
  const handleCancelDelete = () => {
    setIsModalVisibleDelete(false);
    navigate("/admin/product");
  };

  useEffect(() => {
    callbackProduct();
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

  const callbackProduct = async () => {
    const res = await axios.get(GET_PRODUCT, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.data) {
      setProducts(res.data.products);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const res = await axios.delete(`${GET_PRODUCT}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res) {
        toast.success("Xóa thành công");
        callbackProduct();
        navigate("/admin/product");
        handleCancelDelete();
      }
    } catch (error) {
      toast.error("Xóa không thành công");
      navigate("/admin/product");
      handleCancelDelete();
    }
  };

  const addProduct = async (value) => {
    const colorArr = value.color.trim().split(",");
    const sizeArr = value.size.trim().split(",");
    const imageArr = value.images.trim().split(",");
    try {
      const res = await axios.post(
        GET_PRODUCT,
        {
          name: value.productName,
          listImage: imageArr,
          categoryId: value.category,
          description: value.desc,
          price: value.price,
          percentSale: value.sale,
          colors: colorArr,
          sizes: sizeArr,
          qtyInStock: value.qty,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data) {
        toast.success("Thêm thành công");
        callbackProduct();
        handleCancel();
      }
    } catch (error) {
      toast.error("Thêm không thành công");
      handleCancel();
    }
  };

  const editProduct = async (value) => {
    const colorArr = value.color.trim().split(",");
    const sizeArr = value.size.trim().split(",");
    const imageArr = value.images.trim().split(",");
    try {
      const res = await axios.put(
        `${GET_PRODUCT}/${productId}`,
        {
          name: value.productName,
          listImage: imageArr,
          categoryId: value.category,
          description: value.desc,
          price: value.price,
          percentSale: value.sale,
          colors: colorArr,
          sizes: sizeArr,
          qtyInStock: value.qty,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data) {
        toast.success("Sửa thành công");
        callbackProduct();
        handleCancelEdit();
        navigate("/admin/product");
      }
    } catch (error) {
      toast.error("Sửa không thành công");
      handleCancelEdit();
      navigate("/admin/product");
    }

    console.log(value);
  };

  const columns = [
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
    },
    {
      title: "Giá tiền",
      dataIndex: "price",
    },
    {
      title: "Phần trăm khuyến mãi",
      dataIndex: "percentSale",
    },
    {
      title: "Số lượng trong kho",
      dataIndex: "qtyInStock",
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
            navigate(`/admin/product/${record._id}`);
            showModalEdit();
            formEdit.setFieldsValue({
              productName: record.name,
              images: record.listImage.toString(),
              category: record.categoryId,
              desc: record.description,
              price: record.price,
              sale: record.percentSale,
              color: record.colors.toString(),
              size: record.sizes.toString(),
              qty: record.qtyInStock,
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
            navigate(`/admin/product/${record._id}`);
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
                    Quản lý sản phẩm PTFashion
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
                dataSource={products}
                columns={columns}
                rowKey={(record) => record._id}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      {/* Thêm modal */}
      <Modal
        width="70vw"
        title="Thêm sản phẩm"
        footer={null}
        visible={isModalVisibleAdd}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <Form {...formItemLayout} name="add" onFinish={addProduct}>
          <Form.Item
            label="Tên sản phẩm"
            name="productName"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Danh mục sản phẩm"
            name="category"
            rules={[
              { required: true, message: "Vui lòng chọn danh mục sản phẩm!" },
            ]}
          >
            <Select allowClear>
              {categories &&
                categories.map((item, index) => (
                  <Option key={index} value={item._id}>
                    {item.category_name}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="desc"
            rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
          >
            <Input.TextArea allowClear />
          </Form.Item>
          <Form.Item
            label="Giá"
            name="price"
            rules={[{ required: true, message: "Vui lòng nhập giá!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phần trăm khuyến mãi"
            name="sale"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập phần trăm khuyến mãi!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Số lượng trong kho"
            name="qty"
            rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Màu sắc"
            name="color"
            rules={[{ required: true, message: "Vui lòng nhập màu sắc!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Kích cỡ"
            name="size"
            rules={[{ required: true, message: "Vui lòng nhập kích cỡ!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Danh sách hình ảnh"
            name="images"
            rules={[
              { required: true, message: "Vui lòng nhập link hình ảnh!" },
            ]}
          >
            <Input.TextArea allowClear />
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
        width="70vw"
        title="Sửa sản phẩm"
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
          onFinish={editProduct}
        >
          <Form.Item
            label="Tên sản phẩm"
            name="productName"
            rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Danh mục sản phẩm"
            name="category"
            rules={[
              { required: true, message: "Vui lòng chọn danh mục sản phẩm!" },
            ]}
          >
            <Select allowClear>
              {categories &&
                categories.map((item, index) => (
                  <Option key={index} value={item._id}>
                    {item.category_name}
                  </Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Mô tả"
            name="desc"
            rules={[{ required: true, message: "Vui lòng nhập mô tả!" }]}
          >
            <Input.TextArea allowClear />
          </Form.Item>
          <Form.Item
            label="Giá"
            name="price"
            rules={[{ required: true, message: "Vui lòng nhập giá!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Phần trăm khuyến mãi"
            name="sale"
            rules={[
              {
                required: true,
                message: "Vui lòng nhập phần trăm khuyến mãi!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Số lượng trong kho"
            name="qty"
            rules={[{ required: true, message: "Vui lòng nhập số lượng!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Màu sắc"
            name="color"
            rules={[{ required: true, message: "Vui lòng nhập màu sắc!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Kích cỡ"
            name="size"
            rules={[{ required: true, message: "Vui lòng nhập kích cỡ!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Danh sách hình ảnh"
            name="images"
            rules={[
              { required: true, message: "Vui lòng nhập link hình ảnh!" },
            ]}
          >
            <Input.TextArea allowClear />
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
        title="Xóa sản phẩm"
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
            onClick={() => deleteProduct(productId)}
          >
            Xác nhận
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ProductPage;
