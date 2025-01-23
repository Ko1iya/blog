import { Link } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { useState } from 'react';
import styles from './ArticleCard.module.scss';
import HertWithoutLike from '@/asset/image/heart-without-like.svg';
import Heart from '@/asset/image/heart-like.svg';
import { useAppSelector } from '@/hooks/redux';
import {
  useAddFavoriteMutation,
  useDeleteFavoriteMutation,
} from '@/store/reducers/blogApi';

interface ArticleCardProps {
  title: string;
  likes: number;
  date: string;
  tags: string[];
  content: string;
  authorName: string;
  authorAvatar: string;
  slug: string;
  favorited: boolean;
}
function ArticleCard(props: ArticleCardProps) {
  const {
    title,
    likes,
    date,
    tags,
    content,
    authorName,
    authorAvatar,
    slug,
    favorited,
  } = props;

  const user = useAppSelector((state) => state.authSlice.user);
  const [localFavorite, setFavorite] = useState(favorited);

  const [addLike] = useAddFavoriteMutation();
  const [deleteLike] = useDeleteFavoriteMutation();

  return (
    <li className={styles.card}>
      <div className={styles.content}>
        <div className={styles.header}>
          <Link to={`/articles/${slug}`}>
            <h2 className={styles.title}>{title}</h2>
          </Link>

          <div className={styles.likes}>
            <button
              type="button"
              className={`${styles.likeButton} ${user && styles.liked}`}
              onClick={() => {
                setFavorite(!localFavorite);
                if (localFavorite) {
                  deleteLike(slug);
                } else {
                  addLike(slug);
                }
              }}
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
            <span key={`${tag} + ${uuid()}`} className={styles.tag}>
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
        <img src={authorAvatar} alt={authorName} className={styles.avatar} />
      </div>
    </li>
  );
}

export default ArticleCard;
