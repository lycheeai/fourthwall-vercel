const COLLECTION_ID = 'col_eB6V0DF-ScWynzelI1ekhg';

export async function fetchData() {
  const resp = await fetch(`https://api.staging.fourthwall.com/api/collections/${COLLECTION_ID}/offers`, {
    headers: {
      'Authorization': `Basic ${process.env.BASIC_AUTH}`
    }
  })

  const data = await resp.json();
  console.warn(data);

  const { offers } = data;

  return offers.map((offer) => {
    const images = Object.fromEntries(offer.images.map((image: {id: string, url: string}) => [image.id, image.url]));

    const { variants } = offer;

    const variantClean = variants.map((option: { name: string, id: string, images: string[]}) => ({
      id: option.id,
      name: option.name,
      // swatch: option.colorSwatch,
      images: option.images.map(imageId => images[imageId] || '')
    }))

    // variants flatten

    return {
      variants: variantClean,
    }
  })
}