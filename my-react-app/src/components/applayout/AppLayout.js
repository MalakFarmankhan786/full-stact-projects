import React from "react";
import GetRequests from "../../GetRequests";
import Footer from "../Footer";
import Header from "../Header";
const AppLayout = (props) => {

  return (
    <>
      <div className="page">
        <div className="page-main">
          <GetRequests />
          <Header />
          <div className="side-app" style={{ marginTop: "120px" }}>
            <div className="content-container">
              <div className="row">
                <div className="col-lg-12 col-md-12 col-sm-12 col-xl-12">
                  {props.children}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      <a href="#top" id="back-to-top">
        <i className="fa fa-angle-up"></i>
      </a>
    </>
  );
};

export default AppLayout;
