import React from 'react'
import { assets } from '../assets/assets'
import { useAppContext } from '../context/AppContext'

const ProductCard = ({ product }) => {
  const [count, setCount] = React.useState(0)
  const { currency, addToCart, removeFromCart, cartItems, navigate } = useAppContext()

  return product && (
    <div onClick={()=>{navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
    scrollTo(0,0);}} className="bg-white border border-gray-200 rounded-sm p-4 flex flex-col justify-between shadow-sm hover:shadow-md transition-all h-full">
      <div className="flex justify-center items-center mb-3">
        <img className="h-28 object-contain transition-transform duration-200 hover:scale-105" src={product.image[0]} alt={product.name} />
      </div>

      <div className="text-sm text-gray-600">
        <p>{product.category}</p>
        <p className="text-gray-800 font-medium text-base truncate">{product.name}</p>
        <div className="flex items-center gap-1 mt-1">
          {
            Array(5).fill('').map((_, i) => (
              <img key={i} className="w-4 h-4" src={i < 4 ? assets.star_icon : assets.star_dull_icon} alt="star" />
            ))
          }
          <p className="text-xs text-gray-500">(4)</p>
        </div>

        <div className="flex items-end justify-between mt-3">
          <p className="text-primary font-semibold text-sm md:text-base">
            {currency}{product.offerPrice}
            <span className="text-gray-400 line-through text-xs ml-1">{currency}{product.price}</span>
          </p>

          <div onClick={(e) => e.stopPropagation()}>
            {
              !cartItems[product._id] ? (
                <button
                  className="flex items-center gap-1 border border-primary bg-primary/10 text-primary px-3 py-1 rounded text-xs md:text-sm"
                  onClick={() => { setCount(1); addToCart(product._id); }}
                >
                  <img className="w-4" src={assets.cart_icon} alt="cart" />
                  Add
                </button>
              ) : (
                <div className="flex items-center gap-2 px-2 py-1 bg-primary/20 rounded">
                  <button onClick={() => removeFromCart(product._id)} className="px-2">-</button>
                  <span className="w-5 text-center">{cartItems[product._id]}</span>
                  <button onClick={() => addToCart(product._id)} className="px-2">+</button>
                </div>
              )
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
