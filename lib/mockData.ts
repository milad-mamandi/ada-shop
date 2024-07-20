export interface mockProductsType {
    id: number
    name: string
    price: number
    image_url: string
    available: boolean
}

export const mockProducts: mockProductsType[] = [
    { id: 1, name: 'کوله پشتی', price: 1000, image_url: '/backpack.png', available: false },
    { id: 2, name: 'کوله پشتی', price: 10000, image_url: '/backpack.png', available: true },
    { id: 3, name: 'کوله پشتی', price: 20000, image_url: '/backpack.png', available: true },
    { id: 4, name: 'کوله پشتی', price: 100000, image_url: '/backpack.png', available: true },
    { id: 5, name: 'کوله پشتی', price: 200000, image_url: '/backpack.png', available: true },
    { id: 6, name: 'کوله پشتی', price: 300000, image_url: '/backpack.png', available: true },
    { id: 7, name: 'کوله پشتی', price: 500000, image_url: '/backpack.png', available: true },
    { id: 8, name: 'کوله پشتی', price: 1000000, image_url: '/backpack.png', available: true },
    { id: 9, name: 'کوله پشتی', price: 100000, image_url: '/backpack.png', available: true },
    { id: 10, name: 'کوله پشتی', price: 100000, image_url: '/backpack.png', available: true },
    { id: 11, name: 'کوله پشتی', price: 100000, image_url: '/backpack.png', available: true },
    { id: 12, name: 'کوله پشتی', price: 100000, image_url: '/backpack.png', available: true },
]