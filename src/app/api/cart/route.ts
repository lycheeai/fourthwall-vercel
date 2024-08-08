import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

type RequestData = {
  items: {id: string, quantity: number}[]
}

type ResponseData = {
  message: string;
};

export async function POST(
  req: NextRequest,
) {
  const reqJson = await req.json();
  console.warn();
  console.warn('Req', JSON.stringify(reqJson))
  const resp = await fetch('https://jieren-shop.staging.fourthwall.com/cart/add.js', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    body: JSON.stringify(reqJson),
  });

  if (!resp.ok) {
    throw new Error('Failed to add to cart');
  }

  const respJson = await resp.json();

  const { cart } = respJson;

  console.warn('1', respJson);

  const resp2 = await fetch('https://api.staging.fourthwall.com/api/v2/checkout/cart', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Origin: 'https://jieren-shop.staging.fourthwall.com',
    },
    body: JSON.stringify({ cartId: cart.id, cartCurrency: 'USD' }),
  });

  if (!resp.ok) {
    throw new Error('Failed to create checkout');
  }

  const { id } = await resp2.json();

  return NextResponse.json({ cartId: cart.id, checkoutId: id });
}
