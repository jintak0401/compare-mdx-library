import {
  getPostDataWithMdxBundler,
  writePostDataWithMdxBundler,
} from '@/lib/mdxBundler';
import { InferGetStaticPropsType } from 'next';
import { getMDXComponent } from 'mdx-bundler/client';
import Link from 'next/link';

export const getStaticProps = async () => {
  const postData = await getPostDataWithMdxBundler('sample');
  await writePostDataWithMdxBundler('sample');
  return {
    props: {
      ...postData,
    },
  };
};

const MdxBundlerPage = ({
  code,
  frontmatter,
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  console.log(code);
  const Component = getMDXComponent(code);
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
      <h1 className={'text-4xl text-center'}>{frontmatter.title}</h1>
      <article className={'p-10'}>
        <Component />
      </article>
    </>
  );
};

export default MdxBundlerPage;
