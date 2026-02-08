import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Box,
  Cpu,
  Factory,
  Code,
  BarChart3,
  Settings,
  Layers,
  Gauge,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  level: number;
  icon: React.ElementType;
}

interface SkillCategory {
  title: string;
  description: string;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: 'CAD & 3D Modeling',
    description: 'Expert-level proficiency in industry-standard design software',
    skills: [
      { name: 'SolidWorks', level: 95, icon: Box },
      { name: 'AutoCAD', level: 90, icon: Layers },
      { name: 'Fusion 360', level: 88, icon: Settings },
      { name: 'CATIA', level: 75, icon: Box },
    ],
  },
  {
    title: 'Simulation & Analysis',
    description: 'Advanced computational analysis and modeling capabilities',
    skills: [
      { name: 'ANSYS', level: 92, icon: Cpu },
      { name: 'MATLAB', level: 85, icon: BarChart3 },
      { name: 'COMSOL', level: 78, icon: Gauge },
      { name: 'Abaqus', level: 70, icon: Cpu },
    ],
  },
  {
    title: 'Manufacturing',
    description: 'Hands-on experience with modern manufacturing processes',
    skills: [
      { name: 'CNC Machining', level: 88, icon: Factory },
      { name: '3D Printing', level: 92, icon: Layers },
      { name: 'Sheet Metal', level: 85, icon: Settings },
      { name: 'Welding', level: 80, icon: Factory },
    ],
  },
  {
    title: 'Programming',
    description: 'Software development for engineering applications',
    skills: [
      { name: 'Python', level: 90, icon: Code },
      { name: 'MATLAB Scripting', level: 88, icon: BarChart3 },
      { name: 'C/C++', level: 75, icon: Code },
      { name: 'JavaScript', level: 65, icon: Code },
    ],
  },
];

function SkillBar({ skill, delay }: { skill: Skill; delay: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (barRef.current) {
      observer.observe(barRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={barRef} className="group">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <skill.icon className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium text-foreground">{skill.name}</span>
        </div>
        <span className="text-sm text-muted-foreground">{skill.level}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-1000 ease-out relative overflow-hidden"
          style={{ width: isVisible ? `${skill.level}%` : '0%' }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.skills-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.skills-header',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        '.skill-card',
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.skills-grid',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="py-24 lg:py-32 relative overflow-hidden blueprint-grid"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-40 h-40 border border-primary/10 rounded-full" />
        <div className="absolute bottom-20 right-10 w-60 h-60 border border-primary/10 rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="skills-header text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Skills & Expertise
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Technical Proficiency
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A comprehensive toolkit of engineering software, manufacturing processes, and programming languages.
          </p>
        </div>

        {/* Category Tabs - Mobile */}
        <div className="lg:hidden mb-8">
          <div className="flex flex-wrap gap-2 justify-center">
            {skillCategories.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveCategory(index)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeCategory === index
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-muted-foreground hover:bg-muted/80'
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="skills-grid grid lg:grid-cols-2 gap-8">
          {/* Desktop: Show all categories */}
          {skillCategories.map((category, categoryIndex) => (
            <div
              key={categoryIndex}
              className={`skill-card bg-card border border-border rounded-xl p-6 lg:p-8 card-hover ${
                categoryIndex !== activeCategory ? 'hidden lg:block' : ''
              }`}
            >
              <div className="mb-6">
                <h3 className="font-serif text-xl font-semibold text-foreground mb-2">
                  {category.title}
                </h3>
                <p className="text-sm text-muted-foreground">{category.description}</p>
              </div>

              <div className="space-y-5">
                {category.skills.map((skill, skillIndex) => (
                  <SkillBar
                    key={skillIndex}
                    skill={skill}
                    delay={categoryIndex * 200 + skillIndex * 100}
                  />
                ))}
              </div>

              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-16 h-16 overflow-hidden rounded-tr-xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-primary/5 to-transparent transform rotate-45 translate-x-16 -translate-y-16" />
              </div>
            </div>
          ))}
        </div>

        {/* Summary Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { value: '10+', label: 'Software Tools' },
            { value: '500+', label: 'Designs Completed' },
            { value: '50+', label: 'Simulations Run' },
            { value: '100%', label: 'Project Success' },
          ].map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-xl bg-muted/50 border border-border"
            >
              <div className="font-serif text-3xl font-bold text-primary mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
