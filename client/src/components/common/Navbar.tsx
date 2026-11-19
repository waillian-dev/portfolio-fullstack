import React, { useState, useEffect } from 'react';
import { Menu, X, Download, ShieldCheck } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { Button } from '../ui/Button';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Experience', href: '#experience' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'Blog', href: '#blog' },
  { label: 'Contact', href: '#contact' },
];

export const Navbar: React.FC<{ resumeUrl?: string }> = ({ resumeUrl }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      if (!isHomePage) return;

      const sections = navItems.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHomePage]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'glass-nav py-3 shadow-md' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-primary to-purple-500 bg-clip-text text-transparent">
            Waillian.Chit
          </span>
          <span className="text-primary font-mono text-xs px-2 py-0.5 rounded bg-primary/10">
            DEV
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {isHomePage
            ? navItems.map((item) => {
                const sectionId = item.href.substring(1);
                const isActive = activeSection === sectionId;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className={`text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-primary font-semibold'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {item.label}
                  </a>
                );
              })
            : (
              <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground">
                ← Back to Portfolio
              </Link>
            )}
        </nav>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />
          {resumeUrl && (
            <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
              <Button size="sm" variant="outline" className="gap-2">
                <Download className="w-4 h-4" />
                Resume
              </Button>
            </a>
          )}
          <Link to="/admin">
            <Button size="sm" variant="ghost" title="Admin Dashboard">
              <ShieldCheck className="w-4 h-4" />
            </Button>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex lg:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-foreground rounded-lg hover:bg-muted"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="lg:hidden glass-card border-b border-border p-6 mt-2 space-y-4">
          <div className="flex flex-col space-y-3">
            {isHomePage ? (
              navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-base font-medium text-foreground hover:text-primary transition-colors"
                >
                  {item.label}
                </a>
              ))
            ) : (
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="text-base font-medium text-primary"
              >
                ← Back to Portfolio
              </Link>
            )}
          </div>
          <div className="pt-4 border-t border-border flex items-center justify-between">
            {resumeUrl && (
              <a href={resumeUrl} target="_blank" rel="noopener noreferrer" className="w-full">
                <Button size="sm" variant="outline" className="w-full justify-center gap-2">
                  <Download className="w-4 h-4" /> Resume
                </Button>
              </a>
            )}
            <Link to="/admin" className="ml-2">
              <Button size="sm" variant="ghost">
                Admin
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
