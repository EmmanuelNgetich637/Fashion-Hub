export interface UnsplashProduct {
  id: string
  name: string
  price: string
  image: string
  category: string
  photographer: string
  photographer_url: string
}

export async function fetchFashionProducts(): Promise<UnsplashProduct[]> {
  const response = await fetch(
    "https://api.unsplash.com/search/photos?query=fashion&per_page=12&client_id=unGYk1Aq4QPCkCTpNpz6uVkkazG1xKc3b_o4uUBPNKU"
  )

  const data = await response.json()

  const products = data.results.map((item: any, index: number): UnsplashProduct => ({
    id: item.id,
    name: item.description || item.alt_description || `Fashion Item ${index + 1}`,
    price: (Math.random() * 100 + 30).toFixed(2), // $30 - $130
    image: item.urls.small,
    category: "Fashion",
    photographer: item.user.name,
    photographer_url: item.user.links.html,
  }))

  return products
}
