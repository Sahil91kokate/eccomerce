import React from 'react'
import { Link } from 'react-router-dom'

export default function Carousel() {
  return (
    <>
  <div
    className="container-fluid bg-secondary text-secondary"
    style={{ width: "100vw !important", position: "fixed" }}
  >
    <div className="row" style={{ padding: "0px",width:"100vw" }}>
    <div className="col-md-12" style={{ paddingLeft: "0px", paddingRight: "0px" }}>
        <div
          id="header-carousel"
          className="carousel slide carousel-fade mb-lg-0"
          data-ride="carousel"  
        >
          <ol className="carousel-indicators">
            <li
              data-target="#header-carousel"
              data-slide-to={0}
              className="active"
            />
            <li data-target="#header-carousel" data-slide-to={1} />
            <li data-target="#header-carousel" data-slide-to={2} />
          </ol>
          <div className="carousel-inner">
            <div
              className="carousel-item position-relative active"
              style={{ height: "100vh" }}
            >
              <img
                className="position-relative w-100 h-100"
                src="img/fun123.jpg" alt=''
                style={{ objectFit: "cover" }}
              />
              <div className="carousel-caption d-flex flex-column align-items-center justify-content-center"  style={{padding:"0px"}}>
                <div className="p-3" style={{ maxWidth: "100% "}}>
                  <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">
                    Men Fashion
                  </h1>
                  <p className="mx-md-5 px-5 animate__animated animate__bounceIn"   style={{color:"white"}}>
                    <big>
                      "Indulge in the fusion of comfort and sophistication; shop
                      our range of men's fashion essentials curated to redefine
                      your style journey.
                    </big>
                  </p>
                  <Link
                    className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp"
                    to="#"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
            <div
              className="carousel-item position-relative"
              style={{ height: "100vh" ,}}
            >
              <img
                className="position-absolute w-100 h-100"
                src="img/1234.jpg" alt=''
                style={{ objectFit: "cover" }}
              />
              <div className="carousel-caption d-flex flex-column align-items-center justify-content-center"  style={{padding:"0px"}}>
                <div className="p-3"style={{ maxWidth: "100% "}}>
                  <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">
                    Stylish Men's Attire
                  </h1>
                  <p className="mx-md-5 px-5 animate__animated animate__bounceIn"  style={{color:"white"}}>
                    <big>
                      "Discover a curated collection of stylish men's attire,
                      blending contemporary trends with timeless elegance,
                      designed to elevate your wardrobe effortlessly.
                    </big>
                  </p>
                  <Link
                    className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp"
                    to="#"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
            <div
              className="carousel-item position-relative"
              style={{ height: "100vh" }}
            >
              <img
                className="position-absolute w-100 h-100"
                src="img/c4.jpg" alt=''
                style={{ objectFit: "cover" }}
              />
              <div className="carousel-caption d-flex flex-column align-items-center justify-content-center" style={{padding:"0px"}}>
                <div className="p-3" style={{ maxWidth: "100% "}}>
                  <h1 className="display-4 text-white mb-3 animate__animated animate__fadeInDown">
                    Gentlemen's Style Hub
                  </h1>
                  <p className="mx-md-5 px-5 animate__animated animate__bounceIn"  style={{color:"white"}}>
                    <big>
                      "Welcome to the ultimate Gentlemen's Style Hub, where
                      sophistication meets modernity, offering curated fashion
                      to refine your signature look.
                    </big>
                  </p>
                  <Link
                    className="btn btn-outline-light py-2 px-4 mt-3 animate__animated animate__fadeInUp"
                    to="#"
                  >
                    Shop Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</>

  )
}