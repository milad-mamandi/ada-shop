import { cn, priceSeperator } from '@/lib/utils'
import { ShoppingCart } from 'lucide-react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { addProduct, removeProduct, selectCart } from '@/lib/features/cartSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'

export default function Product({
    id,
    image_url,
    name,
    price,
    available,
}: {
    id: number
    image_url: string
    name: string
    price: number
    available: boolean
}) {
    const dispatch = useAppDispatch()
    const cart = useAppSelector(selectCart)

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key={id}
            className='border-1 relative flex flex-col gap-2 overflow-hidden rounded-lg border-purple-100 p-4 shadow-lg transition-all hover:bg-purple-50'
        >
            {!available && (
                <div className='absolute -right-10 top-5 z-10 rotate-45 bg-red-400 px-10 py-2 text-sm text-white'>
                    اتمام موجودی
                </div>
            )}
            <div className='relative h-36'>
                <Image
                    alt='product image'
                    src={image_url}
                    fill={true}
                    style={{
                        objectFit: 'contain',
                    }}
                />
            </div>
            <div className='flex flex-col gap-1'>
                <div className='text-lg font-bold'>{name}</div>
                <div className='text-fuchsia-600'>{priceSeperator(price)} تومان</div>
                {cart.find(i => i.id === id) ? (
                    <div className='flex flex-row items-center justify-between'>
                        <Button
                            className='w-10 rounded bg-purple-700 text-white hover:bg-purple-800'
                            onClick={() => dispatch(addProduct(id))}
                        >
                            +
                        </Button>
                        {cart.find(i => i.id === id)!.quantity}
                        <Button
                            onClick={() => dispatch(removeProduct(id))}
                            className='w-10 rounded border-2 border-purple-700 bg-purple-50 text-lg text-purple-700 hover:bg-purple-100'
                        >
                            -
                        </Button>
                    </div>
                ) : (
                    <Button
                        disabled={!available}
                        onClick={() => dispatch(addProduct(id))}
                        className={cn(
                            'flex justify-between bg-purple-100 font-bold text-purple-700 hover:bg-purple-700 hover:text-white',
                        )}
                    >
                        افزودن به سبد خرید
                        <ShoppingCart size={20} />
                    </Button>
                )}
            </div>
        </motion.div>
    )
}
