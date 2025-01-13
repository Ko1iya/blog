// src/components/Main/Main.tsx
import { useState } from 'react';
import styles from './main.module.scss';
import ArticleCard from '../ArticleCard/ArticleCard';
import Pagination from '../Pagination/Pagination';

const ARTICLES_PER_PAGE = 5;

function Main() {
  const [currentPage, setCurrentPage] = useState(1);

  const articles = [
    {
      id: 1,
      title: 'Getting Started with TypeScript and React',
      likes: 234,
      date: 'March 15, 2024',
      tags: ['TypeScript', 'React', 'Frontend'],
      content:
        "TypeScript has become an essential tool in modern web development. In this article, we'll explore how to set up a new React project with TypeScript and discuss best practices for type safety...",
      authorName: 'John Doe',
      authorAvatar: 'https://i.pravatar.cc/150?img=1',
    },
    {
      id: 2,
      title: 'Understanding Redux Toolkit in 2024',
      likes: 187,
      date: 'March 14, 2024',
      tags: ['Redux', 'JavaScript', 'State Management'],
      content:
        "Redux Toolkit has revolutionized how we handle state management in React applications. Let's dive deep into its features and learn how to leverage its power...",
      authorName: 'Sarah Wilson',
      authorAvatar: 'https://i.pravatar.cc/150?img=2',
    },
    {
      id: 3,
      title: 'CSS Modules vs Styled Components',
      likes: 156,
      date: 'March 13, 2024',
      tags: ['CSS', 'Styling', 'Frontend'],
      content:
        "Choosing the right styling solution for your React application can be challenging. In this comparison, we'll look at the pros and cons of CSS Modules and Styled Components...",
      authorName: 'Michael Chen',
      authorAvatar: 'https://i.pravatar.cc/150?img=3',
    },
    {
      id: 4,
      title: 'Building Responsive Layouts with Grid and Flexbox',
      likes: 298,
      date: 'March 12, 2024',
      tags: ['CSS', 'Layout', 'Responsive Design'],
      content:
        'Modern CSS provides powerful tools for creating responsive layouts. Learn how to combine Grid and Flexbox to build beautiful, responsive web applications...',
      authorName: 'Emma Rodriguez',
      authorAvatar: 'https://i.pravatar.cc/150?img=4',
    },
    {
      id: 5,
      title: 'React Performance Optimization Techniques',
      likes: 345,
      date: 'March 11, 2024',
      tags: ['React', 'Performance', 'Optimization'],
      content:
        "Discover practical techniques to optimize your React applications. From memo and useMemo to code splitting and lazy loading, we'll cover everything you need to know...",
      authorName: 'David Kim',
      authorAvatar: 'https://i.pravatar.cc/150?img=5',
    },
    {
      id: 6,
      title: 'Introduction to Web Accessibility (a11y)',
      likes: 167,
      date: 'March 10, 2024',
      tags: ['Accessibility', 'Frontend', 'Web Standards'],
      content:
        'Web accessibility is crucial for creating inclusive applications. Learn about ARIA attributes, semantic HTML, and best practices for making your web apps accessible to everyone...',
      authorName: 'Lisa Thompson',
      authorAvatar: 'https://i.pravatar.cc/150?img=6',
    },
  ];

  return (
    <main className={styles.main}>
      <div className={styles.articles}>
        {articles.map((article) => (
          <ArticleCard
            key={article.id}
            title={article.title}
            likes={article.likes}
            date={article.date}
            tags={article.tags}
            content={article.content}
            authorName={article.authorName}
            authorAvatar={article.authorAvatar}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(articles.length / ARTICLES_PER_PAGE)}
        onPageChange={setCurrentPage}
      />
    </main>
  );
}

export default Main;
