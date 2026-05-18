export interface Category {
  id: number
  name: string
  description: string | null
  createdAt: string
}

export interface Product {
  id: number
  name: string
  price: number
  stock: number
  imageUrl: string | null
  categoryId: number | null
  category: Category | null
  createdAt: string
  updatedAt: string
}

export interface User {
  id: number
  name: string
  email: string
  role: 'user' | 'admin'
}

export interface CartItem {
  product: Product
  quantity: number
}

export interface AuthResponse {
  success: boolean
  token: string
  data: User
}

export interface PaginationMeta {
  total: number
  page: number
  limit: number
  totalPages: number
  hasNext: boolean
  hasPrev: boolean
}

export interface ApiResponse<T> {
  success: boolean
  data: T
  pagination?: PaginationMeta
  message?: string
}