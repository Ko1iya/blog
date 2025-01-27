import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Article, ArticlesResponse } from '@/types/typesRedux';
import { RootState } from '.';

interface ProfileUodateRequest {
  user: { email?: string; username: string; bio?: string; image?: string };
}

export interface FormArticle {
  title: string;
  description: string;
  body: string;
  tags?: [string];
  slug?: string;
}

interface ProfileUodateResponse {
  user: {
    bio: string;
    email: string;
    image: string;
    username: string;
  };
}

export type FormInputsIn = {
  email: string;
  password: string;
};

export type FormInputsUp = {
  username: string;
  email: string;
  password: string;
};

export interface ReturnSign {
  username: string;
  email?: string;
  token?: string;
  bio?: string;
  image?: string;
}

interface ReturnSignUp {
  user: ReturnSign;
}

const blogApi = createApi({
  reducerPath: 'blogApi',
  tagTypes: ['User', 'favorite', 'articles', 'article'],
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://blog-platform.kata.academy/api/',
    prepareHeaders: (headers, { getState }) => {
      const { token } = (getState() as RootState).authSlice;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getArticles: builder.query<ArticlesResponse, number>({
      query: (page = 1) => `articles?offset=${page * 20 - 20}`,
      providesTags: ['favorite', 'articles', 'article'],
    }),
    getArticle: builder.query<{ article: Article }, string>({
      query: (slug) => `articles/${slug}`,
      providesTags: ['favorite', 'article'],
    }),
    signIn: builder.mutation<ReturnSign, FormInputsIn>({
      query: ({ email, password }) => ({
        url: 'users/login',
        method: 'POST',
        body: { user: { email, password } },
        formData: true,
      }),
      invalidatesTags: ['User'],
      transformResponse: (response: ReturnSignUp) => response.user,
    }),
    addFavorite: builder.mutation<{ article: Article }, string>({
      query: (slug) => ({
        url: `articles/${slug}/favorite`,
        method: 'POST',
      }),
      invalidatesTags: ['favorite'],
    }),
    deleteFavorite: builder.mutation<{ article: Article }, string>({
      query: (slug) => ({
        url: `articles/${slug}/favorite`,
        method: 'DELETE',
      }),
      invalidatesTags: ['favorite'],
    }),
    signUp: builder.mutation<ReturnSignUp, FormInputsUp>({
      query: ({ username, email, password }) => ({
        url: 'users',
        method: 'POST',
        body: { user: { username, email, password } },
        formData: true,
      }),
      invalidatesTags: ['User'],
    }),
    editProfile: builder.mutation<ProfileUodateResponse, ProfileUodateRequest>({
      query: (requestData) => {
        const noEmptyValues = Object.fromEntries(
          Object.entries(requestData.user).filter(([_, value]) => value !== ''),
        );

        const requestD = {
          url: 'user',
          method: 'PUT',
          body: { user: noEmptyValues },
          formData: true,
        };

        return requestD;
      },
      invalidatesTags: ['User'],
    }),
    createArticle: builder.mutation<FormArticle, FormArticle>({
      query: (article) => ({
        url: 'articles',
        method: 'POST',
        body: { article: { ...article } },
        formData: true,
      }),
      invalidatesTags: ['articles'],
    }),
    editArticle: builder.mutation<FormArticle, FormArticle>({
      query: (article) => ({
        url: `articles/${article.slug}`,
        method: 'PUT',
        body: { article: { ...article } },
        formData: true,
      }),
      invalidatesTags: ['articles', 'article'],
    }),
    deleteArticle: builder.mutation<{ article: Article }, string>({
      query: (slug) => ({
        url: `articles/${slug}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['articles', 'article'],
    }),
    getUser: builder.query<ReturnSign, void>({
      query: () => {
        console.log('getUser');

        return 'user';
      },
    }),
  }),
});

export const {
  useGetArticlesQuery,
  useGetArticleQuery,
  useSignInMutation,
  useSignUpMutation,
  useAddFavoriteMutation,
  useEditProfileMutation,
  useCreateArticleMutation,
  useDeleteFavoriteMutation,
  useEditArticleMutation,
  useDeleteArticleMutation,
  useGetUserQuery,
} = blogApi;

export default blogApi;
