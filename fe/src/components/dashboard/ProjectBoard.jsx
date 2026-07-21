import DashboardCard from "../common/DashboardCard";
import ProjectCard from "./ProjectCard";

export default function ProjectBoard({ projects = [], search = "", className = "" }) {
  const keyword = search.toLowerCase();

  const filteredProjects = projects.filter((project) => {
    if (!search) return true;

    return (
      project.title?.toLowerCase().includes(keyword) ||
      project.description?.toLowerCase().includes(keyword) ||
      project.tasks?.some(
        (task) =>
          task.title?.toLowerCase().includes(keyword) ||
          task.description?.toLowerCase().includes(keyword),
      )
    );
  });

  return (
    <DashboardCard
      title="Projects"
      subtitle="AI generated execution roadmap"
      className={className}
    >
      <div className="space-y-6">
        {filteredProjects.length ? (
          filteredProjects.map((project, index) => (
            <ProjectCard key={index} project={project} />
          ))
        ) : (
          <p className="text-center text-slate-500">No projects found.</p>
        )}
      </div>
    </DashboardCard>
  );
}
