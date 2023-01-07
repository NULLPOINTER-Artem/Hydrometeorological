import axios from "axios";

export async function getPosts(prePage = 10, page = 1) {
  const URL = `https://jsonplaceholder.typicode.com/posts?_limit=${prePage}&_page=${page}`;

  try {
    const response = await axios({
      url: URL,
      method: 'GET',
    });

    return response.data;
  } catch(err) {
    console.log(`[posts.js-getPosts] \n ${err}`);
    return [];
  }
}
