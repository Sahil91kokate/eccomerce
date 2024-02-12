import React, { useEffect, useState } from 'react';
import Footers from '../MyComponent/Footers';
import MenProduct from '../MyComponent/MenProduct';

export default function Mens() {

  const [categoryData, setCategoryData] = useState({});

  const [allData, setAllData] = useState({});
  
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
  
  
  const getAllProductData = async () => {
    try {
      let response = await fetch('http://103.148.157.74:33178/EcommerceWebApp/rest/productapi/get_all_product', {
        method: 'POST', // Change to GET if you are fetching data
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        // referrerPolicy: "unsafe-url"
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('all product  Data from server:', data);
        setAllData(data); // Set the fetched data in the state
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
    getAllProductData();
  }, []);
  






  return (
    <div>
      <MenProduct Category={categoryData?.CategoryList} productData={allData?.ProductList}/>
      <Footers/>
    </div>
  )
}
