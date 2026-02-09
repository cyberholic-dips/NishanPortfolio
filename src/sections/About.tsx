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
      className="py-16 lg:py-24 relative overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 section-animate">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
            About Me
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Engineering Excellence
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base">
            Combining technical expertise with creative problem-solving to deliver innovative mechanical solutions.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Image Column */}
          <div ref={imageRef} className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[350px] aspect-[3/4] rounded-2xl overflow-hidden shadow-xl ring-1 ring-border/50">
              <img
                src="/about-portrait.jpg"
                alt="Alex Chen at work"
                className="w-full h-full object-cover object-top scale-100 hover:scale-105 transition-transform duration-700"
              />
              {/* Technical overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>

            {/* Floating stats card */}
            <div className="absolute -bottom-6 right-8 bg-card border border-border rounded-xl p-4 shadow-lg hidden lg:block max-w-[200px]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="font-serif text-lg font-bold text-foreground">Bachelor</div>
                  <div className="text-xs text-muted-foreground leading-tight">Institute of Engineering</div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Column */}
          <div ref={contentRef} className="lg:col-span-7 space-y-6">
            {/* Professional Summary */}
            <div className="content-item">
              <h3 className="font-serif text-lg font-semibold text-foreground mb-2">
                Professional Summary
              </h3>
              <p className="text-muted-foreground leading-relaxed text-sm mb-2">
                To succeed in an environment of growth and excellence and earn a job which provides me job
                satisfaction and self-development and help me achieve personal as well as organizational goals.
              </p>
              <p className="text-muted-foreground leading-relaxed text-sm">
                I specialize in CAD modeling with CATIA, finite element analysis with ANSYS, and mechanical design.
                My goal is to create efficient, reliable mechanical solutions while continuously learning and
                growing in the field of mechanical engineering.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {/* Education */}
              <div className="content-item">
                <h3 className="font-serif text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-primary" />
                  Education
                </h3>
                <div className="space-y-3">
                  {education.map((edu, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-lg bg-muted/30 border border-border/50 hover:border-primary/30 transition-colors"
                    >
                      <div className="font-medium text-foreground text-sm">{edu.degree}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{edu.school}</div>
                      <div className="text-[10px] text-muted-foreground/70 mt-1 uppercase tracking-wide font-medium">{edu.year} • {edu.division}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-6">
                {/* Certifications */}
                <div className="content-item">
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                    <Award className="w-4 h-4 text-primary" />
                    Certifications
                  </h3>
                  <div className="flex flex-col gap-2">
                    {certifications.map((cert, index) => (
                      <div
                        key={index}
                        className="px-3 py-2 rounded-lg bg-primary/5 text-primary text-xs font-medium border border-primary/10"
                      >
                        {cert}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Interests */}
                <div className="content-item">
                  <h3 className="font-serif text-lg font-semibold text-foreground mb-3">
                    Key Interests
                  </h3>
                  <div className="space-y-2">
                    {interests.map((interest, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <interest.icon className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium text-foreground text-sm leading-none">{interest.label}</div>
                          <div className="text-[10px] text-muted-foreground mt-0.5">{interest.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
