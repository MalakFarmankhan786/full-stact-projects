import React, { useEffect, useState } from "react";
import AppLayout from "../../components/applayout/AppLayout";
import { Link, useParams } from "react-router-dom";
import productsData from "./products.json";

const Product = () => {
  const [product, setProduct] = useState({});
  const [status, setStatus] = useState(false);
  const params = useParams();

  const storedAuthToken = localStorage.getItem("authToken");
  const isLogged = storedAuthToken ? JSON.parse(storedAuthToken) : null;

  useEffect(() => {
    const selectedProduct = productsData.find(
      (prod) => prod.id.toString() === params?.productId.toString()
    );

    setProduct(selectedProduct || {}); // Use an empty object if the product is not found
  }, [params?.productId]);

  return (
    <AppLayout>
      <div className="row products">
        <div className="col-lg-3 col-md-4 col-sm-12 col-xl-3">
          <div className="card overflow-hidden">
            <header className="card__header">
              <h1 className="product__title">{product.title}</h1>
            </header>
            <div className="card__image">
              <img
                src={
                  process.env.PUBLIC_URL + `/assets/images/${product.imageUrl}`
                }
                alt={product.title}
              />
            </div>
            <div className="card__content">
              <h2 className="product__price">${product.price}</h2>
              <p className="product__description">{product.description}</p>
            </div>
            <div className="card__actions">
              {status ? (
                <>
                  <Link
                    to={`/add-product/${product.id}`}
                    className="btn btn-edit"
                  >
                    Edit
                  </Link>
                  <Link
                    to={`/products/${product.id}`}
                    className="btn btn-delete"
                  >
                    Delete
                  </Link>
                </>
              ) : (
                <Link
                  to={isLogged ? `/cart` : "/login"}
                  className="btn"
                >
                  Add to cart
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Product;
