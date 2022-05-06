import React from "react";
import { Row, Col, Carousel } from "antd";
import Footer from "components/Footer";
import Header from "components/Header";
import {
  ClockCircleOutlined,
  PhoneOutlined,
  DingtalkOutlined,
} from "@ant-design/icons";
import { banner } from "./data";
import { Image1, Image2, Image3 } from "./data";

const AboutUs = () => {
  return (
    <>
      <Header />
      <hr />
      <div className="about-us-wrapper" style={{ padding: "2rem" }}>
        <Row>
          <Col span={24}>
            <div style={{ fontSize: "3rem", fontWeight: "700" }}>
              Giới thiệu về PTFashion
            </div>
          </Col>
        </Row>
        <Row justify="space-between" style={{ marginTop: "3rem" }}>
          <Col span={6}>
            <img src={Image1} alt="" width="100%" height="300px" />
            <div style={{ fontSize: "1.8rem", fontWeight: "600" }}>
              Gửi xe miễn phí, dễ dàng
            </div>
          </Col>
          <Col span={6}>
            <img src={Image2} alt="" width="100%" height="300px" />
            <div style={{ fontSize: "1.8rem", fontWeight: "600" }}>
              Cửa hàng khang trang, rộng rãi, đa dạng mẫu mã
            </div>
          </Col>
          <Col span={6}>
            <img src={Image3} alt="" width="100%" height="300px" />
            <div style={{ fontSize: "1.8rem", fontWeight: "600" }}>
              Thanh toán dễ dàng tiền mặt, quẹt thẻ và chuyển khoản
            </div>
          </Col>
        </Row>
        <Row gutter={[32, 32]} style={{ padding: "4rem 0" }} align="middle">
          <Col span={12}>
            <Carousel autoplay dotPosition="left">
              {banner.map((item) => (
                <div key={item.id} className="banner">
                  <img
                    src={item.backgroundImg}
                    alt=""
                    width="100%"
                    height="400px"
                  />
                </div>
              ))}
            </Carousel>
          </Col>
          <Col span={12}>
            <DingtalkOutlined
              style={{ fontSize: "4rem", color: "#c3be1ae0" }}
            />
            <div style={{ fontSize: "1.8rem", textAlign: "justify" }}>
              Với mong muốn mang đến cho khách hàng sự trải nghiệm tốt nhất khi
              mua sắm các sản phẩm thời trang, trong thời gian qua XSHOP không
              ngừng mở rộng các cửa hàng khắp Hà Nội Năm 2019, mục tiêu của
              PTFashion sẽ tiếp tục mở thêm nhiều hệ thống cửa hàng nữa để đem
              đến cho khách hàng những sản phẩm thời trang phù hợp với nhu cầu,
              giá cả tốt nhất và dịch vụ hoàn hảo Mời bạn xem một số hình ảnh
              sinh động tại cửa hàng PTFashion.
            </div>
          </Col>
        </Row>
        <hr />
        <Row style={{ paddingTop: "2rem" }}>
          <Col span={12}>
            <ClockCircleOutlined style={{ fontSize: "5rem" }} />
            <div style={{ fontSize: "2rem", fontWeight: "700" }}>
              Thời gian làm việc
            </div>
            <div style={{ fontSize: "2rem" }}>7 A.M - 17 P.M</div>
          </Col>
          <Col span={12}>
            <PhoneOutlined style={{ fontSize: "5rem" }} />{" "}
            <div style={{ fontSize: "2rem", fontWeight: "700" }}> Liên Hệ</div>
            <div style={{ fontSize: "2rem" }}> 0523027921</div>
          </Col>
        </Row>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
