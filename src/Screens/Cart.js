import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const Cart = () =>  {
 




  const [shippingCharge,setShippingCharge]=useState(0);
  const [subTotal,setSubTotal]=useState(0);
  const [total,setTotal]=useState(0);

 
  const cartdata=JSON.parse(localStorage.getItem('cart')) || [];
  const [productCart, setProductCart] = useState(cartdata);
  console.log("checkout");
  console.log(cartdata);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userSession  = sessionStorage.getItem('user');
 

  

// console.log(isLoggedIn)



  const amount = total*100;
  const currency = "INR";
  const receiptId = "qwsaq1";

  const paymentHandler = async (e) => {
    const response = await fetch("http://localhost:5000/api/order", {
      method: "POST",
      body: JSON.stringify({
        amount,
        currency,
        receipt: receiptId,
        
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

     if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const order = await response.json();
    console.log(order);
    var options = {
      key: "rzp_test_unDoQsj8y1g9yW", // Enter the Key ID generated from the Dashboard
      amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
      currency,
      name: "sahil Corp", //your business name
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      notes:[productCart],
      
      order_id: order.id, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
      handler: async function (response) {
        const body = {
          ...response,
        };

        const validateRes = await fetch(
          "http://localhost:5000/api/order/validate",
          {
            method: "POST",
            body: JSON.stringify(body),
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!validateRes.ok) {
          throw new Error(`HTTP error! Status: ${validateRes.status}`);
        }

        const jsonRes = await validateRes.json();
        console.log(jsonRes);
      },
      prefill: {
        //We recommend using the prefill parameter to auto-fill customer's contact information, especially their phone number
        name: "Web Dev Matrix", //your customer's name
        email: "webdevmatrix@example.com",
        contact: "9000000000", //Provide the customer's phone number for better conversion rates
      },
      notes: {
        address: "Razorpay Corporate Office",
        pincode:"416805",
      },
      theme: {
        color: "#3399cc",
      },
    };
    var rzp1 = new window.Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });
    rzp1.open();
    e.preventDefault();
  };
 


  
  const handleRemoveFromCart = (productId) => {
    // Get existing cart data from local storage
    const existingCart = JSON.parse(localStorage.getItem('cart')) || [];
  
    // Find the index of the product in the cart
    const productIndex = existingCart.findIndex(item => item.productId === productId);
  
    if (productIndex !== -1) {
      // If the product is found in the cart, remove it
      const updatedCart = [...existingCart.slice(0, productIndex), ...existingCart.slice(productIndex + 1)];
      // localStorage.setItem('cart', JSON.stringify(updatedCart));
      setProductCart(updatedCart);
      alert('Product removed from the cart.');
    } else {
      // If the product is not in the cart, show a message or handle it as needed
      alert('Product not found in the cart.');
    }
  };
  useEffect(() => {
    setIsLoggedIn(userSession!==null?true:false);
    localStorage.setItem('cart', JSON.stringify(productCart));
    console.log(JSON.parse(localStorage.getItem('cart')));

    if(productCart.length>0){
      
      setShippingCharge(40);
      
    }else{
      
      setShippingCharge(0);
      setSubTotal(0);
      setTotal(0);
    }
    calulateSubtotal();
    calulateTotal();
  }, [productCart,subTotal,total]);
const calulateSubtotal=()=>{
  let sum=0;
  productCart.map((item)=>{
    sum=sum+item.quantity*item.price;
    setSubTotal(sum);
  })
};

const calulateTotal=()=>{
  let sum=subTotal+shippingCharge;
  setTotal(sum);
};

const handleIncrementQuantity = (productId) => {
  setProductCart((prevCart) => {
    const updatedCart = prevCart.map((item) => {
      if (item.productId === productId) {
        const newQuantity = item.quantity + 1;
        const availableQuantity = parseInt(item.avilable_quantity, 10); // Parsing to integer
        if (!isNaN(availableQuantity)) { // Check if availableQuantity is a valid number
          if (newQuantity <= availableQuantity) {
            return {
              ...item,
              quantity: newQuantity
            };
          } else {
            alert("Cannot add more quantity. Available quantity: " + availableQuantity);
            return item;
          }
        } else {
          // Handle the case where availableQuantity is not a valid number
          console.error("Available quantity is not a valid number, defaulting to 0");
          alert("Available quantity is not a valid number. Quantity cannot be updated.");
          return item;
        }
      } else {
        return item;
      }
    });
    return updatedCart;
  });
};
  
  const handleDecrementQuantity = (productId) => {
    setProductCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.productId === productId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1} : item
      );
      return updatedCart;
    });
   
  };
  
  return (
    <div>
          <div className="container-fluid mt-5 pt-5" style={{ marginTop: "40px" }}>
  <div className="row px-xl-5">
    <div className="col-lg-8 table-responsive mb-5">
      <table className="table table-light table-borderless table-hover text-center mb-0">
        <thead className="thead-dark">
          <tr>
            <th>#</th>
            <th></th>
            <th>Products</th>
            <th>Color</th>
            <th>Size</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody className="align-middle">
          {
             
             productCart?.map((cartProduct,index)=>{
            return(
              <tr>
                <td className="align-middle">{index+1}.</td>
                <td className="align-middle"><Link to={`/productdetails/${cartProduct.productId}`} state={{textDecoration: 'none'}}> <img src={`http://103.148.157.74:33178/EcommerceWebApp/${cartProduct.productImage}`} alt="" style={{ width: 50 }} /></Link></td>
            <td className="align-middle">
            <Link to={`/productdetails/${cartProduct.productId}`} state={{textDecoration: 'none'}}>{cartProduct.productName}</Link>
            </td>
            <td className="align-middle"> {cartProduct.color}</td>
            <td className="align-middle"> {cartProduct.size}</td>
            <td className="align-middle">₹ {cartProduct.price}</td>
            <td className="align-middle">
              <div
                className="input-group quantity mx-auto"
                style={{ width: 100 }}
              >
                <div className="input-group-btn">
                  <button className="btn btn-sm btn-primary btn-minus" onClick={() => handleDecrementQuantity(cartProduct.productId)}>
                    <i className="fa fa-minus" />
                  </button>
                </div>
                <input
                  type="text"
                  className="form-control form-control-sm bg-secondary border-0 text-center"
                  value={cartProduct.quantity}
                  readOnly
                />
                <div className="input-group-btn">
                  <button className="btn btn-sm btn-primary btn-plus" onClick={() => handleIncrementQuantity(cartProduct.productId)}>
                    <i className="fa fa-plus" />
                  </button>
                </div>
              </div>
            </td>
            <td className="align-middle">₹ {cartProduct.quantity*cartProduct.price}</td>
            <td className="align-middle">
              <button className="btn btn-sm btn-danger" onClick={() => handleRemoveFromCart(cartProduct.productId)}>
                <i className="fa fa-times" />
              </button>
            </td>
          </tr>
            );
          })}
          
        </tbody>
      </table>
    </div>
    <div className="col-lg-4">
      {/* <form class="mb-30" action="">
              <div class="input-group">
                  <input type="text" class="form-control border-0 p-4" placeholder="Coupon Code">
                  <div class="input-group-append">
                      <button class="btn btn-primary">Apply Coupon</button>
                  </div>
              </div>
          </form> */}
      <h5 className="section-title position-relative text-uppercase mb-3">
        <span className="bg-secondary pr-3">Cart Summary</span>
      </h5>
      <div className="bg-light p-30 mb-5">
        <div className="border-bottom pb-2">
          <div className="d-flex justify-content-between mb-3">
            <h6>Subtotal</h6>
            <h6>₹ {subTotal}</h6>
          </div>
          <div className="d-flex justify-content-between">
            <h6 className="font-weight-medium">Shipping</h6>
            <h6 className="font-weight-medium">₹ {shippingCharge}</h6>
          </div>
        </div>
        <div className="pt-2">
          <div className="d-flex justify-content-between mt-2">
            <h5>Total</h5>
            <h5>₹ {total}</h5>
          </div>

          {isLoggedIn ? (
        < Link to="/checkout">   <button  className="btn btn-block btn-primary font-weight-bold my-3 py-3">
            Proceed To Checkout
          </button>
          </Link>):(

      < Link to="/login">   <button  className="btn btn-block btn-primary font-weight-bold my-3 py-3">
      Proceed To Checkout
      </button>
      </Link>

          )}
        </div>
      </div>
    </div>
  </div>
</div>
</div>

   
  )
}
export default Cart;
