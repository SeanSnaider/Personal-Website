export function Footer() {
  return (
    <footer className="w-full bg-black border-t border-gray-800 py-8">
      <div className="max-w-4xl mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Sean Snaider. All rights reserved.
          </p>

          <div className="flex gap-6">
            <a
              href="https://www.linkedin.com/in/seansnaider/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-purple-400 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/SeanSnaider"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-purple-400 transition-colors"
            >
              GitHub
            </a>
            <a
              href="mailto:sean@snaider.com"
              className="text-gray-400 hover:text-purple-400 transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
