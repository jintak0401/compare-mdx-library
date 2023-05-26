import {
  getPostDataWithMdxRemote,
  writePostDataWithMdxRemote,
} from '@/lib/nextMdxRemote';
import { InferGetStaticPropsType } from 'next';
import { MDXRemote } from 'next-mdx-remote';
import Link from 'next/link';

export const getStaticProps = async () => {
  const postData = await getPostDataWithMdxRemote('sample');
  await writePostDataWithMdxRemote('sample');
  return {
    props: {
      ...postData,
    },
  };
};

const NextMdxRemotePage = ({
  code,
  frontmatter,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  console.log(code);
  const Component = () =>
    MDXRemote({
      frontmatter: frontmatter,
      scope: undefined,
      compiledSource: code,
    });

  return (
    <>
      <Link
        href={'/'}
        className={
          'rounded-md p-4 text-2xl hover:bg-gray-200 border-2 border-black m-5 inline-block'
        }
      >
        Go Back
      </Link>
      <h1 className={'text-4xl text-center'}>{frontmatter.title as string}</h1>
      <article className={'p-10'}>
        <Component />
      </article>
    </>
  );
};

export default NextMdxRemotePage;
