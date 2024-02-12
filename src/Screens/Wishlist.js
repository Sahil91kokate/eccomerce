import React, { useEffect, useState } from 'react';
import ProductItem from '../MyComponent/Products';

export default function Wishlist() {
const [userId, setUserId] = useState(''); 

const[productData ,setproductData] = useState([])

const userSession = sessionStorage.getItem('user');

useEffect(() => {
    // Set the userId when the component mounts or userSession changes
    if (userSession) {
      const userSessionObject = JSON.parse(userSession);
      console.log(userSessionObject.user_id);
      setUserId(userSessionObject.user_id);
    }
  }, [userSession]);

  const getProductData= async () => {
    const apiUrl = 'http://103.148.157.74:33178/EcommerceWebApp/rest/wishlistapi/get_Wishlist_by_user_Id';

    const formData = new URLSearchParams();
    formData.append('user_id', userId);

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      const responseData = await response.json();

      if (response.ok && responseData.status === 'success') {
        console.log('API call productWishList  successful:', responseData);

        // Update the state with the fetched addresses
        setproductData(responseData.ProductList);
      } else {
        console.error('API call productWishList failed:', responseData);
        // Handle failure, show an error message or take appropriate action
      }
    } catch (error) {
      console.error('Error during API call:', error);
      // Handle network errors or other unexpected errors
    }
  };

  useEffect(() => {
    if (userId) {
        getProductData();
    }
  }, [userId]);


const ProductsList = () => {
    
    return (
      <>
      <div className="container-fluid mt-1">
        <div className="row px-xl-5">
      
      <div className="col-lg-12 col-md-12 " >
      {/* <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} /> */}

        <div className="row">
          
          {productData?.map(product => {
            // Extracting the image URLs from InfoImageList
            // const imageArray = product.ProductInfoDataList.map(info =>
            //   info.InfoImageList.map(img => img.image)
            // );
            const imageArray = product.ProductInfoDataList.flatMap(info =>
              info.InfoImageList.map(img => img.image)
            );

            return (
              <div key={product.productId} className="col-lg-3 col-md-3 col-sm-6 col-6" style={{ padding: '4px' }}>
                <ProductItem
                  productId={product.productId}
                  images={imageArray}
                  productName={product.name}
                  price={product.price}
                />
              </div>
            );
          })}
        </div>
      </div>
     
        </div>
        </div>
        </>
    );
  };
  
  return (
   
      <>
  <br />
  <div className="container-fluid mt-5">
    <div className="row px-xl-5">
      <div className="col-lg-12 col-md-12 col-sm-12 col-12 pb-1 mt-2">
       
        <div className="align-items-center justify-content-between mb-4">
          <div className="container-fluid">
          <div className="row">
          <div className="col-lg-8 col-md-8 col-sm-12 col-12 css">
        <h5 className="d-flex align-items-left">All Product</h5>
       
      </div>
      {/* <div className="col-md-4" style={{ float: "right" }}>
        <button
          type="button"
          className="btn btn-sm btn-light sidebar-toggle-btn"
          id="sidebarToggleBtn"
        >
          <i className="fas fa-sliders-h preference-icon" />
        </button>
      </div> */}
    </div>
  

          </div>
          {/* Sidebar content */}
          <div className="sidebar" id="sidebar">
            <button className="close-btn" id="closeSidebar">
              ×
            </button>
            <h6>Filter</h6>
            <br />
            <div className="sort-by">
              {/* <center><h6>Sort By</h6></center> */}
              <ul className="sort-keywords">
                <li>
                  <div className="sort-keyword">Price Low to High</div>
                  <div className="sort-keyword">Price High to Low</div>
                </li>
              </ul>
              <div className="size-dropdown">
                <div className="size-header">
                  Size <span className="plus-button">+</span>
                </div>
                <ul className="size-options pt-2">
                  <div className="" style={{ display: "flex" }}>
                    <li className="size-option sort-keyword">XS</li>
                    <li className="size-option sort-keyword">S</li>
                    <li className="size-option sort-keyword">M</li>
                    <li className="size-option sort-keyword">L</li>
                    <li className="size-option sort-keyword">XL</li>
                  </div>
                </ul>
              </div>
              <hr />
              <div className="size-dropdown">
                <div className="size-header">
                  Type <span className="plus-button">+</span>
                </div>
                <ul className="size-options pt-2">
                  <div className="" style={{ display: "flex" }}>
                    <li className="size-option sort-keyword">XS</li>
                    <li className="size-option sort-keyword">S</li>
                    <li className="size-option sort-keyword">M</li>
                    <li className="size-option sort-keyword">L</li>
                    <li className="size-option sort-keyword">XL</li>
                  </div>
                </ul>
              </div>
              <hr />
              <div className="size-dropdown">
                <div className="size-header">
                  Colour <span className="plus-button">+</span>
                </div>
                <ul className="size-options pt-2">
                  <div className="" style={{ display: "flex" }}>
                    <li className="size-option sort-keyword">XS</li>
                    <li className="size-option sort-keyword">S</li>
                    <li className="size-option sort-keyword">M</li>
                    <li className="size-option sort-keyword">L</li>
                    <li className="size-option sort-keyword">XL</li>
                  </div>
                </ul>
              </div>
              <hr />
              <div className="size-dropdown">
                <div className="size-header">
                  Price <span className="plus-button">+</span>
                </div>
                <ul className="size-options pt-2">
                  <div className="" style={{ display: "flex" }}>
                    <li className="size-option sort-keyword">XS</li>
                    <li className="size-option sort-keyword">S</li>
                    <li className="size-option sort-keyword">M</li>
                    <li className="size-option sort-keyword">L</li>
                    <li className="size-option sort-keyword">XL</li>
                  </div>
                </ul>
              </div>
              <hr />
              <div className="size-dropdown">
                <div className="size-header">
                  With Discount <span className="plus-button">+</span>
                </div>
                <ul className="size-options pt-2">
                  <div className="" style={{ display: "flex" }}>
                    <li className="size-option sort-keyword">XS</li>
                    <li className="size-option sort-keyword">S</li>
                    <li className="size-option sort-keyword">M</li>
                    <li className="size-option sort-keyword">L</li>
                    <li className="size-option sort-keyword">XL</li>
                  </div>
                </ul>
              </div>
              <hr />
            </div>
            <div className="mt-auto">
              <button type="button" className="btn btn-primary mr-2">
                Button 1
              </button>
              <button type="button" className="btn btn-secondary">
                Button 2
              </button>
            </div>
          </div>
        </div>---------------
        <ProductsList/> 
      </div>
    </div>
    <br/>
   
      </div>
</>
  )
}
