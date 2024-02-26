import React, { useEffect, useState } from "react";
import AppLayout from "../../components/applayout/AppLayout";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { jwtDecode } from "jwt-decode";
import productsData from "./products.json";
import AddEditProductForm from "../../components/forms/AddEditProduct";

const AddEditProduct = (props) => {
  const [formText, setFormText] = useState("Add Product");
  const [product, setProduct] = useState();
  const params = useParams();
  const isLogged = localStorage.getItem("authToken") ?? null;
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c";
  const logggedUser = isLogged && jwtDecode(token);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      title: product?.title,
      price: product?.price,
      description: product?.description,
      imageUrl: product?.imageUrl,
    },
  });

  const hasErrors =
    errors.title || errors.price || errors.image || errors.description;

  const postRequest = ({ title, price, image, description }) => {
    if (!hasErrors && !logggedUser?._id) {
      console.log(title, price, image, description)
      navigate("/");
    }
  };

  useEffect(() => {
    const selectedProduct = productsData?.find(
      (prod) => prod?.id == params?.productId
    );

    if (params?.productId) {
      setFormText("Edit Product");
      setProduct(selectedProduct);

      if (selectedProduct) {
        reset({
          title: selectedProduct?.title,
          price: selectedProduct?.price,
          description: selectedProduct?.description,
          imageUrl: selectedProduct?.imageUrl,
        });
      }
    } else {
      reset({
        title: "",
        price: "",
        description: "",
        imageUrl: "",
      });
      setFormText("Add Product");
    }
  }, [params?.productId, reset, productsData]);

  return (
    <AppLayout>
      <div className="row grid">
        <div className="col-lg-5 col-md-5 col-sm-12 col-xl-5">
          <div className="card overflow-hidden">
            <div className="card-header grid">
              <p className="fw-bold mb-0" style={{ color: "#007ea7" }}>
                {formText}
              </p>
            </div>
            <div className="card-body">
              {hasErrors && (
                <div className="row mb-4 form-errors">
                  {errors?.title &&
                  errors?.price &&
                  errors?.image &&
                  errors?.description
                    ? "All fields are required!"
                    : errors?.title
                    ? errors?.title?.message
                    : errors?.price
                    ? errors?.price?.message
                    : errors?.image
                    ? errors?.image?.message
                    : errors?.description
                    ? errors?.description?.message
                    : "All fields are required!"}
                </div>
              )}

              <AddEditProductForm
                handleSubmit={handleSubmit}
                postRequest={postRequest}
                register={register}
                errors={errors}
                formText={formText}
                product={product}
                productId={params?.productId}
              />
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default AddEditProduct;
