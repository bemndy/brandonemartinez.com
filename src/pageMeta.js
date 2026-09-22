export const SITE_URL = 'https://brandonemartinez.com';

/**
 * Per-route <head> content, keyed by pathname.
 *
 * This is also the list of routes the app knows about — App derives its 404
 * check from these keys so a new route only has to be added in one place.
 */
export const PAGE_META = {
  '/': {
    title: 'BEM.',
    description:
      "Brandon E Martinez — CS student at Notre Dame, software lead on Domer Rover, and builder of things at the intersection of technical rigor and creative expression.",
  },
  '/about': {
    title: 'About | BEM.',
    description:
      "About Brandon E Martinez: CS at Notre Dame, Undergraduate Software Lead for Domer Rover, building clean systems that enable unique user experiences.",
  },
  '/misc': {
    title: 'Misc | BEM.',
    description: "Odds and ends from Brandon E Martinez. Coming soon.",
  },
  '/music': {
    title: 'Music | BEM.',
    description:
      "What Brandon E Martinez is listening to — live Spotify now-playing and recent top tracks.",
  },
};

export const NOT_FOUND_META = {
  title: '404 | BEM.',
  description: "That page doesn't exist on brandonemartinez.com.",
};

export const KNOWN_ROUTES = Object.keys(PAGE_META);

export function metaForPath(pathname) {
  return PAGE_META[pathname] ?? NOT_FOUND_META;
}
