'use client';

import { useAppContext } from "./lib/provider";

export default function Products() {
  const { products } = useAppContext();

  return <section id="products">
    <pre>{JSON.stringify(products, null, 2)}</pre>
  </section>
}
