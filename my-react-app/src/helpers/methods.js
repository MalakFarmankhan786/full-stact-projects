import axios from "./axios";
import { toast } from "react-toastify";

const commonHeaders = {
  Accept: "application/json",
  // Authorization: `Bearer ${localStorage.getItem("authToken") || ""}`,
};


const responseOk = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  });
};

const badResponse = (message) => {
  toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
  });
};


const postRequest = async (url, data) => {
  const options = {
    url,
    method: "POST",
    headers: {
      ...commonHeaders,
      "Content-Type": "multipart/form-data",
    },
    data,
  };
  return await axios(options);
};

const getRequest = async (url) => {
  const options = {
    url,
    method: "GET",
    headers: {
      ...commonHeaders,
      "Content-Type": "application/json;charset=UTF-8",
    },
  };
  return await axios(options);
};

const deleteRequest = async (url) => {
  const options = {
    url,
    method: "DELETE",
    headers: {
      ...commonHeaders,
      "Content-Type": "application/json;charset=UTF-8",
    },
  };
  return await axios(options);
};

const putRequest = async (url, data) => {
  const options = {
    url,
    method: "PUT",
    headers: {
      ...commonHeaders,
      "Content-Type": "multipart/form-data",
    },
    data,
  };
  return await axios(options);
};

export {
  responseOk,
  badResponse,
  getRequest,
  postRequest,
  deleteRequest,
  putRequest,
};
