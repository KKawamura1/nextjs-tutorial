import Head from "next/head";
import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import type { StaticPath, PostData } from "../../lib/posts"

type StaticProps = {
  postData: PostData
}

const getStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};
export { getStaticPaths };

const getStaticProps = async ({ params }: StaticPath): Promise<{props: StaticProps}> => {
  const postData = await getPostData(params.id);
  return {
    props: {
      postData
    }
  };
}
export { getStaticProps }

const Post = ({ postData }: StaticProps) => {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
      <br />
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }}/>
    </Layout>
  )
};
export default Post;
