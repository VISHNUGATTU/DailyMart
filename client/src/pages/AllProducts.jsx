import React from 'react'
import { useState, useEffect } from 'react';
import { useAppContext } from '../context/AppContext'
import ProductCard from '../components/ProductCard';
const AllProducts = () => {
    const {products, searchQuery, setSearchQuery}= useAppContext();
    const [filteredProducts, setFilteredProducts] = useState([]);

    useEffect(() => {
        if (searchQuery.length > 0) {
            setFilteredProducts(
                products.filter((product) =>
                    product.name.toLowerCase().includes(searchQuery.toLowerCase())
                )
            );
        }else{
            setFilteredProducts(products);
        }
    }, [products, searchQuery]);


  return (
    <div className='mt-16 flex flex-col'>
        <div className="flex flex-col items-start w-max group">
            <p className="text-2xl font-medium uppercase relative cursor-pointer ">
             All Products
                <span className="absolute left-0 -bottom-1 h-0.5 bg-primary rounded-full transition-all duration-500 ease-in-out w-6 group-hover:w-full"></span>
            </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 mt-6">
        {
          filteredProducts.filter((product) => product.inStock).map((product, index) => (
            <ProductCard key={index} product={product} />
          ))
        }
      </div>

    </div>
  )
}

export default AllProducts