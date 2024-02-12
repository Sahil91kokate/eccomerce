import React from 'react';
import { Link } from 'react-router-dom';
export default function TopCategories({categoryData}) {
  return (
    
    <div>
      <div
  style={{
    backgroundColor: "white",
    width: "100vw !important",// "100vw" represents 100% of the viewport width
    position: "relative",
    top: 750,
    paddingLeft: "15px",
    paddingRight: "15px",
    
    
  }}
  
>
  
<div className="container pt-5" style={{width :"100%"}}> 
  <h4
    className="section-title text-center position-relative  mb-4"
  >
    <span className="bg-light" >Top Categories</span>
  </h4>
  <div className="row justify-content-center" >

   {/* Map through categoryData and generate the HTML elements */}
   {categoryData?.map((category, index) => (
              <div
                key={index}
                className="col-lg-2 col-md-3 col-sm-4 col-6 text-center"
                style={{ padding: 2 }}
              >
                <div className="product-item bg-light mb-2">
                  <div className="product-img position-relative overflow-hidden">
                    <img
                      className="img-fluid w-100"
                      src={`http://103.148.157.74:33178/EcommerceWebApp/${category.categoryImg}`}
                      alt="" style={{height:'200px' ,width:'100%'}}
                    />
                  </div>
                  <div className="text-center py-3">
                    {/* Use category data dynamically */}
                    <Link
                      className="h6 text-decoration-none text-truncate"
                      to={`/CategoryWiseProduct/${category.categoryId}`}
                    >
                      {category.categoryName}
                    </Link>
                  </div>
                </div>
              </div>
            ))}





    {/* <div
      className="col-lg-2 col-md-3 col-sm-4 col-6 text-center"
      style={{ padding: 2 }}
    >
      <div className="product-item bg-light mb-2">
        <div className="product-img position-relative overflow-hidden">
          <img className="img-fluid w-100" src="img/hoodie.jpg" alt="" />
        </div>
        <div className="text-center py-3">
          <Link className="h6 text-decoration-none text-truncate" to="">
            Category 1
          </Link>
        </div>
      </div>
    </div> */}
    {/* Example for Category 2 */}
    {/* <div
      className="col-lg-2 col-md-3 col-sm-4 col-6 text-center"
      style={{ padding: 2 }}
    >
      <div className="product-item bg-light mb-2">
        <div className="product-img position-relative overflow-hidden">
          <img className="img-fluid w-100" src="img/jeans.jpg" alt="" />
        </div>
        <div className="text-center py-3">
          <Link className="h6 text-decoration-none text-truncate" to="">
            Category 1
          </Link>
        </div>
      </div>
    </div>
    <div
      className="col-lg-2 col-md-3 col-sm-4 col-6 text-center"
      style={{ padding: 2 }}
    >
      <div className="product-item bg-light mb-2">
        <div className="product-img position-relative overflow-hidden">
          <img className="img-fluid w-100" src="img/jacket.jpg" alt="" />
        </div>
        <div className="text-center py-3">
          <Link className="h6 text-decoration-none text-truncate" to="">
            Category 1
          </Link>
        </div>
      </div>
    </div>
    <div
      className="col-lg-2 col-md-3 col-sm-4 col-6 text-center"
      style={{ padding: 2 }}
    >
      <div className="product-item bg-light mb-2">
        <div className="product-img position-relative overflow-hidden">
          <img className="img-fluid w-100" src="img/shooes.jpg" alt="" />
        </div>
        <div className="text-center py-3">
          <Link className="h6 text-decoration-none text-truncate" to="">
            Category 1
          </Link>
        </div>
      </div>
    </div>
    <div
      className="col-lg-2 col-md-3 col-sm-4 col-6 text-center"
      style={{ padding: 2 }}
    >
      <div className="product-item bg-light mb-2">
        <div className="product-img position-relative overflow-hidden">
          <img className="img-fluid w-100" src="img/tshirt.jpg" alt="" />
        </div>
        <div className="text-center py-3">
          <Link className="h6 text-decoration-none text-truncate" href="">
            Category 1
          </Link>
        </div>
      </div>
    </div>
    <div
      className="col-lg-2 col-md-3 col-sm-4 col-6 text-center"
      style={{ padding: 2 }}
    >
      <div className="product-item bg-light mb-2">
        <div className="product-img position-relative overflow-hidden">
          <img className="img-fluid w-100" src="img/cap.jpg" alt="" />
        </div>
        <div className="text-center py-3">
          <Link className="h6 text-decoration-none text-truncate" href="">
            Category 6
          </Link>
        </div>
      </div>
    </div> */}
    </div>
        </div>
      </div>
      
    </div>
    
  );
}