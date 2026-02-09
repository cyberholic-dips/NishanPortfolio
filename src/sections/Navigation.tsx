import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavigationProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const navLinks = [
  { name: 'Home', href: '/#hero' },
  { name: 'About', href: '/#about' },
  { name: 'Skills', href: '/#skills' },
  { name: 'Projects', href: '/#projects' },
  { name: 'Experience', href: '/#experience' },
  { name: 'Contact', href: '/#contact' },
  { name: 'Blog', href: '/blog' },
];

export default function Navigation({ darkMode, toggleDarkMode }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Only track active section on home page
      if (location.pathname === '/') {
        const sections = navLinks
          .filter(link => link.href.startsWith('/#'))
          .map((link) => link.href.replace('/#', ''));

        for (const section of sections.reverse()) {
          const element = document.getElementById(section);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 100) {
              setActiveSection(section);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleNavigation = (href: string) => {
    setIsMobileMenuOpen(false);

    if (href.startsWith('/#')) {
      const targetId = href.replace('/#', '');
      if (location.pathname !== '/') {
        navigate('/');
        // Wait for navigation then scroll
        setTimeout(() => {
          const element = document.getElementById(targetId);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const element = document.getElementById(targetId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(href);
    }
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? 'bg-background/90 backdrop-blur-md shadow-sm border-b border-border'
          : 'bg-transparent'
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a
              href="/#hero"
              onClick={(e) => {
                e.preventDefault();
                handleNavigation('/#hero');
              }}
              className="flex items-center gap-2 group"
            >
              <img src="/logo.png" alt="Logo" className="w-10 h-10 object-contain transition-transform group-hover:scale-110" />
              <span className="font-serif text-lg font-semibold text-foreground hidden sm:block">
                Nishan Parajuli
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = link.href === '/blog'
                  ? location.pathname.startsWith('/blog')
                  : (location.pathname === '/' && activeSection === link.href.replace('/#', ''));

                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavigation(link.href);
                    }}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 relative ${isActive
                      ? 'text-primary'
                      : 'text-muted-foreground hover:text-foreground'
                      }`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                    )}
                  </a>
                );
              })}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                className="rounded-full hover:bg-muted"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <Sun className="w-5 h-5 text-orange-accent" />
                ) : (
                  <Moon className="w-5 h-5 text-blueprint" />
                )}
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden rounded-full"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-all duration-300 ${isMobileMenuOpen ? 'visible' : 'invisible'
          }`}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-background/95 backdrop-blur-lg transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'
            }`}
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Content */}
        <div
          className={`absolute top-16 left-0 right-0 bg-background border-b border-border transition-all duration-300 ${isMobileMenuOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-4'
            }`}
        >
          <div className="px-4 py-6 space-y-2">
            {navLinks.map((link, index) => {
              const isActive = link.href === '/blog'
                ? location.pathname.startsWith('/blog')
                : (location.pathname === '/' && activeSection === link.href.replace('/#', ''));

              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavigation(link.href);
                  }}
                  className={`block px-4 py-3 text-lg font-medium rounded-lg transition-all duration-300 ${isActive
                    ? 'bg-primary/10 text-primary'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                    }`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  {link.name}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
