import axios from "axios";

axios.defaults.baseURL = "https://api.unsplash.com";
// const ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;

const fetchImagesQuery = async (filter, page) => {
  const { data } = await axios("/search/photos", {
    params: {
      query: filter,
      page: page,
      per_page: 20,
    },
    headers: {
      Authorization: `Client-ID m_ElRULwHDK6LGpijEW0VpQ8cjsrwFT4Y-wkBwe3G-0`,
      "Accept-Version": "v1",
    },
  });
  return data;
};

export default fetchImagesQuery;
