import FormArticle from '../FormArticle/FormArticle';
import styles from './CreacteArticlePage.module.scss';

function CreacteArticlePage() {
  return (
    <div className={styles.creacteArticlePage}>
      <h1>Create Article</h1>
      <FormArticle
        title=""
        description=""
        body=""
        tags={['test']}
        slug=""
      ></FormArticle>
    </div>
  );
}

export default CreacteArticlePage;
