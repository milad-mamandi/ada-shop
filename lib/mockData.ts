export interface mockProductsType {
    id: number
    name: string
    price: number
    image_url: string
    available: boolean
}

export const mockProducts: mockProductsType[] = [
    { id: 1, name: 'کوله پشتی', price: 20000, image_url: '/backpack.png', available: false },
    { id: 2, name: 'کفش', price: 10000, image_url: '/shoe.png', available: true },
    { id: 3, name: 'گوشی هوشمند', price: 45000, image_url: '/phone.png', available: true },
    { id: 4, name: 'لپ تاپ', price: 30000, image_url: '/laptop.png', available: true },
    { id: 5, name: 'هودی', price: 15000, image_url: '/hoodie.png', available: false },
    { id: 6, name: 'ساعت هوشمند', price: 40000, image_url: '/applewatch.png', available: true },
    { id: 7, name: 'صندلی', price: 50000, image_url: '/chair.png', available: true },
    { id: 8, name: 'تبلت', price: 25000, image_url: '/ipad.png', available: false },
    { id: 9, name: 'پرینتر', price: 35000, image_url: '/printer.png', available: true },
    { id: 10, name: 'ماگ', price: 5000, image_url: '/mug.png', available: true },
    { id: 11, name: 'هدفون', price: 60000, image_url: '/headphone.png', available: true },
    { id: 12, name: 'اسپیکر', price: 70000, image_url: '/speaker.png', available: true },
]