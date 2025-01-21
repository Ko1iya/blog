// src/components/Main/Main.tsx
import { useParams } from 'react-router-dom';
import styles from './main.module.scss';
import ArticleCard from '../ArticleCard/ArticleCard';
import Pagination from '../Pagination/Pagination';
import { useGetArticlesQuery } from '@/store/reducers/blogApi';
import Spinner from '../Spinner/Spinner';

function Main() {
  const { id } = useParams();

  const currentPage = parseInt(id, 10) || 1;

  const { data, isLoading, isError } = useGetArticlesQuery(currentPage);

  const articles = data?.articles || [];

  const countPage = data ? Math.floor(data.articlesCount / 20) * 10 : 10;

  return (
    <main className={styles.main}>
      <ul className={styles.articles}>
        {isError ? <>Oh no, there was an error</> : isLoading && <Spinner />}
        {!isLoading &&
          articles.map((article) => (
            <ArticleCard
              key={article.createdAt}
              title={article.title}
              likes={article.favoritesCount}
              date={new Date(article.createdAt).toDateString()}
              tags={article.tagList}
              content={article.description}
              authorName={article.author.username}
              authorAvatar={article.author.image}
              slug={article.slug}
              favorited={article.favorited}
            />
          ))}
      </ul>
      <Pagination totalPages={countPage} />
    </main>
  );
}

export default Main;
