import { createSlice } from '@reduxjs/toolkit';
import { Article } from '@/types/typesRedux';

interface ICount {
  activeArticle: Article | false;
}

const initialState: ICount = {
  activeArticle: false,
};

const ArticleSlice = createSlice({
  name: 'articleSlice',
  initialState,
  reducers: {
    changeArticle: (state: ICount, action: { payload: Article | false }) => ({
      activeArticle: action.payload,
    }),
  },
});

const { changeArticle } = ArticleSlice.actions;

const articleReducer = ArticleSlice.reducer;

export { articleReducer, changeArticle };
