import React, { useState } from 'react';
import { Link } from 'react-router-dom';
export default function Footers() {
  const [activeTab, setActiveTab] = useState(0);

  const changeTab = (tabIndex) => {
    setActiveTab(tabIndex);
    // Perform other actions related to changing the tab
  };
  return (
<>
<div
    style={{
      backgroundColor: "white",
      width: "100%",
      position: "relative",
      bottom: "0"
    }}
  >
   {/* Footer Start */}
   <div className="container-fluid bg-light text-dark text-secondary"  style={{ textAlign:'left',}}>
    <div className="row px-xl-5 pt-5">
      <div className="col-lg-4 col-md-12 mb-5 pr-3 pr-xl-5">
        <h5 className=" text-uppercase text-dark mb-4">Get In Touch</h5>
        <p className="mb-4 text-dark">
          No dolore ipsum accusam no lorem. Invidunt sed clita kasd clita et et
          dolor sed dolor. Rebum tempor no vero est magna amet no
        </p>
        <p className="mb-2 text-dark">
          <i className="fa fa-map-marker-alt text-dark mr-3" />
          123 Street, New Mumbai, India
        </p>
        <p className="mb-2 text-dark">
          <i className="fa fa-envelope text-dark  mr-3" />
          info@example.com
        </p>
        <p className="mb-0 text-dark">
          <i className="fa fa-phone-alt  text-dark  mr-3" />
          +012 345 67890
        </p>
      </div>
      <div className="col-lg-8 col-md-12">
        <div className="row">
          <div className="col-md-4 mb-5">
            <h5 className=" text-uppercase text-dark mb-4 text-dark">Quick Links</h5>
            <div className="d-flex flex-column justify-content-start">
              <Link className="text-dark mb-2" to="#">
                <i className="fa fa-angle-right mr-2" />
                Home
              </Link>
              <Link className=" text-dark mb-2" to="#">
                <i className="fa fa-angle-right mr-2" />
                Men's Collection
              </Link>
            </div>
          </div>
          <div className="col-md-4 mb-5">
            <h5 className="text-uppercase text-dark mb-4 text-dark">My Account</h5>
            <div className="d-flex flex-column justify-content-start">
              <Link className="text-dark mb-2" to="">
                <i className="fa fa-angle-right mr-2" />
                Home
              </Link>
            </div>
          </div>
          <div className="col-md-4 mb-5 text-dark">
            <h5 className=" text-uppercase text-dark mb-4">Newsletter</h5>
            <p>Duo stet tempor ipsum sit amet magna ipsum tempor est</p>
            <form action="">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Your Email Address"
                />
                <div className="input-group-append">
                  <button className="btn btn-primary text-dark">Sign Up</button>
                </div>
              </div>
            </form>
            <h6 className=" text-dark text-uppercase mt-4 mb-3">
              Follow Us
            </h6>
            <div className="d-flex">
              <Link className="btn btn-primary btn-square mr-2" to="#">
                <i className="fab fa-twitter" />
              </Link>
              <Link className="btn btn-primary btn-square mr-2" to="#">
                <i className="fab fa-facebook-f" />
              </Link>
              <Link className="btn btn-primary btn-square mr-2" to="#">
                <i className="fab fa-linkedin-in" />
              </Link>
              <Link className="btn btn-primary btn-square" to="#">
                <i className="fab fa-instagram" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      className="row border-top mx-xl-5 py-4"
      style={{ borderColor: "rgba(256, 256, 256, .1) !important" }}
    >
      <div className="col-md-6 px-xl-0">
        <p className="mb-md-0 text-center text-md-left text-dark">
          ©{" "}
          <Link className="text-dark" to="#">
            Domain
          </Link>
          . All Rights Reserved. Designed by
          <Link className="text-dark" to="">
            Marcks Training and It Services
          </Link>
          {/* <br>Distributed By: <a href="" target="_blank">Marcks</a> */}
        </p>
      </div>
      <div className="col-md-6 px-xl-0 text-center text-md-right">
        <img className="img-fluid" src="img/payments.png" alt="" />
      </div>
    </div>
  </div>
{/* Bottom Navigation */}
<div className="bottom-navigation">
        <Link
          to="/home"
          className={`nav-item ${activeTab === 0 ? 'active' : ''}`}
          onClick={() => changeTab(0)}
        >
          Home
        </Link>
        <Link
          to="/mens"
          className={`nav-item ${activeTab === 1 ? 'active' : ''}`}
          onClick={() => changeTab(1)}
        >
          Men's Collection
        </Link>
        <Link
          to="/cart"
          className={`nav-item ${activeTab === 2 ? 'active' : ''}`}
          onClick={() => changeTab(2)}
        >
          My orders
        </Link>
      </div>
      </div>
</>
)
}



