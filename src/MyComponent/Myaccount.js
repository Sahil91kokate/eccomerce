import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MyAccount = () => {
  const [activeTab, setActiveTab] = useState('address');
  const [newAddresses, setNewAddresses] = useState([]);
  const [newAddressInput, setNewAddressInput] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const[editProfileModal, seteditProfileModal]= useState(false);
  const [newAddressName, setNewAddressName] = useState('');
  const [newAddressMobile, setNewAddressMobile] = useState('');
  const [newAddressPincode, setNewAddressPincode] = useState('');
  const [newAddressState, setNewAddressState] = useState('');
  const [newAddressCity, setNewAddressCity] = useState('');
  const [userId, setUserId] = useState('');

  const[userOrderData,setUserOrderData]= useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');



  const userSession = sessionStorage.getItem('user');
  const parsedUserSession = userSession ? JSON.parse(userSession) : null;
  
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
      console.log(userSessionObject.user_id);
      setUserId(userSessionObject.user_id);
    }
  }, [userSession]);

  useEffect(() => {
    if (userId) {
      fetchData();
    }
  }, [userId]);



  const openTab = (tabName) => {
    setActiveTab(tabName);
  };

  const handleAddNewAddress = () => {
    // Open the modal for adding a new address
    setShowAddModal(true);
  };





  const handleCloseAddModal = () => {
    // Close the modal for adding a new address
    setShowAddModal(false);
  };

  const handleSaveNewAddress = async () => {
    // if (newAddressInput.trim() === '') {
    //   alert('Please enter a valid address.');
    //   return;
    // }

    const apiUrl = 'http://103.148.157.74:33178/EcommerceWebApp/rest/address/save_address';

    const formData = new URLSearchParams();
    formData.append('addressId', 'NA');
    formData.append('userId', userId);
    formData.append('user_name', newAddressName);
    formData.append('mobile_no', newAddressMobile);
    formData.append('address', newAddressInput.trim());
    formData.append('pincode', newAddressPincode);
    formData.append('city', newAddressCity);
    formData.append('state', newAddressState);

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
        console.log('API call successful:', responseData);
        fetchData();
        setNewAddressName('');
      setNewAddressMobile('');
      setNewAddressPincode('');
      setNewAddressInput('');
      setNewAddressState('');
      setNewAddressCity('');
      setNewAddressInput('');
        // Handle success, maybe show a success message or redirect
      } else {
        console.error('API call failed:', responseData);
        // Handle failure, show an error message or take appropriate action
      }
    } catch (error) {
      console.error('Error during API call:', error);
      // Handle network errors or other unexpected errors
    }

    // Additional logic if needed
   
    
    setShowAddModal(false); // Close the modal after saving the new address
  };



  const handleRemoveAddress = async (addressId) => {
    const apiUrl = 'http://103.148.157.74:33178/EcommerceWebApp/rest/address/delete_address';

    const formData = new URLSearchParams();
    formData.append('addressId', addressId);

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
        console.log('API call Remove Address successful:', responseData);

        // Remove the address from the state after successful removal
        const updatedAddresses = newAddresses.filter((address) => address.addressId !== addressId);
        setNewAddresses(updatedAddresses);
      } else {
        console.error('API call Remove Address failed:', responseData);
        // Handle failure, show an error message or take appropriate action
      }
    } catch (error) {
      console.error('Error during API call:', error);
      // Handle network errors or other unexpected errors
    }
  };


  
  const getOrderData= async () => {
    const apiUrl = 'http://103.148.157.74:33178/EcommerceWebApp/rest/order/get_order_by_userId';

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

      if (response.ok && responseData.status === 'success') {
        console.log('API call Order data User  successful:', responseData);

        // Update the state with the fetched addresses
        setUserOrderData(responseData.OrderDataList);
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
    if (userId) {
      getOrderData();
    }
  }, [userId]);

  useEffect(() => {
    // Filter orders when userOrderData or selectedStatus changes
    if (userOrderData.length > 0 && selectedStatus !== '') {
      const filtered = userOrderData.filter(order => order.orderStatus === selectedStatus);
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders(userOrderData);
    }
  }, [userOrderData, selectedStatus]);


  const renderAddAddressModal = () => (
    <Modal show={showAddModal} onHide={handleCloseAddModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Address</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="formNewAddressName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={newAddressName}
            onChange={(e) => setNewAddressName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formNewAddressMobile">
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your mobile number"
            value={newAddressMobile}
            onChange={(e) => setNewAddressMobile(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formNewAddressPincode">
          <Form.Label>Pincode</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the pincode"
            value={newAddressPincode}
            onChange={(e) => setNewAddressPincode(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formNewAddressStreet">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your street address"
            value={newAddressInput}
            onChange={(e) => setNewAddressInput(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formNewAddressState">
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your state"
            value={newAddressState}
            onChange={(e) => setNewAddressState(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formNewAddressCity">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your city"
            value={newAddressCity}
            onChange={(e) => setNewAddressCity(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseAddModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveNewAddress}>
          Save Address
        </Button>
      </Modal.Footer>
    </Modal>
  );
  
 const handleCloseEditProfileModal =() =>{

    seteditProfileModal(true)
  }

  

  const renderEditProfileModal = () => (
    <Modal show={editProfileModal} onHide={handleCloseEditProfileModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add New Address</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group controlId="formNewAddressName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={newAddressName}
            onChange={(e) => setNewAddressName(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formNewAddressMobile">
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your mobile number"
            value={newAddressMobile}
            onChange={(e) => setNewAddressMobile(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formNewAddressPincode">
          <Form.Label>Pincode</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter the pincode"
            value={newAddressPincode}
            onChange={(e) => setNewAddressPincode(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formNewAddressStreet">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your street address"
            value={newAddressInput}
            onChange={(e) => setNewAddressInput(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formNewAddressState">
          <Form.Label>State</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your state"
            value={newAddressState}
            onChange={(e) => setNewAddressState(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formNewAddressCity">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your city"
            value={newAddressCity}
            onChange={(e) => setNewAddressCity(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseAddModal}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveNewAddress}>
          Save Address
        </Button>
      </Modal.Footer>
    </Modal>
  );
  
 


  return (
    <div className="container mt-5">
    <h2 className="mb-4">My Account</h2>

      <div className="tabs">
        <div
          className={`tab ${activeTab === 'orders' ? 'active' : ''}`}
          onClick={() => openTab('orders')}
        >
          Orders and Returns
        </div>
        
        
        <div
          className={`tab ${activeTab === 'address' ? 'active' : ''}`}
          onClick={() => openTab('address')}
        >
          Saved Addresses
        </div>
        <div
          className={`tab ${activeTab === 'profile' ? 'active' : ''}`}
          onClick={() => openTab('profile')}
        >
          Account Profile
        </div>
      </div>

      <div id="profile" className={`tab-content ${activeTab === 'profile' ? 'active' : ''}`}>
        <h2>Profile Details</h2>
        <hr/>

{/* <div className="row">
  <div className="col-md-4">
    <div className="card">
      <img
        src={parsedUserSession?.profile_url}
        alt="User Image"
        className="card-img-top user-image"
        style={{ height: '300px', objectFit: 'cover' }}
      />
      <div className="card-body text-center">
        <h3 className="card-title"></h3>
      </div>
    </div>
  </div>

 <div className="col-md-8">
    <div className="profile-item">
    <h6>User ID: <span className="profile-text">{parsedUserSession?.user_id}</span></h6>
    </div>
    <div className="profile-item">
    <h6>Full Name: <span className="profile-text">{parsedUserSession?.user_name}</span></h6>
    </div>
    <div className="profile-item">
    <h6>Mobile Number: <span className="profile-text">##############</span></h6>
    </div>
    <div className="profile-item">
    <h6>Email: <span className="profile-text">{parsedUserSession?.user_email}</span></h6>
    </div>
    
    
  </div>
</div> */}

<div className="row gutters-sm">
  <div className="col-md-4 mb-3">
    <div className="card">
      <div className="card-body">
        <div className="d-flex flex-column align-items-center text-center">
          <img
            src={parsedUserSession?.profile_url}
            alt="Admin"
            className="rounded-circle"
            width={150}
          />
          <div className="mt-4">
            <h4>{parsedUserSession?.user_name}</h4>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div className="col-md-8">
    <div className="card mb-3">
      <div className="card-body">
        {/* Profile information */}
        <div className="row">
          <div className="col-sm-3">
            <h6 className="mb-0">User Id</h6>
          </div>
          <div className="col-sm-9 text-dark">{parsedUserSession?.user_id}</div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-3">
            <h6 className="mb-0">Email</h6>
          </div>
          <div className="col-sm-9 text-dark">{parsedUserSession?.user_email}</div>
        </div>
        <hr />
        <div className="row">
          <div className="col-sm-3">
            <h6 className="mb-0">Mobile</h6>
          </div>
          <div className="col-sm-9 text-dark">++++++++++++</div>
        </div>
        {/* Other profile fields */}
        {/* Add more rows as needed */}
        <hr />
        <div className="row">
          <div className="col-sm-12">
            <Link
              className="btn btn-info btn-dark"
              target="_blank"
              to=""
            >
              Edit
            </Link>
          </div>
        </div>
      </div>
    </div>
    <div />
  </div>
</div>




</div>

      
<div id="address" className={`tab-content ${activeTab === 'address' ? 'active' : ''}`}>
  <div className="d-flex justify-content-between align-items-center">
    <h2>Saved Addresses</h2>
    <button className="btn btn-primary btn-sm" onClick={handleAddNewAddress}>
      + Add New Address
    </button>
  </div>
  <div className="mt-2">
    {/* Display default addresses here */}
    <div className="default-address">
      {/* Display default address details here */}
    </div>
  </div>
  <div className="address-container mt-2">
  {newAddresses.map((address,index) => (
    
  <div className="card mb-3" key={address.addressId} style={{ backgroundColor: 'white', color: 'black'  , border:"black solid 2px"}}>
    <h5 className="card-header" style={{ borderBottom: '1px solid black' ,backgroundColor: '#ccc', color: 'black'}}>Address <span style={{ fontWeight: 'bold'   }}>{index + 1}</span></h5>
    <div className="card-body">
      <h5 className="row card-title" style={{   fontWeight: 'bold', fontSize: '18px', marginBottom: '10px' }}> <span style={{color:"black"}}>Address:</span> <span style={{ fontWeight: 'normal' }}>{address.address}</span></h5>

      <div className='row text-left'>
        <div className='col-md-4 mt-2'>
          <span style={{ fontWeight: 'bold' }}>Name:</span> {address.userName}
        </div>

        <div className='col-md-4 mt-2'>
          <span style={{ fontWeight: 'bold' }}>Mobile Number:</span> {address.mobileNo}
        </div>

        <div className='col-md-4 mt-2'>
          <span style={{ fontWeight: 'bold' }}>Pincode:</span> {address.pincode}
        </div>

        <div className='col-md-4 mt-2'>
          <span style={{ fontWeight: 'bold' }}>City:</span> {address.city}
        </div>

        <div className='col-md-4 mt-2'>
          <span style={{ fontWeight: 'bold' }}>State:</span> {address.state}
        </div>
      </div>
    
      <a href="#" className="btn  mt-4" style={{ backgroundColor: 'white', color: 'black'  , border:"black solid 2px"}} onClick={() => handleRemoveAddress(address.addressId)}>
        <strong>Remove</strong>
      </a>
    </div>
  </div>

 ))}
</div>



  {/* Render the modal using the function */}
  {renderAddAddressModal()}
</div>


      
  <div id="orders" className={`tab-content ${activeTab === 'orders' ? 'active' : ''}`}>
  <div className="d-flex justify-content-between align-items-center">
    <h2>All Orders</h2>
    <div className="d-flex">
      <div className="input-group">
      
        <div className="input-group-append">
           <select
                className="custom-select"
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
              >
            <option value="">Filter by Status</option>
            <option value="">All</option>
            <option value="Received">Received</option>
            <option value="PlaceOrder">PlaceOrder</option>
            <option value="Delivered">Delivered</option>
            <option value="Returned">Returned</option>
          </select>
        </div>
      </div>
    </div>
  </div>
  <hr/>

  <div className="container">
      {filteredOrders.map((order, index) => (
        <div key={index} className="card mb-3">
          <div className="row no-gutters">
            <div className="col-md-3 d-flex align-items-center">
            <Link to={`/productdetails/${order.productId}`}>
              <img
                src={`http://103.148.157.74:33178/EcommerceWebApp/${order.productInfoId}`} // Assuming the productInfoId is unique and corresponds to the image file name
                className="card-img"
                alt={order.productInfoId}
                style={{ width: '150px', height: '150px', objectFit: 'cover' }}
              />
              </Link>
            </div>
            <div className="col-md-3">
              <div className="card-body">
                <p className="card-title">Product Id: {order.productId}</p>
                <p className="card-text">Order Status: {order.orderStatus}</p>
                <p className="card-text">Created On: {order.createdOn}</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card-body">
                <p className="card-text">Color: {order.productinfoObject.color}</p>
                <p className="card-text">Size: {order.productinfoObject.size}</p>
                <p className="card-text">Quantity: {order.quantity}</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card-body">
                <p className="card-text">Delivery Date: {order.createdOn}</p>
                <p className="card-text">Status: {order.orderStatus}</p>
                <p className="card-text">Total Price: {order.total_price}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>

<hr></hr>
  {/* Section for returns */}

</div>
   {/* Modal for adding a new address */}
   
    </div>
  );
};

export default MyAccount;
