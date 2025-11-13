import React from 'react'
import {useAppContext} from '../context/appContext'
import { useParams } from 'react-router-dom'
import { categories } from '../assets/assets'
import ProductCard from './ProductCard'
const ProductCategory = () => {
  const {products} = useAppContext()
  const {category} = useParams()
  const searchCategory = categories.find((item) => item.path.toLowerCase() === category)
  const filteredProducts = products.filter((product) => product.category.toLowerCase() === category)



  return (
    <div>
        {
          searchCategory && (
            <div className='mt-16'>
              <div className="flex flex-col items-start w-max group">
            <p className="text-2xl font-medium uppercase relative cursor-pointer ">
              {searchCategory.text.toLowerCase()}
                <span className="absolute left-0 -bottom-1 h-0.5 bg-primary rounded-full transition-all duration-500 ease-in-out w-6 group-hover:w-full"></span>
            </p>
            </div>
          {
            filteredProducts.length>0 ?(<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 mt-6">
        {
          filteredProducts.filter((product) => product.inStock).map((product, index) => (
            <ProductCard key={index } product={product} />
          ))
        }
      </div>):(
        <div className="flex items-center justify-center h-[60vh]">
          <p className='text-2xl font-medium text-primary'>No Products Found in this Category</p>
        </div>
      )
          }   
            </div>
          )
        }
    </div>
  )
}

export default ProductCategory