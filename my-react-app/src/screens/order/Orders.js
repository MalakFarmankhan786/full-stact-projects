import React, { useEffect, useState } from "react";
import collect from "collect.js";
import { Link } from "react-router-dom";
import AppLayout from "../../components/applayout/AppLayout";
import ordersData from "./orders.json";

const Orders = () => {
  const [orderData, setOrder] = useState(ordersData);
  const storedAuthToken = localStorage.getItem("authToken");
  const isLogged = storedAuthToken ? JSON.parse(storedAuthToken) : null;

  const deleteOrder = (orderId) => {
    // Find the index of the item with the specified id
    setOrder(orderData.filter((order) => order.id !== orderId));
  };

  // Calculate the total price using collect.js
  // const totalPrice = collect(cartItems).sum("price");

  useEffect(() => {
    if (isLogged?.is_staff) {
      setOrder([...orderData]);
    } else {
      setOrder(orderData.filter((order) => order?.user?.id === isLogged?.id));
    }
  }, []);
  return (
    <AppLayout>
      {orderData?.length > 0 ? (
        <div className="row orders">
          <div
            className={`${
              isLogged?.is_staff
                ? "col-lg-4 col-md-6 col-sm-12 col-xl-4"
                : "col-lg-6 col-md-6 col-sm-12 col-xl-6"
            }`}
          >
            <div className="card overflow-hidden">
              <div className="card-header grid">
                <p className="fw-bold mb-0" style={{ color: "#007ea7" }}>
                  {isLogged?.is_staff
                    ?  "Customer Orders"
                    : "Your Orders"}
                </p>
              </div>

              <ul className="list-group">
                {orderData?.map((order) => (
                  <>
                    <li className="list-group-item justify-content-between align-items-center">
                      <Link
                        to={`/orders/${order.id}`}
                        style={{ color: "#007ea7" }}
                      >
                        {order?.id.toString().slice(0, 25)}

                        {!isLogged?.is_staff && (
                          <span className="badge rounded-pill mb-1 order-price">
                            ${order?.total}
                          </span>
                        )}
                      </Link>
                      <div className="badgetext">
                        {!isLogged?.is_staff && (
                          <Link
                            className="btn btn-delete fw-bold"
                            onClick={() => deleteOrder(order.id)}
                          >
                            Delete
                          </Link>
                        )}
                      </div>
                    </li>
                  </>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div className="row grid text-center">
          <h1 className="no-record">You have no orders</h1>
        </div>
      )}
    </AppLayout>
  );
};

export default Orders;
