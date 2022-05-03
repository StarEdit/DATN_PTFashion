import React, { useState } from "react";
import { Button, Card, Modal, Image, Select } from "antd";
import {
  MinusCircleOutlined,
  PlusCircleOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

import "./style.css";
import { Product } from "types/product.types";
import { formatMoney } from "utils/converMoney";

interface Props {
  item: Product;
}

const CardProduct = (props: Props) => {
  const { Option } = Select;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [qty, setQty] = useState(1);
  const [color, setColor] = useState<string>();
  const [size, setSize] = useState<string>();

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

  console.log(color, size);

  return (
    <>
      <Card
        cover={
          <img
            alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          />
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
          src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp"
          onClick={() => setVisible(true)}
          height="400px"
        />
        <div style={{ display: "none" }}>
          <Image.PreviewGroup
            preview={{ visible, onVisibleChange: (vis) => setVisible(vis) }}
          >
            <Image src="https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp" />
            <Image src="https://gw.alipayobjects.com/zos/antfincdn/cV16ZqzMjW/photo-1473091540282-9b846e7965e3.webp" />
            <Image src="https://gw.alipayobjects.com/zos/antfincdn/x43I27A55%26/photo-1438109491414-7198515b166b.webp" />
          </Image.PreviewGroup>
        </div>
        <div className="product-information">
          <div className="product-name">{props.item.name}</div>
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
            <Button type="primary">
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
