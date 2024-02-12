import React from 'react'

export default function featured() {
  return (
    <div>
      <>
  {/* Featured Start */}
  <div className="container-fluid pt-5 " style={{backgroundColor:'#F5F5F5',  paddingLeft: "0px", paddingRight: "0px" }}>
    <div className="row px-xl-5 pb-3">
      <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
        <div
          className="d-flex align-items-center mb-4 bg-light"
          style={{ padding: 30 }}
        >
          <h1 className="fa fa-check m-0 mr-3" />
          <h5 className="font-weight-semi-bold m-0">Quality Product</h5>
        </div>
      </div>
      <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
        <div
          className="d-flex align-items-center bg-light mb-4"
          style={{ padding: 30 }}
        >
          <h1 className="fa fa-shipping-fast  m-0 mr-2" />
          <h5 className="font-weight-semi-bold m-0">Free Shipping</h5>
        </div>
      </div>
      <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
        <div
          className="d-flex align-items-center bg-light mb-4"
          style={{ padding: "30px 0 30px 0" }}
        >
          <h1 className="fas fa-exchange-alt m-0 mr-3" />
          <h5 className="font-weight-semi-bold m-0">14 Day Return</h5>
        </div>
      </div>
      <div className="col-lg-3 col-md-6 col-sm-12 pb-1">
        <div
          className="d-flex align-items-center bg-light mb-4"
          style={{ padding: 30 }}
        >
          <h1 className="fa fa-phone-volume  m-0 mr-3" />
          <h5 className="font-weight-semi-bold m-0">24/7 Support</h5>
        </div>
      </div>
    </div>
  </div>
  {/* Featured End */}
</>

    </div>
  )
}
