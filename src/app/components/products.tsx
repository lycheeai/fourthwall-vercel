'use client';

import React, { useMemo } from "react";
import { useAppContext } from "../lib/provider";
import { Product } from "../lib/fetch";
import { ShoppingCart, Check } from 'lucide-react';
import Image from "next/image";

function ProductTile({ product }: { product: Product }) {
  const { addVariant } = useAppContext();

  const sizeMap = useMemo(() => {
    return Object.fromEntries(product.sizes.map((size) => {
      return [size.name, size];
    }))
  }, [product]);

  const colorMap = useMemo(() => {
    return Object.fromEntries(product.colors.map((color) => {
      return [color.name, color];
    }))
  }, [product]);

  const variantMap = useMemo(() => {
    return Object.fromEntries(product.variants.map((variant) => {
      return [`${variant.color}:${variant.size}`, variant];
    }))
  }, [product])

  const [sizeId, setSizeId] = React.useState('');
  const [colorId, setColorId] = React.useState('');

  const selectedSize = sizeMap[sizeId] || product.sizes[0];
  const selectedColor = colorMap[colorId] || product.colors[0];
  const selectedVariant = variantMap[`${selectedColor.name}:${selectedSize.name}`];

  const image = selectedColor.images[0] || '';
  const price = selectedSize.price?.value || 0;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <img src={image} alt={product.name} className="w-full h-auto rounded-lg shadow-lg" />
        </div>
        <div className="md:w-1/2">
          <h2 className="text-3xl font-bold mb-2">{product.name}</h2>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-2xl font-semibold mb-4">${price.toFixed(2)}</p>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Color: {selectedColor.name}</label>
            <div className="flex gap-2">
              {product.colors.map((color, idx) => (
                <button
                  key={idx}
                  onClick={() => setColorId(color.name)}
                  className={`w-8 h-8 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:cursor-not-allowed`}
                  style={{ backgroundColor: color.swatch }}
                  aria-label={color.name}
                  disabled={!variantMap[`${color.name}:${selectedSize.name}`]}
                >
                  {selectedColor.name === color.name && (
                    <Check className="text-white mx-auto" size={16} />
                  )}
                </button>
              ))}
            </div>
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
            <div className="flex gap-2">
              {product.sizes.map((size, idx) => (
                <button
                  key={idx}
                  onClick={() => setSizeId(size.name)}
                  className={`px-4 py-2 text-sm font-medium rounded-md disabled:cursor-not-allowed ${
                    selectedSize.name === size.name
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                  disabled={!variantMap[`${selectedColor.name}:${size.name}`]}
                >
                  {size.name}
                </button>
              ))}
            </div>
          </div>
          
          <button 
            disabled={!selectedVariant}
            onClick={() => addVariant(selectedVariant.id)}
            className="flex items-center justify-center w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 disabled:cursor-not-allowed"
          >
            <ShoppingCart size={20} className="mr-2" />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}


export default function Products() {
  const { products } = useAppContext();

  return <section id="products">
    { products.map((p, idx) => <ProductTile key={idx} product={p} />) }
  </section>
}
