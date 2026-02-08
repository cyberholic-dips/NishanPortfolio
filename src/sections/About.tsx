import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Award, Wrench, Lightbulb } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const education = [
  {
    degree: 'Bachelor in Mechanical Engineering',
    school: 'Tribhuvan University, Institute of Engineering, Purwanchal Campus, Dharan-8',
    year: '2019',
    division: 'First Division',
  },
  {
    degree: '10+2 Science',
    school: 'Shikshadeep Boarding Higher Secondary School, Biratnagar',
    year: '2015',
    division: 'First Division',
  },
  {
    degree: 'School Leaving Certificate (SLC)',
    school: 'Saptakoshi English Boarding School, Urlabari',
    year: '2013',
    division: 'Distinction',
  },
];

const certifications = [
  'CATIA Design Software (15 days, IOE Purwanchal Campus)',
  'ANSYS Design Software (15 days, IOE Purwanchal Campus)',
];

const interests = [
  { icon: Wrench, label: 'CAD & 3D Modeling', desc: 'SolidWorks, AutoCAD, Fusion 360' },
  { icon: Lightbulb, label: 'Sustainable Design', desc: 'Green engineering solutions' },
  { icon: Award, label: 'Manufacturing', desc: 'CNC, 3D Printing, Prototyping' },
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal animation
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { opacity: 0, x: -60 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: imageRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Content stagger animation
      const contentItems = contentRef.current?.querySelectorAll('.content-item');
      if (contentItems) {
        gsap.fromTo(
          contentItems,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 75%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 lg:py-32 relative overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 section-animate">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            About Me
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Engineering Excellence
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Combining technical expertise with creative problem-solving to deliver innovative mechanical solutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Image Column */}
          <div ref={imageRef} className="relative">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/about-portrait.jpg"
                alt="Alex Chen at work"
                className="w-full h-full object-cover"
              />
              {/* Technical overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />

              {/* Corner decorations */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary/50" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary/50" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-primary/50" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-primary/50" />
            </div>

            {/* Floating stats card */}
            <div className="absolute -bottom-6 -right-6 bg-card border border-border rounded-xl p-5 shadow-lg hidden lg:block">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <div className="font-serif text-2xl font-bold text-foreground">Bachelor</div>
                  <div className="text-sm text-muted-foreground">Institute of Engineering, Purwanchal Campus</div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div ref={contentRef} className="space-y-8">
            {/* Professional Summary */}
            <div className="content-item">
              <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
                Professional Summary
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                To succeed in an environment of growth and excellence and earn a job which provides me job
                satisfaction and self-development and help me achieve personal as well as organizational goals.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                I specialize in CAD modeling with CATIA, finite element analysis with ANSYS, and mechanical design.
                My goal is to create efficient, reliable mechanical solutions while continuously learning and
                growing in the field of mechanical engineering.
              </p>
            </div>

            {/* Education */}
            <div className="content-item">
              <h3 className="font-serif text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <GraduationCap className="w-5 h-5 text-primary" />
                Education
              </h3>
              <div className="space-y-4">
                {education.map((edu, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-lg bg-muted/50 border border-border"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    <div>
                      <div className="font-medium text-foreground">{edu.degree}</div>
                      <div className="text-sm text-muted-foreground">{edu.school}</div>
                      <div className="text-xs text-muted-foreground/70">{edu.year} • {edu.division}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div className="content-item">
              <h3 className="font-serif text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                Certifications
              </h3>
              <div className="flex flex-wrap gap-2">
                {certifications.map((cert, index) => (
                  <span
                    key={index}
                    className="px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium"
                  >
                    {cert}
                  </span>
                ))}
              </div>
            </div>

            {/* Key Interests */}
            <div className="content-item">
              <h3 className="font-serif text-xl font-semibold text-foreground mb-4">
                Key Interests
              </h3>
              <div className="grid sm:grid-cols-3 gap-4">
                {interests.map((interest, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg bg-card border border-border text-center group hover:border-primary/50 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-primary/20 transition-colors">
                      <interest.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="font-medium text-foreground text-sm">{interest.label}</div>
                    <div className="text-xs text-muted-foreground mt-1">{interest.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
