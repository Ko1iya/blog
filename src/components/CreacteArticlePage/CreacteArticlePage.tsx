import { useCreateArticleMutation } from '@/store/reducers/blogApi';
import FormArticle from '../FormArticle/FormArticle';
import styles from './CreacteArticlePage.module.scss';

function CreacteArticlePage() {
  const [createArticle, { isLoading: createLoading, error: createError }] =
    useCreateArticleMutation();

  return (
    <div className={styles.creacteArticlePage}>
      <h1>Create Article</h1>
      <FormArticle
        title=""
        description=""
        body=""
        tags={['test']}
        slug=""
        errorForm={createError}
        requestFunc={createArticle}
        isLoading={createLoading}
      ></FormArticle>
    </div>
  );
}

export default CreacteArticlePage;
