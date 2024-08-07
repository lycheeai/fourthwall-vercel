'use client';
import React from "react";

type AppContext = {
  variants: string[],
  products: any[],
}

const Context = React.createContext<AppContext>({
  variants: [],
  products: [],
});

type AppProviderProps = {
  children: React.ReactNode,
  products: any[],
}

export function AppProvider({ children, products }: AppProviderProps) {
  const [variants, setVariants] = React.useState<string[]>([]);

  return (
    <Context.Provider value={{ variants, products }}>
      {children}
    </Context.Provider>
  );
}


export function useAppContext() {
  return React.useContext(Context);
}