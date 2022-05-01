import { Col, Pagination, Row, Select } from "antd";
import React from "react";
import CardProduct from "../../components/CardProduct";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

import "./style.css";

const { Option } = Select;

const ProductPage = () => {
  return (
    <>
      <Header />
      <div className="product">
        <Row gutter={[32, 32]}>
          <Col span={6}>
            <Row>
              <Col span={24}>
                <div className="product-category">
                  <div className="category-list">
                    <h3>Danh mục sản phẩm</h3>
                    <div className="category-item">Giày Sneaker</div>
                    <div className="category-item">Giày da nam</div>
                    <div className="category-item">Cao gót</div>
                    <div className="category-item">Giày cho trẻ</div>
                  </div>
                </div>
              </Col>
              <hr />
              <Col span={24}>
                <div className="sort-action">
                  <div className="sort-title">Sắp xếp theo</div>
                  <Select defaultValue="Tên sản phẩm" style={{ width: 200 }}>
                    <Option value="name">Tên sản phẩm</Option>
                    <Option value="new">Mới nhất</Option>
                    <Option value="increase">Giá tăng dần</Option>
                    <Option value="decrease">Giá giảm dần</Option>
                  </Select>
                </div>
              </Col>
            </Row>
          </Col>
          <Col span={18}>
            <div className="list-product">
              <Row gutter={[32, 32]}>
                <Col span={6}>
                  <CardProduct />
                </Col>
                <Col span={6}>
                  <CardProduct />
                </Col>
                <Col span={6}>
                  <CardProduct />
                </Col>
                <Col span={6}>
                  <CardProduct />
                </Col>
              </Row>
              <Row style={{ marginTop: "2rem" }}>
                <Col span={24}>
                  <Pagination defaultCurrent={1} total={200} />
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;
