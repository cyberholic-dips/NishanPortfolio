import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Wrench, CheckCircle } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

gsap.registerPlugin(ScrollTrigger);

interface Project {
  id: number;
  title: string;
  category: string;
  description: string;
  problem: string;
  solution: string;
  outcome: string;
  tools: string[];
  image: string;
  featured: boolean;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Automated Conveyor System',
    category: 'Manufacturing',
    description: 'Designed and implemented a fully automated conveyor system for a major automotive manufacturer, increasing production efficiency by 40%.',
    problem: 'Manual material handling was causing bottlenecks and safety concerns in the production line.',
    solution: 'Developed a modular conveyor system with integrated sensors, variable speed controls, and automated sorting mechanisms.',
    outcome: 'Reduced material handling time by 40%, eliminated 3 safety hazards, and achieved ROI within 18 months.',
    tools: ['SolidWorks', 'ANSYS', 'PLC Programming', 'AutoCAD'],
    image: '/project-conveyor.jpg',
    featured: true,
  },
  {
    id: 2,
    title: 'HVAC Optimization',
    category: 'Building Systems',
    description: 'Led the redesign of HVAC systems for a 500,000 sq ft commercial building, achieving 35% energy reduction.',
    problem: 'Outdated HVAC system was consuming excessive energy and providing inconsistent climate control.',
    solution: 'Conducted CFD analysis, redesigned ductwork layout, and implemented smart zone controls with variable frequency drives.',
    outcome: '35% reduction in energy consumption, $200K annual savings, and improved occupant comfort ratings.',
    tools: ['COMSOL', 'AutoCAD MEP', 'EnergyPlus', 'MATLAB'],
    image: '/project-hvac.jpg',
    featured: true,
  },
  {
    id: 3,
    title: 'Rapid Prototyping Framework',
    category: 'Product Development',
    description: 'Established an in-house rapid prototyping capability, reducing product development cycle from months to weeks.',
    problem: 'External prototyping vendors caused delays and limited design iteration capabilities.',
    solution: 'Set up FDM and SLA 3D printing lab, developed design guidelines, and trained engineering team.',
    outcome: 'Reduced prototyping time by 80%, enabled 5x more design iterations, and saved $150K annually.',
    tools: ['Fusion 360', 'Cura', 'Formlabs', 'Dimension'],
    image: '/project-prototype.jpg',
    featured: false,
  },
];

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.projects-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.projects-header',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      gsap.fromTo(
        '.project-card',
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.projects-grid',
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
      id="projects"
      ref={sectionRef}
      className="py-24 lg:py-32 relative overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="projects-header text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Portfolio
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Featured Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A selection of engineering projects showcasing design, analysis, and implementation expertise.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <div
              key={project.id}
              className="project-card group bg-card border border-border rounded-xl overflow-hidden card-hover cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />

                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-medium">
                    {project.category}
                  </span>
                </div>

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-primary-foreground font-medium flex items-center gap-2">
                    View Details <ExternalLink className="w-4 h-4" />
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-serif text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {project.description}
                </p>

                {/* Tools */}
                <div className="flex flex-wrap gap-1.5">
                  {project.tools.slice(0, 3).map((tool, index) => (
                    <span
                      key={index}
                      className="px-2 py-0.5 rounded bg-muted text-muted-foreground text-xs"
                    >
                      {tool}
                    </span>
                  ))}
                  {project.tools.length > 3 && (
                    <span className="px-2 py-0.5 rounded bg-muted text-muted-foreground text-xs">
                      +{project.tools.length - 3}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Project Detail Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedProject && (
            <>
              <DialogHeader>
                <DialogTitle className="font-serif text-2xl">
                  {selectedProject.title}
                </DialogTitle>
                <DialogDescription className="text-muted-foreground">
                  {selectedProject.category}
                </DialogDescription>
              </DialogHeader>

              <div className="mt-4">
                {/* Image */}
                <div className="aspect-video rounded-lg overflow-hidden mb-6">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Problem/Solution/Outcome */}
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Wrench className="w-4 h-4 text-primary" />
                      Problem
                    </h4>
                    <p className="text-muted-foreground">{selectedProject.problem}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      Solution
                    </h4>
                    <p className="text-muted-foreground">{selectedProject.solution}</p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-accent" />
                      Outcome
                    </h4>
                    <p className="text-muted-foreground">{selectedProject.outcome}</p>
                  </div>

                  {/* Tools */}
                  <div>
                    <h4 className="font-semibold text-foreground mb-3">Tools Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedProject.tools.map((tool, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
