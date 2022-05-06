import React, { useRef, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { CREATE_ORDER } from "api";

import { useNavigate } from "react-router-dom";

const PayPal = ({ name, address, phone, email, money }) => {
  const paypal = useRef();
  const navigate = useNavigate();
  const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") + "")
    : undefined;

  const createOrderUser = async (status) => {
    const res = await axios.post(
      CREATE_ORDER,
      {
        userName: name,
        address: address,
        email: email,
        phoneNumber: phone,
        total: money,
        status: status,
      },
      {
        headers: {
          Authorization: `Bearer ${userInfoFromStorage.token}`,
        },
      }
    );

    if (res.data) {
      toast.success(
        "Đơn hàng của bạn đã thanh toán!!! Chúng tôi sẽ gửi hàng đến bạn sớm nhất"
      );
    }
  };

  useEffect(() => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "Tổng đơn hàng",
                amount: {
                  currency_code: "CAD",
                  value: money,
                },
              },
            ],
          });
        },
        onApprove: (data, actions) => {
          createOrderUser(2);
          navigate("/");
        },
        onError: (err) => {
          toast.success("Lỗi thanh toán");
        },
      })
      .render(paypal.current);
  }, []);

  return (
    <div>
      <div ref={paypal}></div>
    </div>
  );
};

export default PayPal;
