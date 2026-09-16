/**
 * Resolves media asset paths (covers, images) to valid URLs.
 * - If url starts with http://, https://, or data: -> return as is
 * - If url starts with / -> return as is (e.g. /content/posts/slug/cover.jpg or /storage/...)
 * - If url starts with ./ or is a relative filename and slug is provided -> return /content/posts/{slug}/{url}
 * - Fallback to default vinyl cover if empty
 */
export function resolveMediaUrl(url?: string | null, slug?: string): string {
  const defaultCover = 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=600&auto=format&fit=crop&q=80'

  if (!url || !url.trim()) {
    return defaultCover
  }

  const trimmed = url.trim()

  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('data:')) {
    return trimmed
  }

  if (trimmed.startsWith('/')) {
    return trimmed
  }

  if (slug) {
    const cleanFilename = trimmed.replace(/^\.\//, '')
    return `/content/posts/${slug}/${cleanFilename}`
  }

  return trimmed
}
