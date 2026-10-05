import { notFound } from 'next/navigation';
import { get, img } from '../../../lib/api';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await get(`/blogs/slug/${slug}`);
  if (!post) return { title: 'Post not found' };
  return {
    title: post.title,
    description: post.excerpt || (post.content || '').slice(0, 155),
    openGraph: { title: post.title, type: 'article', images: post.coverImage ? [img(post.coverImage)] : [] },
  };
}

export default async function Post({ params }) {
  const { slug } = await params;
  const post = await get(`/blogs/slug/${slug}`);
  if (!post) notFound();
  return (
    <article className="mx-auto max-w-2xl px-6 py-16">
      <p className="text-sm text-ink/60">{new Date(post.createdAt).toLocaleDateString('en', { dateStyle: 'long' })}</p>
      <h1 className="font-display mt-2 text-4xl font-bold leading-tight">{post.title}</h1>
      {post.coverImage && <img src={img(post.coverImage)} alt="" className="mt-8 w-full rounded-lg" />}
      <div className="mt-8 whitespace-pre-wrap leading-relaxed">{post.content}</div>
    </article>
  );
}
