import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Article, ArticlesResponse } from '@/types/typesRedux';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ODIwZTY3Y2UxOGQwMWIwMDJiNmRiYyIsInVzZXJuYW1lIjoia29seWEiLCJleHAiOjE3NDE3NjA2MTUsImlhdCI6MTczNjU3NjYxNX0.KQWjO8WchCpKwLKZziplnYM8k1T1vhkM4uTHr0n8Npg';

const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://blog-platform.kata.academy/api/',
    prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getArticles: builder.query<ArticlesResponse, number>({
      query: (page) => `articles?offset=${page * 20}`,
    }),
    getArticle: builder.query<{ article: Article }, string>({
      query: (slug) => `articles/${slug}`,
    }),
  }),
});

export const { useGetArticlesQuery, useGetArticleQuery } = blogApi;

export default blogApi;
