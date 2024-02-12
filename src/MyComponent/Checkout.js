import React, { useEffect, useState } from 'react';

export default function Checkout() {
  const labelStyle = {
    display: 'inline-block',
    marginBottom: '0.5rem',
    fontSize: 'large',
    fontWeight: 500,
  };

  const sectionStyle = {
    marginBottom: '5rem', 
  };

  const userSession = sessionStorage.getItem('user');
  const [shippingCharge,setShippingCharge]=useState(0);
  const [subTotal,setSubTotal]=useState(0);
  const [total,setTotal]=useState(0);
  const [orderData,setOrderData]=useState(null);
  const cartdata=JSON.parse(localStorage.getItem('cart')) || [];
  const [productCart, setProductCart] = useState(cartdata);
  console.log("productcard");
  console.log(productCart);
  
 
  const [newAddresses, setNewAddresses] = useState([]);
  const [userId, setUserId] = useState('');
  
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [manualEntry, setManualEntry] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // State for manual address entry fields
  const [manualAddress, setManualAddress] = useState({
    fullName: '',
    mobileNo: '',
    addressLine1: '',
    city: '',
    state: '',
    zipCode: '',
  });
  


  const handleAddressSelection = (address) => {
    setSelectedAddress(address);
  };

  const handleAddManualAddress = () => {
    // Validate the manual address fields (add your validation logic here)

    const newManualAddress = {
      addressId: "NA", // Generate a unique ID
      userName: manualAddress.fullName,
      mobileNo: manualAddress.mobileNo,
      address: manualAddress.addressLine1,
      city: manualAddress.city,
      state: manualAddress.state,
      pincode: manualAddress.zipCode,
      // Add other fields as needed
    };

    // Update newAddresses with the new manual address
    setNewAddresses((prevAddresses) => [...prevAddresses, newManualAddress]);

    // Set the new manual address as the selected address
    //setSelectedAddress(newManualAddress);

    // Reset manual entry and clear manual address fields
    setManualEntry(false);
    setManualAddress({
      fullName: '',
      mobileNo: '',
      addressLine1: '',
      city: '',
      state: '',
      zipCode: '',
    });
  };
  
  useEffect(() => {
    if (selectedAddress) {
      localStorage.setItem('selectedAddress', JSON.stringify(selectedAddress));
    }
    console.log("selectedAddress in local storage");
    console.log(selectedAddress);
  }, [selectedAddress]);


 

  const fetchData = async () => {
    const apiUrl = 'http://103.148.157.74:33178/EcommerceWebApp/rest/address/get_by_userid_address';

    const formData = new URLSearchParams();
    formData.append('userId', userId);

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      const responseData = await response.json();

      if (response.ok && responseData.actionStatus === 'success') {
        console.log('API call Address successful:', responseData);

        // Update the state with the fetched addresses
        setNewAddresses(responseData.addressDataList);
      } else {
        console.error('API call Address failed:', responseData);
        // Handle failure, show an error message or take appropriate action
      }
    } catch (error) {
      console.error('Error during API call:', error);
      // Handle network errors or other unexpected errors
    }
  };

 useEffect(() => {
    // Set the userId when the component mounts or userSession changes
    if (userSession) {

      const userSessionObject = JSON.parse(userSession);
      console.log("hiiiii")
      console.log(userSessionObject);
      setUserId(userSessionObject.user_id);
    }
    console.log("selectedAddress");
    console.log(selectedAddress);
    // if (userId) {
    //   fetchData();
    // }
  }, [userId,userSession,selectedAddress,newAddresses]);

  useEffect(() => {
    if (userId) {
      fetchData();
    }
  }, [userId]);



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
        setOrderData(jsonRes)
       
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

  
  const sendOrderData = async () => {

    const storedAddress = localStorage.getItem('selectedAddress');

    const requestBody = {
      address: JSON.parse(storedAddress),
      cardList: productCart,
      orderData: orderData,
      total:total,
      shippingCharge:shippingCharge,
      userId:userId
    };

    console.log("requestBody",requestBody )
    try {
      let response = await fetch('http://103.148.157.74:33178/EcommerceWebApp/rest/order/saveOrder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Data from server:', data);

        
        localStorage.removeItem('cart');
        cartdata.length = 0;

        localStorage.removeItem('selectedAddress');
        // selectedAddress=null;

        console.log('Setting showModal to true'); // Debugging statement
        setShowModal(true); // This line sets showModal to true after a successful order
        setTimeout(() => {
          console.log('Setting showModal to false'); // Debugging statement
           setShowModal(false);
          window.location.href = '/';
        }, 5000);
        
      } else {
        console.error('Failed to  Response status:', response.status);
      }
    } catch (error) {
      console.error('Error fetching category data:', error);
    }
  };


  useEffect(() => {
    console.log("Order Data:", orderData);
    sendOrderData();
  }, [orderData]);

  useEffect(() => {
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


  return (
    <div>
      <div className="container-fluid mt-5"  >
  <div className="row px-xl-5" style={{marginTop:"100px"}}>
  <div className="col-lg-7" style={sectionStyle}>
      {/* <h5 className="section-title position-relative text-uppercase mb-3" >
        <span className="bg-secondary pr-3">Billing Address</span>
      </h5> */}
<div className="bg-light p-30 mb-5">
      <h3>Billing Address</h3>
      <br/>
      <div className="row" style={{ textAlign: "left" }}>
        <div className="col-md-12">
          <h5>Select Existing Address</h5>
          {newAddresses.map((address) => (
            <div key={address.addressId} className="form-check">
              <input
                type="radio"
                className="form-check-input"
                id={`address_${address.addressId}`}
                name="selectedAddress"
                onChange={() => handleAddressSelection(address)}
                checked={selectedAddress?.addressId === address.addressId}
              />
              <label className="form-check-label" htmlFor={`address_${address.addressId}`}>
                {`${address.userName}, ${address.address}, ${address.city}, ${address.state}, ${address.pincode}`}
              </label>
            </div>
          ))}

          {/* Radio button for manual address entry */}
          <div className="form-check mt-3">
          <button
    className="btn btn-link"
    onClick={() => setManualEntry(true)}
    style={{ textDecoration: 'underline', cursor: 'pointer' }}
  >
    Enter New Address
  </button>
          </div>

          {manualEntry && (
            // Manual Address Entry Form
            <div>
              <div className="col-md-8 form-group">
                <label style={labelStyle}>Full Name</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="John"
                  value={manualAddress.fullName}
                  onChange={(e) => setManualAddress({ ...manualAddress, fullName: e.target.value })}
                />
              </div>

              <div className="col-md-4 form-group">
                <label style={labelStyle}>Mobile No</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="+123 456 789"
                  value={manualAddress.mobileNo}
                  onChange={(e) => setManualAddress({ ...manualAddress, mobileNo: e.target.value })}
                />
              </div>

              <div className="col-md-12 form-group">
                <label style={labelStyle}>Address Line 1</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="123 Street"
                  value={manualAddress.addressLine1}
                  onChange={(e) => setManualAddress({ ...manualAddress, addressLine1: e.target.value })}
                />
              </div>


              <div className="col-md-12 form-group">
                <label style={labelStyle}>City</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="city"
                  value={manualAddress.city}
                  onChange={(e) => setManualAddress({ ...manualAddress, city: e.target.value })}
                />
              </div>

              <div className="col-md-12 form-group">
                <label style={labelStyle}>State</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="state"
                  value={manualAddress.state}
                  onChange={(e) => setManualAddress({ ...manualAddress, state: e.target.value })}
                />
              </div>

            

              <div className="col-md-4 form-group">
                <label style={labelStyle}>ZIP Code</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder={123}
                  value={manualAddress.zipCode}
                  onChange={(e) => setManualAddress({ ...manualAddress, zipCode: e.target.value })}
                />
              </div>
              <button className="btn btn-primary mt-3" onClick={handleAddManualAddress}>
                Add Address
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
      <div className="collapse mb-5" id="shipping-address">
        <h5 className="section-title position-relative text-uppercase mb-3">
          <span className="bg-secondary pr-3">Shipping Address</span>
        </h5>
        <div className="bg-light p-30">
          <div className="row">
            <div className="col-md-4 form-group">
              <label style={labelStyle}>First Name</label>
              <input className="form-control" type="text" placeholder="John" />
            </div>
            <div className="col-md-4 form-group">
              <label style={labelStyle}>Last Name</label>
              <input className="form-control" type="text" placeholder="Doe" />
            </div>
            <div className="col-md-4 form-group">
              <label style={labelStyle}>E-mail</label>
              <input
                className="form-control"
                type="text"
                placeholder="example@email.com"
              />
            </div>
            <div className="col-md-4 form-group">
              <label style={labelStyle}>Mobile No</label>
              <input
                className="form-control"
                type="text"
                placeholder="+123 456 789"
              />
            </div>
            <div className="col-md-4 form-group">
              <label style={labelStyle}>Address Line 1</label>
              <input
                className="form-control"
                type="text"
                placeholder="123 Street"
              />
            </div>
            <div className="col-md-4 form-group">
              <label style={labelStyle}>Address Line 2</label>
              <input
                className="form-control"
                type="text"
                placeholder="123 Street"
              />
            </div>
            <div className="col-md-4 form-group">
              <label style={labelStyle}>Country</label>
              <select className="custom-select">
                <option selected="">United States</option>
                <option>Afghanistan</option>
                <option>Albania</option>
                <option>Algeria</option>
              </select>
            </div>
            <div className="col-md-4 form-group">
              <label style={labelStyle}>City</label>
              <input
                className="form-control"
                type="text"
                placeholder="New York"
              />
            </div>
            <div className="col-md-4 form-group">
              <label style={labelStyle}>State</label>
              <input
                className="form-control"
                type="text"
                placeholder="New York"
              />
            </div>
            <div className="col-md-4 form-group">
              <label style={labelStyle}>ZIP Code</label>
              <input className="form-control" type="text" placeholder={123} />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="col-lg-5">
      {/* <h5 className="section-title position-relative text-uppercase mb-3">
        <span className="bg-secondary pr-3">Order Details</span>
      </h5> */}
      <div className="bg-light p-30 mb-5">
        <h3>Product Total</h3>
        <div className="border-bottom">
  <div className="row"> 
    <div className="col-md-4 col-sm-4 col-4" style={{ fontWeight: 700 }}>Name</div>
    <div className="col-md-2 col-sm-2 col-2" style={{ fontWeight: 700 }}>Size</div>
    <div className="col-md-2 col-sm-2 col-2" style={{ fontWeight: 700 }}>Color</div>
    <div className="col-md-2 col-sm-2 col-2" style={{ fontWeight: 700 }}>Qty</div>
    <div className="col-md-2 col-sm-2 col-2" style={{ fontWeight: 700 }}>Price</div>
  </div>

  {productCart?.map((cartProduct, index) => (
    <div className="row border-bottom" key={index}>
      <div className="col-md-4 col-sm-4 col-4 mt-2">{cartProduct.productName}</div>
      <div className="col-md-2 col-sm-2 col-2 mt-2">{cartProduct.size}</div>
      <div className="col-md-2 col-sm-2 col-2 mt-2">{cartProduct.color}</div>
      <div className="col-md-2 col-sm-2 col-2 mt-2">{cartProduct.quantity}</div>
      <div className="col-md-2 col-sm-2 col-2 mt-2">{cartProduct.price}</div>
    </div>
  ))}
</div>
        <div className="border-bottom pt-3 pb-2">
          <div className="d-flex justify-content-between mb-3">
            <h6>Subtotal</h6>
            <h6>{subTotal}</h6>
          </div>
          <div className="d-flex justify-content-between">
            <h6 className="font-weight-medium">Shipping</h6>
            <h6 className="font-weight-medium">{shippingCharge}</h6>
          </div>
        </div>
        <div className="pt-2">
          <div className="d-flex justify-content-between mt-2">
            <h5>Total</h5>
            <h5>{total}</h5>
          </div>
        </div>
      </div>
      <div className="mb-5">
        {/* <h5 className="section-title position-relative text-uppercase mb-3">
          <span className="bg-secondary pr-3">Payment</span>
        </h5> */}
       
        <div className="bg-light p-30">
        <h3>Payment</h3>
          <div className="form-group">
            <div className="custom-control custom-radio">
              <input
                type="radio"
                className="custom-control-input"
                name="payment"
                id="paypal"
              />
              <label className="custom-control-label" htmlFor="paypal">
              Pay using Debit Card, Credit Card, No Cost EMI Options, Net Banking, UPI – Payu Payment Gateway
              </label>
            </div>
          </div>
          <div className="form-group">
            <div className="custom-control custom-radio">
              <input
                type="radio"
                className="custom-control-input"
                name="payment"
                id="directcheck"
              />
              <label className="custom-control-label" htmlFor="directcheck">
              Pay using Paytm Wallet
              </label>
            </div>
          </div>
          {/* <div className="form-group mb-4">
            <div className="custom-control custom-radio">
              <input
                type="radio"
                className="custom-control-input"
                name="payment"
                id="banktransfer"
              />
              <label className="custom-control-label" htmlFor="banktransfer">
                Bank Transfer
              </label>
            </div>
          </div> */}
          <button onClick={paymentHandler} className="btn btn-block btn-primary font-weight-bold py-3">
            Place Order
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
      {/* Modal component */}
      {showModal && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: '9999',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            height: '100%',
          }}
        >
          <div
            style={{
              backgroundColor: '#fff',
              borderRadius: '5px',
              padding: '20px',
              boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <p>Order placed successfully!</p>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}