


import React, { useEffect, useState } from 'react';
import Banner from './Banner';
import Featured from './Featured';
import GetTheLook from './Getlook';
import ProductSlider from './ProductSlider';

export default function TopCategories() {
  const [allData, setAllData] = useState({});

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
        console.log('all product  form inside Data from server:', data);
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
   
    getAllProductData();
  }, []);
  return (
    <div>
      <div
        style={{
          backgroundColor: 'white',
          width: '100%',
          position: 'relative',
          top: 750,
          paddingLeft: "15px",
          paddingRight: "15px",
        }}
      >

     <Featured/>
        <GetTheLook/>

        <Banner/>
        <ProductSlider allProduct={allData?.ProductList}/>
        {/* <TopCategories/> */}
      </div>
    </div>
  );
}
