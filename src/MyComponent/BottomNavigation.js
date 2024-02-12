import React, { useState } from 'react';
import { Link } from 'react-router-dom';
export default function BottomNavigation() {
  const [activeTab, setActiveTab] = useState(0);

  const changeTab = (tabIndex) => {
    setActiveTab(tabIndex);
  };

  return (
    <div>
      <div className="bottom-navigation">
        <Link
          to="/"
          className={`nav-item ${activeTab === 0 ? 'active' : ''}`}
          onClick={() => changeTab(0)}
        >
          <i className="fa fa-home" />
        </Link>
        <Link
          to="/mens"
          className={`nav-item ${activeTab === 1 ? 'active' : ''}`}
          onClick={() => changeTab(1)}
        >
          <i className="fas fa-tshirt" />
        </Link>
        <Link
          to="/cart"
          className={`nav-item ${activeTab === 3 ? 'active' : ''}`}
          onClick={() => changeTab(3)}
        >
          <i className="fas fa-shopping-cart" />
        </Link>
        <Link
          to="/login"
          className={`nav-item ${activeTab === 2 ? 'active' : ''}`}
          onClick={() => changeTab(2)}
        >
          <i className="fas fa-sign-in-alt" />
        </Link>
       
      </div>
    </div>
  );
}
