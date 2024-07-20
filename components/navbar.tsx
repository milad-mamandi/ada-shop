'use client'
import { usePathname } from 'next/navigation'
import { Inter } from 'next/font/google'
import { ShoppingBag, ShoppingCart, SlidersVertical } from 'lucide-react'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { useAppSelector } from '@/lib/hooks'
import { selectCart } from '@/lib/features/cartSlice'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export default function Navbar() {
    const pathname = usePathname()

    const cart = useAppSelector(selectCart)
    return (
        <nav className='py-4'>
            <div className='flex items-center justify-center text-4xl font-bold'>ADA SHOP</div>
            <div className='mt-8 flex flex-col gap-2'>
                <div className='flex flex-row justify-end gap-4'>
                    <Link href={'/'}>
                        <Button
                            className={cn(
                                'flex w-32 justify-between bg-purple-100 font-bold text-purple-700 hover:bg-purple-700 hover:text-white',
                                pathname === '/' && 'bg-purple-700 text-white hover:bg-purple-800',
                            )}
                        >
                            محصولات
                            <ShoppingBag size={24} />
                        </Button>
                    </Link>
                    <Link href={'/cart'}>
                        <Button
                            className={cn(
                                'flex w-32 justify-between bg-purple-100 font-bold text-purple-700 hover:bg-purple-700 hover:text-white',
                                pathname === '/cart' && 'bg-purple-700 text-white hover:bg-purple-800',
                            )}
                        >
                            سبد خرید
                            <div className='relative'>
                                <ShoppingCart size={24} />
                                {cart.length > 0 && (
                                    <div className='absolute -right-3 -top-3 flex size-6 items-center justify-center rounded-full bg-fuchsia-500 text-center leading-none text-white'>
                                        <span className={inter.className}>{cart.length}</span>
                                    </div>
                                )}
                            </div>
                        </Button>
                    </Link>
                </div>
            </div>
        </nav>
    )
}
