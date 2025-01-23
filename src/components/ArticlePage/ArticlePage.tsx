import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './ArticlePage.module.scss';
import HertWithoutLike from '@/asset/image/heart-without-like.svg';
import Heart from '@/asset/image/heart-like.svg';
import {
  useAddFavoriteMutation,
  useDeleteFavoriteMutation,
  useGetArticleQuery,
} from '@/store/reducers/blogApi';
import Spinner from '../Spinner/Spinner';
import MarkdownContent from '../MarkdownContent/MarkdownContent';
import { useAppSelector } from '@/hooks/redux';

function ArticlePage() {
  const { slug } = useParams();

  const user = useAppSelector((state) => state.authSlice.user);

  const { data, isLoading, isError } = useGetArticleQuery(slug);

  const article = data?.article;

  const {
    title = '',
    favoritesCount: likes = 0,
    tagList: tags = [],
    body: content = '',
    author: { username: authorName = '', image: authorAvatar = '' } = {},
    createdAt: date = '',
    favorited = false,
  } = article ?? {};

  const canEdit = user === authorName;

  const [localFavorite, setFavorite] = useState(favorited);

  useEffect(() => {
    setFavorite(favorited);
  }, [favorited]);

  const [addLike] = useAddFavoriteMutation();
  const [deleteLike] = useDeleteFavoriteMutation();

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
                  <button
                    type="button"
                    onClick={() => {
                      if (localFavorite) {
                        deleteLike(slug);
                      } else {
                        addLike(slug);
                      }

                      setFavorite(!localFavorite);
                    }}
                    className={styles.likeButton}
                  >
                    {localFavorite ? (
                      <Heart width={20} height={20}></Heart>
                    ) : (
                      <HertWithoutLike width={20} height={20}></HertWithoutLike>
                    )}
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

              <MarkdownContent
                content={content}
                className={styles.text}
              ></MarkdownContent>
            </div>
            {!canEdit ? (
              <div className={styles.author}>
                <div className={styles.authorInfo}>
                  <span className={styles.authorName}>{authorName}</span>
                  <span className={styles.date}>
                    {new Date(date).toDateString()}
                  </span>
                </div>
                <img
                  src={authorAvatar}
                  alt={authorName}
                  className={styles.avatar}
                />
              </div>
            ) : (
              <div className={styles.containerAuthor}>
                <div className={styles.author}>
                  <div className={styles.authorInfo}>
                    <span className={styles.authorName}>{authorName}</span>
                    <span className={styles.date}>
                      {new Date(date).toDateString()}
                    </span>
                  </div>
                  <img
                    src={authorAvatar}
                    alt={authorName}
                    className={styles.avatar}
                  />
                </div>
                <div className={styles.changeContainer}>
                  <Button color="red" variant="outlined">
                    Delete{' '}
                  </Button>
                  <Button color="green" variant="outlined">
                    Edit{' '}
                  </Button>
                </div>
              </div>
            )}
          </li>
          <div className={styles.fullContent}>
            <MarkdownContent content={content} className=""></MarkdownContent>
          </div>
        </>
      )}
    </div>
  );
}

export default ArticlePage;
