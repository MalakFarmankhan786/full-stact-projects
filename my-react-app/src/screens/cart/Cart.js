import React, { useEffect, useState } from "react";
import AppLayout from "../../components/applayout/AppLayout";
import cartData from "./cartData.json";
import collect from "collect.js";
import { Link, useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState(cartData);
  const navigate = useNavigate();
  const storedAuthToken = localStorage.getItem("authToken");
  const isLogged = storedAuthToken ? JSON.parse(storedAuthToken) : null;

  const deleteCartItem = (cartItemId) => {
    // Find the index of the item with the specified id
    const index = cartItems.findIndex((item) => item.id === cartItemId);

    if (index !== -1) {
      const updatedCartItems = [...cartItems];

      if (updatedCartItems[index].qty > 1) {
        // If quantity is greater than 1, decrement the quantity and adjust the price
        updatedCartItems[index].qty -= 1;
        updatedCartItems[index].price =
          updatedCartItems[index].price / (updatedCartItems[index].qty + 1);
      } else {
        // If quantity is 1, remove the item
        updatedCartItems.splice(index, 1);
      }

      // Update the state with the modified data
      setCartItems(updatedCartItems);

      // Simulate saving the modified data back to the JSON file
      // In a real-world scenario, you would make an HTTP request to a server to handle this operation.
      // For example, you might use fetch or axios to send a PATCH request to a server endpoint.
    }
  };

  const PostOrder = () => {
    //later i will store this cart in database
    navigate("/orders");
  };
  // Calculate the total price using collect.js
  const totalPrice = collect(cartItems).sum("price");

  useEffect(() => {
    setCartItems(cartItems.filter((cart) => cart?.user?.id === isLogged?.id));
  }, [isLogged]);
  return (
    <AppLayout>
      {cartItems?.length > 0 ? (
        <div className="row carts">
          <div className="col-lg-8 col-md-8 col-sm-12 col-xl-8">
            <div className="card overflow-hidden">
              <div className="card-header cart-header">
                <div>
                  <button
                    className="mb-0 text-white btn"
                    onClick={PostOrder}
                  >
                    Order Now
                  </button>
                </div>
              </div>
              {cartItems?.map((cart) => (
                <div className="" key={cart?.id}>
                  <div className="d-flex p-4">
                    <img
                      className="avatar avatar-xl br-5 me-3 align-self-center cover-image"
                      src={
                        process.env.PUBLIC_URL +
                        `/assets/images/${cart?.product?.imageUrl}`
                      }
                      alt={cart?.product?.title}
                    />
                    <div className="wd-50p cart-content">
                      <h5 className="">{cart?.product?.title}</h5>
                      <p className="fs-13 text-muted mb-0">
                        Quantity: {cart?.qty < 10 ? "0" + cart?.qty : cart?.qty}
                      </p>
                    </div>
                    <div className="ms-auto text-end d-flex fs-16 grid">
                      <span className="fs-16 text-dark d-none d-sm-block px-4 py-1">
                        ${cart?.price?.toFixed(2)}
                      </span>
                      <a
                        href="javascript:void(0)"
                        className="fs-16 p-0 cart-trash"
                        onClick={() => deleteCartItem(cart?.id)}
                      >
                        <i className="fe fe-trash-2 border text-danger brround d-block p-2"></i>
                      </a>
                    </div>
                  </div>
                  <div className="dropdown-divider m-0"></div>
                </div>
              ))}
              <div className="dropdown-divider m-0"></div>

              <div className="no-record text-end px-5 py-2">
                <h5>Total ${totalPrice.toFixed(2)}</h5>{" "}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="row grid text-center">
          <h1 className="no-record">Your Cart Is Empty</h1>
        </div>
      )}
    </AppLayout>
  );
};

export default Cart;
