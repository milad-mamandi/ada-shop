'use client'
import { Button } from '@/components/ui/button'
import { addProduct, deleteProduct, removeProduct, selectCart } from '@/lib/features/cartSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hooks'
import { mockProducts } from '@/lib/mockData'
import { calTotalPrice, calTotalProducts, priceSeperator } from '@/lib/utils'
import { Trash2, WalletMinimal } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog'
import Image from 'next/image'

export default function Cart() {
    const dispatch = useAppDispatch()
    const cart = useAppSelector(selectCart)

    const successful = Math.random() > 0.5

    return (
        <div className='mt-8 flex flex-col overflow-hidden'>
            <div className='flex flex-col gap-4'>
                <AnimatePresence>
                    {cart.map(i => (
                        <motion.div
                            key={i.id}
                            className='flex flex-row justify-between rounded-lg border-[3px] border-purple-700 p-4 shadow-md'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, x: -500 }}
                        >
                            <div className='flex flex-row gap-4'>
                                <Image
                                    src={mockProducts[i.id].image_url}
                                    width={72}
                                    height={72}
                                    alt='Product Image'
                                    style={{ objectFit: 'cover' }}
                                />
                                <div className='flex flex-col justify-center gap-4'>
                                    <p className='text-lg'>{mockProducts[i.id].name}</p>
                                    <p className='text-gray-400'>{priceSeperator(mockProducts[i.id].price)} تومان</p>
                                </div>
                            </div>
                            <div className='flex flex-col gap-4'>
                                <div className='flex flex-row items-center justify-between gap-4'>
                                    {priceSeperator(mockProducts[i.id].price * i.quantity)} تومان
                                    <Button
                                        className='m-0 size-8 rounded border-2 border-red-500 bg-transparent p-0 text-red-500 hover:bg-red-500 hover:text-white'
                                        onClick={() => dispatch(deleteProduct(i.id))}
                                    >
                                        <Trash2 />
                                    </Button>
                                </div>
                                <div className='flex flex-row items-center justify-between gap-4'>
                                    <Button
                                        className='w-10 rounded bg-purple-700 text-white hover:bg-purple-800'
                                        onClick={() => dispatch(addProduct(i.id))}
                                    >
                                        +
                                    </Button>
                                    {i.quantity}
                                    <Button
                                        onClick={() => dispatch(removeProduct(i.id))}
                                        className='w-10 rounded border-2 border-purple-700 bg-purple-50 text-lg text-purple-700 hover:bg-purple-100'
                                    >
                                        -
                                    </Button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                    {cart.length < 1 && (
                        <motion.div
                            className='mt-8 flex items-center justify-center text-2xl'
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ delay: 0.7 }}
                        >
                            شما محصولی در سبد خرید خود ندارید
                        </motion.div>
                    )}
                    {cart.length > 0 && (
                        <div className='mt-8 flex flex-col justify-between gap-4 md:flex-row'>
                            <div className='flex flex-col gap-2'>
                                <p className='text-fuchsia-700'>
                                    تکمیل و ادامه فرایند پرداخت {calTotalProducts(cart)} کالا از {cart.length} محصول
                                    انتخاب شده
                                </p>
                                <p className='text-sm'>
                                    مبلغ پرداخت سفارش{' '}
                                    <span className='font-bold'>
                                        {priceSeperator(calTotalPrice(cart, mockProducts))}
                                    </span>{' '}
                                    تومان
                                </p>
                            </div>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button className='flex w-48 justify-between bg-purple-700 text-white hover:bg-purple-800'>
                                        تکمیل و پرداخت
                                        <WalletMinimal />
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle className='flex-end flex'>
                                            {successful ? 'پرداخت موفق' : 'پرداخت ناموفق'}
                                        </DialogTitle>
                                        <DialogDescription className='flex-end flex'>
                                            {successful
                                                ? 'پرداخت شما با موفقیت انجام شد، اطلاعات خرید شما برای شما ایمیل شد.'
                                                : 'پرداخت شما موفقیت آمیز نبود، لطفا دقایقی دیگر دوباره تلاش کنید'}
                                        </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
