import React from "react";

const Footer = () => {
  return (
    <div className="footer border footer-1 bg-cyan">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-12 social text-center">
            <ul className="text-center d-inline-block">
              <li>
                <a
                  className="social-icon"
                  href="https://www.facebook.com/"
                  target="_blank"
                >
                  <i className="fa fa-facebook"></i>
                </a>
              </li>
              <li>
                <a
                  className="social-icon"
                  href="https://twitter.com/"
                  target="_blank"
                >
                  <i className="fa fa-twitter"></i>
                </a>
              </li>
              <li>
                <a className="social-icon" href="javascript:void(0)">
                  <i className="fa fa-rss"></i>
                </a>
              </li>
              <li>
                <a
                  className="social-icon"
                  href="https://www.youtube.com/"
                  target="_blank"
                >
                  <i className="fa fa-youtube"></i>
                </a>
              </li>
              <li>
                <a
                  className="social-icon"
                  href="https://www.linkedin.com/"
                  target="_blank"
                >
                  <i className="fa fa-linkedin"></i>
                </a>
              </li>
              <li>
                <a
                  className="social-icon"
                  href="https://myaccount.google.com/"
                  target="_blank"
                >
                  <i className="fa fa-google-plus"></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="col-lg-12 col-sm-12 mt-3 mt-lg-0 text-center footer-bottom mb-1">
            Copyright © 2022 <a href="javascript:void(0)">Node Js</a>. Designed
            with by <a href="javascript:void(0)">Malak Farman Khan</a> All
            rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
