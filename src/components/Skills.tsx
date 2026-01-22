import FloatingLines from './reactbits/FloatingLines';

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
      {/* Floating Lines Background */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingLines
          linesGradient={['#7c3aed', '#a78bfa', '#c4b5fd']}
          enabledWaves={['middle', 'bottom']}
          lineCount={[5, 6]}
          lineDistance={[9, 7]}
          bendRadius={3.5}
          bendStrength={-0.3}
          interactive={false}
          parallax={true}
        />
      </div>
      <div className="relative z-10 max-w-6xl mx-auto px-8">
        <h2 className="font-mono text-4xl font-bold text-white mb-16 text-center">
          Skills
        </h2>

        <div className="space-y-10">
          {skillCategories.map((category) => (
            <div key={category.title} className="bg-black/50 backdrop-blur-sm p-6 rounded-xl">
              <h3 className="font-mono text-xl font-semibold text-white mb-4">
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
