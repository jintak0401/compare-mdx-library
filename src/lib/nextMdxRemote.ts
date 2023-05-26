import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import rehypePrismPlus from 'rehype-prism-plus';
import remarkGfm from 'remark-gfm';
import { serialize } from 'next-mdx-remote/serialize';
import remarkFootnotes from 'remark-footnotes';
import rehypePresetMinify from 'rehype-preset-minify';
import remarkCodeTitles from '@/lib/remark/remark-code-title';
import remarkImgToJsx from '@/lib/remark/remark-img-to-jsx';
import rehypeSlug from 'rehype-slug';

const blogDirectory = path.join(process.cwd(), 'data', 'blog');

export const getPostDataWithMdxRemote = async (slug: string) => {
  const fullPath = path.join(blogDirectory, `${slug}.mdx`);
  const source = fs.readFileSync(fullPath, 'utf8');

  const { frontmatter, compiledSource } = await serialize(source, {
    mdxOptions: {
      remarkPlugins: [
        remarkGfm,
        remarkCodeTitles,
        [remarkFootnotes, { inlineNotes: true }],
        remarkImgToJsx,
      ],
      rehypePlugins: [
        rehypeSlug,
        [rehypePrismPlus, { ignoreMissing: true }],
        rehypePresetMinify,
      ],
    },
    parseFrontmatter: true,
  });

  return {
    slug,
    frontmatter,
    code: compiledSource,
  };
};

export const writePostDataWithMdxRemote = async (slug: string) => {
  const { code, frontmatter } = await getPostDataWithMdxRemote(slug);
  const { data } = matter(code);

  const postDirectory = path.join(
    process.cwd(),
    'public',
    'posts',
    'next-mdx-remote'
  );
  if (!fs.existsSync(postDirectory)) {
    fs.mkdirSync(postDirectory);
  }

  const postPath = path.join(postDirectory, `${slug}.json`);
  fs.writeFileSync(postPath, JSON.stringify({ ...data, ...frontmatter, code }));
};
