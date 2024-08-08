export async function addToCart(variants: Record<string, number>) {

  const items = Object.entries(variants).map(([id, quantity]) => {
    return { id, quantity };
  });

  const resp = await fetch('/api/cart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ items }),
  });

  if (!resp.ok) {
    throw new Error('Failed to add to cart');
  }

  const { checkoutId, cartId } = await resp.json();

  console.warn('checkoutId', checkoutId);
  console.warn('cartId', cartId);

  return checkoutId;
}
