import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SearchProduct from '../MyComponent/SearchProduct';

const SearchResults = () => {
  const navigate = useNavigate();
  const { query } = useParams();

  console.log("abcd"+query)

  const [productData1, setAllData] = useState([]);

  const getAllProductData = async () => {
    try {
      let response = await fetch('http://103.148.157.74:33178/EcommerceWebApp/rest/productapi/get_all_product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log('All product in search Data from server:', data);
        setAllData(data.ProductList); // Set the fetched data in the state
      } else {
        console.error('Failed to fetch product data. Response status:', response.status);
      }
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  useEffect(() => {
    if (query === undefined || query === null || query.trim() === '') {
      // Redirect to previous page if query is undefined, null, or an empty string
      navigate(-1);
    } else {
      getAllProductData();
    }
  }, [query, navigate]);

  const productData = productData1.filter((product) => {
    // Check if any value in the product or its inner objects matches the query
    return (
      Object.values(product).some((value) =>
        value.toString().toLowerCase().includes(query.toLowerCase())
      ) ||
      (product.ProductInfoDataList &&
        product.ProductInfoDataList.some((info) =>
          Object.values(info).some((value) =>
            value.toString().toLowerCase().includes(query.toLowerCase())
          )
        ))
    );
  });

  return (
    <>
      {productData.length === 0 ? (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
          <p style={{ textAlign: 'center' }}>Your search is not found.</p>
        </div>
      ) : (
        <SearchProduct productData={productData}/>
      )}
    </>
  );
};

export default SearchResults;
