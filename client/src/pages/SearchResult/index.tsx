import React, { useEffect, useState } from "react";
import Footer from "components/Footer";
import Header from "components/Header";
import CardProduct from "../../components/CardProduct";
import { useSelector } from "react-redux";
import { State } from "redux/reducers";
import { Col, Row, Empty } from "antd";

const SearchResult = () => {
  const product = useSelector((state: State) => state.searchReducer.product);

  return (
    <>
      <Header />
      <div
        className="search-result-wrapper"
        style={{ padding: "2rem 2rem", minHeight: "80vh" }}
      >
        <Row gutter={[32, 32]} justify="space-between">
          {product.length > 0 ? (
            product.map((item: any) => (
              <Col span={6}>
                <CardProduct item={item} />
              </Col>
            ))
          ) : (
            <Col span={24}>
              <div
                style={{
                  marginTop: "10rem",
                  fontSize: "3rem",
                  fontWeight: "700",
                }}
              >
                Không tìm thấy kết quả
              </div>
              <Empty description={false} imageStyle={{ height: "200px" }} />
            </Col>
          )}
        </Row>
      </div>
      <Footer />
    </>
  );
};

export default SearchResult;
