import {
  ComputedFields,
  defineDocumentType,
  makeSource,
} from 'contentlayer/source-files';
import rehypePrismPlus from 'rehype-prism-plus';
// Rehype packages
import remarkFootnotes from 'remark-footnotes';
// Remark packages
import remarkGfm from 'remark-gfm';
import rehypePresetMinify from 'rehype-preset-minify';

import rehypeSlug from 'rehype-slug';
import remarkCodeTitles from './src/lib/remark/remark-code-title';
import remarkImgToJsx from './src/lib/remark/remark-img-to-jsx';

const computedFields: ComputedFields = {
  slug: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath.replace(/^.+?(\/)/, ''),
  },
};

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: 'blog/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    date: { type: 'date', required: true },
    tags: { type: 'list', of: { type: 'string' } },
    lastmod: { type: 'date' },
    draft: { type: 'boolean' },
    summary: { type: 'string' },
    images: { type: 'list', of: { type: 'string' } },
    layout: { type: 'string' },
    series: { type: 'string' },
    bibliography: { type: 'string' },
    canonicalUrl: { type: 'string' },
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: 'data',
  documentTypes: [Blog],
  mdx: {
    cwd: process.cwd(),
    remarkPlugins: [
      remarkGfm,
      remarkCodeTitles,
      [remarkFootnotes, { inlineNotes: true }],
      remarkImgToJsx,
    ],
    rehypePlugins: [
      rehypeSlug,
      // rehypeAutolinkHeadings,
      [rehypePrismPlus, { ignoreMissing: true }],
      rehypePresetMinify,
    ],
  },
});
