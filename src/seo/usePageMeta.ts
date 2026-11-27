import { useEffect } from 'react';
import { SITE_URL } from '../site';

export function usePageMeta({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  useEffect(() => {
    const url = `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`;
    document.title = title;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute('content', description);
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = url;
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDesc = document.querySelector('meta[property="og:description"]');
    const ogUrl = document.querySelector('meta[property="og:url"]');
    ogTitle?.setAttribute('content', title);
    ogDesc?.setAttribute('content', description);
    ogUrl?.setAttribute('content', url);
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    const twitterDesc = document.querySelector('meta[name="twitter:description"]');
    twitterTitle?.setAttribute('content', title);
    twitterDesc?.setAttribute('content', description);
  }, [title, description, path]);
}