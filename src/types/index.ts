export type PostStatus = 'draft' | 'published'

export interface Post {
  id: string
  slug: string
  song_title: string
  artist: string
  album: string
  release_year: number
  genre: string
  cover_image_url: string
  excerpt: string
  body_markdown: string
  status: PostStatus
  published_at: string | null
  created_at: string
  updated_at: string
}

export interface PaginatedPosts {
  items: Post[]
  page: number
  page_size: number
  total: number
}

export interface FilterOptions {
  artists: string[]
  genres: string[]
  years: number[]
}

export interface PostQueryParams {
  artist?: string
  genre?: string
  release_year?: number
  page?: number
  page_size?: number
}
