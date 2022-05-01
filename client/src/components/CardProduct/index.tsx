import React, { useState } from "react";
import { Button, Card, Modal, Image, Select } from "antd";
import {
  MinusCircleOutlined,
  PlusCircleOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

import "./style.css";

const CardProduct = () => {
  const { Option } = Select;
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [qty, setQty] = useState(1);

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
  return (
    <>
      <Card
        hoverable
        style={{ width: 240 }}
        cover={
          <img
            alt="example"
            src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
          />
        }
        bodyStyle={{ padding: "0 1rem" }}
      >
        <div className="product-name">Tên</div>
        <div className="product-desc">
          <div className="product-price">
            <div className="old-price">999.000 VND</div>
            <div className="new-price">699.000 VND</div>
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
          <div className="product-name">Tên</div>
          <div className="product-price">
            <div className="title-price">Giá bán:</div>
            <div className="new-price">699.000 VND</div>
            <div className="old-price">999.000 VND</div>
          </div>
          <hr style={{ margin: "2rem 0" }} />
          <div className="product-category">Loại sản phẩm: Giày Sneaker</div>
          <div className="product-color">
            <div className="product-color-title">Màu sắc:</div>
            <div className="product-color-list">
              <Button className="active">Xanh</Button>
              <Button>Đỏ</Button>
              <Button>Tím</Button>
            </div>
          </div>
          <div className="product-size">
            <div className="product-size-title">Kích cỡ:</div>
            <Select placement="topRight" placeholder="Chọn kích cỡ">
              <Option value="1">45</Option>
              <Option value="2">46</Option>
              <Option value="3">47</Option>
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
