import { get, SITE } from '../lib/api';

export default async function sitemap() {
  const posts = await get('/blogs', []);
  const pages = ['', '/projects', '/blog', '/contact'].map((p) => ({ url: SITE + p }));
  return pages.concat(posts.map((b) => ({ url: `${SITE}/blog/${b.slug}`, lastModified: b.createdAt })));
}
