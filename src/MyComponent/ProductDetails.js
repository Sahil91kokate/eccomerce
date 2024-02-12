import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ProductSlider from './ProductSlider';

export default function ProductDetails({singleProductData}) {

  const [mainImage, setMainImage] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [availableQuantity, setAvailableQuantity] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [matchingProductInfo,setmatchingProductInfo]= useState()
  const[productData ,setProductData] =useState([]);
  const cartdata=JSON.parse(localStorage.getItem('cart')) || [];
  const [productCart, setProductCart] = useState(cartdata);

  
 
  const getProductData = async () => {
    try {
      const apiUrl = 'http://103.148.157.74:33178/EcommerceWebApp/rest/productapi/get_product_by_CategoryId';
      const requestBody = new URLSearchParams({ category_id: singleProductData.categoryId });
  
      let response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: requestBody,
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('product category load for slider Data from server:', data);
        setProductData(data); // Set the fetched data in the state
      } else {
        console.error('Failed to fetch product data. Response status:', response.status);
      }
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };


  useEffect(() => {
    
   
    getProductData();
    
  }, [singleProductData.categoryId]);


  useEffect(()=>{
        localStorage.setItem('cart', JSON.stringify(productCart));

        setmatchingProductInfo(matchingProductInfo);
    console.log(JSON.parse(localStorage.getItem('cart')));
  },[productCart,selectedColor,selectedSize, availableQuantity,quantity,matchingProductInfo]);
  const handleAddToCart = () => {
    // Get existing cart data from local storage
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the product is already in the cart
    const alreadyInCart = existingCart.find(item => item.productInfoId === matchingProductInfo.productInfoId);

    if (alreadyInCart) {
      // If the product is already in the cart, update the quantity
      // const updatedCart = existingCart.map(item =>
      //   item.productInfoId === matchingProductInfo.productInfoId
      //     ? { ...item, quantity: item.quantity + 1 }
      //     : item
      // );
      // setProductCart(updatedCart);
      alert('Product already in the cart.');
    }else {
      // If the product is not in the cart, add it
     const newCartItem = {
        productId: singleProductData.productId,
        productImage: singleProductData.ProductInfoDataList[0].InfoImageList[0].image, // assuming images array is defined
        productName: singleProductData.name,
        price: singleProductData.price,
        productInfoId:matchingProductInfo.productInfoId,
        quantity: quantity,
        total: singleProductData.price * quantity,
        color:selectedColor,
        size:selectedSize,
        avilable_quantity:matchingProductInfo.available_quantity
      };
      const updatedCart = [...existingCart, newCartItem];
      //localStorage.setItem('cart', JSON.stringify(updatedCart));
      setProductCart(updatedCart);
      alert('Product added to the cart.');
    }
  };
  

  if (!singleProductData) {
    return <div>Loading...</div>;
  }


  


  

  const { ProductInfoDataList } = singleProductData;

  if (!Array.isArray(ProductInfoDataList) || ProductInfoDataList.length === 0) {
    return <div>Error: ProductInfoDataList is not in the expected format</div>;
  }

  const handleThumbnailClick = (image) => {
    setMainImage(image);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    // Set a default main image for the selected color
    const imagesForSelectedColor = ProductInfoDataList
      .find(info => info.color === color)?.InfoImageList.map(img => img.image) || [];
    setMainImage(imagesForSelectedColor[0] || '');
  
    // Update the available quantity
    updateAvailableQuantity(color, selectedSize);
  };
  
  const handleSizeChange = (size) => {
    setSelectedSize(size);
    // Update the available quantity
    updateAvailableQuantity(selectedColor, size);
  };

  
  
  
  const updateAvailableQuantity = (color, size) => {
    // Find the product information object based on the selected color and size
    const matchingProductInfo = ProductInfoDataList.find(
      (info) => info.color === color && info.size === size
    );
  
    setmatchingProductInfo(matchingProductInfo);
  
    // Update the available quantity
    setAvailableQuantity(matchingProductInfo ? matchingProductInfo.available_quantity : 'Not Available');
  };
  
  // Filter images based on the selected color
  const filteredImageArray = ProductInfoDataList
    .filter(info => !selectedColor || info.color === selectedColor)
    .flatMap(info => info.InfoImageList.map(img => img.image));




    
 return (
    <div id="abcd">
      <>
  <div className="container-fluid d-none d-md-block mt-5"
    style={{
      width: "100% !important",
      marginTop: "50px !important",
      paddingRight: "0px !important",
      paddingLeft: "0px !important",
      marginRight: "0px !important",
      marginLeft: "0px !important"
    }}
  >
    <div className="main-wrapper ">
      <div
        className="  "
        style={{
          width: "100% !important",
          paddingRight: "0px !important",
          paddingLeft: "0px !important",
          marginRight: "0px !important",
          marginLeft: "0px !important"
        }}
      >
        <div className="product-div " >
          <div className="row product-div-left">
            <div className="col-md-3 col-sm-3 col-xs-3 col-6 hover-container  d-none d-md-block" style={{height:"auto"}}>
            <div class="vertical-slider">
              {filteredImageArray.map((imageUrl, index) => (
                <div key={index} onClick={() => handleThumbnailClick(imageUrl)}>
                  <img
                    src={`http://103.148.157.74:33178/EcommerceWebApp/${imageUrl}`}
                    alt={`Image ${index + 1}`}
                  />
                </div>
              ))}
            </div>
            </div>
            <div className="col-md-9 col-sm-9 col-xs-9 img-container d-none d-sm-block">
              {ProductInfoDataList && ProductInfoDataList[0] && ProductInfoDataList[0].InfoImageList && (
                <img
                  src={`http://103.148.157.74:33178/EcommerceWebApp/${mainImage || ProductInfoDataList[0].InfoImageList[0].image}`}
                  alt={`http://103.148.157.74:33178/EcommerceWebApp/${mainImage || ProductInfoDataList[0].InfoImageList[0].image}`}
                  id="mainImage"
                  style={{ width: "100% !important" }}
                />
              )}
            </div>
          </div>
          
          <div className="h-100 bg-light p-30">
            <h4  style={{float: "left"}}>{singleProductData.name}</h4>
            <br/>
            <div className="d-flex mb-3"></div>
            <h6 className="font-weight-semi-bold mb-4"  style={{float: "left"}}>Rs.{singleProductData.price}</h6>
            <br/> <br/>
            <div className="d-flex mb-3">
              <form>
                
            <div>
            {singleProductData.ProductInfoDataList ? (
          singleProductData.ProductInfoDataList.map((info, index) => (
            <div
              key={index}
              className="custom-control custom-radio custom-control-inline"
            >
              <input
                type="radio"
                className="custom-control-input"
                id={`size-${index}`}
                name="size"
                value={info.size}
                checked={info.size === selectedSize}
                onChange={() => handleSizeChange(info.size)}
                // Add any other necessary attributes or event handlers
              />
              <label
                className="custom-control-label"
                htmlFor={`size-${index}`}
              >
                {info.size}
              </label>
            </div>
          ))
        ) : (
          <p>Loading sizes...</p>
        )}
            </div>
       </form>
            </div>
            <div className="d-flex mb-4">
              <strong className="text-dark mr-3">Colors:</strong>
              <form>
              {ProductInfoDataList ? (
            ProductInfoDataList.map((info, index) => (
              <div
                key={index}
                className="custom-control custom-radio custom-control-inline"
              >
                <input
                  type="radio"
                  className="custom-control-input"
                  id={`color-${index}`}
                  name="color"
                  value={info.color}
                  checked={info.color === selectedColor}
                  onChange={() => handleColorChange(info.color)}
                />
                <label
                  className="custom-control-label"
                  htmlFor={`color-${index}`}
                >
                  {info.color}
                </label>
              </div>
            ))
          ) : (
            <p>Loading colors...</p>
          )}
                
              </form>
            </div>
            <div>
              Available Quantity: {availableQuantity}
            </div>
            <div className="d-flex align-items-center mb-4 pt-2">
              <div className="input-group quantity mr-3" style={{ width: 130 }}>
              <div className="input-group-btn">
                              <button
                  className="btn btn-sm btn-primary btn-minus"
                  onClick={() => {
                    if (quantity > 1) {
                      setQuantity(quantity - 1);
                    }
                  }}
                >
              <i className="fa fa-minus" />
              </button>
                </div>
                <input
                  type="text"
                  className="form-control form-control-sm bg-secondary border-0 text-center"
                value={quantity}
                  readOnly
                />
                <div className="input-group-btn">
                <button
                  className="btn btn-sm btn-primary btn-plus"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <i className="fa fa-plus" />
                </button>
                </div>
              </div>
              <button
                        className="btn btn-primary text-right"
                        onClick={() => {
                          if (selectedColor && selectedSize && availableQuantity >= quantity) {
                            handleAddToCart();
                          } else {
                            alert('Please select color, size, and ensure available quantity is sufficient.');
                          }
                        }}
                        style={{ float: 'right', marginRight: '0px' }}
                      >
                        <i className="fas fa-shopping-cart mr-1" /> Add to Cart
                      </button>
              <i className="far fa-heart mr-1 ml-4" />
            </div>
            {/* Button for Free in-store collection */}
            <h6>
              <button className="btn btn-secondary mt-2" style={{float: "left"}}>
                <i className="fa fa-home mr-1" /> Collection in-store -{" "}
                <span className="free-text">FREE</span>
              </button>
              <br /><br /><br />
              {/* Button for Standard Home Delivery Free */}
              <button className="btn btn-secondary mt-2" style={{float: "left"}}>
                <i className="fa fa-truck mr-1" /> Standard Home Delivery -{" "}
                <span className="free-text">FREE</span>
              </button>
              <br /><br />
            </h6>
            <div className="d-flex pt-2" style={{float: "left"}}>
              <strong className="text-dark mr-2">Share on:</strong>
              <div className="d-inline-flex">
                <Link className="text-dark px-2" to="">
                  <i className="fab fa-facebook-f" />
                </Link>
                <Link className="text-dark px-2" to="">
                  <i className="fab fa-twitter" />
                </Link>
                <Link className="text-dark px-2" to="">
                  <i className="fab fa-linkedin-in" />
                </Link>
                <Link className="text-dark px-2" to="">
                  <i className="fab fa-pinterest" />
                </Link>
              </div>
            </div>
            <br /><br /><br />
            <div className="button-container mb-2 p-1" style={{float: "left"}}>
              <button className="horizontal-btn">
                Materials, care and source
              </button>
            </div>
            <div className="button-container  mb-2 p-1" style={{float: "left"}}>
              <button className="horizontal-btn">Deliveries and returns</button>
            </div>
            <div className="button-container p-1" style={{float: "left"}}>
              <button className="horizontal-btn">In-store availability</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
  className="container-fluid product-description mt-4"
  style={{ backgroundColor: "white" }}
>
  <div className="row">
    <div className="col-md-12">
      <h4 className="mb-3">Product Details</h4>
      <hr />
      <p style={{float:"left"}}>
        {singleProductData.description}
      </p>
    </div>
  </div>
</div>

  </div>

  <>
{/* mobilez */}

  <div className='container-fluid product-description d-lg-none d-md-none'>
    <div className='row'>
          <div className="col-md-12 col-sm-12 col-xs-12 img-container">
          {ProductInfoDataList && ProductInfoDataList[0] && ProductInfoDataList[0].InfoImageList && (
              <img
              src={`http://103.148.157.74:33178/EcommerceWebApp/${mainImage || ProductInfoDataList[0].InfoImageList[0].image}`}
              alt={`http://103.148.157.74:33178/EcommerceWebApp/${mainImage || ProductInfoDataList[0].InfoImageList[0].image}`}
                id="mainImage"
                style={{ width: "100% !important" }}
              />
              )}
            </div>
    </div>


    <div className="row thumbnail-container-mobile">
            <div className="col-12">
              <div className="thumbnails-mobile">
              {filteredImageArray.map((imageUrl, index) => (
                <img key={index} onClick={() => handleThumbnailClick(imageUrl)}
                  src={`http://103.148.157.74:33178/EcommerceWebApp/${imageUrl}`}
                  className="thumbnail"
                  onclick="changeImage('img/86.jpg')"
                />
                ))}

              </div>
            </div>
    </div>
    <div className="h-100 bg-light p-30">
            <h4  style={{float: "left"}}>{singleProductData.name} </h4>
            
            <h6 className="font-weight-semi-bold mb-4"  style={{float: "right"}}> Rs.{singleProductData.price}</h6>
            <br/> <br/>
            <div className="d-flex mb-3">
              <form>
              <div>
            {singleProductData.ProductInfoDataList ? (
          singleProductData.ProductInfoDataList.map((info, index) => (
            <div
              key={index}
              className="custom-control custom-radio custom-control-inline"
              style={{zIndex:2}}
            >
              <input  
                type="radio"
                className="custom-control-input"
                id={`size-${index}`}
                name="size"
                value={info.size}
                checked={info.size === selectedSize}
                onChange={() => handleSizeChange(info.size)}
                // Add any other necessary attributes or event handlers
              />
              <label
                className="custom-control-label"
                htmlFor={`size-${index}`}
              >
                {info.size}
              </label>
            </div>
          ))
        ) : (
          <p>Loading sizes...</p>
        )}
            </div>
              </form>
            </div>
            <div className="d-flex mb-4">
              <strong className="text-dark mr-3">Colors:</strong>
              <form>
              {ProductInfoDataList ? (
            ProductInfoDataList.map((info, index) => (
              <div
                key={index}
                className="custom-control custom-radio custom-control-inline"
              >
                <input
                  type="radio"
                  className="custom-control-input"
                  id={`color-${index}`}
                  name="color"
                  value={info.color}
                  checked={info.color === selectedColor}
                  onChange={() => handleColorChange(info.color)}
                />
                <label
                  className="custom-control-label"
                  htmlFor={`color-${index}`}
                >
                  {info.color}
                </label>
              </div>
            ))
          ) : (
            <p>Loading colors...</p>
          )}
                
              </form>
            
            </div>
            <div>
              Available Quantity: {availableQuantity}
            </div>
            <div className="d-flex align-items-center mb-4 pt-2">
              <div className="input-group quantity mr-3" style={{ width: 130 }}>
                <div className="input-group-btn">
                  <button className="btn btn-sm btn-primary btn-minus"
                  onClick={() => {
                    if (quantity > 1) {
                      setQuantity(quantity - 1);
                    }
                  }}
                  >
                    <i className="fa fa-minus" />
                  </button>
                </div>
                <input
                  type="text"
                  className="form-control bg-secondary border-0 text-center"
                  value={quantity}
                />
                <div className="input-group-btn">
                  <button className="btn btn-sm btn-primary btn-plus"
                  onClick={() => setQuantity(quantity + 1)}
                  
                  >
                    <i className="fa fa-plus" />
                  </button>
                </div>
              </div>
              <a  className="btn btn-primary px-3"  
                onClick={() => {
                  if (selectedColor && selectedSize && availableQuantity >= quantity) {
                    handleAddToCart();
                  } else {
                    alert('Please select color, size, and ensure available quantity is sufficient.');
                  }
                }}
              >
                <i className="fa fa-shopping-cart mr-1" /> Cart
              </a>
              <i className="far fa-heart mr-1 ml-4" />
            </div>
            {/* Button for Free in-store collection */}
            <h6>
              <button className="btn btn-secondary mt-2" style={{float: "left"}}>
                <i className="fa fa-home mr-1" /> Collection in-store -{" "}
                <span className="free-text">FREE</span>
              </button>
              <br /><br /><br />
              {/* Button for Standard Home Delivery Free */}
              <button className="btn btn-secondary mt-2" style={{float: "left"}}>
                <i className="fa fa-truck mr-1" /> Standard Home Delivery -{" "}
                <span className="free-text">FREE</span>
              </button>
              <br /><br />
            </h6>
            <div className="d-flex pt-2" style={{float: "left"}}>
              <strong className="text-dark mr-2">Share on:</strong>
              <div className="d-inline-flex">
                <Link className="text-dark px-2" to="">
                  <i className="fab fa-facebook-f" />
                </Link>
                <Link className="text-dark px-2" to="">
                  <i className="fab fa-twitter" />
                </Link>
                <Link className="text-dark px-2" to="">
                  <i className="fab fa-linkedin-in" />
                </Link>
                <Link className="text-dark px-2" to="">
                  <i className="fab fa-pinterest" />
                </Link>
              </div>
            </div>
            <br />
            <div className="button-container mb-2 p-1" style={{float: "left"}}>
              <button className="horizontal-btn">
                Materials, care and source
              </button>
            </div>
            <div className="button-container  mb-2 p-1" style={{float: "left"}}>
              <button className="horizontal-btn">Deliveries and returns</button>
            </div>
            <div className="button-container p-1" style={{float: "left"}}>
              <button className="horizontal-btn">In-store availability</button>
            </div>
          </div>
          <br/><br/><br/><br/><br/><br/><br/>
  </div>
  <div className="row  d-sm-block product-description d-lg-none d-md-none mt-4" >
    <div className="col-md-12">
      <h4 className="mb-3">Product Details</h4>
      <hr />
      <p style={{float:"left"}}>
      {singleProductData.description}
      </p>
    </div>
  </div>
  <div>
  <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#333', textTransform: 'uppercase', marginBottom: '20px' }}>Similar Products</p>

  <ProductSlider allProduct={productData?.ProductList}/>
  </div>
</>

  
</>

    </div>
  )
}
