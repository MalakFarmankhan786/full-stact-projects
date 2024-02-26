import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import AppLayout from "../components/applayout/AppLayout";

const Profile = () => {
  const storedAuthToken = localStorage.getItem("authToken");
  const isLogged = storedAuthToken ? JSON.parse(storedAuthToken) : null;
  // const logggedUser = isLogged && jwtDecode(token);
  useEffect(() => {
    // Later this data from api
    // setLoggedUser({
    //   name: "Malak Farman Khan",
    //   image: "profile.png",
    //   email: "farman.developer786@gmai.com",
    // });
  }, [isLogged]);

  return (
    <AppLayout>
      <div className="row products fw-bold">
        <div className="col-lg-3 col-md-4 col-sm-12 col-xl-3">
          <div className="card overflow-hidden">
            <header className="card__header">
              <h1 className="product__title">{isLogged?.name}</h1>
            </header>
            <div className="card__image">
              <img
                src={
                  process.env.PUBLIC_URL + `/assets/images/${isLogged?.image}`
                }
                alt={isLogged?.name}
              />
            </div>
            <div className="card__content">
              <h6 className="product__description">{isLogged?.email}</h6>
            </div>
            <div className="card__actions" style={{marginTop:"-20px"}}>
              <Link to={`/edit-profile`} className="btn btn-edit">
                Edit Profile
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Profile;
