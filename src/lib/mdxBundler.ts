import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { bundleMDX } from 'mdx-bundler';
import rehypePrismPlus from 'rehype-prism-plus';
import remarkGfm from 'remark-gfm';
import remarkFootnotes from 'remark-footnotes';
import rehypePresetMinify from 'rehype-preset-minify';
import remarkCodeTitles from '@/lib/remark/remark-code-title';
import remarkImgToJsx from '@/lib/remark/remark-img-to-jsx';
import rehypeSlug from 'rehype-slug';

const blogDirectory = path.join(process.cwd(), 'data', 'blog');

export const getPostDataWithMdxBundler = async (slug: string) => {
  const fullPath = path.join(blogDirectory, `${slug}.mdx`);
  const source = fs.readFileSync(fullPath, 'utf8');

  const { code, frontmatter } = await bundleMDX({
    source,
    mdxOptions(options) {
      options.remarkPlugins = [
        ...(options?.remarkPlugins ?? []),
        remarkGfm,
        [remarkFootnotes, { inlineNotes: true }],
        remarkCodeTitles,
        remarkImgToJsx,
      ];
      options.rehypePlugins = [
        ...(options?.rehypePlugins ?? []),
        [rehypePrismPlus, { ignoreMissing: true }],
        rehypeSlug,
        rehypePresetMinify,
      ];
      return options;
    },
  });

  return {
    slug,
    frontmatter,
    code,
  };
};

export const writePostDataWithMdxBundler = async (slug: string) => {
  const { code, frontmatter } = await getPostDataWithMdxBundler(slug);
  const { data } = matter(code);

  const postDirectory = path.join(
    process.cwd(),
    'public',
    'posts',
    'mdx-bundler'
  );
  if (!fs.existsSync(postDirectory)) {
    fs.mkdirSync(postDirectory);
  }

  const postPath = path.join(postDirectory, `${slug}.json`);
  fs.writeFileSync(postPath, JSON.stringify({ ...data, ...frontmatter, code }));
};
