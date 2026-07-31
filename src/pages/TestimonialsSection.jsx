import { Reveal, SectionHeading, Spotlight } from '../components/ui';

const principles = [
  {
    number: '01',
    icon: 'bi-bullseye',
    title: 'Own the outcome',
    text: 'I follow backend work beyond the happy-path implementation—through validation, rollout, observability, support, and the business result it needs to create.',
    signal: 'Delivery over activity',
  },
  {
    number: '02',
    icon: 'bi-shield-check',
    title: 'Design the failure path',
    text: 'Retries, idempotency, timeouts, permissions, logs, and recoverable states are part of the design rather than tasks left until production breaks.',
    signal: 'Reliability by design',
  },
  {
    number: '03',
    icon: 'bi-people',
    title: 'Keep teams aligned',
    text: 'I turn unclear requirements into explicit API contracts, communicate trade-offs early, and leave maintainable code that the next developer can understand.',
    signal: 'Clarity compounds',
  },
];

export default function TestimonialsSection() {
  return <section id="testimonials" className="testimonials-section work-style-section" aria-labelledby="workStyleTitle">
    <div className="site-container">
      <SectionHeading eyebrow="Working Style" id="workStyleTitle" title="The engineering habits behind reliable delivery.">
        Practical principles I use when building and supporting production systems.
      </SectionHeading>
      <div className="testimonial-rail work-style-grid">
        {principles.map((principle) => <Reveal key={principle.number}>
          <Spotlight className="testimonial-card work-style-card">
            <div className="work-style-top"><span>{principle.number}</span><i className={`bi ${principle.icon}`} aria-hidden="true" /></div>
            <div><h3>{principle.title}</h3><p>{principle.text}</p></div>
            <strong className="work-style-signal"><span />{principle.signal}</strong>
          </Spotlight>
        </Reveal>)}
      </div>
    </div>
  </section>;
}
