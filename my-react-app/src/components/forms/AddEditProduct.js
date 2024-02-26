import React from "react";

const AddEditProduct = (props) => {
  return (
    <form onSubmit={props?.handleSubmit(props?.postRequest)}>
      <div className="row mb-4">
        <input
          {...props?.register("title", {
            required: {
              value: true,
              message: "Title field is required!",
            },
          })}
          type="text"
          className={`form-control ${props?.errors?.title && "invalid"}`}
          placeholder="Enter Product Title"
        />
      </div>
      <div className="row mb-4">
        <input
          type="number"
          {...props?.register("price", {
            required: {
              value: true,
              message: "Price field is required!",
            },
          })}
          className={`form-control ${props?.errors?.price && "invalid"}`}
          placeholder="Enter Product Price"
        />
      </div>
      <div className="row mb-4">
        <input
          {...props?.register("image", {
            required: {
              value: true,
              message: "Image field is required!",
            },
          })}
          type="file"
          className={`form-control ${props?.errors?.image && "invalid"}`}
          placeholder="Upload Product Image"
        />
      </div>
      {props?.productId && (
        <div className="row mb-4">
          <img
            style={{
              width: "100px",
              height: "80px",
              borderRadius: "100%",
              marginLeft: "-10px",
            }}
            src={
              process.env.PUBLIC_URL +
              `/assets/images/${props?.product?.imageUrl}`
            }
            alt={props?.product?.title}
          />
        </div>
      )}

      <div className="row mb-4">
        <textarea
          rows={6}
          {...props?.register("description", {
            required: {
              value: true,
              message: "Description field is required!",
            },
            minLength: {
              value: 5,
              message: "Description should be 5 characters long!",
            },
          })}
          type="text"
          className={`form-control ${props?.errors?.description && "invalid"}`}
          placeholder="Enter Product Description"
        />
      </div>
      <div className="grid">
        <button type="submit" className="btn fw-bold">
          {props?.formText}
        </button>
      </div>
    </form>
  );
};

export default AddEditProduct;
