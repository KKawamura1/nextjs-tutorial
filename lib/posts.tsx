import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';

type _PostData = {
  date: string,
  title: string,
};

export type PostData = _PostData & {
  id: string,
  contentHtml: string,
};

export type StaticPath = {
  params: {
    id: string,
  }
};

const postsDirectory = path.join(process.cwd(), 'posts');

const getPostData = async (id: string): Promise<PostData> => {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark().use(html).process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id
  return {
    id,
    contentHtml,
    ...(matterResult.data as _PostData)
  }
}
export { getPostData };

const getSortedPostsData = async (): Promise<PostData[]> => {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = await Promise.all(fileNames.map(async (fileName): Promise<PostData> => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Get data
    const data = await getPostData(id);
    return data
  }));
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
};
export { getSortedPostsData };

const getAllPostIds = (): StaticPath[] => {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map(fileName => {
    return {
      params: {
        id: fileName.replace(/\.md$/, '')
      }
    };
  });
};
export { getAllPostIds };
