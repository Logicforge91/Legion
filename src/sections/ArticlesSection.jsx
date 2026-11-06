import { useMemo, useState } from 'react';
import { SectionHeading } from '../components/shared/ui';
import { articles } from '../data/portfolio/articles.js';
import '../styles/sections/ArticlesSection.css';

const topics = ['All topics', ...new Set(articles.map(({ topic }) => topic))];

function articleMatchesQuery(article, query) {
  if (!query) return true;
  const searchableText = [
    article.title,
    article.topic,
    article.summary,
    ...article.tags,
    ...article.sections.flatMap(({ heading, body, points }) => [heading, body, ...points]),
  ].join(' ').toLowerCase();

  return searchableText.includes(query);
}

function ArticleCard({ article }) {
  return (
    <article className="article-card" aria-labelledby={`article-${article.slug}`}>
      <div className="article-card__meta">
        <span>Technical article</span>
        <span>{article.readTime} read</span>
      </div>
      <span className="article-card__topic">{article.topic}</span>
      <h3 id={`article-${article.slug}`}>{article.title}</h3>
      <p className="article-card__summary">{article.summary}</p>
      <ul className="article-card__tags" aria-label="Article topics">
        {article.tags.map((tag) => <li key={tag}>{tag}</li>)}
      </ul>
      <details className="article-card__details">
        <summary>Read tutorial</summary>
        <div className="article-card__content">
          {article.sections.map(({ heading, body, points }) => (
            <section key={heading} aria-labelledby={`${article.slug}-${heading.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>
              <h4 id={`${article.slug}-${heading.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`}>{heading}</h4>
              <p>{body}</p>
              <ul>{points.map((point) => <li key={point}>{point}</li>)}</ul>
            </section>
          ))}
        </div>
      </details>
    </article>
  );
}

export default function ArticlesSection() {
  const [topic, setTopic] = useState('All topics');
  const [query, setQuery] = useState('');
  const normalizedQuery = query.trim().toLowerCase();
  const visibleArticles = useMemo(() => articles.filter((article) => (
    (topic === 'All topics' || article.topic === topic)
    && articleMatchesQuery(article, normalizedQuery)
  )), [normalizedQuery, topic]);

  return (
    <section id="articles" className="articles-section" aria-labelledby="articlesTitle">
      <div className="site-container">
        <SectionHeading eyebrow="Field notes" id="articlesTitle" title="Technical knowledge, built from real engineering work.">
          Practical tutorials on APIs, data, security, integrations, and the habits that make backend systems easier to operate.
        </SectionHeading>

        <div className="articles-toolbar">
          <label className="articles-search">
            <span className="visually-hidden">Search technical articles</span>
            <i className="bi bi-search" aria-hidden="true" />
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search topics or techniques" />
            {query && <button type="button" onClick={() => setQuery('')} aria-label="Clear article search"><i className="bi bi-x-lg" aria-hidden="true" /></button>}
          </label>
          <div className="articles-filters" role="group" aria-label="Filter articles by topic">
            {topics.map((value) => (
              <button key={value} type="button" aria-pressed={topic === value} onClick={() => setTopic(value)}>{value}</button>
            ))}
          </div>
        </div>

        <p className="articles-result-count" aria-live="polite">
          Showing {visibleArticles.length} of {articles.length} tutorials
        </p>

        <div className="articles-grid">
          {visibleArticles.map((article) => <ArticleCard key={article.slug} article={article} />)}
          {!visibleArticles.length && (
            <p className="articles-empty">No tutorials match that search. Try another topic or phrase.</p>
          )}
        </div>
      </div>
    </section>
  );
}
