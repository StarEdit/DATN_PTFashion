import React from "react";
import { Row, Col, Carousel } from "antd";
import Footer from "components/Footer";
import Header from "components/Header";
import { ClockCircleOutlined, PhoneOutlined } from "@ant-design/icons";

const AboutUs = () => {
  return (
    <>
      <Header />
      <div className="about-us-wrapper" style={{ padding: "2rem" }}>
        <Row>
          <Col span={24}>Giới thiệu về PTFashion</Col>
        </Row>
        <Row>
          <Col span={6}>Gửi xe miễn phí, dễ dàng</Col>
          <Col span={6}>Cửa hàng khang trang, rộng rãi, đa dạng mẫu mã</Col>
          <Col span={6}>
            Thanh toán dễ dàng tiền mặt, quẹt thẻ và chuyển khoản
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Carousel dotPosition="left">
              <div>
                <h3
                  style={{
                    height: "160px",
                    color: "#fff",
                    lineHeight: "160px",
                    textAlign: "center",
                    background: "#364d79",
                  }}
                >
                  1
                </h3>
              </div>
              <div>
                <h3
                  style={{
                    height: "160px",
                    color: "#fff",
                    lineHeight: "160px",
                    textAlign: "center",
                    background: "#364d79",
                  }}
                >
                  2
                </h3>
              </div>
              <div>
                <h3
                  style={{
                    height: "160px",
                    color: "#fff",
                    lineHeight: "160px",
                    textAlign: "center",
                    background: "#364d79",
                  }}
                >
                  3
                </h3>
              </div>
              <div>
                <h3
                  style={{
                    height: "160px",
                    color: "#fff",
                    lineHeight: "160px",
                    textAlign: "center",
                    background: "#364d79",
                  }}
                >
                  4
                </h3>
              </div>
            </Carousel>
          </Col>
          <Col span={12}>
            <div>
              Với mong muốn mang đến cho khách hàng sự trải nghiệm tốt nhất khi
              mua sắm các sản phẩm thời trang, trong thời gian qua XSHOP không
              ngừng mở rộng các cửa hàng khắp Hà Nội Năm 2019, mục tiêu của
              XSHOP sẽ tiếp tục mở thêm nhiều hệ thống cửa hàng nữa để đem đến
              cho khách hàng những sản phẩm thời trang phù hợp với nhu cầu, giá
              cả tốt nhất và dịch vụ hoàn hảo Mời bạn xem một số hình ảnh sinh
              động tại cửa hàng XSHOP.
            </div>
          </Col>
        </Row>
        <hr />
        <Row>
          <Col span={12}>
            <ClockCircleOutlined />
            <div>Thời gian làm việc</div>
          </Col>
          <Col span={12}>
            <PhoneOutlined /> <div> Liên Hệ</div>
          </Col>
        </Row>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
