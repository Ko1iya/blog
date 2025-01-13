import styles from './ArticleCard.module.scss';
import HertWithoutLike from '@/asset/image/heart-without-like.svg';

interface ArticleCardProps {
  title: string;
  likes: number;
  date: string;
  tags: string[];
  content: string;
  authorName: string;
  authorAvatar: string;
}
function ArticleCard(props: ArticleCardProps) {
  const { title, likes, date, tags, content, authorName, authorAvatar } = props;

  return (
    <article className={styles.card}>
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
        <img src={authorAvatar} alt={authorName} className={styles.avatar} />
      </div>
    </article>
  );
}

export default ArticleCard;
