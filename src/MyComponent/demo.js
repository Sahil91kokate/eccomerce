// YourComponent.js

import React, { useEffect, useState } from 'react';
import ProductItem from './Products';

const YourComponent = ({ productData }) => {
  const [selectedColors, setSelectedColors] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [colorList, setColorList] = useState([]);

  useEffect(() => {
    // Check if productData is defined before extracting colors
    if (productData && productData.length > 0) {
      const uniqueColors = Array.from(
        new Set(
          productData.flatMap((product) =>
            product.ProductInfoDataList.map((info) => info.color)
          )
        )
      );

      setColorList(uniqueColors);
    }
  }, [productData]);

  const handleColorCheckboxChange = (color) => {
    setSelectedColors((prevColors) =>
      prevColors.includes(color)
        ? prevColors.filter((c) => c !== color)
        : [...prevColors, color]
    );
  };

  useEffect(() => {
    // Check if productData is defined before filtering products
    if (productData && productData.length > 0) {
      const newFilteredProducts = productData.filter((product) =>
        selectedColors.length === 0
          ? true // Show all products if no color is selected
          : product.ProductInfoDataList.some((info) =>
              selectedColors.includes(info.color)
            )
      );

      setFilteredProducts(newFilteredProducts);
    }
  }, [productData, selectedColors]);

  return (
    <div>
      {/* Your existing code for rendering products */}
      <div className="row">
        {filteredProducts.map((product) => {
          const imageArray = product.ProductInfoDataList.flatMap((info) =>
            info.InfoImageList.map((img) => img.image)
          );

          return (
            <div
              key={product.productId}
              className="col-lg-4 col-md-4 col-sm-4 col-4"
              style={{ padding: '4px' }}
            >
              {/* Assume ProductItem is a component that displays a product */}
              <ProductItem
                productId={product.productId}
                images={imageArray}
                productName={product.name}
                price={product.price}
              />
            </div>
          );
        })}
      </div>

      {/* Your color filter checkboxes */}
      <h5 className="section-title position-relative text-uppercase mb-3">
        <span className="bg-secondary pr-3">Filter by color</span>
      </h5>
      <div className="bg-light p-4 mb-30">
        <form>
          {/* Map over the dynamically created colorList */}
          {colorList.map((color) => (
            <div
              key={color} // You should use a unique key for each checkbox
              className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3"
            >
              <input
                type="checkbox"
                className="custom-control-input"
                id={`color-${color}`}
                onChange={() => handleColorCheckboxChange(color)}
                checked={selectedColors.includes(color)}
              />
              <label className="custom-control-label" htmlFor={`color-${color}`}>
                {color}
              </label>
              {/* You may display the count of products with this color if needed */}
              <span className="badge border font-weight-normal">Count</span>
            </div>
          ))}
        </form>
      </div>
    </div>
  );
};

export default YourComponent;




{/* <form>
<div>
{singleProductData.ProductInfoDataList ? (
singleProductData.ProductInfoDataList.map((info, index) => (
<div
key={index}
className="custom-control custom-radio custom-control-inline"
style={{zIndex:2}}
>
<input  
  type="radio"
  className="custom-control-input"
  id={`size-${index}`}
  name="size"
  value={info.size}
  onChange={() => handleSizeChange(info.size)}
  // Add any other necessary attributes or event handlers
/>
<label
  className="custom-control-label"
  htmlFor={`size-${index}`}
>
  {info.size}
</label>
</div>
))
) : (
<p>Loading sizes...</p>
)}
</div>
</form>


<form>
                <div className="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    className="custom-control-input"
                    id="size-1"
                    name="size"
                  />
                  <label className="custom-control-label" htmlFor="size-1">
                    XS
                  </label>
                </div>
                <div className="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    className="custom-control-input"
                    id="size-2"
                    name="size"
                  />
                  <label className="custom-control-label" htmlFor="size-2">
                    S
                  </label>
                </div>
                <div className="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    className="custom-control-input"
                    id="size-3"
                    name="size"
                  />
                  <label className="custom-control-label" htmlFor="size-3">
                    M
                  </label>
                </div>
                <div className="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    className="custom-control-input"
                    id="size-4"
                    name="size"
                  />
                  <label className="custom-control-label" htmlFor="size-4">
                    L
                  </label>
                </div>
                <div className="custom-control custom-radio custom-control-inline">
                  <input
                    type="radio"
                    className="custom-control-input"
                    id="size-5"
                    name="size"
                  />
                  <label className="custom-control-label" htmlFor="size-5">
                    XL
                  </label>
                </div>
              </form> */}