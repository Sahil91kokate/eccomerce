import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footers from '../MyComponent/Footers';
import ProductDetails from '../MyComponent/ProductDetails';
import ProductSlider from '../MyComponent/ProductSlider';

export default function Productdetailss() {
  const [singleProductData, setSingleProductData] = useState([]);

  const { productId } = useParams();

  const getSingleProductData = async () => {
    try {
      const apiUrl = 'http://103.148.157.74:33178/EcommerceWebApp/rest/productapi/get_product_by_Id';
      const requestBody = new URLSearchParams({ product_id: productId });

      let response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: requestBody,
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Single product Data from server:', data);
        setSingleProductData(data.ProductData); // Set the fetched data in the state
      } else {
        console.error('Failed to fetch product data. Response status:', response.status);
      }
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  useEffect(() => {
    const targetDiv = document.getElementById('abcd');
    if (targetDiv) {
      // Scroll to the target div
      targetDiv.scrollIntoView({ behavior: 'smooth' });
    }
    getSingleProductData();
  }, [productId]);

  return (
    <div>
      <ProductDetails singleProductData={singleProductData} />
      <ProductSlider />
      <Footers />
    </div>
  );
}
