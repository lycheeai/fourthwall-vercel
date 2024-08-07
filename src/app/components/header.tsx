'use client';

import { ShoppingCart } from "lucide-react";
import { useAppContext } from "../lib/provider";
import Link from "next/link";

const ShoppingCartButton = ({ itemCount }: { itemCount: number}) => (
  <Link
    href="/cart"
    className="hover:text-gray-300 relative"
    aria-label={`Shopping cart with ${itemCount} items`}
  >
    <ShoppingCart size={24} />
    {itemCount > 0 && (
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
        {itemCount}
      </span>
    )}
  </Link>
);

export default function Header() {
  const { variantTotal } = useAppContext();

  return <header className="bg-gray-800 text-white py-4">
    <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold">My Store</h1>
            <nav>
                <ul className="flex space-x-4">
                    <li><a href="/" className="hover:text-gray-300">Home</a></li>
                    <li><a href="/#products" className="hover:text-gray-300">Products</a></li>
                    <li><a href="/#about" className="hover:text-gray-300">About</a></li>
                    <li><ShoppingCartButton itemCount={variantTotal} /></li>
                </ul>
            </nav>
        </div>
    </div>
  </header>
}
