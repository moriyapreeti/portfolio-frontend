import Link from 'next/link';
import { get, img } from '../lib/api';
import ProjectCard from '../components/ProjectCard';

const fmt = (d) => (d ? new Date(d).toLocaleDateString('en', { month: 'short', year: 'numeric' }) : '');

function Section({ id, title, children }) {
  return (
    <section id={id} className="mx-auto max-w-5xl scroll-mt-16 px-6 py-16">
      <h2 className="font-display mb-8 text-3xl font-bold">{title}</h2>
      {children}
    </section>
  );
}

export default async function Home() {
  const [about, skills, projects, experience, services, testimonials] = await Promise.all([
    get('/about', {}), get('/skills', []), get('/projects', []), get('/experience', []), get('/services', []), get('/testimonials', []),
  ]);
  const featured = projects.filter((p) => p.featured);
  const shown = (featured.length ? featured : projects).slice(0, 3);
  const groups = Object.entries(skills.reduce((m, s) => { (m[s.category || 'Other'] ||= []).push(s); return m; }, {}));
  const jobs = [...experience].sort((a, b) => (b.startDate || '').localeCompare(a.startDate || ''));

  return (
    <>
      <section className="grid-bg border-b border-line">
        <div className="mx-auto max-w-5xl px-6 py-24 md:py-32">
          <p className="font-medium text-cobalt">{about.title || 'Portfolio'}</p>
          <h1 className="font-display mt-3 max-w-3xl text-5xl font-bold leading-[1.05] md:text-7xl">
            {about.fullName ? `Hi, I'm ${about.fullName}.` : 'Welcome to my portfolio.'}
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink/75">{(about.bio || 'Add your details in the admin panel to fill this page.').split('\n')[0]}</p>
          <div className="mt-8 flex gap-3">
            <Link href="/projects" className="rounded-md bg-ink px-5 py-2.5 font-medium text-white hover:bg-cobalt">View projects</Link>
            <Link href="/contact" className="rounded-md border border-ink px-5 py-2.5 font-medium hover:bg-white">Get in touch</Link>
          </div>
        </div>
      </section>

      {about.bio && (
        <Section id="about" title="About">
          <div className="flex flex-col gap-8 md:flex-row">
            {about.avatarUrl && <img src={img(about.avatarUrl)} alt={about.fullName || ''} className="size-48 shrink-0 rounded-lg object-cover" />}
            <div>
              <p className="max-w-prose whitespace-pre-line leading-relaxed">{about.bio}</p>
              {about.location && <p className="mt-4 text-sm text-ink/70">Based in {about.location}</p>}
              {about.resumeUrl && <a href={about.resumeUrl} className="mt-3 inline-block font-medium text-cobalt hover:underline">Download resume</a>}
            </div>
          </div>
        </Section>
      )}

      {groups.length > 0 && (
        <Section id="skills" title="Skills">
          <div className="grid gap-10 md:grid-cols-2">
            {groups.map(([cat, list]) => (
              <div key={cat}>
                <h3 className="mb-3 font-semibold">{cat}</h3>
                <ul className="space-y-3">
                  {list.map((s) => (
                    <li key={s.id}>
                      <div className="mb-1 flex justify-between text-sm"><span>{s.name}</span><span className="text-ink/60">{s.level}%</span></div>
                      <div className="h-1.5 rounded bg-line"><div className="h-full rounded bg-cobalt" style={{ width: `${s.level}%` }} /></div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>
      )}

      {jobs.length > 0 && (
        <Section id="experience" title="Experience">
          <ol className="ml-2 space-y-8 border-l-2 border-line pl-6">
            {jobs.map((j) => (
              <li key={j.id} className="relative">
                <span className="absolute -left-[31px] top-1.5 size-2.5 rounded-full bg-cobalt" />
                <p className="text-sm text-ink/60">{fmt(j.startDate)} – {j.current ? 'Present' : fmt(j.endDate)}</p>
                <h3 className="font-semibold">{j.role} · {j.company}</h3>
                {j.description && <p className="mt-1 max-w-prose whitespace-pre-line text-ink/75">{j.description}</p>}
              </li>
            ))}
          </ol>
        </Section>
      )}

      {shown.length > 0 && (
        <Section id="projects" title="Selected projects">
          <div className="grid gap-6 md:grid-cols-3">{shown.map((p) => <ProjectCard key={p.id} p={p} />)}</div>
          <Link href="/projects" className="mt-6 inline-block font-medium text-cobalt hover:underline">See all projects</Link>
        </Section>
      )}

      {services.length > 0 && (
        <Section id="services" title="What I can build for you">
          <div className="grid gap-8 md:grid-cols-3">
            {services.map((s) => (
              <div key={s.id} className="border-t-2 border-ink pt-3">
                <h3 className="font-semibold">{s.icon} {s.name}</h3>
                <p className="mt-1 text-sm text-ink/75">{s.description}</p>
              </div>
            ))}
          </div>
        </Section>
      )}

      {testimonials.length > 0 && (
        <Section id="testimonials" title="Kind words">
          <div className="grid gap-8 md:grid-cols-2">
            {testimonials.map((t) => (
              <blockquote key={t.id} className="border-l-2 border-cobalt pl-4">
                <p>{t.message}</p>
                <footer className="mt-2 text-sm text-ink/60">{t.name}{t.role || t.company ? `, ${[t.role, t.company].filter(Boolean).join(' at ')}` : ''}</footer>
              </blockquote>
            ))}
          </div>
        </Section>
      )}
    </>
  );
}
