'use client';
import React, { useCallback, useMemo } from "react";
import { Product } from "./fetch";
import { addToCart } from "./checkout";

type AppContext = {
  addVariant: (variant: string) => void,
  variantTotal: number,
  products: Product[],
  cart: CartItem[],
  checkout: () => void,
}

const Context = React.createContext<AppContext>({
  addVariant: () => {},
  variantTotal: 0,
  products: [],
  cart: [],
  checkout: () => {},
});

type AppProviderProps = {
  children: React.ReactNode,
  products: Product[],
}

type CartItem = {
  name: string,
  size: string,
  color: string,
  quantity: number,
  price: {
    value: number,
    currency: string,
  },
  images: string[],
}

export function AppProvider({ children, products }: AppProviderProps) {

  const [variants, setVariants] = React.useState<Record<string, number>>({});
  const addVariant = useCallback((variant: string) => {
    setVariants((prev) => {
      return {
        ...prev,
        [variant]: prev[variant] ? prev[variant] + 1 : 1,
      }
    });
  }, [setVariants]);
  const variantTotal = useMemo(() => {
    return Object.values(variants).reduce((acc, curr) => acc + curr, 0);
  }, [variants]);

  const cart = useMemo(() => {
    return products.flatMap((product) => {
      return product.variants.flatMap((variant) => {
        const amt = variants[variant.id] || 0;

        if (amt > 0) {
          return [{
            ...variant,
            name: product.name,
            quantity: amt,
          }];
        }

        return [];
      });
    });
  }, [products, variants]);

  const checkout = async () => {
    console.log("Checkout", cart);
    const checkoutId = await addToCart(variants);
    // redirect
    window.location.href = `https://jieren-shop.staging.fourthwall.com/checkout/${checkoutId}`;
  }

  return (
    <Context.Provider value={{ addVariant, variantTotal, cart, products, checkout }}>
      {children}
    </Context.Provider>
  );
}


export function useAppContext() {
  return React.useContext(Context);
}