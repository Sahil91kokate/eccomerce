import React, { useEffect, useState } from 'react';
import ProductItem from './Products';
export default function SearchProduct({productData}) {

  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [colorList, setColorList] = useState([]);
  const [sizeList, setSizeList] = useState([]);
  const [priceRangeList, setPriceRangeList] = useState([]);

  useEffect(() => {
    // Check if productData is defined before extracting colors, sizes, price ranges, and categories
    if (productData && productData.length > 0) {
      const uniqueColors = Array.from(
        new Set(
          productData.flatMap((product) =>
            product.ProductInfoDataList.map((info) => info.color)
          )
        )
      );
      const uniqueSizes = Array.from(
        new Set(
          productData.flatMap((product) =>
            product.ProductInfoDataList.map((info) => info.size)
          )
        )
      );
      const uniquePriceRanges = [
        '0 - 300',
        '300 - 500',
        '500 - 1000',
        '1000 - 2000',
        '2000 - 3000',
        '3000 - 4000',
        '4000 - 5000',
        '5000 more',
      ];
     

      setColorList(uniqueColors);
      setSizeList(uniqueSizes);
      setPriceRangeList(uniquePriceRanges);
      
    }
  }, [productData]);

  const handleColorCheckboxChange = (color) => {
    setSelectedColors((prevColors) =>
      prevColors.includes(color)
        ? prevColors.filter((c) => c !== color)
        : [...prevColors, color]
    );
  };

  const handleSizeCheckboxChange = (size) => {
    setSelectedSizes((prevSizes) =>
      prevSizes.includes(size)
        ? prevSizes.filter((s) => s !== size)
        : [...prevSizes, size]
    );
  };

  const handlePriceRangeCheckboxChange = (priceRange) => {
    setSelectedPriceRanges((prevPriceRanges) =>
      prevPriceRanges.includes(priceRange)
        ? prevPriceRanges.filter((pr) => pr !== priceRange)
        : [...prevPriceRanges, priceRange]
    );
  };

  const handleCategoryClick = (category) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((c) => c !== category)
        : [...prevCategories, category]
    );
  };

  useEffect(() => {
    // Check if productData is defined before filtering products
    if (productData && productData.length > 0) {
      const newFilteredProducts = productData.filter((product) =>
        (selectedColors.length === 0 || product.ProductInfoDataList.some((info) =>
          selectedColors.includes(info.color)
        )) &&
        (selectedSizes.length === 0 || product.ProductInfoDataList.some((info) =>
          selectedSizes.includes(info.size)
        )) &&
        (selectedPriceRanges.length === 0 ||
          selectedPriceRanges.some((priceRange) =>
            checkPriceRange(product.price, priceRange)
          )) &&
        (selectedCategories.length === 0 || selectedCategories.includes(product.categoryName))
      );

      setFilteredProducts(newFilteredProducts);
      setCurrentPage(1);
    }
  }, [productData, selectedColors, selectedSizes, selectedPriceRanges, selectedCategories]);

  const checkPriceRange = (price, priceRange) => {
    const [min, max] = priceRange.split('-').map((str) => parseInt(str.trim(), 10));
    return price >= min && price <= max;
  };

  const [currentPage, setCurrentPage] = useState(1);

  const productsPerPage = 12; // Adjust the number of products per page

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


  const Pagination = ({ currentPage, totalPages, handlePageChange }) => {
    return (
      <div className="pagination-container d-flex justify-content-center mt-auto">
        <nav>
          <ul className="pagination justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
            </li>
  
            {Array.from({ length: totalPages }).map((_, index) => (
              <li key={index + 1} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
  
            <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    );
  };
const ProductsList = () => {
    
    return (
      <>
      <div className="container-fluid mt-1">
        <div className="row px-xl-5">
      <div className="col-lg-3 col-md-3 ">
      <h5 className="section-title position-relative text-uppercase mb-3">
        <span className="bg-secondary pr-3">Filter by price</span>
      </h5>
      <div className="bg-light p-4 mb-30">
        <form>
          {[
            '0 - 300',
            '300 - 500',
            '500 - 1000',
            '1000 - 2000',
            '2000 - 3000',
            '3000 - 4000',
            '4000 - 5000',
            '5000 - 1000000',
          ].map((priceRange) => (
            <div
              key={priceRange}
              className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3"
            >
              <input
                type="checkbox"
                className="custom-control-input"
                id={`price-${priceRange}`}
                onChange={() => handlePriceRangeCheckboxChange(priceRange)}
                checked={selectedPriceRanges.includes(priceRange)}
              />
              <label className="custom-control-label" htmlFor={`price-${priceRange}`}>
                {`₹ ${priceRange}`}
              </label>
              <span className="badge border font-weight-normal">Count</span>
            </div>
          ))}
        </form>
      </div>
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
      <h5 className="section-title position-relative text-uppercase mb-3">
        <span className="bg-secondary pr-3">Filter by size</span>
      </h5>
      <div className="bg-light p-4 mb-30">
        <form>
          {sizeList.map((size) => (
            <div
              key={size}
              className="custom-control custom-checkbox d-flex align-items-center justify-content-between mb-3"
            >
              <input
                type="checkbox"
                className="custom-control-input"
                id={`size-${size}`}
                onChange={() => handleSizeCheckboxChange(size)}
                checked={selectedSizes.includes(size)}
              />
              <label className="custom-control-label" htmlFor={`size-${size}`}>
                {size}
              </label>
              <span className="badge border font-weight-normal">Count</span>
            </div>
          ))}
        </form>
      </div>
      </div>
      <div className="col-lg-9 col-md-9 " >
      {/* <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} /> */}

        <div className="row">
          
          {currentProducts?.map(product => {
            // Extracting the image URLs from InfoImageList
            // const imageArray = product.ProductInfoDataList.map(info =>
            //   info.InfoImageList.map(img => img.image)
            // );
            const imageArray = product.ProductInfoDataList.flatMap(info =>
              info.InfoImageList.map(img => img.image)
            );

            return (
              <div key={product.productId} className="col-lg-4 col-md-4 col-sm-6 col-6" style={{ padding: '4px' }}>
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
      </div>
     
        </div>
        </div>
        </>
    );
  };
  
  return (
   
      <>
  <br />
  <div className="container-fluid mt-5">
    <div className="row px-xl-5">
      <div className="col-lg-12 col-md-12 col-sm-12 col-12 pb-1 mt-2">
        {/* <div className="menu-bar-container d-flex d-block d-lg-none">
        <div className="menu-bar">
          {Category?.map((category, index) => (
            <div
              key={index}
              className={`sort-keyword ${selectedCategories.includes(category.categoryName) ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category.categoryName)}
            >
              {category.categoryName}
            </div>
          ))}
           
          </div>
        </div>  */}
        <div className="align-items-center justify-content-between mb-4">
          <div className="container-fluid">
          {/* <div className="row">
          <div className="col-lg-8 col-md-8 col-sm-12 col-12 css">
        <h5 className="d-flex align-items-left">All Product</h5>
        <ul className="sort-keywords d-flex text">
    <h6>   Category</h6> &emsp;   {Category?.map((category, index) => (
            <div
              key={index}
              className={`sort-keyword ${selectedCategories.includes(category.categoryName) ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category.categoryName)}
            >
              {category.categoryName}
            </div>
          ))}
        </ul>
      </div>
     
    </div>
   */}

          </div>
          {/* Sidebar content */}
          <div className="sidebar" id="sidebar">
            <button className="close-btn" id="closeSidebar">
              
            </button>
            <h6>Filter</h6>
            <br />
            <div className="sort-by">
              {/* <center><h6>Sort By</h6></center> */}
              <ul className="sort-keywords">
                <li>
                  <div className="sort-keyword">Price Low to High</div>
                  <div className="sort-keyword">Price High to Low</div>
                </li>
              </ul>
              <div className="size-dropdown">
                <div className="size-header">
                  Size <span className="plus-button">+</span>
                </div>
                <ul className="size-options pt-2">
                  <div className="" style={{ display: "flex" }}>
                    <li className="size-option sort-keyword">XS</li>
                    <li className="size-option sort-keyword">S</li>
                    <li className="size-option sort-keyword">M</li>
                    <li className="size-option sort-keyword">L</li>
                    <li className="size-option sort-keyword">XL</li>
                  </div>
                </ul>
              </div>
              <hr />
              <div className="size-dropdown">
                <div className="size-header">
                  Type <span className="plus-button">+</span>
                </div>
                <ul className="size-options pt-2">
                  <div className="" style={{ display: "flex" }}>
                    <li className="size-option sort-keyword">XS</li>
                    <li className="size-option sort-keyword">S</li>
                    <li className="size-option sort-keyword">M</li>
                    <li className="size-option sort-keyword">L</li>
                    <li className="size-option sort-keyword">XL</li>
                  </div>
                </ul>
              </div>
              <hr />
              <div className="size-dropdown">
                <div className="size-header">
                  Colour <span className="plus-button">+</span>
                </div>
                <ul className="size-options pt-2">
                  <div className="" style={{ display: "flex" }}>
                    <li className="size-option sort-keyword">XS</li>
                    <li className="size-option sort-keyword">S</li>
                    <li className="size-option sort-keyword">M</li>
                    <li className="size-option sort-keyword">L</li>
                    <li className="size-option sort-keyword">XL</li>
                  </div>
                </ul>
              </div>
              <hr />
              <div className="size-dropdown">
                <div className="size-header">
                  Price <span className="plus-button">+</span>
                </div>
                <ul className="size-options pt-2">
                  <div className="" style={{ display: "flex" }}>
                    <li className="size-option sort-keyword">XS</li>
                    <li className="size-option sort-keyword">S</li>
                    <li className="size-option sort-keyword">M</li>
                    <li className="size-option sort-keyword">L</li>
                    <li className="size-option sort-keyword">XL</li>
                  </div>
                </ul>
              </div>
              <hr />
              <div className="size-dropdown">
                <div className="size-header">
                  With Discount <span className="plus-button">+</span>
                </div>
                <ul className="size-options pt-2">
                  <div className="" style={{ display: "flex" }}>
                    <li className="size-option sort-keyword">XS</li>
                    <li className="size-option sort-keyword">S</li>
                    <li className="size-option sort-keyword">M</li>
                    <li className="size-option sort-keyword">L</li>
                    <li className="size-option sort-keyword">XL</li>
                  </div>
                </ul>
              </div>
              <hr />
            </div>
            <div className="mt-auto">
              <button type="button" className="btn btn-primary mr-2">
                Button 1
              </button>
              <button type="button" className="btn btn-secondary">
                Button 2
              </button>
            </div>
          </div>
        </div>
        <ProductsList/> 
      </div>
    </div>
    <br/>
    <Pagination currentPage={currentPage} totalPages={totalPages} handlePageChange={handlePageChange} />
      </div>
</>
  )
}
