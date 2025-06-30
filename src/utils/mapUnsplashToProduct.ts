import { Product } from "../services/types"

export interface UnsplashItem {
  id: string
  url?: string
  description?: string
  photographer?: string
  photographer_url?: string
}

export interface DisplayProduct extends Product {
  photographer?: string
  photographer_url?: string
}

export function mapUnsplashToProduct(item: UnsplashItem): Product {
  return {
    id: item.id,
    name: item.description || "Fashion Item",
    price: Math.floor(Math.random() * 80 + 30),
    image: (item.url ?? "/placeholder.svg") as string,  // ✅ THE FIX
    category: "Fashion",
    description: item.description || "Stylish fashion piece from Unsplash",
  }
}

export function mapToDisplayProduct(item: UnsplashItem): DisplayProduct {
  return {
    ...mapUnsplashToProduct(item),
    photographer: item.photographer,
    photographer_url: item.photographer_url,
  }
}
