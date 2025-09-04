export const QUERY_KEYS = {
  fetchUser: ["fetchUser"],
  fetchBlog: ["fetchBlog"],
  getPage: (page: number) => [...QUERY_KEYS.fetchUser, page],
};
