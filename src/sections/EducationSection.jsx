import { education } from '../data/portfolio.js';
import { Reveal, SectionHeading } from '../components/shared/ui';
import '../styles/sections/EducationServicesSection.css';

export default function EducationSection() {
  return (
    <section id="education" className="education-section" aria-labelledby="educationTitle">
      <div className="site-container">
        <SectionHeading eyebrow="Education" id="educationTitle" title="A foundation in information science.">
          Formal education in computing, information systems, and the engineering principles behind dependable software.
        </SectionHeading>

        <ol className="education-list" aria-label="Education">
          {education.map((item) => (
            <Reveal as="li" className="education-card" key={`${item.institution}-${item.graduationYear}`}>
              <div className="education-card__year">
                <span>GRADUATED</span>
                <time dateTime={String(item.graduationYear)}>{item.graduationYear}</time>
              </div>
              <div className="education-card__details">
                <span className="education-card__index">ACADEMIC RECORD / 01</span>
                <h3>{item.degree}</h3>
                <p>{item.institution}<span aria-hidden="true"> · </span>{item.city}</p>
                <span className="education-card__university">{item.university}</span>
              </div>
              <span className="education-card__mark" aria-hidden="true">ED</span>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
