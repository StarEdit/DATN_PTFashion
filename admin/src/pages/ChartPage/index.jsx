import React from "react";
import { Row, Col } from "antd";
import Header from "../../components/Header";
import LeftSidebar from "../../components/LeftSidebar";

const ChartPage = () => {
  return (
    <>
      <Row>
        <Col span={4}>
          <LeftSidebar />
        </Col>
        <Col span={20}>
          <Row>
            <Col span={24}>
              <Header />
            </Col>
            <Col span={24}>
              <div style={{ height: "1000px", marginTop: "6rem" }}>
                ChartPage
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default ChartPage;
