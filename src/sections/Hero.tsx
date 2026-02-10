import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowDown, Download, FolderOpen, Quote as QuoteIcon } from 'lucide-react';
import { getQuote, type DailyQuote } from '../blog/storage';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const blueprintRef = useRef<SVGSVGElement>(null);
  const [quote, setQuote] = useState<DailyQuote>(getQuote());

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Blueprint grid animation
      if (blueprintRef.current) {
        const lines = blueprintRef.current.querySelectorAll('line');
        gsap.fromTo(
          lines,
          { strokeDashoffset: 1000 },
          {
            strokeDashoffset: 0,
            duration: 2,
            stagger: 0.02,
            ease: 'power2.out',
          }
        );
      }

      // Text animations
      const textElements = textRef.current?.querySelectorAll('.animate-item');
      if (textElements) {
        gsap.fromTo(
          textElements,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            delay: 0.3,
          }
        );
      }

      // Image animation
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, scale: 0.95, clipPath: 'circle(0% at 50% 50%)' },
          {
            opacity: 1,
            scale: 1,
            clipPath: 'circle(100% at 50% 50%)',
            duration: 1.4,
            ease: 'power3.out',
          }
        );
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToProjects = () => {
    const element = document.querySelector('#projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden blueprint-grid"
    >
      {/* Blueprint SVG Background */}
      <svg
        ref={blueprintRef}
        className="absolute inset-0 w-full h-full pointer-events-none opacity-30 dark:opacity-20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <line x1="0" y1="0" x2="60" y2="0" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1000" className="text-primary" />
            <line x1="0" y1="0" x2="0" y2="60" stroke="currentColor" strokeWidth="0.5" strokeDasharray="1000" className="text-primary" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        {/* Technical drawing elements */}
        <line x1="5%" y1="20%" x2="15%" y2="20%" stroke="currentColor" strokeWidth="1" strokeDasharray="1000" className="text-primary" />
        <line x1="5%" y1="20%" x2="5%" y2="30%" stroke="currentColor" strokeWidth="1" strokeDasharray="1000" className="text-primary" />
        <circle cx="5%" cy="20%" r="3" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary" />

        <line x1="85%" y1="70%" x2="95%" y2="70%" stroke="currentColor" strokeWidth="1" strokeDasharray="1000" className="text-primary" />
        <line x1="95%" y1="60%" x2="95%" y2="70%" stroke="currentColor" strokeWidth="1" strokeDasharray="1000" className="text-primary" />
        <circle cx="95%" cy="70%" r="3" fill="none" stroke="currentColor" strokeWidth="1" className="text-primary" />
      </svg>

      {/* Floating accent shapes */}
      <div className="absolute top-20 right-10 w-32 h-32 border border-primary/20 rounded-lg rotate-12 hidden lg:block animate-float" />
      <div className="absolute bottom-32 left-10 w-24 h-24 border border-accent/20 rounded-lg -rotate-12 hidden lg:block animate-float animation-delay-200" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Text Content */}
          <div ref={textRef} className="order-2 lg:order-1 lg:col-span-7 text-center lg:text-left">
            <div className="animate-item inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Available for opportunities
            </div>

            <h1 className="animate-item font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
              Hi, I'm{' '}
              <span className="gradient-text">Nishan Parajuli</span>
            </h1>

            <h2 className="animate-item font-serif text-2xl sm:text-3xl text-muted-foreground mb-6">
              Mechanical Engineer
            </h2>

            <p className="animate-item text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
              Passionate about designing efficient mechanical systems with a focus on growth and excellence.
              Specialized in CATIA design, ANSYS analysis, and innovative mechanical solutions.
            </p>

            <div className="animate-item flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                onClick={scrollToProjects}
                className="group bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <FolderOpen className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
                View Projects
              </Button>
              <a href="/resume.pdf" download="Nishan_Parajuli_Resume.pdf">
                <Button
                  size="lg"
                  variant="outline"
                  className="group border-2 hover:bg-muted w-full sm:w-auto"
                >
                  <Download className="w-4 h-4 mr-2 transition-transform group-hover:translate-y-0.5" />
                  Download Resume
                </Button>
              </a>
            </div>

            {/* Quote of the Day Card */}
            <div className="animate-item mt-12 mb-4 p-6 bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl relative overflow-hidden group hover:border-primary/30 transition-all duration-500 max-w-xl mx-auto lg:mx-0">
              <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity">
                <QuoteIcon className="w-12 h-12" />
              </div>
              <p className="text-lg font-serif italic text-foreground/80 leading-relaxed mb-4">
                "{quote.text}"
              </p>
              <div className="flex items-center gap-2">
                <div className="w-6 h-[1px] bg-primary/50" />
                <span className="text-sm font-bold text-primary uppercase tracking-widest">{quote.author}</span>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="animate-item grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-border">
              <div className="text-center lg:text-left">
                <div className="font-serif text-2xl sm:text-3xl font-bold text-primary">2019</div>
                <div className="text-sm text-muted-foreground">Graduated</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="font-serif text-2xl sm:text-3xl font-bold text-primary">2</div>
                <div className="text-sm text-muted-foreground">Internships</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="font-serif text-2xl sm:text-3xl font-bold text-primary">CAD/FEA</div>
                <div className="text-sm text-muted-foreground">CATIA & ANSYS</div>
              </div>
            </div>
          </div>

          {/* Image */}
          {/* Image */}
          <div ref={imageRef} className="order-1 lg:order-2 lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[400px] aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-border/50">
              <img
                src="/hero-portrait.jpg"
                alt="Nishan Parajuli - Mechanical Engineer"
                className="w-full h-full object-cover object-center scale-100 hover:scale-105 transition-transform duration-700"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
            </div>

            {/* Decorative elements */}
            <div className="absolute top-[-20px] right-[20px] lg:right-0 w-full max-w-[400px] h-full border-2 border-primary/20 rounded-2xl -z-10 translate-x-4 -translate-y-4 hidden lg:block" />

            {/* Floating badge */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 lg:left-8 lg:translate-x-0 bg-card border border-border rounded-xl px-4 py-3 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span className="text-primary font-bold text-sm">BE</span>
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">Bachelor's Degree</div>
                  <div className="text-xs text-muted-foreground">Mechanical Engineering</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <ArrowDown className="w-4 h-4 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
