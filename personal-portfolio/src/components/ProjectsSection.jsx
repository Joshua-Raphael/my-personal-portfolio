
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import clinicMgt from "../images/projects/clinicMgt.png";
import partnership from "../images/projects/partnership.png";
import quizApp from "../images/projects/quiz.png";

const projects = [
  {
    id: 1,
    title: "Clinic Management System",
    description: "A desktop-based clinic management system built using Java and Java Swing, using Notepad (.txt) files for data storage.",
    image: clinicMgt,
    tags: ["Java", "Java Swing", "FIle Storage"],
    demoUrl: "https://drive.google.com/file/d/1kBkEu6DfdOMek8P7nu_68tRddW_lBvI0/view?usp=drive_link",
    githubUrl: "",
  },
  {
    id: 2,
    title: "OSA Partnership System",
    description:
      "A web-based system for managing partnerships, allowing multiple admins to handle entries based on their assigned roles.",
    image: partnership,
    tags: ["React", "TailwindCSS", "DRF"],
    demoUrl: "",
    githubUrl: "https://github.com/Joshua-Raphael/hcdc-partnership",
  },
  {
    id: 3,
    title: "Quiz App",
    description:
      "A quiz app that uses an API to generate questions and tracks scores through a Firebase-powered leaderboard.",
    image: quizApp,
    tags: ["React Native", "Firebase", "Trivia API"],
    demoUrl: "",
    githubUrl: "https://github.com/Joshua-Raphael/quizApp",
  },
];

export const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          {" "}
          Featured <span className="text-primary"> Projects </span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here are some of my recent projects. Each project was carefully
          crafted with attention to detail, performance, and user experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="relative group bg-card rounded-lg overflow-hidden shadow-xs card-hover"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-1">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>

                <div className="flex justify-between items-center">
                  <div className="flex space-x-3">
                    {/* Optional action icons can go here */}
                  </div>
                </div>
              </div>

              {(project.githubUrl || project.demoUrl) ? (
                <div className="absolute left-4 bottom-4 z-30 flex items-center gap-2">
                  {project.githubUrl ? (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} GitHub`}
                      className="bg-primary text-white p-2 rounded-full shadow-md hover:scale-105 transform transition-transform"
                    >
                      <Github size={18} />
                    </a>
                  ) : null}

                  {project.demoUrl ? (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} Demo`}
                      className="bg-primary text-white p-2 rounded-full shadow-md hover:scale-105 transform transition-transform"
                    >
                      <ExternalLink size={18} />
                    </a>
                  ) : null}
                </div>
              ) : null}
            </div>
          ))}

        </div>

        <div className="text-center mt-12">
          <a
            className="cosmic-button w-fit flex items-center mx-auto gap-2"
            target="_blank"
            href="https://github.com/Joshua-Raphael"
          >
            Check My Github <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
};
