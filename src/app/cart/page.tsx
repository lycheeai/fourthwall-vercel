'use client';
import Image from 'next/image'
import Showcase from '../components/showcase'
import Products from '../components/products'
import Header from '../components/header'
import Footer from '../components/footer'
import { ChevronDown, X } from 'lucide-react'
import { useAppContext } from '../lib/provider'

type CartItemProps = {
  name: string,
  size: string,
  color: string,
  quantity: number,
  price: number,
  image: string,
}

const CartItem = ({ name, size, color, quantity, price, image }: CartItemProps) => (
  <div className="flex items-center py-4 border-b">
    <img src={image} alt={name} className="w-20 h-20 object-cover mr-4" />
    <div className="flex-grow">
      <h3 className="font-bold">{name}</h3>
      <p className="text-gray-600">{size}</p>
      <p className="text-gray-600">{color}</p>
    </div>
    <div className="flex items-center">
      <div className="border rounded-md p-2 flex items-center mr-4">
        <span className="mr-2">{quantity}</span>
        <ChevronDown size={16} />
      </div>
      <span className="font-bold mr-4">${price.toFixed(2)}</span>
      <button className="text-gray-400 hover:text-gray-600">
        <X size={20} />
      </button>
    </div>
  </div>
);

const CartPage = () => {

  const { cart, variantTotal } = useAppContext();
  const cartItems = cart;
  const subtotal = cartItems.reduce((sum, item) => sum + item.price.value * item.quantity, 0);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">
        {cartItems.reduce((sum, item) => sum + item.quantity, 0)} ITEMS IN YOUR CART FOR ${subtotal.toFixed(2)}
      </h1>
      
      <div className="mb-4 grid grid-cols-3 font-bold text-gray-600">
        <span>ITEM</span>
        <span className="text-right">QUANTITY</span>
        <span className="text-right">PRICE</span>
      </div>

      {cartItems.map((item, index) => (
        <CartItem 
          key={index} 
          name={item.name} 
          size={item.size} 
          color={item.color}
          image={item.images[0]} 
          price={item.price.value} 
          quantity={item.quantity}
        />
      ))}

      <div className="flex justify-between items-center mt-6 mb-8">
        <span className="font-bold">Subtotal</span>
        <span className="font-bold text-xl">${subtotal.toFixed(2)}</span>
      </div>

      <div className="flex justify-between gap-4">
        <a href="/" className="text-center bg-gray-800 text-white py-3 px-6 w-1/2 font-bold hover:bg-gray-700 transition-colors">
          BACK TO SHOPPING
        </a>
        <button className="bg-red-600 text-white py-3 px-6 w-1/2 font-bold hover:bg-red-700 transition-colors">
          CHECKOUT
        </button>
      </div>
    </div>
  );
};

export default function Cart() {
  return (
    <main>
      <Header />

      <CartPage />

      <Footer />
    </main>
  )
}
