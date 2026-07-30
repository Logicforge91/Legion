import { Reveal } from './ui';

const technologies = ['Laravel', 'PHP', 'Spring Boot', 'Java', 'MySQL', 'Redis', 'Docker', 'REST APIs', 'React'];

export default function TechMarquee() {
  return <div className="site-container pb-8" aria-label="Core technologies">
    <Reveal className="flex flex-wrap justify-center gap-2.5">
      {technologies.map((item) => <span className="tech-chip" key={item}><span className="size-1.5 rounded-full bg-aqua-300 shadow-[0_0_10px_currentColor]" />{item}</span>)}
    </Reveal>
  </div>;
}
