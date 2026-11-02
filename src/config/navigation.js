export const navigationItems = [
  ['hero', 'Home'],
  ['about', 'The Engineer'],
  ['journey', 'Career archive'],
  ['skills', 'Toolkit'],
  ['integrations', 'Integrations'],
  ['projects', 'Systems'],
  ['achievements', 'Proof'],
  ['impact', 'Selected Impact'],
];

export const observedSectionIds = ['hero', ...navigationItems.map(([id]) => id).filter((id) => id !== 'hero'), 'contact'];
