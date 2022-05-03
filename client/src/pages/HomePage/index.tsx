import React from "react";
import { Button, Carousel, Col, Row } from "antd";
import {
  RocketOutlined,
  TransactionOutlined,
  PhoneOutlined,
} from "@ant-design/icons";
import { banner, category } from "./data";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

import "./style.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <>
      <Header />
      <Carousel autoplay>
        {banner.map((item) => (
          <div key={item.id} className="banner">
            <img src={item.backgroundImg} alt="" width="100%" height="600px" />
          </div>
        ))}
      </Carousel>
      <div className="home-services">
        <Row>
          <Col span={8}>
            <div className="home-services-icon">
              <RocketOutlined />
            </div>
            <div className="home-services-title">Miễn phí vận chuyển</div>
            <div className="home-services-content">
              Mua hàng ở PTFashion, bạn sẽ được miễn phí vận chuyển trong nội
              thành Hà Nội
            </div>
          </Col>
          <Col span={8}>
            <div className="home-services-icon">
              <TransactionOutlined />
            </div>
            <div className="home-services-title">Hoàn tiền 100%</div>
            <div className="home-services-content">
              Khi nhận hàng, nếu có sai sót sẽ hoàn tiền 100%
            </div>
          </Col>
          <Col span={8}>
            <div className="home-services-icon">
              <PhoneOutlined />
            </div>
            <div className="home-services-title">Liên hệ 24/7</div>
            <div className="home-services-content">
              Chúng tôi luôn luôn có người phục vụ 24/7
            </div>
          </Col>
        </Row>
      </div>
      <div className="home-category">
        <div className="home-category-title">DANH MỤC SẢN PHẨM</div>
        <Row justify="space-between" gutter={[32, 32]}>
          {category.map((item) => (
            <Col span={6} key={item.id}>
              <Link to="/product-page">
                <div className="category-card">
                  <div className="card-img">
                    <img src={item.image} alt="" width="100%" height="300px" />
                  </div>
                  <Button type="primary" block>
                    Xem sản phẩm
                  </Button>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
