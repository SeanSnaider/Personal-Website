const skillCategories = [
  {
    title: "Languages",
    skills: [
      { name: "Python", icon: "🐍" },
      { name: "Java", icon: "☕" },
      { name: "C", icon: "⚙️" },
      { name: "Assembly", icon: "🔧" },
      { name: "SQL", icon: "🗃️" },
      { name: "JavaScript", icon: "🟨" },
      { name: "TypeScript", icon: "🔷" },
      { name: "Racket", icon: "🎾" },
    ],
  },
  {
    title: "Frameworks & Libraries",
    skills: [
      { name: "React", icon: "⚛️" },
      { name: "Tailwind", icon: "🎨" },
      { name: "Next.js", icon: "▲" },
      { name: "Vite", icon: "⚡" },
      { name: "Pandas", icon: "🐼" },
      { name: "NumPy", icon: "🔢" },
      { name: "Matplotlib", icon: "📊" },
      { name: "Pygame", icon: "🎮" },
      { name: "Java Swing", icon: "🪟" },
    ],
  },
  {
    title: "Tools & Platforms",
    skills: [
      { name: "Git", icon: "📦" },
      { name: "WSL", icon: "🐧" },
      { name: "VS Code", icon: "💻" },
      { name: "IntelliJ IDEA", icon: "🧠" },
      { name: "GDB", icon: "🔍" },
      { name: "Unittest", icon: "🧪" },
      { name: "JUnit", icon: "✅" },
      { name: "Neovim", icon: "📝" },
    ],
  },
];

export function Skills() {
  return (
    <section id="skills" className="w-full min-h-screen bg-black relative py-20">
      <div className="max-w-6xl mx-auto px-8">
        <h2 className="font-mono text-4xl font-bold text-white mb-16 text-center">
          Skills
        </h2>

        <div className="space-y-12">
          {skillCategories.map((category) => (
            <div key={category.title}>
              <h3 className="font-mono text-xl font-semibold text-purple-400 mb-6">
                {category.title}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {category.skills.map((skill) => (
                  <div
                    key={skill.name}
                    className="flex flex-col items-center justify-center p-4 bg-gray-900 rounded-lg border border-gray-800 hover:border-purple-500 hover:bg-gray-800 transition-all duration-200"
                  >
                    <span className="text-3xl mb-2">{skill.icon}</span>
                    <span className="text-gray-300 text-sm text-center font-medium">
                      {skill.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
