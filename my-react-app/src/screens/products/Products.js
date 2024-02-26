import React, { useState } from "react";
import { useMediaQuery } from "react-responsive";
import AppLayout from "../../components/applayout/AppLayout";
import { Link } from "react-router-dom";
import productsData from "./products.json";

const Products = () => {
  const [status, setStatus] = useState(true);
  const [startIndex, setStartIndex] = useState(0);
  const [products, setProducts] = useState(productsData);

  const storedAuthToken = localStorage.getItem("authToken");
  const isLogged = storedAuthToken ? JSON.parse(storedAuthToken) : null;
  console.log(isLogged);
  const isLargeScreen = useMediaQuery({
    query: "(max-width: 1300px)",
  });
  const isMediumScreen = useMediaQuery({
    query: "(max-width: 991px)",
  });
  const isSmallScreen = useMediaQuery({
    query: "(max-width: 700px)",
  });

  const handleNext = () => {
    const remainingItems = products.length - (startIndex + 4);
    if (remainingItems > 0) {
      setStartIndex((prevIndex) => prevIndex + 1);
    } else if (remainingItems <= 0 && startIndex < products.length - 4) {
      setStartIndex((prevIndex) => prevIndex + remainingItems);
    }
  };

  const handlePrev = () => {
    setStartIndex((prevIndex) => {
      if (prevIndex === 0) {
        return 0;
      } else {
        return prevIndex - 1;
      }
    });
  };

  const deleteProduct = (id) => {
    setProducts(products.filter((prod) => prod.id !== id));
  };

  const displayedProducts = products.slice(startIndex, startIndex + 4);

  return (
    <AppLayout>
      {displayedProducts.length > 0 ? (
        <div className="row products">
          <div className="products-header">
            <h1 className="heading">Our Products</h1>
            <div className="heading-bottom"></div>
          </div>

          {displayedProducts.map((product) => (
            <div
              key={product.id}
              className={`col-lg-3 col-md-6 col-sm-6 col-xl-3 ${
                isSmallScreen ? "d-none" : ""
              }`}
            >
              <div className="card overflow-hidden">
                <header className="card__header">
                  <h1 className="product__title">{product.title}</h1>
                </header>
                <div className="card__image">
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      `assets/images/${product.imageUrl}`
                    }
                    alt={product.title}
                  />
                </div>
                <div className="card__content">
                  <h2 className="product__price">${product.price}</h2>
                  <p className="product__description">{product.description}</p>
                </div>
                <div className="card__actions">
                  {isLogged?.is_staff ? (
                    <>
                      <Link
                        to={`/products/${product.id}`}
                        className="btn btn-view fw-bold"
                      >
                        View
                      </Link>
                      <Link
                        to={`/add-product/${product.id}`}
                        className="btn btn-edit fw-bold"
                      >
                        Edit
                      </Link>
                      <Link
                        className="btn btn-delete fw-bold"
                        onClick={() => deleteProduct(product.id)}
                      >
                        Delete
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to={`/products/${product.id}`}
                        className="btn fw-bold"
                      >
                        Details
                      </Link>
                      <Link
                        to={isLogged ? `/cart` : "/login"}
                        className="btn"
                      >
                        Add to cart
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}

          {isSmallScreen && (
            <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
              <div className="card overflow-hidden">
                <header className="card__header">
                  <h1 className="product__title">
                    {displayedProducts[0].title}
                  </h1>
                </header>
                <div className="card__image">
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      `assets/images/${displayedProducts[0].imageUrl}`
                    }
                    alt={displayedProducts[0].title}
                  />
                </div>
                <div className="card__content">
                  <h2 className="product__price">
                    ${displayedProducts[0].price}
                  </h2>
                  <p className="product__description">
                    {displayedProducts[0].description}
                  </p>
                </div>
                <div className="card__actions">
                  {isLogged?.is_staff ? (
                    <>
                      <Link
                        to={`/products/${displayedProducts[0].id}`}
                        className="btn btn-view fw-bold"
                      >
                        View
                      </Link>
                      <Link
                        to={`/add-product/${displayedProducts[0].id}`}
                        className="btn btn-edit fw-bold"
                      >
                        Edit
                      </Link>
                      <Link
                        className="btn btn-delete fw-bold"
                        onClick={() => deleteProduct(displayedProducts[0].id)}
                      >
                        Delete
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to={`/products/${displayedProducts[0].id}`}
                        className="btn fw-bold"
                      >
                        Details
                      </Link>
                      <Link
                        to={isLogged ? `/cart` : "/login"}
                        className="btn"
                      >
                        Add to cart
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="grid">
            <button
              onClick={handlePrev}
              className={`btn fw-bold ${
                isSmallScreen || isMediumScreen ? "d-none" : ""
              }`}
            >
              Previous
            </button>

            <Link to={`/product-lists`} className="btn fw-bold">
              See All Products
            </Link>
            <button
              onClick={handleNext}
              className={`btn fw-bold ${
                isSmallScreen || isMediumScreen ? "d-none" : ""
              }`}
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        <div className="row grid text-center">
          <h1 className="no-record">Products Not Found</h1>
        </div>
      )}
    </AppLayout>
  );
};

export default Products;
