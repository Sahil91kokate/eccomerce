// Layout.js
import React from 'react';
import Navbar from '../MyComponent/Navbar';
import BottomNavigation from '../MyComponent/BottomNavigation';
export default function Layout({ children }) {
  return (
    <div>
      <Navbar />
      <div style={{ minHeight: 'calc(100vh - 100px)' }}>
        {children}
      </div>
      <BottomNavigation/>
    </div>
  );
}
