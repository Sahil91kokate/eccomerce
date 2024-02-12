import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';

import Carts from './Screens/Carts';
import CategoryWiseProduct from './Screens/CategoryWiseProduct';
import Checkouts from './Screens/Checkouts';
import Home from './Screens/Home';
import Layout from './Screens/Layout';
import Loggin from './Screens/Loggin';
import Mens from './Screens/Mens';
import MyAccountt from './Screens/MyAccountt';
import Productdetailss from './Screens/Productdetailss';
import Registrationn from './Screens/Registrationn';
import SearchResults from './Screens/SearchResults';
import Wishlist from './Screens/Wishlist';
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        <Route
            path="/"
            element={<Layout><Home/></Layout>}
          />
             <Route path="mens"
            element={<Layout><Mens/></Layout>}
            />
            <Route path="cart"
            element={<Layout><Carts/></Layout>}
            />
            <Route path="registration"
            element={<Layout><Registrationn/></Layout>}
            />
            <Route path="checkout"
            element={<Layout><Checkouts/></Layout>}
            />
             <Route path="productdetails/:productId"
            element={<Layout><Productdetailss/></Layout>}
            />
             <Route path="CategoryWiseProduct/:categoryId"
            element={<Layout><CategoryWiseProduct/></Layout>}
            />
            
            <Route path="login"
            element={<Layout><Loggin/></Layout>}
            />  
          
          <Route path="/search-results/:query" element={<Layout><SearchResults/></Layout>} /> 
          <Route path="/profile" element={<Layout><MyAccountt/></Layout>} /> 
          <Route path="/wishlist" element={<Layout><Wishlist/></Layout>} /> 
            </Routes>
            </Router>
      </div>
  );
}

export default App;
//  <Route path="/search-results/:query" element={<SearchResults />} />