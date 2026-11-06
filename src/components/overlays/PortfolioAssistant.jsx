import { useEffect, useRef, useState } from 'react';
import { articles, integrations, profile, projects, services, skills } from '../../data/portfolio.js';

const stopWords = new Set(['a', 'an', 'and', 'are', 'can', 'do', 'does', 'for', 'from', 'how', 'i', 'in', 'is', 'me', 'of', 'on', 'or', 'the', 'to', 'what', 'which', 'who', 'with', 'you', 'your', 'tell']);

function makeKnowledgeBase() {
  return [
    {
      title: profile.name,
      category: profile.industry,
      text: `${profile.summary} ${profile.introduction} ${profile.approach} ${profile.focus.join(' ')} ${profile.personality.join(' ')} ${profile.coreValues.join(' ')} ${profile.vision} ${profile.availability}`,
      summary: profile.summary,
      href: '#about',
      source: 'Company profile',
      keywords: `${profile.industry} ${profile.personality.join(' ')} ${profile.coreValues.join(' ')} ${profile.vision}`,
    },
    ...services.map((item) => ({
      title: item.title,
      category: 'Backend service',
      text: `${item.description} ${item.capability}`,
      summary: item.description,
      href: '#services',
      source: 'Service',
    })),
    ...projects.map((item) => ({
      title: item.title,
      category: item.category,
      text: item.text,
      summary: item.text,
      href: '#projects',
      source: 'Project',
      keywords: item.filters.join(' '),
    })),
    ...skills.map((item) => ({
      title: item.title,
      category: 'Skills and technology',
      text: item.description,
      summary: item.description,
      href: '#skills',
      source: 'Toolkit',
    })),
    ...integrations.map((item) => ({
      title: item.title,
      category: 'Integrations',
      text: `${item.description} ${item.tools.join(' ')}`,
      summary: item.description,
      href: '#integrations',
      source: 'Integration',
      keywords: item.tools.join(' '),
    })),
    ...articles.map((item) => ({
      title: item.title,
      category: item.topic,
      text: `${item.summary} ${item.tags.join(' ')} ${item.sections.map(({ heading, body, points }) => `${heading} ${body} ${points.join(' ')}`).join(' ')}`,
      summary: item.summary,
      href: '#articles',
      source: 'Technical article',
    })),
  ];
}

const knowledgeBase = makeKnowledgeBase();

function findMatches(question) {
  const terms = question.toLowerCase().match(/[a-z0-9+#.]+/g)?.filter((term) => term.length > 1 && !stopWords.has(term)) ?? [];
  if (!terms.length) return [];

  return knowledgeBase
    .map((entry, index) => {
      const title = entry.title.toLowerCase();
      const category = entry.category.toLowerCase();
      const body = `${entry.text} ${entry.keywords ?? ''}`.toLowerCase();
      const score = terms.reduce((total, term) => (
        total
        + (title.includes(term) ? 5 : 0)
        + (category.includes(term) ? 3 : 0)
        + (body.includes(term) ? 1 : 0)
      ), 0);
      return { ...entry, score, index };
    })
    .filter((entry) => entry.score > 0)
    .sort((left, right) => right.score - left.score || left.index - right.index)
    .slice(0, 3);
}

function buildAnswer(matches) {
  if (!matches.length) {
    return {
      text: 'Ask about QYVERON, freelance services, project examples, integrations, or software development articles.',
      matches,
    };
  }

  return {
    text: `Based on the QYVERON site: ${matches[0].summary}`,
    matches,
  };
}

const suggestions = [
  'What backend technologies are in the toolkit?',
  'How are payment integrations handled?',
  'Show me projects about healthcare',
];

export default function PortfolioAssistant({ open, onClose }) {
  const [messages, setMessages] = useState([
    { id: 0, role: 'assistant', text: 'Welcome to QYVERON TECHNOLOGIES. Ask about our services, project examples, technical approach, or engineering articles.' },
  ]);
  const [question, setQuestion] = useState('');
  const [announcement, setAnnouncement] = useState('');
  const inputRef = useRef(null);
  const messagesRef = useRef(null);
  const messageIdRef = useRef(1);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const viewport = messagesRef.current;
    if (viewport) viewport.scrollTop = viewport.scrollHeight;
  }, [messages]);

  useEffect(() => {
    if (!open) return undefined;
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [onClose, open]);

  const submitQuestion = (event) => {
    event.preventDefault();
    const text = question.trim();
    if (!text) return;

    const matches = findMatches(text);
    const answer = buildAnswer(matches);
    setMessages((current) => [
      ...current.slice(-10),
      { id: messageIdRef.current++, role: 'user', text },
      { id: messageIdRef.current++, role: 'assistant', ...answer },
    ]);
    setAnnouncement(answer.text);
    setQuestion('');
  };

  if (!open) return null;

  return (
    <section className="portfolio-assistant" role="dialog" aria-modal="false" aria-labelledby="portfolioAssistantTitle">
      <header className="portfolio-assistant__header">
        <div>
          <span className="portfolio-assistant__eyebrow"><i aria-hidden="true" />QYVERON / DIGITAL GUIDE</span>
          <h2 id="portfolioAssistantTitle">Ask QYVERON</h2>
          <p>Answers are matched from the information on this site.</p>
        </div>
        <button type="button" className="portfolio-assistant__close" onClick={onClose} aria-label="Close QYVERON guide">
          <i className="bi bi-x-lg" aria-hidden="true" />
        </button>
      </header>

      <div ref={messagesRef} className="portfolio-assistant__messages" aria-label="Conversation">
        {messages.map((message) => (
          <div className={`assistant-message assistant-message--${message.role}`} key={message.id}>
            <p>{message.text}</p>
            {message.matches?.map((match) => (
              <a className="assistant-result" href={match.href} key={`${match.source}-${match.title}`} onClick={onClose}>
                <span><small>{match.source} · {match.category}</small><strong>{match.title}</strong><em>{match.summary}</em></span>
                <i className="bi bi-arrow-up-right" aria-hidden="true" />
              </a>
            ))}
          </div>
        ))}
        {messages.length === 1 && (
          <div className="assistant-suggestions" aria-label="Suggested questions">
            {suggestions.map((suggestion) => (
              <button key={suggestion} type="button" onClick={() => setQuestion(suggestion)}>{suggestion}</button>
            ))}
          </div>
        )}
      </div>

      <form className="portfolio-assistant__form" onSubmit={submitQuestion}>
        <label className="visually-hidden" htmlFor="portfolioAssistantQuestion">Ask a question about QYVERON</label>
        <input
          ref={inputRef}
          id="portfolioAssistantQuestion"
          value={question}
          onChange={(event) => setQuestion(event.target.value)}
          maxLength={240}
          placeholder="Ask about services, projects, or technology..."
          autoComplete="off"
        />
        <button type="submit" aria-label="Send question" disabled={!question.trim()}>
          <i className="bi bi-arrow-up" aria-hidden="true" />
        </button>
      </form>
      <p className="portfolio-assistant__disclosure">Local company-site search · No external AI service</p>
      <p className="visually-hidden" role="status" aria-live="polite">{announcement}</p>
    </section>
  );
}
