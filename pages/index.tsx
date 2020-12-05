import Head from 'next/head';
import Layout, { siteTitle } from "../components/layout";
import { getSortedPostsData } from "../lib/posts"
import type { PostData }  from "../lib/posts"
// @ts-ignore
import utilStyles from "../styles/utils.module.scss";

type StaticProps = {
  allPostsData: PostData[]
}

const getStaticProps: () => Promise<{props: StaticProps}> = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: { allPostsData }
  };
};

const Home = ({ allPostsData }: StaticProps) => {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>Hogeeee! Welcome it's me!</p>
        <p>
          (This is a sample website - you’ll be building a site like this on{' '}
          <a href="https://nextjs.org/learn">our Next.js tutorial</a>.)
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {allPostsData.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              {title}
              <br />
              {id}
              <br />
              {date}
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  )
};
export default Home;
