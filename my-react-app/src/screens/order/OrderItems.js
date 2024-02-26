import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import AppLayout from "../../components/applayout/AppLayout";
import { Link, useParams } from "react-router-dom";
import ordersData from "./orders.json";

const OrderItems = () => {
  const [orderData, setOrder] = useState(ordersData);
  const params = useParams();

  useEffect(() => {
    if (params?.orderId) {
      const order = ordersData.find(
        (order) => order?.id?.toString() === params?.orderId?.toString()
      );
      setOrder(order);
    }
  }, [params?.orderId]);
  return (
    <AppLayout>
      {orderData ? (
        <div className="row orders">

          {orderData?.product?.map((product) => (
            <div
              key={product.id}
              className={`col-lg-3 col-md-6 col-sm-12 col-xl-3`}
            >
              <div className="card overflow-hidden">
                <header className="card__header">
                  <h1 className="order__title">{product.title}</h1>
                </header>
                <div className="card__image">
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      `/assets/images/${product.imageUrl}`
                    }
                    alt={product.title}
                  />
                </div>
                <div className="card__content">
                  <h2 className="order__price">${product.price}</h2>
                  <p className="order__description">{product.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="row grid text-center">
          <h1 className="no-record">You have no product in order</h1>
        </div>
      )}
    </AppLayout>
  );
};

export default OrderItems;
