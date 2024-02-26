import React, { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import AppLayout from "../../components/applayout/AppLayout";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import productsData from "./products.json";

const itemsPerPage = 8;
const Products = () => {
  const [products, setProducts] = useState(productsData);
  const [filteredProducts, setFilteredProducts] = useState([...products]);
  const [searchBy, setSearchBy] = useState("");

  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = Math.min(itemOffset + itemsPerPage, filteredProducts.length);
  const currentItems = filteredProducts.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(filteredProducts.length / itemsPerPage);
  

  const storedAuthToken = localStorage.getItem("authToken");
  const isLogged = storedAuthToken ? JSON.parse(storedAuthToken) : null;

  
  const isLargeScreen = useMediaQuery({ query: "(max-width: 1300px)" });
  const isMediumScreen = useMediaQuery({ query: "(max-width: 991px)" });
  const isSmallScreen = useMediaQuery({ query: "(max-width: 700px)" });

  const filterBy = (e) => {
    let value = e?.target?.value;
    setSearchBy(value);
    if (value) {
      setFilteredProducts(
        products.filter(
          (prod) =>
            prod.title.toLowerCase().includes(value.toLowerCase()) ||
            prod.description.toLowerCase().includes(value.toLowerCase()) ||
            prod.price.toString().includes(value)
        )
      );
    } else {
      setFilteredProducts([...products]);
    }
    setItemOffset(0); // Reset page offset when filter changes
  };

  const deleteProduct = (id) => {
    setProducts(products?.filter((prod) => prod?.id !== id));
  };

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % filteredProducts.length;
    setItemOffset(newOffset);
  };

  const renderProductCards = () => {
    return currentItems.map((product) => (
      <div key={product.id} className={`col-lg-3 col-md-6 col-sm-12 col-xl-3 `}>
        <div className="card overflow-hidden">
          <header className="card__header">
            <h1 className="product__title">{product.title}</h1>
          </header>
          <div className="card__image">
            <img
              src={`${process.env.PUBLIC_URL}assets/images/${product.imageUrl}`}
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
                <Link to={`/products/${product.id}`} className="btn btn-view">
                  View
                </Link>
                <Link to={`/add-product/${product.id}`} className="btn btn-edit">
                  Edit
                </Link>
                <Link
                  className="btn btn-delete"
                  onClick={() => deleteProduct(product.id)}
                >
                  Delete
                </Link>
              </>
            ) : (
              <>
                <Link to={`/products/${product.id}`} className="btn">
                  Details
                </Link>
                <Link to={isLogged ? `/cart` : "/login" } className="btn">
                  Add to cart
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    ));
  };

  return (
    <AppLayout>
      
      <div className="row products">
        <div className="products-header">
          <h1 className="heading">All Products</h1>
          <div className="heading-bottom"></div>
        </div>
        <div
          className="col-lg-12 col-md-12 col-sm-12 col-xl-12"
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <div className={`searching-container mb-4 ${isSmallScreen && "small-screen"}`}>
            <input
              type="text"
              className="form-control"
              placeholder="Filter by......."
              onChange={filterBy}
            />
          </div>
        </div>
        {currentItems.length > 0 ? (
          renderProductCards()
        ) : (
          <div className="row grid text-center">
            <h1 className="no-record">Products Not Found</h1>
          </div>
        )}
      </div>
      <ReactPaginate
        breakLabel="..."
        nextLabel="next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={5}
        pageCount={pageCount}
        previousLabel="previous"
        renderOnZeroPageCount={null}
      />
    </AppLayout>
  );
};

export default Products;
