import { useEffect } from 'react';
import { SITE_NAME, SITE_URL } from '../site';

const SCRIPT_ID = 'app-json-ld';

export function JsonLdWebApp() {
  useEffect(() => {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: SITE_NAME,
      url: SITE_URL,
      applicationCategory: 'MultimediaApplication',
      operatingSystem: 'Web browser',
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
      description:
        'Convert MP4, MOV, WebM, MKV, and other videos to MP3 free in your browser. FFmpeg WebAssembly runs locally—no upload, no account, no watermark.',
      browserRequirements: 'Requires JavaScript and WebAssembly',
    };
    let el = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement('script');
      el.id = SCRIPT_ID;
      el.type = 'application/ld+json';
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(data);
    return () => {
      el?.remove();
    };
  }, []);
  return null;
}

export function JsonLdFaq({ faqs }: { faqs: { question: string; answer: string }[] }) {
  useEffect(() => {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map(f => ({
        '@type': 'Question',
        name: f.question,
        acceptedAnswer: { '@type': 'Answer', text: f.answer },
      })),
    };
    const id = 'faq-json-ld';
    let el = document.getElementById(id) as HTMLScriptElement | null;
    if (!el) {
      el = document.createElement('script');
      el.id = id;
      el.type = 'application/ld+json';
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(data);
    return () => el?.remove();
  }, [faqs]);
  return null;
}