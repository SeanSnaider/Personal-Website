const projects = [
  {
    title: "Rubik's Cube Solver and Teaching Tool",
    description:
      "An interactive 3D Rubik's Cube simulator with manual scrambling, real-time visualization of 18 face rotations, and the Kociemba two-phase algorithm generating near-optimal solutions (≤20 moves) in under 1 second. Includes a step-by-step tutorial mode for learning.",
    techStack: ["Python", "Pygame"],
    date: "Oct 2025 - Jan 2026",
    image: "/project-cube.png",
  },
  {
    title: "Guitar Learning Tool",
    description:
      "An interactive fretboard visualization app allowing users to explore scales, view tablature, and track learning progress. Features a FastAPI backend with SQLAlchemy and Pydantic validation for CRUD operations and SQLite persistence.",
    techStack: ["React", "TypeScript", "Tailwind", "Python", "FastAPI", "SQLite"],
    date: "Dec 2025 - Present",
    image: "/project-guitar.png",
  },
  {
    title: "Sanguine",
    description:
      "A strategy game with Java Swing UI using a pub-sub pattern for synchronized multiplayer views. Features pluggable AI strategies selectable at runtime with interchangeable difficulty levels. Achieved 90%+ code coverage with JUnit testing.",
    techStack: ["Java", "JUnit", "Java Swing"],
    date: "Nov 2025 - Dec 2025",
    image: "/project-sanguine.png",
  },
  {
    title: "File System",
    description:
      "A FUSE-based filesystem driver mounting a 1MB disk image as a Unix-style filesystem, supporting 128 files/directories with persistence. Implements block-based storage with inodes, free-space bitmaps, and POSIX syscalls (read, write, mkdir, unlink, truncate).",
    techStack: ["C", "FUSE"],
    date: "Nov 2025 - Dec 2025",
    image: "/project-filesystem.png",
  },
];

export function Projects() {
  return (
    <section id="projects" className="w-full min-h-screen bg-black relative py-20">
      <div className="max-w-6xl mx-auto px-8">
        <h2 className="font-mono text-4xl font-bold text-white mb-16 text-center">
          Projects
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <div
              key={project.title}
              className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden hover:border-purple-500 transition-all duration-300 group"
            >
              {/* Project Image Placeholder */}
              <div className="h-48 bg-gradient-to-br from-purple-900/50 to-gray-900 flex items-center justify-center">
                <span className="text-gray-500 text-sm font-mono">
                  {project.image ? "Screenshot coming soon" : "No image"}
                </span>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-mono text-xl font-semibold text-white group-hover:text-purple-400 transition-colors">
                    {project.title}
                  </h3>
                </div>

                <p className="text-gray-400 text-sm mb-2 font-mono">
                  {project.date}
                </p>

                <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-purple-900/30 text-purple-300 text-xs font-medium rounded-full border border-purple-800/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
