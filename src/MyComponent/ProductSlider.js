import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

const ProductSlider = ({ allProduct }) => {
  const sliderRef = useRef(null);

  console.log('Received allProduct data:', allProduct);

  if (!allProduct) {
    return <div>Loading...</div>;
  }

  // If there are 5 or fewer products, directly render them without the slider
  if (allProduct.length <= 5) {
    return (
      <div className="container">
        <div className="row">
          {allProduct.map((product) => (
            <div className="col-md-3" key={product.productId}>
              <div className="product-item bg-secondary">
                <div className="product-img-wrapper d-flex justify-content-center align-items-center p-2">
                  <img className="img-fluid" src={`http://103.148.157.74:33178/EcommerceWebApp/${product.ProductInfoDataList[0].InfoImageList[0].image}`} alt="" style={{ height: "250px", width: "auto" }} />
                </div>
                <div className="text-center p-1">
                  <div className="text-center py-3 bg-light p-2">
                    <Link className="h6 text-decoration-none text-truncate" to={`/productdetails/${product.productId}`}>
                      {product.name}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Slider settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    prevArrow: false,
    nextArrow: false,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  // Functions to handle previous and next slides
  const previousSlide = () => {
    sliderRef.current.slickPrev();
  };

  const nextSlide = () => {
    sliderRef.current.slickNext();
  };

  return (
    <div className="container-fluid py-5 bg-secondary position-relative">
      {/* Previous slide button */}
      <div className="d-flex justify-content-between align-items-center mb-4 position-absolute start-0 translate-middle-y" style={{ top: '50%', transform: 'translateY(-50%)' }}>
        <button className="btn btn-link" onClick={previousSlide} style={{ color: 'white' }}>
          <i className="fas fa-chevron-left" style={{ color: 'white' }}></i>
        </button>
      </div>
      {/* Next slide button */}
      <div className="d-flex justify-content-between align-items-center mb-4 position-absolute end-0 translate-middle-y" style={{ top: '50%', transform: 'translateY(-50%)' }}>
        <button className="btn btn-link" onClick={nextSlide} style={{ color: 'white' }}>
          <i className="fas fa-chevron-right" style={{ color: 'white' }}></i>
        </button>
      </div>
      {/* Slider component */}
      <Slider {...settings} ref={sliderRef}>
        {allProduct.map((product) => (
          <div className="product-item bg-secondary" key={product.productId}>
            <div className="product-img-wrapper d-flex justify-content-center align-items-center p-2">
              <img className="img-fluid" src={`http://103.148.157.74:33178/EcommerceWebApp/${product.ProductInfoDataList[0].InfoImageList[0].image}`} alt="" style={{ height: "250px", width: "100%" }} />
            </div>
            <div className="text-center p-1">
              <div className="text-center py-3 bg-light p-2">
                <Link className="h6 text-decoration-none text-truncate" to={`/productdetails/${product.productId}`}>
                  {product.name}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      {/* Bootstrap slider bar */}
      <div className="range-container mt-3">
        <input
          type="range"
          className="form-range"
          min="0"
          max={allProduct.length - 1}
          defaultValue="0"
          onChange={(e) => sliderRef.current.slickGoTo(parseInt(e.target.value))}
        />
      </div>
    </div>
  );
};

export default ProductSlider;
