import React from "react";
import { Row, Col } from "antd";
import { FacebookOutlined, YoutubeOutlined } from "@ant-design/icons";
import "./style.css";

const Footer = () => {
  return (
    <div className="footer">
      <Row gutter={[16, 16]}>
        <Col span={6}>
          <div className="footer-services">
            <h3>Sứ mệnh</h3>
            <p>
              Chúng tôi tin tưởng vào sức mạnh khai triển của công nghệ và mong
              muốn góp phần làm cho thế giới trở nên tốt đẹp hơn bằng việc kết
              nối cộng đồng người mua và người bán thông qua việc cung cấp một
              nền tảng thương mại điện tử.
            </p>
          </div>
        </Col>
        <Col span={6}>
          <div className="footer-about">
            <h3>Về chúng tôi</h3>
            <p>Số điện thoại: 052.302.7921</p>
            <p>Địa chỉ: Ba La, Hà Đông, Hà Nội</p>
          </div>
        </Col>
        <Col span={6}>
          <div className="footer-follow">
            <h3> Truyền thông xã hội</h3>
            <div className="footer-follow-item">
              <div className="footer-follow-item-facebook">
                <FacebookOutlined /> FaceBook
              </div>
              <div className="footer-follow-item-youtube">
                <YoutubeOutlined /> Youtube
              </div>
            </div>
          </div>
        </Col>
        <Col span={6}>
          <div className="footer-support">
            <h3>Hỗ trợ khách hàng</h3>
            <div className="footer-support-method">
              <div className="footer-support-method-contact">
                <div className="contact-title">Liên hệ:</div>
                <div className="contact-list">
                  <div className="hotline">Hotline: 052.302.7921</div>
                  <div className="email">Email: ngophuongtan0920@gmal.com</div>
                </div>
              </div>
              <div className="footer-support-method-address">
                <p>Địa chỉ: Ba La, Hà Đông, Hà Nội</p>
              </div>
            </div>
          </div>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col
          span={24}
          style={{ textAlign: "left", fontSize: "1.4rem", marginTop: "2rem" }}
        >
          &copy; Copyright by Ngô Phương Tân
        </Col>
      </Row>
    </div>
  );
};

export default Footer;
