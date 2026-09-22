import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { SITE_URL, metaForPath } from './pageMeta';

function setMetaTag(attr, key, content) {
  let tag = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

function setCanonical(href) {
  let link = document.head.querySelector('link[rel="canonical"]');
  if (!link) {
    link = document.createElement('link');
    link.setAttribute('rel', 'canonical');
    document.head.appendChild(link);
  }
  link.setAttribute('href', href);
}

/**
 * Keeps the document title, description, canonical URL and the og/twitter
 * tags in step with the current route.
 *
 * index.html ships one static set of these for the whole app, so every route
 * was previously served — and shared — the home page's description and URL.
 * Tags are updated in place rather than replaced so the ones already in the
 * HTML keep their position in the head.
 */
export function usePageMeta() {
  const location = useLocation();

  useEffect(() => {
    const { title, description } = metaForPath(location.pathname);
    const url = `${SITE_URL}${location.pathname}`;

    document.title = title;
    setMetaTag('name', 'description', description);
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', url);
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setCanonical(url);
  }, [location.pathname]);
}
