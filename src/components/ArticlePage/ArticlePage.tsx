import { useParams } from 'react-router-dom';
import styles from './ArticlePage.module.scss';
import HertWithoutLike from '@/asset/image/heart-without-like.svg';
import { useGetArticleQuery } from '@/store/reducers/blogApi';
import Spinner from '../Spinner/Spinner';

function ArticlePage() {
  const { slug } = useParams();

  const { data, isLoading, isError } = useGetArticleQuery(slug);

  const article = data?.article;

  const {
    title = '',
    favoritesCount: likes = 0,
    tagList: tags = [],
    body: content = '',
    author: { username: authorName = '', image: authorAvatar = '' } = {},
    createdAt: date = '',
  } = article ?? {};

  return (
    <div className={styles.container}>
      {isError ? <>Oh no, there was an error</> : isLoading && <Spinner />}
      {!isLoading && (
        <>
          <li className={styles.article}>
            <div className={styles.content}>
              <div className={styles.header}>
                <h2 className={styles.title}>{title}</h2>
                <div className={styles.likes}>
                  <button type="button" className={styles.likeButton}>
                    <HertWithoutLike width={20} height={20}></HertWithoutLike>
                    <p>{likes}</p>
                  </button>
                </div>
              </div>
              <div className={styles.tags}>
                {tags.map((tag) => (
                  <span key={tag} className={styles.tag}>
                    {tag}
                  </span>
                ))}
              </div>
              <p className={styles.text}>{content}</p>
            </div>
            <div className={styles.author}>
              <div className={styles.authorInfo}>
                <span className={styles.authorName}>{authorName}</span>
                <span className={styles.date}>{date}</span>
              </div>
              <img
                src={authorAvatar}
                alt={authorName}
                className={styles.avatar}
              />
            </div>
          </li>
          <div className={styles.fullContent}>
            <p className={styles.text}>{content}</p>
          </div>
        </>
      )}
    </div>
  );
}

export default ArticlePage;
