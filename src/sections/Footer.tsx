import { Heart } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#hero' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Contact', href: '#contact' },
];

const socialLinks = [

  { name: 'ResearchGate', href: 'https://www.researchgate.net/profile/Nishan-Parajuli-2' },
];

export default function Footer() {

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-background border-t border-border">
      {/* Blueprint grid background */}
      <div className="absolute inset-0 blueprint-grid opacity-50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Main Footer Content */}
        <div className="py-12 lg:py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <a href="#hero" className="flex items-center gap-2 mb-4">
                <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain" />
                <span className="font-serif text-xl font-semibold text-foreground">
                  Nishan Parajuli
                </span>
              </a>
              <p className="text-muted-foreground max-w-md mb-6">
                Mechanical Engineer specializing in CATIA design, ANSYS analysis, and mechanical solutions. Let's build something extraordinary together.
              </p>
              <div className="flex items-center gap-4">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <span className="text-xs font-medium">{link.name[0]}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-serif text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                Quick Links
              </h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href);
                      }}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-serif text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
                Contact
              </h4>
              <ul className="space-y-2 text-muted-foreground">
                <li>
                  <a
                    href="mailto:alex.chen@email.com"
                    className="hover:text-primary transition-colors"
                  >
                    n.parajuli584@gmail.com
                  </a>
                </li>
                <li>Urlabari,Morang</li>
                <li className="pt-2">
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-sm">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    Available for work
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground flex items-center gap-1">
            © {new Date().getFullYear()} Nishan Parajuli. Made with{' '}
            <Heart className="w-4 h-4 text-red-500 fill-red-500" /> using React & Tailwind
          </p>

          <div className="designer-credit">
            <p>
              Designed by{' '}
              <a href="https://www.bhandaridipesh.com.np/" target="_blank" rel="noopener noreferrer">
                Xurde
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
