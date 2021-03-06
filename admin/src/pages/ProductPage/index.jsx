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
  Image,
} from "antd";
import Header from "../../components/Header";
import LeftSidebar from "../../components/LeftSidebar";
import axios from "axios";
import { GET_PRODUCT, GET_CATEGORY } from "../../api";
import {
  FormOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

const { Option } = Select;

const ProductPage = () => {
  const userInfo = localStorage.getItem("userInfo");
  const token = JSON.parse(userInfo).token;
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState();
  const [categories, setCategories] = useState([]);
  const [isModalVisibleView, setIsModalVisibleView] = useState(false);
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

  const showModalView = () => {
    setIsModalVisibleView(true);
  };
  const handleOkView = () => {
    setIsModalVisibleView(false);
  };
  const handleCancelView = () => {
    setIsModalVisibleView(false);
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
        toast.success("X??a th??nh c??ng");
        callbackProduct();
        navigate("/admin/product");
        handleCancelDelete();
      }
    } catch (error) {
      toast.error("X??a kh??ng th??nh c??ng");
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
        toast.success("Th??m th??nh c??ng");
        callbackProduct();
        handleCancel();
      }
    } catch (error) {
      toast.error("Th??m kh??ng th??nh c??ng");
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
        toast.success("S???a th??nh c??ng");
        callbackProduct();
        handleCancelEdit();
        navigate("/admin/product");
      }
    } catch (error) {
      toast.error("S???a kh??ng th??nh c??ng");
      handleCancelEdit();
      navigate("/admin/product");
    }

    console.log(value);
  };

  const viewDetailProduct = async (id) => {
    try {
      const res = await axios.get(`${GET_PRODUCT}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data) {
        setProduct(res.data);
        console.log(res.data);
      }
    } catch (error) {
      handleCancel();
    }
  };

  const columns = [
    {
      title: "T??n s???n ph???m",
      dataIndex: "name",
    },
    {
      title: "Gi?? ti???n",
      dataIndex: "price",
    },
    {
      title: "khuy???n m??i(%)",
      dataIndex: "percentSale",
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
            navigate(`/admin/product/${record._id}`);
            viewDetailProduct(record._id);
            showModalView();
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
                    Qu???n l?? s???n ph???m PTFashion
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
                dataSource={products}
                columns={columns}
                rowKey={(record) => record._id}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      {/* Xem chi ti???t */}
      <Modal
        width="66vw"
        title="Xem chi ti???t"
        footer={null}
        visible={isModalVisibleView}
        onOk={handleOkView}
        onCancel={handleCancelView}
        destroyOnClose={true}
      >
        <div>T??n s???n ph???m: {product && product.name}</div>
        <div>M?? danh m???c: {product && product.categoryId}</div>
        <div>M?? t???: {product && product.description}</div>
        <div>Gi?? s???n ph???m: {product && product.price}</div>
        <div>Khuy???n m??i(%): {product && product.percentSale}</div>
        <div>S??? l?????ng: {product && product.qtyInStock}</div>
        <div>M??u s???c: {product && product.colors.toString()}</div>
        <div>K??ch c???: {product && product.sizes.toString()}</div>
        <div>H??nh ???nh s???n ph???m</div>
        {product && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            {product.listImage.map((item, index) => (
              <Image key={index} width={200} src={item} />
            ))}
          </div>
        )}
      </Modal>
      {/* Th??m modal */}
      <Modal
        width="70vw"
        title="Th??m s???n ph???m"
        footer={null}
        visible={isModalVisibleAdd}
        onOk={handleOk}
        onCancel={handleCancel}
        destroyOnClose={true}
      >
        <Form {...formItemLayout} name="add" onFinish={addProduct}>
          <Form.Item
            label="T??n s???n ph???m"
            name="productName"
            rules={[{ required: true, message: "Vui l??ng nh???p t??n s???n ph???m!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Danh m???c s???n ph???m"
            name="category"
            rules={[
              { required: true, message: "Vui l??ng ch???n danh m???c s???n ph???m!" },
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
            label="M?? t???"
            name="desc"
            rules={[{ required: true, message: "Vui l??ng nh???p m?? t???!" }]}
          >
            <Input.TextArea allowClear />
          </Form.Item>
          <Form.Item
            label="Gi??"
            name="price"
            rules={[{ required: true, message: "Vui l??ng nh???p gi??!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Ph???n tr??m khuy???n m??i"
            name="sale"
            rules={[
              {
                required: true,
                message: "Vui l??ng nh???p ph???n tr??m khuy???n m??i!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="S??? l?????ng trong kho"
            name="qty"
            rules={[{ required: true, message: "Vui l??ng nh???p s??? l?????ng!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="M??u s???c"
            name="color"
            rules={[{ required: true, message: "Vui l??ng nh???p m??u s???c!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="K??ch c???"
            name="size"
            rules={[{ required: true, message: "Vui l??ng nh???p k??ch c???!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Danh s??ch h??nh ???nh"
            name="images"
            rules={[
              { required: true, message: "Vui l??ng nh???p link h??nh ???nh!" },
            ]}
          >
            <Input.TextArea allowClear />
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
        width="70vw"
        title="S???a s???n ph???m"
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
            label="T??n s???n ph???m"
            name="productName"
            rules={[{ required: true, message: "Vui l??ng nh???p t??n s???n ph???m!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Danh m???c s???n ph???m"
            name="category"
            rules={[
              { required: true, message: "Vui l??ng ch???n danh m???c s???n ph???m!" },
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
            label="M?? t???"
            name="desc"
            rules={[{ required: true, message: "Vui l??ng nh???p m?? t???!" }]}
          >
            <Input.TextArea allowClear />
          </Form.Item>
          <Form.Item
            label="Gi??"
            name="price"
            rules={[{ required: true, message: "Vui l??ng nh???p gi??!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Ph???n tr??m khuy???n m??i"
            name="sale"
            rules={[
              {
                required: true,
                message: "Vui l??ng nh???p ph???n tr??m khuy???n m??i!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="S??? l?????ng trong kho"
            name="qty"
            rules={[{ required: true, message: "Vui l??ng nh???p s??? l?????ng!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="M??u s???c"
            name="color"
            rules={[{ required: true, message: "Vui l??ng nh???p m??u s???c!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="K??ch c???"
            name="size"
            rules={[{ required: true, message: "Vui l??ng nh???p k??ch c???!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Danh s??ch h??nh ???nh"
            name="images"
            rules={[
              { required: true, message: "Vui l??ng nh???p link h??nh ???nh!" },
            ]}
          >
            <Input.TextArea allowClear />
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
        title="X??a s???n ph???m"
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
            onClick={() => deleteProduct(productId)}
          >
            X??c nh???n
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ProductPage;
