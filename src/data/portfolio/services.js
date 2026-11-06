import { skills } from './skills.js';

const serviceMap = [
  { skillIndex: 0, title: 'Backend development' },
  { skillIndex: 4, title: 'API development' },
  { skillIndex: 1, title: 'Database design' },
];

export const services = serviceMap.map(({ skillIndex, title }) => {
  const capability = skills[skillIndex];
  return {
    title,
    description: capability.description,
    capability: capability.title,
    icon: capability.icon,
  };
});
