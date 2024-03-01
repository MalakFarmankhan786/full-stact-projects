import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import AppLayout from "../components/applayout/AppLayout";
import { connect } from "react-redux";

const Profile = (props) => {
  const [isLogged, setIsLogged] = useState(null);
  const [decodedToken, setDecodedToken] = useState(null);

  const [userProfile,setUserProfile] = useState({})
  // const logggedUser = isLogged && jwtDecode(token);


  useEffect(() => {
    // Assuming you have the token stored in localStorage
    const token = localStorage.getItem("authToken");

    if (token) {
      const decoded = jwtDecode(token);
      setDecodedToken(decoded);
      setIsLogged(token);
    }

    if(props?.userProfile != userProfile){
      setUserProfile(props?.userProfile)
    }

  }, [props,userProfile]);

  return (
    <AppLayout>
      <div className="row products fw-bold">
        <div className="col-lg-3 col-md-4 col-sm-12 col-xl-3">
          <div className="card overflow-hidden">
            <header className="card__header">
              <h1 className="product__title">{userProfile?.full_name}</h1>
            </header>
            <div className="card__image">
              <img
                src={
                  process.env.PUBLIC_URL + `/assets/images/${isLogged?.image}`
                }
                alt={userProfile?.full_name}
              />
            </div>
            <div className="card__content">
              <h6 className="product__description">{userProfile?.email}</h6>
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


const mapStateToProps = (state) => {
  return {
    userProfile:state.userProfile.userProfileData
  };
};
export default connect(mapStateToProps)(Profile);
