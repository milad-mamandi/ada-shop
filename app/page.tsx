'use client'

import Product from '@/components/product'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { selectCart } from '@/lib/features/cartSlice'
import { addItemsToShow, selectFilter, updateFilter } from '@/lib/features/filterSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { mockProducts, mockProductsType } from '@/lib/mockData'
import { calTotalProducts, getMinMax } from '@/lib/utils'
import { Slider } from '@mui/material'
import { ChevronDown, ShoppingBag, SlidersVertical } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Home() {
    const dispatch = useAppDispatch()
    const cart = useAppSelector(selectCart)
    const filter = useAppSelector(selectFilter)
    const [displayedProducts, setDisplayedProducts] = useState<mockProductsType[]>([])
    const [filteredProducts, setFilteredProducts] = useState<mockProductsType[]>([])

    useEffect(() => {
        const filtered = mockProducts
            .filter(product => !filter.search || product.name.includes(filter.search))
            .filter(product => filter.priceRange[0] <= product.price && product.price <= filter.priceRange[1])
            .filter(product => !filter.availableOnly || product.available !== false)
        setFilteredProducts(filtered)
        setDisplayedProducts(filtered.slice(0, filter.itemsToShow))
    }, [filter.priceRange, filter.search, filter.itemsToShow, filter.availableOnly, mockProducts])

    const handleSearchChange = (param: string) => {
        dispatch(updateFilter({ search: param }))
        dispatch(updateFilter({ itemsToShow: 6 }))
    }
    const handlePriceChange = (event: Event, newValue: number | number[]) => {
        dispatch(updateFilter({ priceRange: newValue as number[] }))
        dispatch(updateFilter({ itemsToShow: 6 }))
    }
    const handleAvailableChange = (checked: boolean) => {
        dispatch(updateFilter({ availableOnly: checked }))
        dispatch(updateFilter({ itemsToShow: 6 }))
    }
    return (
        <main className='flex flex-col items-center gap-4'>
            <div className='relative w-full'>
                <ShoppingBag className='absolute left-3 top-1/2 -translate-y-1/2' />
                <Input
                    onChange={e => handleSearchChange(e.currentTarget.value)}
                    placeholder='جست و جو کنید...'
                    className='border-[3px] border-purple-700 bg-purple-50 py-6 text-fuchsia-600 outline-none placeholder:text-fuchsia-600'
                    value={filter.search}
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
                                    min={getMinMax(mockProducts)[0]}
                                    max={getMinMax(mockProducts)[1]}
                                    step={5000}
                                    value={filter.priceRange}
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
                                    checked={filter.availableOnly}
                                    onCheckedChange={e => handleAvailableChange(Boolean(e))}
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
            {filter.itemsToShow < filteredProducts.length && (
                <Button
                    className='m-4 flex h-8 w-36 justify-between bg-purple-50 text-purple-700 hover:bg-purple-100'
                    onClick={() => dispatch(addItemsToShow(3))}
                >
                    مشاهده بیشتر
                    <ChevronDown />
                </Button>
            )}
        </main>
    )
}
