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

const getStaticProps = ({ params }: StaticPath): {props: StaticProps} => {
  const postData = getPostData(params.id);
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
      {postData.title}
      <br />
      {postData.id}
      <br />
      {postData.date}
    </Layout>
  )
};
export default Post;
