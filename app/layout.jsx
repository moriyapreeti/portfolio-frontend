import './globals.css';
import Link from 'next/link';
import { get, SITE } from '../lib/api';

const nav = [['/#about', 'About'], ['/#skills', 'Skills'], ['/#experience', 'Experience'], ['/projects', 'Projects'], ['/blog', 'Blog'], ['/contact', 'Contact']];

export async function generateMetadata() {
  const a = await get('/about', {});
  const name = a.fullName || 'Portfolio';
  const description = (a.bio || '').slice(0, 155);
  return {
    metadataBase: new URL(SITE),
    title: { default: a.title ? `${name} | ${a.title}` : name, template: `%s | ${name}` },
    description,
    openGraph: { title: name, description, type: 'website' },
  };
}

export default async function RootLayout({ children }) {
  const a = await get('/about', {});
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@600;700&family=DM+Sans:wght@400;500;700&display=swap" />
      </head>
      <body>
        <header className="sticky top-0 z-10 border-b border-line bg-paper/90 backdrop-blur">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-6 px-6 py-3">
            <Link href="/" className="font-display shrink-0 text-lg font-bold">{a.fullName || 'Portfolio'}</Link>
            <nav className="flex gap-5 overflow-x-auto text-sm">
              {nav.map(([href, label]) => <Link key={href} href={href} className="whitespace-nowrap hover:text-cobalt">{label}</Link>)}
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="border-t border-line">
          <div className="mx-auto flex max-w-5xl flex-wrap gap-x-6 gap-y-2 px-6 py-8 text-sm text-ink/70">
            <span>© {new Date().getFullYear()} {a.fullName}</span>
            {a.email && <a href={`mailto:${a.email}`} className="hover:text-cobalt">{a.email}</a>}
            {a.github && <a href={a.github} className="hover:text-cobalt">GitHub</a>}
            {a.linkedin && <a href={a.linkedin} className="hover:text-cobalt">LinkedIn</a>}
          </div>
        </footer>
      </body>
    </html>
  );
}
