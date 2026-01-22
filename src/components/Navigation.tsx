import GooeyNav from './reactbits/GooeyNav';

const items: { label: string; href: string }[] = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
  { label: "Resume", href: "/resume for website.pdf" }
];

export function Navigation() {
  return (
    <nav className="fixed top-5 left-1/2 transform -translate-x-1/2 z-50">
      <GooeyNav
        items={items}
        particleCount={0}
        timeVariance={400}
        particleR={0}
      />
    </nav>
  );
}
