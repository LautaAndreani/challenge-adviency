import { Gift } from '../types/types'

export const getQuantityPrice = (quantity: number, price: number, oldPrice?: number) =>
  oldPrice !== price ? quantity * price : price

export const formatCurrency = (price: number) => price.toLocaleString('es-ar', {style: "currency", currency: 'ARS'}) 

export const getTotalPrice = (gifts: Gift[]) => {
  const getTotalPrice = gifts.map((gift) => gift.price).reduce((acc, curr) => acc + curr, 0)
  return formatCurrency(getTotalPrice)
}
