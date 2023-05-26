import { allBlogs } from 'contentlayer/generated';
import { InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { useMDXComponent } from 'next-contentlayer/hooks';

export const getStaticProps = async () => {
  const postData = allBlogs.find((p) => p.slug === 'sample');
  return {
    props: {
      ...postData,
    },
  };
};

const ContentlayerPage = (
  postData: InferGetStaticPropsType<typeof getStaticProps>
) => {
  const MDXLayout = useMDXComponent(postData.body!.code);
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
      <h1 className={'text-4xl text-center'}>{postData.title}</h1>
      <article>
        <MDXLayout />
      </article>
    </>
  );
};

export default ContentlayerPage;
