import { Col, Pagination, Row, Select } from "antd";
import { GET_CATEGORY, GET_PRODUCT, GET_PRODUCT_CATEGORY } from "api";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Product } from "types/product.types";
import CardProduct from "../../components/CardProduct";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

import "./style.css";

const { Option } = Select;

const ProductPage = () => {
  const [categories, setCategories] = useState<any>();
  const [products, setProducts] = useState<any>();
  const { categoryId } = useParams();

  useEffect(() => {
    getAllCategories();
    getAllProducts();
  }, []);

  useEffect(() => {
    getProductByCategory();
  }, [categoryId]);

  const getAllCategories = async () => {
    const res = await axios.get(GET_CATEGORY);

    if (res.data) {
      setCategories(res.data.categories);
    }
  };

  const getProductByCategory = async () => {
    const res = await axios.get(`${GET_PRODUCT_CATEGORY}/${categoryId}`);

    if (res.data) {
      setProducts(res.data.products);
    }
  };

  const getAllProducts = async () => {
    const res = await axios.get(`${GET_PRODUCT}`);

    if (res.data) {
      setProducts(res.data.products);
    }
  };

  return (
    <>
      <Header />
      <hr />
      <div className="product" style={{ minHeight: "80vh" }}>
        <Row gutter={[32, 32]}>
          <Col span={6}>
            <Row>
              <Col span={24}>
                <div className="product-category">
                  <div className="category-list">
                    <h3>Danh mục sản phẩm</h3>
                    {categories &&
                      categories?.map((item: any) => (
                        <div className="category-item" key={item._id}>
                          <Link to={item._id}>{item.category_name}</Link>
                        </div>
                      ))}
                  </div>
                </div>
              </Col>
              <hr />
              {/* <Col span={24}>
                <div className="sort-action">
                  <div className="sort-title">Sắp xếp theo</div>
                  <Select defaultValue="Tên sản phẩm" style={{ width: 200 }}>
                    <Option value="name">Tên sản phẩm</Option>
                    <Option value="new">Mới nhất</Option>
                    <Option value="increase">Giá tăng dần</Option>
                    <Option value="decrease">Giá giảm dần</Option>
                  </Select>
                </div>
              </Col> */}
            </Row>
          </Col>
          <Col span={18}>
            <div className="list-product">
              <Row gutter={[32, 32]}>
                {products &&
                  products?.map((item: Product) => (
                    <Col key={item._id} span={6}>
                      <CardProduct item={item} />
                    </Col>
                  ))}
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
