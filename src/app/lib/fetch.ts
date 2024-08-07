const COLLECTION_ID = 'col_eB6V0DF-ScWynzelI1ekhg';

type ColorAttribute = {
  type: 'COLOR',
  name: string,
  colorSwatch: string,
}

type SizeAttribute = {
  type: 'SIZE',
  name: string,
}

type Variant = {
   name: string,
   id: string,
   attributesList: [ColorAttribute, SizeAttribute],
   images: string[]
   price: {
    value: number,
    currency: string,
   }
}

type Color = {
  name: string,
  swatch: string,
  images: string[],
}

type Size = {
  name: string,
  price: {
    value: number,
    currency: string,
  }
}

export type Product = {
  id: string,
  name: string,
  description: string,
  colors: Color[],
  sizes: Size[],
  variants: {
    id: string,
    color: string,
    size: string,
    price: {
      value: number,
      currency: string,
    },
    images: string[]
  }[]
}

export async function fetchData(): Promise<Product[]> {
  const resp = await fetch(`https://api.staging.fourthwall.com/api/collections/${COLLECTION_ID}/offers`, {
    headers: {
      'Authorization': `Basic ${process.env.BASIC_AUTH}`
    }
  })

  const data = await resp.json();

  const { offers } = data;

  return offers.map((offer: any) => {
    const images = Object.fromEntries(offer.images.map((image: {id: string, url: string}) => [image.id, image.url]));

    const { variants, variantTypes, id, name, description } = offer;

    const colors = (variantTypes.find((vt: any) => vt['type'] === 'COLOR')?.options || []).map((color: any) => ({
      name: color.name,
      swatch: color.colorSwatch,
      images: color.images.map((imageId: string) => images[imageId] || '')
    }));
    const sizes = (variantTypes.find((vt: any) => vt['type'] === 'SIZE')?.options || []).map((size: any) => ({
      name: size.name,
      price: size.price,
    }));

    const variantClean = variants.map((option: Variant) => ({
      id: option.id,
      color: option.attributesList.find(attr => attr.type === 'COLOR')?.name || '',
      size: option.attributesList.find(attr => attr.type === 'SIZE')?.name || '',
      price: option.price,
      images: option.images.map((imageId: string) => images[imageId] || '')
    }))

    // variants flatten

    return {
      id,
      name,
      description,
      colors,
      sizes,
      variants: variantClean,
    }
  })
}