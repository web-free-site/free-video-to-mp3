import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { usePageMeta } from '../seo/usePageMeta';

type Props = {
  title: string;
  description: string;
  path: string;
  children: ReactNode;
};

export default function ContentPage({ title, description, path, children }: Props) {
  usePageMeta({ title, description, path });
  return (
    <article className="max-w-3xl mx-auto text-left px-4 prose prose-invert prose-slate">
      <h1>{title}</h1>
      {children}
      <p className="not-prose mt-8">
        <Link to="/" className="text-cyan-300 hover:text-cyan-200 underline">
          ← Back to converter
        </Link>
      </p>
    </article>
  );
}