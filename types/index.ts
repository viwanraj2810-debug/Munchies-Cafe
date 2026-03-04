export interface RestaurantInfo {
    name: string
    tagline: string
    established: string
    rating: string
    covers: string
    phone: string
    whatsapp: string
    address: string
    mapUrl: string
    mapEmbedUrl: string
    hours: string
    speciality: string
}

export interface MenuItem {
    id: string
    name: string
    description: string
    price: number
    category: 'veg' | 'non-veg' | 'south-indian' | 'beverages' | 'salads'
    imageUrl: string
    isVeg: boolean
    isSignature?: boolean
}

export interface MenuCategory {
    id: string
    label: string
    slug: 'all' | 'veg' | 'non-veg' | 'south-indian' | 'beverages' | 'salads'
}

export interface Review {
    id: string
    quote: string
    reviewer: string
    source: 'Google' | 'Zomato' | 'TripAdvisor'
    rating: number
    isHero?: boolean
}

export interface SignatureDishData {
    name: string
    subtitle: string
    price: number
    description: string
    imageUrl: string
}
