import { useParams } from 'react-router-dom';
import FormArticle from '../FormArticle/FormArticle';
import styles from './EditArticlePage.module.scss';
import { useGetArticleQuery } from '@/store/reducers/blogApi';
import Spinner from '../Spinner/Spinner';

function EditArticlePage() {
  const { slug } = useParams();

  const { data } = useGetArticleQuery(slug);

  if (!data) {
    return <Spinner />;
  }

  return (
    <div className={styles.creacteArticlePage}>
      <h1>Edit Article</h1>
      <FormArticle
        title={data?.article.title}
        description={data?.article.description}
        body={data?.article.body}
        tags={data?.article.tagList}
        slug={data?.article.slug}
      ></FormArticle>
    </div>
  );
}

export default EditArticlePage;
