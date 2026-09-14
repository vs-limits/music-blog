import MarkdownIt from 'markdown-it'
import DOMPurify from 'dompurify'

const md = new MarkdownIt({
  html: true,
  linkify: true,
  breaks: true,
  typographer: true,
})

// Ensure external links open in new tab safely
const defaultRender =
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
  return defaultRender(tokens, idx, options, env, self)
}

export function renderMarkdown(content: string): string {
  if (!content) return ''
  const rawHtml = md.render(content)
  return DOMPurify.sanitize(rawHtml, {
    ADD_ATTR: ['target', 'rel'],
  })
}
