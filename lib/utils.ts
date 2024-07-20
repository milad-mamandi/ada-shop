import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { mockProductsType } from "./mockData"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function priceSeperator(price: number) {
  const s = price.toString()
  let pws = ''
  let counter = 0

  for (let i = s.length - 1; i >= 0; i--) {
    pws = s[i] + pws
    counter++

    if (counter % 3 === 0 && i !== 0) {
      pws = ',' + pws
    }
  }

  return pws
}

export function calTotalProducts(cart: { id: number, quantity: number }[]) {
  let quantity = 0
  cart.map((i) => quantity += i.quantity)
  return quantity
}

export function calTotalPrice(cart: { id: number, quantity: number }[], products: mockProductsType[]) {
  let totalPrice = 0
  cart.map((i) => totalPrice += (i.quantity * products[i.id].price))
  return totalPrice
}

export function getMinMax(products: mockProductsType[]) {
  let min = Infinity
  let max = 0
  for (let i = 0; i < products.length; i++) {
    const price = products[i].price
    if (min > price) min = price
    if (max < price) max = price
  }
  return [min, max]
}