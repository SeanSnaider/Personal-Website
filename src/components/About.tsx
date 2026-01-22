import FloatingLines from './reactbits/FloatingLines';

export function About() {
  return (
    <section id="about" className="w-full min-h-screen bg-black relative py-20">
      {/* Floating Lines Background */}
      <div className="absolute inset-0 overflow-hidden">
        <FloatingLines
          linesGradient={['#7c3aed', '#a78bfa', '#c4b5fd']}
          enabledWaves={['top', 'bottom']}
          lineCount={[6, 4]}
          lineDistance={[10, 8]}
          bendRadius={4.0}
          bendStrength={-0.4}
          interactive={false}
          parallax={true}
        />
      </div>
      <div className="relative z-10 max-w-4xl mx-auto px-8">
        <h2 className="font-mono text-4xl font-bold text-white mb-12 text-center">
          About Me
        </h2>

        <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
          <p>
            I'm a Computer Science and Software Engineering student at Northeastern University,
            passionate about building software that solves real problems. Currently, I serve as
            a Teaching Assistant for Object Oriented Programming, where I help students grasp
            fundamental programming concepts and develop their coding skills.
          </p>

          <p>
            Beyond coding, I have a deep love for music, I'm a progressive guitarist always
            exploring new techniques and genres. I'm also an avid speedcuber and puzzle
            enthusiast, which has sharpened my problem-solving abilities and taught me to
            approach challenges from multiple angles.
          </p>

          <p>
            I thrive on learning new technologies and applying them to creative projects,
            whether it's building interactive tools, designing game AI, or implementing
            low-level systems. I'm always looking for opportunities to grow and collaborate
            on meaningful work.
          </p>
        </div>
      </div>
    </section>
  );
}
