import { apiClient } from './client'
import type { PaginatedPosts, Post, FilterOptions, PostQueryParams } from '../types'

export async function fetchPublishedPosts(params?: PostQueryParams): Promise<PaginatedPosts> {
  const response = await apiClient.get<PaginatedPosts>('/posts', { params })
  return response.data
}

export async function fetchPostBySlug(slug: string): Promise<Post> {
  const response = await apiClient.get<Post>(`/posts/${encodeURIComponent(slug)}`)
  return response.data
}

export async function fetchFilterOptions(): Promise<FilterOptions> {
  const response = await apiClient.get<FilterOptions>('/filters')
  return response.data
}
