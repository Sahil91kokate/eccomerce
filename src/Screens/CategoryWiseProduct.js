import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Footers from '../MyComponent/Footers';
import Product from '../MyComponent/Product';

export default function CategoryWiseProduct() {
    const { categoryId } = useParams();
    const [subCategory, setSubCategoryData] = useState([]);
    const [productData, setProductData] = useState([]);
    
    const subCatData = async () => {
      try {
        const apiUrl = 'http://103.148.157.74:33178/EcommerceWebApp/rest/productapi/get_SubCategory_by_categoryId';
        const requestBody = new URLSearchParams({ category_id: categoryId });
    
        let response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: requestBody,
        });
    
        if (response.ok) {
          const data = await response.json();
          console.log('Subcategory Data from server:', data);
          setSubCategoryData(data); // Set the fetched data in the state
        } else {
          console.error('Failed to fetch subcategory data. Response status:', response.status);
        }
      } catch (error) {
        console.error('Error fetching subcategory data:', error);
      }
    };

    const getProductData = async () => {
        try {
          const apiUrl = 'http://103.148.157.74:33178/EcommerceWebApp/rest/productapi/get_product_by_CategoryId';
          const requestBody = new URLSearchParams({ category_id: categoryId });
      
          let response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: requestBody,
          });
      
          if (response.ok) {
            const data = await response.json();
            console.log('product Data from server:', data);
            setProductData(data); // Set the fetched data in the state
          } else {
            console.error('Failed to fetch product data. Response status:', response.status);
          }
        } catch (error) {
          console.error('Error fetching product data:', error);
        }
      };
    
    useEffect(() => {
      subCatData();
      getProductData();
    }, [categoryId]);


  return (
  <div>
    <Product subCategory={subCategory?.SubCategoryDataList} productData={productData?.ProductList} />
    <Footers/>
  </div>
  )
}
