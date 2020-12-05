import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

type _PostData = {
  date: string,
  title: string,
};

export type PostData = {
  id: string,
  date: string,
  title: string,
};

export type StaticPath = {
  params: {
    id: string,
  }
};

const postsDirectory = path.join(process.cwd(), 'posts');

const getPostData = (id: string): PostData => {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Combine the data with the id
  return {
    id,
    ...(matterResult.data as _PostData)
  }
}
export { getPostData };

const getSortedPostsData: () => PostData[] = () => {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)
  const allPostsData = fileNames.map(fileName => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '')

    // Get data
    return getPostData(id);
  });
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
