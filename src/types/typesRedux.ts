interface Author {
  username: string;
  bio?: string;
  image: string;
  following: boolean;
}

interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  createdAt: string;
  updatedAt: string;
  tagList: string[];
  favorited: boolean;
  favoritesCount: number;
  author: Author;
}

interface ArticlesResponse {
  articles: Article[];
  articlesCount: number;
}

export { Author, Article, ArticlesResponse };
