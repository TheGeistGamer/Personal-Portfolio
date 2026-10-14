import React from 'react'
import type { L } from '../data/projects'

// Bilingual text node: Spanish is rendered, the language switch swaps in `data-en`.
export const T = ({ l, as: Tag = 'span' }: { l: L; as?: 'span' | 'p' | 'h3' | 'strong' }) => (
  <Tag data-es={l.es} data-en={l.en}>{l.es}</Tag>
)
