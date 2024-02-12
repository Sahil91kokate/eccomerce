


import { googleLogout } from '@react-oauth/google';
import React, { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';


const Navbar = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const userSession  = sessionStorage.getItem('user');
  const navigate = useNavigate();
  const [ user, setUser ] = useState(userSession);
//console.log("sajdhjsadf:" +user);
//   useEffect(() => {
//   // Function to handle logout
//   const handleLogout = () => {
//     // Add your logout logic here
//     setIsLoggedIn(false); // Update login status to false
//   }
// });

useEffect(() => {
  const storedExpireAt = sessionStorage.getItem('expireAt');

  if (storedExpireAt) {
    const expireAt = parseInt(storedExpireAt, 10);
    const currentTime = new Date().getTime();

    if (currentTime > expireAt) {
      // Session has expired, perform logout or any other action
      logout();
    }
  }

   // Check if user session is available in session storage
  
   console.log("userSession")
   console.log(userSession)
   setIsLoggedIn(userSession!==null?true:false);
   console.log("++++++++++++++++++"+isLoggedIn);

   
   // Fetch data when the component mounts
  catData();

}, [userSession]);



const logout = async () => {
  try {
    await googleLogout();
    setUser(null);
    setIsLoggedIn(false);
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('expireAt');
    navigate('/login');
  } catch (error) {
    // Handle any errors that might occur during logout
    console.error('Error during logout:', error);
  }
};


  
  const [searchValue, setSearchValue] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const history = useNavigate ();

const handleSearchToggle = () => {
  setIsSearchOpen(!isSearchOpen);
};

const handleSearchSubmit = (value) => {
  if (value.trim() === '') {
    // Go back to the previous page if search value is empty
    history("/");
  } else {
    console.log('Search submitted:', value);
    // Example: Redirect to a new component with the search value
    history(`/search-results/${value}`);
  }
};

  const [categoryData, setCategoryData] = useState({ CategoryList: [] });

  const catData = async () => {
    try {
      let response = await fetch('http://103.148.157.74:33178/EcommerceWebApp/rest/productapi/get_all_category', {
        method: 'POST', // Change to GET if you are fetching data
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        // referrerPolicy: "unsafe-url"
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Data from server:', data);
        setCategoryData(data); // Set the fetched data in the state
      } else {
        console.error('Failed to fetch category data. Response status:', response.status);
      }
    } catch (error) {
      console.error('Error fetching category data:', error);
    }
  };

useEffect(() => {
  // Fetch data when the component mounts
  catData();
  
}, []);




  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light" style={{position:"fixed",top:0,left:0,right:0,zIndex:10,width:"100%"}}>
      <div className="container-fluid">
        <Link className="navbar-brand d-block d-lg-none" to="/">
          <img src="img/logo.png" style={{ height: '20px' }} alt=""></img>
        </Link>
        <li className="nav-item d-lg-none" style={{ listStyle: "none" }}>
            <Link to="#searchbar">
                <button
                    className="btn btn-link nav-link"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                    type="button"
                    onClick={handleSearchToggle}
                >
                    <i className="fas fa-search"></i>
                </button>
            </Link>
            <div
                className={`collapse navbar-collapse ${isSearchOpen ? 'show' : ''}`}
                id="searchCollapse"
            >
                {/* <form className="form-inline my-2 my-lg-0 w-100">
                    <div className="input-group w-100">
                        <div className="input-group-prepend">
                            <span className="input-group-text">
                                <i className="fas fa-search"></i>
                            </span>
                        </div>
                        <input
                            className="form-control form-control-sm"
                            type="search"
                            placeholder="Search for products"
                            aria-label="Search"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handleSearchSubmit(searchValue);
                                }
                            }}
                        />
                    </div>
                </form> */}
            </div>
        </li>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <Link className="navbar-brand d-none d-lg-block mx-auto" to="/">
            <img src="img/logo.png" style={{ height: '20px' }} alt=""></img>
          </Link>
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            
            <li className="nav-item">
              <Link className="nav-link" to="/mens">
                <b>Mens</b>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <b>Women</b>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <b>Kid's</b>
              </Link>
            </li>
            <li className="nav-item dropdown">
            <NavLink
                className="nav-link dropdown-toggle"
                to="/mens" 
                activeClassName="active"
                id="mensDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <b>Collections</b>
              </NavLink>
              <div className="dropdown-menu" aria-labelledby="mensDropdown"  style={{ width: '30vw' }}>
                <div className="row">
                  {categoryData.CategoryList.map((category) => (
                    <div key={category.categoryId} className="col-sm-4">
                      <Link className="dropdown-item"  to={`/CategoryWiseProduct/${category.categoryId}`}>
                        {category.categoryName}
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </li>
            
           
            <li className="nav-item d-lg-none">
              <button 
                className="btn btn-link nav-link"
                type="button"
                onClick={handleSearchToggle}
              >
                <i className={`fas fa-search ${isSearchOpen ? 'd-none' : ''}`}></i>
              </button>
              <div
                className={`collapse navbar-collapse ${isSearchOpen ? 'show' : ''}`}
                id="searchCollapse"
              >
                <form className="form-inline my-2 my-lg-0 w-100">
                  <div className="input-group w-100">
                    <div className="input-group-prepend">
                      <span className="input-group-text">
                        <i className="fas fa-search"></i>
                      </span>
                    </div>
                    <input
                      className="form-control form-control-sm"
                      type="search"
                      placeholder="Search for products"
                      aria-label="Search"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleSearchSubmit(searchValue);
                        }
                      }}
                    />
                  </div>
                </form>
              </div>
            </li>
            <li className="nav-item d-none d-sm-block">
                  {/* Only visible in desktop view */}
     <form className="form-inline my-2 my-lg-0 w-100">
        <div className="input-group w-150 mt-2" style={{width:"30vw"}}>
          <div className="input-group-prepend">
            <span className="input-group-text">
              <i className="fas fa-search"></i>
            </span>
          </div>
          <input
            className="form-control form-control-sm"
            type="search"
            placeholder="Search for products"
            aria-label="Search"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSearchSubmit(searchValue);
              }
            }}
          />
        </div>
      </form>
                </li>
            
          </ul>
          <ul className="navbar-nav ml-auto">
          <li className="nav-item" style={{padding:"inherit"}}>
                  <div className="btn-group ml-3">

                  {isLoggedIn ?  (   <Link className="dropdown-item mt-2" to="/wishlist">
                      <i className="far fa-heart"style={{ fontSize: "20px"}} /> 
                    </Link>):(<span></span>)}

                  <Link className="dropdown-item mt-2" to="/cart">
                      <i className="fas fa-shopping-cart " style={{ fontSize: "20px"}} />
                    </Link>
                    <button
                      type="button"
                      className="btn btn-sm btn-light dropdown-toggle mt-2"
                      data-toggle="dropdown"
                    >
                      <b ><i class="fas fa-user-circle" style={{ fontSize: "20px"}}></i></b>
                    </button>
                    <div className="dropdown-menu dropdown-menu-right" style={{position: "absolute"}}>
                      <Link className="dropdown-item" to="/registration" activeClassName="active">
                        Registration
                      </Link>
                      {isLoggedIn ? (

// Display logout button if user is logged in
<li className="nav-item dropdown">
<button className="dropdown-item" onClick={logout}>
Logout
</button>

<Link className="dropdown-item mt-2" to="/profile">
                  <i className="fas fa-user" /> User Profile
                </Link>
</li>



) : (

// Display login button if user is not logged in
<li className="nav-item">
<Link className="nav-link" activeClassName="active" to="/login">
Login
</Link>
</li>
)}
                    </div>
                    {/* <Link className="dropdown-item mt-2" to="/cart">
                      <i className="fas fa-shopping-cart " /> Cart
                    </Link> */}
                    
                  </div>
                </li>
          </ul>
        </div>
      </div>
     
    </nav>
  );
};

export default Navbar;
