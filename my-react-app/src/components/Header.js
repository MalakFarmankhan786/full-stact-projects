import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { jwtDecode } from "jwt-decode";

import notificationsData from "../screens/notification/notifications.json";
import cartData from "../screens/cart/cartData.json";

const Header = () => {
  const [isLogged, setIsLogged] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);
  const [notifications, setNotifications] = useState(notificationsData);
  let path = window.location.pathname;

  path = path.split("/")[1] ? path.split("/")[1] : "/";
  const navigate = useNavigate();


  
  const removeToken = () => {
    localStorage.removeItem("authToken");
    setIsLogged(null);
    setDecodedToken(null);
    navigate("/");
  };
  const handleDeleteNotification = (notificationId) => {
    // Filter out the notification with the specified id
    const updatedNotifications = notifications.filter(
      (notification) => notification.id !== notificationId
    );

    // Update the state with the modified data
    setNotifications(updatedNotifications);
    document.querySelector(".notification-dropdown").classList.add("show");

    // Here you can add additional logic to delete the notification on the server,
    // for example, by sending a DELETE request to an API endpoint.
  };

  const totalCart = cartData.filter(
    (cart) => cart?.user?.id === isLogged?.id
  )?.length;

  useEffect(() => {
    // Assuming you have the token stored in localStorage
    const token = localStorage.getItem("authToken");

    if (token) {
      const decoded = jwtDecode(token);
      setDecodedToken(decoded);
      setIsLogged(token);
    }
  }, []);
  return (
    <>
      <div className=" app-header header sticky bg-cyan">
        <div
          className="d-flex order-lg-2 ms-auto header-right-icons"
          style={{ width: "100%" }}
        >
          <button
            className="navbar-toggler navresponsive-toggler d-lg-none ms-auto"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent-4"
            aria-controls="navbarSupportedContent-4"
            aria-expanded="false"
            aria-label="Toggle navigation"
            style={{ width: "100%", textAlign: "end", paddingInline: "10px" }}
          >
            <span className="navbar-toggler-icon fe fe-more-vertical text-white"></span>
          </button>

          <div className="navbar navbar-collapse responsive-navbar p-0">
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent-4"
            >
              <div className="d-flex " id="header-right">
                <div className="left-menu">
                  <ul className="side-menu">
                    <li className="slide">
                      <Link
                        className="side-menu__item"
                        data-bs-toggle="slide"
                        to="/"
                      >
                        <span
                          className={`side-menu__label ${
                            path === "/" ? " active" : ""
                          }`}
                        >
                          Home
                        </span>
                      </Link>
                    </li>
                    <li className="slide">
                      <Link
                        className="side-menu__item"
                        data-bs-toggle="slide"
                        to="/products"
                      >
                        <span
                          className={`side-menu__label ${
                            path === "products" || path === "product-lists"
                              ? " active"
                              : ""
                          }`}
                        >
                          Products
                        </span>
                      </Link>
                    </li>
                    {isLogged && (
                      <>
                        {!decodedToken?.is_staff && (
                          <li className="slide">
                            <Link
                              className="side-menu__item"
                              data-bs-toggle="slide"
                              to="/cart"
                            >
                              <span
                                className={`side-menu__label ${
                                  path === "cart" ? " active" : ""
                                }`}
                              >
                                Cart
                              </span>
                              {totalCart > 0 && (
                                <span className="badge cart-badge">
                                  {totalCart}
                                </span>
                              )}
                            </Link>
                          </li>
                        )}
                        <li className="slide">
                          <Link
                            className="side-menu__item"
                            data-bs-toggle="slide"
                            to="/orders"
                          >
                            <span
                              className={`side-menu__label ${
                                path === "orders" ? " active" : ""
                              }`}
                            >
                              Orders
                            </span>
                          </Link>
                        </li>
                        {decodedToken?.is_staff && (
                          <li className="slide">
                            <Link
                              className="side-menu__item"
                              data-bs-toggle="slide"
                              to="/add-product"
                            >
                              <span
                                className={`side-menu__label ${
                                  path === "add-product" ? " active" : ""
                                }`}
                              >
                                Add Product
                              </span>
                            </Link>
                          </li>
                        )}
                      </>
                    )}
                  </ul>{" "}
                </div>
                <div className="right-menu">
                  <ul className="side-menu">
                    {!isLogged ? (
                      <>
                        <li className="slide auth">
                          <Link
                            className="side-menu__item"
                            data-bs-toggle="slide"
                            to="/login"
                          >
                            <span
                              className={`side-menu__label ${
                                path === "login" ||
                                path === "forgot-password" ||
                                path === "reset-password"
                                  ? "active"
                                  : ""
                              }`}
                            >
                              Login
                            </span>
                          </Link>
                        </li>
                        <li className="slide auth">
                          <Link
                            className="side-menu__item"
                            data-bs-toggle="slide"
                            to="/signup"
                          >
                            <span
                              className={`side-menu__label ${
                                path === "signup" ? " active" : ""
                              }`}
                            >
                              Signup
                            </span>
                          </Link>
                        </li>
                      </>
                    ) : (
                      <>
                        <div className="dropdown  d-flex notifications slide">
                          <Link
                            className="nav-link icon side-menu__item notification-bell"
                            data-bs-toggle="dropdown"
                          >
                            <i className="fe fe-bell"></i>
                            {isLogged && notifications?.length > 0 && (
                              <span className="pulse"></span>
                            )}
                          </Link>
                          <div className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notification-dropdown">
                            <div className="drop-heading border-bottom">
                              <div className="d-flex">
                                <h6 className="mt-1 mb-0 fs-16 fw-semibold text-dark">
                                  Notifications
                                </h6>
                              </div>
                            </div>
                            <div className="notifications-menu">
                              {notifications?.length > 0 &&
                                notifications?.map((notification) => (
                                  <div
                                    className="dropdown-item d-flex p-4"
                                    key={notification.id}
                                  >
                                    <div className="me-2 notifyimg  bg-primary brround box-shadow-primary">
                                      <i
                                        className={`fe ${notification.icon}`}
                                      ></i>
                                    </div>
                                    <div className="mt-1 wd-80p">
                                      <h5 className="notification-label mb-1">
                                        {notification.label}{" "}
                                      </h5>
                                      <span className="notification-subtext">
                                        {notification.subtext}{" "}
                                      </span>
                                    </div>
                                    <div className="ms-auto text-end d-flex">
                                      <a
                                        href="javascript:void(0)"
                                        className="fs-16  p-0 "
                                        onClick={() =>
                                          handleDeleteNotification(
                                            notification.id
                                          )
                                        }
                                      >
                                        <i
                                          className="fe fe-trash-2 border brround d-block p-2 notification-trash"
                                          style={{ color: "#007ea7" }}
                                        ></i>
                                      </a>
                                    </div>
                                  </div>
                                ))}
                            </div>
                            <div className="dropdown-divider m-0"></div>
                            <Link
                              to=""
                              className="dropdown-item text-center p-3 text-muted"
                            >
                              View all Notification
                            </Link>
                          </div>
                        </div>
                        <div
                          className="dropdown d-flex profile-1"
                          // style={{ paddingTop: "10px" }}
                        >
                          <Link
                            to="javascript:void(0)"
                            data-bs-toggle="dropdown"
                            className="nav-link leading-none d-flex"
                          >
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                `/assets/images/profile-3.jpeg`
                              }
                              alt="profile-user"
                              className="avatar  profile-user brround cover-image"
                            />
                          </Link>
                          <div className="__dropdown dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                            <div className="drop-heading">
                              <div className="text-center">
                                <h5 className="text-dark mb-0 fs-14 fw-semibold">
                                  {decodedToken?.email}
                                </h5>
                                <small className="text-muted">
                                  {decodedToken?.is_staff
                                    ? "Super Admin"
                                    : "Admin"}
                                </small>
                              </div>
                            </div>
                            <div className="dropdown-divider m-0"></div>
                            <Link className="dropdown-item" to="/profile">
                              <i className="dropdown-icon fe fe-user"></i>{" "}
                              Profile
                            </Link>
                            <Link className="dropdown-item" to="/edit-profile">
                              <i className="dropdown-icon fe fe-edit"></i> Edit
                              Profile
                            </Link>
                            <Link
                              className="dropdown-item"
                              to=""
                              onClick={removeToken}
                            >
                              <i className="dropdown-icon fa fa-sign-out"></i>{" "}
                              Sign out
                            </Link>
                          </div>
                        </div>
                      </>
                    )}
                  </ul>

                  {/* <!-- NOTIFICATIONS --> */}

                  {/* <!-- SIDE-MENU --> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
