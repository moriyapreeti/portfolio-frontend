import Link from 'next/link';
import { get } from '../../lib/api';

export const metadata = { title: 'Blog', description: 'Notes on what I am learning and building.' };

export default async function Blog() {
  const posts = await get('/blogs', []);
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-display mb-8 text-4xl font-bold">Blog</h1>
      {posts.length === 0 && <p className="text-ink/70">No posts yet. Check back soon.</p>}
      <ul className="divide-y divide-line">
        {posts.map((p) => (
          <li key={p.id} className="py-6">
            <p className="text-sm text-ink/60">{new Date(p.createdAt).toLocaleDateString('en', { dateStyle: 'medium' })}</p>
            <Link href={`/blog/${p.slug}`} className="font-display text-2xl font-semibold hover:text-cobalt">{p.title}</Link>
            {p.excerpt && <p className="mt-1 text-ink/75">{p.excerpt}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
