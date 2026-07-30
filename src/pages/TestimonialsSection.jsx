import { Reveal, SectionHeading, Spotlight } from '../components/ui';

const testimonials = [
  ['Suman is reliable with backend delivery and careful about the details that keep systems stable.', 'Team Lead', 'Product engineering'],
  ['Strong with Laravel, database work, integrations, and turning requirements into working APIs.', 'Project Manager', 'Business applications'],
  ['Communicates clearly, debugs patiently, and owns production issues without drama.', 'Collaborator', 'Delivery team'],
];

export default function TestimonialsSection() {
  return <section id="testimonials" className="testimonials-section" aria-labelledby="testimonialsTitle"><div className="site-container"><SectionHeading compact eyebrow="Reputation" id="testimonialsTitle" title="What teams usually remember." /><div className="testimonial-rail">{testimonials.map(([quote, role, team]) => <Reveal key={role}><Spotlight className="testimonial-card"><p>&ldquo;{quote}&rdquo;</p><div><strong>{role}</strong><span>{team}</span></div></Spotlight></Reveal>)}</div></div></section>;
}
