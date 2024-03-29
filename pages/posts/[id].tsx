import Head from "next/head";
import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import type { StaticPath, PostData } from "../../lib/posts";
import Date from "../../components/date";
//@ts-ignore
import utilStyles from '../../styles/utils.module.scss';

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
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }}/>
      </article>
    </Layout>
  )
};
export default Post;
