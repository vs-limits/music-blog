import MarkdownIt from 'markdown-it'
import DOMPurify from 'dompurify'

const md = new MarkdownIt({
  html: true,
  linkify: true,
  breaks: true,
  typographer: true,
})

// Ensure external links open in new tab safely
const defaultLinkRender =
  md.renderer.rules.link_open ||
  function (tokens, idx, options, _env, self) {
    return self.renderToken(tokens, idx, options)
  }

md.renderer.rules.link_open = function (tokens, idx, options, env, self) {
  const aIndex = tokens[idx].attrIndex('target')
  if (aIndex < 0) {
    tokens[idx].attrPush(['target', '_blank'])
    tokens[idx].attrPush(['rel', 'noopener noreferrer'])
  } else {
    tokens[idx].attrs![aIndex][1] = '_blank'
    tokens[idx].attrPush(['rel', 'noopener noreferrer'])
  }
  return defaultLinkRender(tokens, idx, options, env, self)
}

// Rewrite relative image paths (e.g. ./cover.jpg or inner.png) to /content/posts/{slug}/...
const defaultImageRender =
  md.renderer.rules.image ||
  function (tokens, idx, options, _env, self) {
    return self.renderToken(tokens, idx, options)
  }

md.renderer.rules.image = function (tokens, idx, options, env: { slug?: string }, self) {
  const srcIndex = tokens[idx].attrIndex('src')
  if (srcIndex >= 0 && env && env.slug) {
    let src = tokens[idx].attrs![srcIndex][1]
    if (src.startsWith('./')) {
      src = src.slice(2)
      tokens[idx].attrs![srcIndex][1] = `/content/posts/${env.slug}/${src}`
    } else if (
      !src.startsWith('http://') &&
      !src.startsWith('https://') &&
      !src.startsWith('/') &&
      !src.startsWith('data:')
    ) {
      tokens[idx].attrs![srcIndex][1] = `/content/posts/${env.slug}/${src}`
    }
  }
  return defaultImageRender(tokens, idx, options, env, self)
}

/**
 * Strips leading YAML Frontmatter (e.g. --- ... ---)
 */
export function stripFrontmatter(content: string): string {
  if (!content) return ''
  const trimmed = content.trim()
  if (trimmed.startsWith('---')) {
    const afterFirst = trimmed.slice(3)
    const secondDashIndex = afterFirst.indexOf('\n---')
    if (secondDashIndex !== -1) {
      return afterFirst.slice(secondDashIndex + 4).trim()
    }
  }
  return content
}

export function renderMarkdown(content: string, slug?: string): string {
  if (!content) return ''
  const cleanedContent = stripFrontmatter(content)
  const rawHtml = md.render(cleanedContent, { slug })
  return DOMPurify.sanitize(rawHtml, {
    ADD_TAGS: ['iframe'],
    ADD_ATTR: ['target', 'rel', 'src', 'frameborder', 'border', 'marginwidth', 'marginheight', 'width', 'height', 'allow', 'loading'],
  })
}
