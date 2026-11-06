export const navigationItems = [
  ['hero', 'Home'],
  ['about', 'The Engineer'],
  ['education', 'Education'],
  ['journey', 'Career archive'],
  ['skills', 'Toolkit'],
  ['services', 'Services'],
  ['integrations', 'Integrations'],
  ['projects', 'Systems'],
  ['articles', 'Articles'],
  ['achievements', 'Proof'],
  ['impact', 'Selected Impact'],
];

export const observedSectionIds = ['hero', ...navigationItems.map(([id]) => id).filter((id) => id !== 'hero'), 'contact'];
