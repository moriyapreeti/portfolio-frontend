import { get } from '../../lib/api';
import ProjectCard from '../../components/ProjectCard';

export const metadata = { title: 'Projects', description: 'Things I have built.' };

export default async function Projects() {
  const projects = await get('/projects', []);
  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="font-display mb-8 text-4xl font-bold">Projects</h1>
      {projects.length === 0 && <p className="text-ink/70">No projects yet. Check back soon.</p>}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">{projects.map((p) => <ProjectCard key={p.id} p={p} />)}</div>
    </div>
  );
}
