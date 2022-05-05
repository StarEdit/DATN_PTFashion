import React, { useRef, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { PAY_MENT } from "api";
import { useNavigate } from "react-router-dom";

const PayPal = ({ money }) => {
  const paypal = useRef();
  const navigate = useNavigate();
  const userInfoFromStorage = localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") + "")
    : undefined;

  const payment = async () => {
    const res = await axios.get(PAY_MENT, {
      headers: {
        Authorization: `Bearer ${userInfoFromStorage.token}`,
      },
    });
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
          toast.success("Thanh toán thành công");
          payment();
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
