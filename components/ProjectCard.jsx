import { img } from '../lib/api';

export default function ProjectCard({ p }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-lg border border-line bg-white">
      {p.imageUrl && <img src={img(p.imageUrl)} alt="" className="aspect-video w-full object-cover" />}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl font-semibold">{p.title}</h3>
        <p className="mt-2 line-clamp-3 text-sm text-ink/75">{p.description}</p>
        {p.techStack?.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {p.techStack.map((t) => <li key={t} className="rounded bg-paper px-2 py-0.5 text-xs">{t}</li>)}
          </ul>
        )}
        <div className="mt-auto flex gap-4 pt-5 text-sm font-medium text-cobalt">
          {p.liveUrl && <a href={p.liveUrl} target="_blank" rel="noreferrer" className="hover:underline">Live site</a>}
          {p.githubUrl && <a href={p.githubUrl} target="_blank" rel="noreferrer" className="hover:underline">Source code</a>}
        </div>
      </div>
    </article>
  );
}
