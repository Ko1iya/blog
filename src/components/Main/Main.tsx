// src/components/Main/Main.tsx
import styles from './main.module.scss';
import ArticleCard from '../ArticleCard/ArticleCard';
import Pagination from '../Pagination/Pagination';
import { useGetArticlesQuery } from '@/store/reducers/blogApi';
import Spinner from '../Spinner/Spinner';
// import { useAppSelector } from '@/hooks/redux';
// import ArticlePage from '../ArticlePage/ArticlePage';

const ARTICLES_PER_PAGE = 5;

function Main() {
  const { data, isLoading, isError } = useGetArticlesQuery();

  const articles = data?.articles || [];

  return (
    <main className={styles.main}>
      <ul className={styles.articles}>
        {isError ? <>Oh no, there was an error</> : isLoading && <Spinner />}
        {!isLoading &&
          articles.map((article) => (
            <ArticleCard
              key={article.slug}
              title={article.title}
              likes={article.favoritesCount}
              date={new Date(article.createdAt).toDateString()}
              tags={article.tagList}
              content={article.description}
              authorName={article.author.username}
              authorAvatar={article.author.image}
              slug={article.slug}
            />
          ))}
      </ul>
      <Pagination
        currentPage={1}
        totalPages={Math.ceil(articles.length / ARTICLES_PER_PAGE)}
        onPageChange={() => {}}
      />
    </main>
  );
}

export default Main;
