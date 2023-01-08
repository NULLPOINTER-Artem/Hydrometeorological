import axios from "axios";

export async function getCommentsForPosts(postIds) {
  const URL = `https://jsonplaceholder.typicode.com/comments?${
    postIds.map((id) => `postId=${id}`).join('&')
  }`;

  try {
    const response = await axios({
      url: URL,
      method: 'GET',
    });

    return response.data;
  } catch(err) {
    console.log(`[comments.js-getCommentsForPosts] \n ${err}`);
    return [];
  }
}
