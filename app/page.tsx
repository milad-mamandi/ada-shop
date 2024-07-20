'use client'

import Product from '@/components/product'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { selectCart } from '@/lib/features/cartSlice'
import { useAppSelector } from '@/lib/hooks'
import { mockProducts, mockProductsType } from '@/lib/mockData'
import { calTotalProducts, getMinMax } from '@/lib/utils'
import { Slider } from '@mui/material'
import { ChevronDown, ShoppingBag, SlidersVertical } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Home() {
    const cart = useAppSelector(selectCart)
    const [displayedProducts, setDisplayedProducts] = useState<mockProductsType[]>([])
    const [filteredProducts, setFilteredProducts] = useState<mockProductsType[]>([])
    const [itemsToShow, setItemsToShow] = useState(6)
    const [search, setSearch] = useState('')
    const [minPrice, maxPrice] = getMinMax(mockProducts)
    const [priceRange, setPriceRange] = useState<number[]>([minPrice, maxPrice])
    const [availableOnly, setAvailableOnly] = useState(false)

    useEffect(() => {
        const filtered = mockProducts
            .filter(product => !search || product.name.includes(search))
            .filter(product => priceRange[0] <= product.price && product.price <= priceRange[1])
            .filter(product => !availableOnly || product.available !== false)
        setFilteredProducts(filtered)
        setDisplayedProducts(filtered.slice(0, itemsToShow))
    }, [priceRange, search, itemsToShow, availableOnly, mockProducts])

    const handleSearchChange = (param: string) => {
        setSearch(param)
        setItemsToShow(6)
    }
    const handlePriceChange = (event: Event, newValue: number | number[]) => {
        setPriceRange(newValue as number[])
        setItemsToShow(6)
    }
    const handleAvailableChange = () => {
        setAvailableOnly(prev => !prev)
        setItemsToShow(6)
    }
    return (
        <main className='flex flex-col items-center gap-4'>
            <div className='relative w-full'>
                <ShoppingBag className='absolute left-3 top-1/2 -translate-y-1/2' />
                <Input
                    onChange={e => handleSearchChange(e.currentTarget.value)}
                    placeholder='جست و جو کنید...'
                    className='border-[3px] border-purple-700 bg-purple-50 py-6 text-fuchsia-600 outline-none placeholder:text-fuchsia-600'
                />
            </div>
            <div className='flex w-full flex-row items-center justify-between'>
                {calTotalProducts(cart)} محصول در سبد خرید شما قرار دارد
                <Popover>
                    <PopoverTrigger asChild>
                        <Button className='flex w-28 justify-between border-2 border-purple-700 bg-transparent text-purple-700 hover:bg-purple-700 hover:text-white'>
                            فیلتر ها
                            <SlidersVertical size={20} />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                        <div className='flex flex-col gap-2 px-4 text-purple-700'>
                            <div>
                                <span>محدوده قیمت:</span>
                                <Slider
                                    min={minPrice}
                                    max={maxPrice}
                                    step={10000}
                                    value={priceRange}
                                    onChange={handlePriceChange}
                                    valueLabelDisplay='auto'
                                    disableSwap
                                    color='secondary'
                                />
                            </div>
                            <div className='flex items-center justify-between'>
                                <Label
                                    htmlFor='instock'
                                    className='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70'
                                >
                                    فقط محصولات موجود
                                </Label>
                                <Checkbox
                                    className='text-white data-[state=checked]:bg-purple-700'
                                    id='instock'
                                    onCheckedChange={handleAvailableChange}
                                />
                            </div>
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
            <div className='mb-4 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3'>
                {displayedProducts.map(product => (
                    <Product key={product.id} {...product} />
                ))}
            </div>
            {itemsToShow < filteredProducts.length && (
                <Button
                    className='m-4 flex h-8 w-36 justify-between bg-purple-50 text-purple-700 hover:bg-purple-100'
                    onClick={() => setItemsToShow(prev => prev + 3)}
                >
                    مشاهده بیشتر
                    <ChevronDown />
                </Button>
            )}
        </main>
    )
}
