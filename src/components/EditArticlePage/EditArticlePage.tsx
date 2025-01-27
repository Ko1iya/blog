import { useParams } from 'react-router-dom';
import FormArticle from '../FormArticle/FormArticle';
import styles from './EditArticlePage.module.scss';
import {
  useEditArticleMutation,
  useGetArticleQuery,
} from '@/store/reducers/blogApi';
import Spinner from '../Spinner/Spinner';

function EditArticlePage() {
  const { slug } = useParams();

  const { data } = useGetArticleQuery(slug);

  if (!data) {
    return <Spinner />;
  }

  const [editArticle, { isLoading: editLoading, error: editError }] =
    useEditArticleMutation();

  return (
    <div className={styles.creacteArticlePage}>
      <h1>Edit Article</h1>
      <FormArticle
        title={data?.article.title}
        description={data?.article.description}
        body={data?.article.body}
        tags={data?.article.tagList}
        slug={data?.article.slug}
        requestFunc={editArticle}
        isLoading={editLoading}
        errorForm={editError}
      ></FormArticle>
    </div>
  );
}

export default EditArticlePage;
