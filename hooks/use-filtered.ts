import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'

async function fetchProducts(searchParams: URLSearchParams) {
  const response = await fetch(`/api/products?${searchParams.toString()}`)
  if (!response.ok) {
    throw new Error('Failed to fetch products')
  }
  return response.json()
}

export function useFiltered() {
  const searchParams = useSearchParams()

  return useQuery({
    queryKey: ['products', searchParams.toString()],
    queryFn: () => fetchProducts(searchParams),
  })
}