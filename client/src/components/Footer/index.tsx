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
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries
            </p>
          </div>
        </Col>
        <Col span={6}>
          <div className="footer-about">
            <h3>Về chúng tôi</h3>
            <p>Số điện thoại: 095.366.4722</p>
            <p>Địa chỉ: số 33 Nhân Chính, Trung Hòa, Cầu Giấy, Hà Nội</p>
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
                  <div className="hotline">Hotline: 036.555.1123</div>
                  <div className="email">Email: happy.@gmal.com</div>
                </div>
              </div>
              <div className="footer-support-method-address">
                <p>Địa chỉ: Số 33 Nhân Chính, Trung Hòa, Cầu Giấy, Hà Nội</p>
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
