import React, { useState } from "react";
import { Button, Card, Modal, Image, Select } from "antd";
import {
  MinusCircleOutlined,
  PlusCircleOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { toast } from "react-toastify";
import { Product } from "types/product.types";
import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { AddCartAction } from "redux/store";

import "./style.css";
import { formatMoney } from "utils/convertMoney";
interface Props {
  item: Product;
}

const CardProduct = (props: Props) => {
  const { Option } = Select;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [qty, setQty] = useState(1);
  const [color, setColor] = useState<any>();
  const [size, setSize] = useState<any>();

  const handleIncrease = () => {
    setQty((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setQty((prev) => prev - 1);
    if (qty <= 1) {
      setQty(1);
    }
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

  const dispatch = useDispatch();
  const { addCart } = bindActionCreators(AddCartAction, dispatch);

  const userInfoFromStorage = localStorage.getItem("userInfo");

  const handleAddCart = () => {
    if (userInfoFromStorage) {
      if (color !== undefined && size !== undefined) {
        addCart(
          props.item._id,
          props.item.name,
          qty,
          props.item.price,
          props.item.percentSale,
          color,
          size
        );
        handleCancel();
        toast.success("Thêm hàng thành công");
      } else {
        toast.info("Vui lòng chọn màu và kích cỡ");
      }
    } else {
      toast.info("Vui lòng đăng nhập để mua hàng");
      handleCancel();
    }
  };

  return (
    <>
      <Card
        cover={
          <div className="card-img-show">
            <img alt="image" src={props.item.listImage[0]} height="200px" />
          </div>
        }
        bodyStyle={{ padding: "0 1rem" }}
      >
        <div className="product-name">{props.item.name}</div>
        <div className="product-desc">
          <div className="product-price">
            <div className="old-price">{formatMoney(props.item.price)}</div>
            <div className="new-price">
              {formatMoney(
                props.item.price -
                  (props.item.price * props.item.percentSale) / 100
              )}
            </div>
          </div>
          <Button onClick={showModal}>Xem chi tiết</Button>
        </div>
      </Card>

      <Modal
        bodyStyle={{ padding: "0" }}
        footer={null}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Image
          preview={{ visible: false }}
          width="100%"
          src={props.item.listImage[0]}
          onClick={() => setVisible(true)}
          height="400px"
        />
        <div style={{ display: "none", width: "500px" }}>
          <Image.PreviewGroup
            preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}
          >
            {props.item.listImage &&
              props.item.listImage.map((item) => <Image src={item} />)}
          </Image.PreviewGroup>
        </div>
        <div className="product-information">
          <div className="product-name-detail">{props.item.name}</div>
          <div className="product-price">
            <div className="title-price">Giá bán:</div>
            <div className="new-price">
              {formatMoney(
                props.item.price -
                  (props.item.price * props.item.percentSale) / 100
              )}
            </div>
            <div className="old-price">{formatMoney(props.item.price)}</div>
          </div>
          <div className="product-category">
            Loại hình: {props.item.description}
          </div>
          <hr style={{ margin: "2rem 0" }} />
          <div className="product-color">
            <div className="product-color-title">Màu sắc:</div>
            <div className="product-color-list">
              <Select
                placement="topRight"
                placeholder="Chọn màu"
                onChange={(value) => {
                  setColor(value);
                }}
              >
                {props.item.colors.map((item, index) => (
                  <Option key={index} value={item}>
                    {item}
                  </Option>
                ))}
              </Select>
            </div>
          </div>
          <div className="product-size">
            <div className="product-size-title">Kích cỡ:</div>
            <Select
              placement="topRight"
              placeholder="Chọn kích cỡ"
              onChange={(value) => {
                setSize(value);
              }}
            >
              {props.item.sizes.map((item, index) => (
                <Option key={index} value={item}>
                  {item}
                </Option>
              ))}
            </Select>
          </div>
          <hr style={{ margin: "2rem 0" }} />
          <div className="product-btn-buy">
            <div className="product-quantity">
              <MinusCircleOutlined onClick={handleDecrease} />
              {qty}
              <PlusCircleOutlined onClick={handleIncrease} />
            </div>
            <Button type="primary" onClick={handleAddCart}>
              <ShoppingCartOutlined />
              Thêm vào giỏ hàng
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CardProduct;
