import Layout from "../../components/layout";
import { getAllPostIds } from "../../lib/posts";

const getStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

const Post = () => {
  <Layout>...</Layout>
};
export default Post;
export { getStaticPaths }
