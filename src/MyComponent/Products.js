import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
const ProductItem = ({ productId,images, price , productName,  }) => {

  const cartdata=JSON.parse(localStorage.getItem('cart')) || [];
  const [productCart, setProductCart] = useState(cartdata);
  const [userId, setUserId] = useState('');

  const userSession = sessionStorage.getItem('user');

  const location = useLocation();

  // Function to check if the current path is the wishlist path
  const isWishlistPath = () => {
    return location.pathname === '/wishlist';
  };


  useEffect(() => {
    // Set the userId when the component mounts or userSession changes
    if (userSession) {
      const userSessionObject = JSON.parse(userSession);
      console.log(userSessionObject.user_id);
      setUserId(userSessionObject.user_id);
    }
  }, [userSession]);
 
  useEffect(()=>{
    localStorage.setItem('cart', JSON.stringify(productCart));

    
    console.log(JSON.parse(localStorage.getItem('cart')));
  },[productCart]);
  const handleAddToCart = () => {
    // Get existing cart data from local storage
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the product is already in the cart
    const alreadyInCart = existingCart.find(item => item.productId === productId);

    if (alreadyInCart) {
      // If the product is already in the cart, update the quantity
      const updatedCart = existingCart.map(item =>
        item.productId === productId ? { ...item, quantity: item.quantity + 1} : item
      );
     // localStorage.setItem('cart', JSON.stringify(updatedCart));
     setProductCart(updatedCart);
     alert('Product already in the cart. Quantity updated.');
    } else {
      // If the product is not in the cart, add it
      const newCartItem = { productId,productImage:images[0], productName, price, quantity: 1,total:price*1 };
      const updatedCart = [...existingCart, newCartItem];
      //localStorage.setItem('cart', JSON.stringify(updatedCart));
      setProductCart(updatedCart);
      alert('Product added to the cart.');
    }
  };

 
  images.map((i)=>{

    console.log("\n# "+i);
  })

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    const nextIndex = (currentImageIndex + 1) % images.length;
    setCurrentImageIndex(nextIndex);
  };

  const prevImage = () => {
    const prevIndex = (currentImageIndex - 1 + images.length) % images.length;
    setCurrentImageIndex(prevIndex);
  };

  const handleAddToWishlist = (productId) => {
   const formData = new URLSearchParams();
    formData.append('userId', userId);
    formData.append('productId', productId);
  
    // Call your API here with the productId
    fetch(`http://103.148.157.74:33178/EcommerceWebApp/rest/wishlistapi/save_wishlist`, {
      method: 'POST', // Adjust the method according to your API
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        // Add any other headers if required
      },
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          // Handle success
          alert('Product added to wishlist successfully.');
        } else {
          // Handle error
          alert('Failed to add product to wishlist.');
        }
      })
      .catch((error) => {
        console.error('Error adding product to wishlist:', error);
        alert('Failed to add product to wishlist.');
      });
  };

  return (
    
    <div className="product-item bg-light pb-1 position-relative d-flex flex-column">
      <div className="product-img overflow-hidden position-relative w-100" style={{
        // border: '1px solid #ccc',
       // borderRadius: '8px',
        width: '100%',
        height: '300px', // Fixed height for the card container
        overflow: 'hidden',
      }}>
      <Link to={`/productdetails/${productId}`}>
  <img      
    className="img-fluid w-100"
    src={`http://103.148.157.74:33178/EcommerceWebApp/${images[currentImageIndex]}`}
    alt={`Product Image ${currentImageIndex + 1}`}
    style={{
      minHeight: '100%', // Set minimum height to fill the container
      width: '100%',
      objectFit: 'cover',
      // paddingLeft: '15px',
      // paddingRight: '15px',
    }}
  />
</Link>
        {/* <div className="size-selection-wrapper">
          <div className="size-selection bg-white p-2 rounded">
            <p className="text-center mb-0">Choose Size:</p>
            <div className="d-flex align-items-center justify-content-center">
              <button className="btn btn-sm mx-1">XS</button>
              <button className="btn btn-sm mx-1">S</button>
              <button className="btn btn-sm mx-1">M</button>
              <button className="btn btn-sm mx-1">L</button>
              <button className="btn btn-sm mx-1">XL</button>
            </div>
          </div>
        </div> */}
        <span
          onClick={prevImage}
          style={{
            position: 'absolute',
            top: '50%',
            left: 10,
            transform: 'translateY(-50%)',
            cursor: 'pointer',
            color: 'white',
            fontSize: '24px',
            fontWeight: 'bold',
          }}
        >
          &lt;
        </span>
        <span
          onClick={nextImage}
          style={{
            position: 'absolute',
            top: '50%',
            right: 10,
            transform: 'translateY(-50%)',
            cursor: 'pointer',
            color: 'white',
            fontSize: '24px',
            fontWeight: 'bold',
          }}
        >
          &gt;
        </span>
      </div>
      <div className="text-left mb-auto px-4 pt-1">
        {/* Additional product details */}
        <Link className="p text-decoration-none text-truncate" to="/productdetails">
          <small>{productName}</small>
        </Link>
        <span>
        <button className="btn btn-md mt-2 text-right" onClick={handleAddToCart} style={{ float: 'right',marginRight:'0px' }} to="#">
            <i className="fas fa-shopping-cart" />
          </button>
          { !isWishlistPath() && (
        <button
          className="btn btn-md mt-2 text-right"
          onClick={() => handleAddToWishlist(productId)}
          style={{ float: 'right' }}
        >
          <i className="far fa-heart" />
        </button>
      )}
        </span>
        <div className="d-flex align-items-center">
          <p>₹ {price}</p>
          <h6 className="text-muted ml-2" />
        </div>
      </div>
    </div>
    
    
  );
};

export default ProductItem;
