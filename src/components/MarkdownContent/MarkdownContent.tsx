import Markdown from 'markdown-to-jsx';
import styles from './MarkdownContent.module.scss';

interface IMarkdownContent {
  content: string;
  className: string;
}

function MarkdownContent({ content, className }: IMarkdownContent) {
  return (
    <p className={`${className} ${styles.markdownContent}`}>
      <Markdown>{content}</Markdown>
    </p>
  );
}

export default MarkdownContent;
