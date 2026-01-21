const skillCategories = [
  {
    title: "Languages",
    skills: ["Python", "Java", "C", "Assembly", "SQL", "JavaScript", "TypeScript", "Racket"],
  },
  {
    title: "Frameworks & Libraries",
    skills: ["React", "Tailwind", "Next.js", "Vite", "Pandas", "NumPy", "Matplotlib", "Pygame", "Java Swing"],
  },
  {
    title: "Tools & Platforms",
    skills: ["Git", "WSL", "VS Code", "IntelliJ IDEA", "GDB", "Unittest", "JUnit", "Neovim"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="w-full min-h-screen bg-black relative py-20">
      <div className="max-w-6xl mx-auto px-8">
        <h2 className="font-mono text-4xl font-bold text-white mb-16 text-center">
          Skills
        </h2>

        <div className="space-y-10">
          {skillCategories.map((category) => (
            <div key={category.title}>
              <h3 className="font-mono text-xl font-semibold text-purple-400 mb-4">
                {category.title}
              </h3>
              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-4 py-2 bg-gray-900 text-gray-300 rounded-lg border border-gray-800 hover:border-purple-500 hover:bg-gray-800 transition-all duration-200 text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
