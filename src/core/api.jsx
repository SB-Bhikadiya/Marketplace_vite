import { BASE_URL, COLLECTION_ENDPOINT, NFTS_ENDPOINT } from "../constants/endpoints";

const api = {
  baseUrl: BASE_URL, //mock data base folder
  nfts: NFTS_ENDPOINT,
  nftShowcases: "/nft_showcases.json",
  authors: "/authors.json",
  authorsSales: "/author_ranks.json",
  hotCollections: COLLECTION_ENDPOINT,
  contactUs: "/contact-forms",
  blogs: "/blog-posts",
  recent: "/blog-posts/recent.json",
  comments: "/blog-posts/comments.json",
  tags: "/blog-posts/tags.json",
};

export default api;
