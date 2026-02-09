import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Briefcase, GraduationCap, FlaskConical, Calendar, MapPin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  id: number;
  type: 'work' | 'education' | 'research';
  title: string;
  organization: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  color: string;
}

const experiences: ExperienceItem[] = [
  {
    id: 1,
    type: 'work',
    title: 'Mechanical Engineer',
    organization: 'Urlabari Khanepani Upabhokta Sanstha',
    location: 'Urlabari, Nepal',
    period: '2023 – Present',
    description: 'Working as a Mechanical Engineer involved in pipe installation projects and providing technical advisory support.',
    achievements: [
      'Supervised and executed pipe installation for water supply systems',
      'Provided mechanical and technical advisory for infrastructure projects',
      'Ensured proper installation standards and system efficiency',
      'Collaborated with management and field teams on project planning and execution',
    ],
    color: 'bg-emerald-500',
  },
  {
    id: 2,
    type: 'work',
    title: 'Instructor (Mechanical Engineering)',
    organization: 'Madan Bhandari Memorial Academy Nepal',
    location: 'Manglabare,Urlabari',
    period: '2021 – 2023',
    description: 'Worked as an instructor teaching mechanical engineering subjects and providing practical and theoretical training to students.',
    achievements: [
      'Taught core mechanical engineering subjects',
      'Delivered practical demonstrations and lab-based learning',
      'Guided students on projects and technical assignments',
      'Assessed student performance and provided academic mentoring',
    ],
    color: 'bg-blue-500',
  },
  {
    id: 3,
    type: 'work',
    title: 'Industrial Internship',
    organization: 'AirTech Industries Pvt Ltd',
    location: 'R.K City Center, Biratnagar',
    period: '2019',
    description: 'Gained hands-on experience in industrial mechanical systems and manufacturing processes.',
    achievements: [
      'Worked with industrial HVAC and mechanical systems',
      'Learned manufacturing processes and quality control',
      'Collaborated with engineering team on industrial projects',
    ],
    color: 'bg-indigo-500',
  },
  {
    id: 4,
    type: 'work',
    title: 'Automotive Internship',
    organization: 'Royal Auto World Pvt Ltd',
    location: 'Biratnagar',
    period: '2018',
    description: 'Automotive industry internship focused on vehicle systems and maintenance.',
    achievements: [
      'Studied automotive mechanical systems and components',
      'Assisted in vehicle diagnostics and maintenance',
      'Gained practical knowledge of automotive engineering',
    ],
    color: 'bg-violet-500',
  },
  {
    id: 5,
    type: 'research',
    title: 'Research Profile',
    organization: 'ResearchGate',
    location: 'Online',
    period: 'Ongoing',
    description: 'Active research profile showcasing academic work and publications.',
    achievements: [
      'Published research in mechanical engineering',
      'Collaborative research projects',
      'Profile: researchgate.net/profile/Nishan-Parajuli-2',
    ],
    color: 'bg-cyan-500',
  },
  {
    id: 6,
    type: 'education',
    title: 'CATIA & ANSYS Training',
    organization: 'Institute of Engineering, Purwanchal Campus',
    location: 'Dharan',
    period: '15 days',
    description: 'Intensive training in industry-standard CAD and FEA software.',
    achievements: [
      'CATIA design software for 3D modeling',
      'ANSYS for finite element analysis',
      'Hands-on project-based learning',
    ],
    color: 'bg-amber-500',
  },
  {
    id: 7,
    type: 'education',
    title: 'Bachelor in Mechanical Engineering',
    organization: 'Tribhuvan University, IOE Purwanchal Campus',
    location: 'Dharan-8',
    period: '2015 - 2019',
    description: 'First Division. Comprehensive mechanical engineering education with focus on design and analysis.',
    achievements: [
      'First Division honors',
      'Completed industrial and automotive internships',
      'Trained in CATIA and ANSYS software',
    ],
    color: 'bg-orange-500',
  },
  {
    id: 8,
    type: 'education',
    title: '10+2 Science',
    organization: 'Shikshadeep Boarding Higher Secondary School',
    location: 'Biratnagar',
    period: '2013 - 2015',
    description: 'First Division. Strong foundation in science and mathematics.',
    achievements: [
      'First Division honors',
      'Focus on Physics, Chemistry, and Mathematics',
      'Prepared for engineering entrance examinations',
    ],
    color: 'bg-rose-500',
  },
];

const typeIcons = {
  work: Briefcase,
  education: GraduationCap,
  research: FlaskConical,
};

const workExperiences = experiences.filter((exp) => exp.type === 'work' || exp.type === 'research');
const educationExperiences = experiences.filter((exp) => exp.type === 'education');

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        '.experience-header',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.experience-header',
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Timeline line animation
      gsap.fromTo(
        '.timeline-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );

      // Timeline items animation
      gsap.fromTo(
        '.timeline-item',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-24 lg:py-32 relative overflow-hidden blueprint-grid"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="experience-header text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Career Path
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Experience & Education
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            A journey through professional roles, research endeavors, and academic achievements.
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Work Experience Column */}
          <div className="relative space-y-8 lg:space-y-12">
            <h3 className="text-2xl font-serif font-bold text-foreground text-center lg:text-right mb-8">Work Experience</h3>
            {workExperiences.map((exp) => {
              const Icon = typeIcons[exp.type];
              return (
                <div key={exp.id} className="timeline-item relative flex flex-col lg:items-end">
                  {/* Connector Line to Center (Desktop) */}
                  <div className="hidden lg:block absolute top-[28px] right-[-40px] w-[40px] h-[2px]" style={{ backgroundColor: `rgb(var(--color-${exp.color.replace('bg-', '')}))` }}>
                    {/* Connector line using CSS variable for color matching */}
                  </div>

                  {/* Card */}
                  <div className="bg-card border border-border rounded-xl p-6 card-hover w-full lg:w-[90%] relative group">
                    {/* Colored border left/right accent */}
                    <div className={`absolute top-0 bottom-0 left-0 w-1 rounded-l-xl ${exp.color} lg:left-auto lg:right-0 lg:rounded-l-none lg:rounded-r-xl`} />

                    <div className="flex items-start gap-4 mb-4 lg:flex-row-reverse">
                      <div
                        className={`w-10 h-10 rounded-lg ${exp.color} flex items-center justify-center flex-shrink-0 shadow-lg`}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1 lg:text-right">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-xs font-medium mb-1 ${exp.color} bg-opacity-10 text-opacity-100`}
                          style={{ color: 'inherit' }} // This might need better handling for text color contrast, but let's try using the class directly on text
                        >
                          {/* We need text color matching the bg. Let's strict to simple badge style for now */}
                          <span className={exp.color.replace('bg-', 'text-')}>{(exp.type === 'work' ? 'Work' : 'Research')}</span>
                        </span>
                        <h3 className="font-serif text-lg font-semibold text-foreground">
                          {exp.title}
                        </h3>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mb-3 text-sm lg:justify-end">
                      <span className="font-medium text-foreground">
                        {exp.organization}
                      </span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {exp.location}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3 lg:justify-end">
                      <Calendar className="w-4 h-4" />
                      {exp.period}
                    </div>

                    <p className="text-muted-foreground text-sm mb-4 lg:text-right">
                      {exp.description}
                    </p>

                    <ul className="space-y-1 lg:text-right">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2 lg:flex-row-reverse">
                          <span className={`w-1.5 h-1.5 rounded-full ${exp.color} mt-2 flex-shrink-0`} />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Center Dot (Desktop) */}
                  <div className={`hidden lg:flex absolute top-6 -right-[40px] translate-x-1/2 z-10 w-4 h-4 rounded-full ${exp.color} border-4 border-background shadow-md`} />
                </div>
              );
            })}
          </div>

          {/* Center Line (Desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-10 bottom-0 w-0.5 bg-border -translate-x-1/2">
            <div className="timeline-line absolute inset-0 bg-gradient-to-b from-transparent via-primary to-transparent opacity-30" />
          </div>

          {/* Education Column */}
          <div className="relative space-y-8 lg:space-y-12">
            <h3 className="text-2xl font-serif font-bold text-foreground text-center lg:text-left mb-8">Education</h3>
            {educationExperiences.map((exp) => {
              const Icon = typeIcons[exp.type];
              return (
                <div key={exp.id} className="timeline-item relative flex flex-col lg:items-start transition-all">

                  {/* Card */}
                  <div className="bg-card border border-border rounded-xl p-6 card-hover w-full lg:w-[90%] relative group">
                    {/* Colored border left accent */}
                    <div className={`absolute top-0 bottom-0 left-0 w-1 rounded-l-xl ${exp.color}`} />

                    <div className="flex items-start gap-4 mb-4">
                      <div
                        className={`w-10 h-10 rounded-lg ${exp.color} flex items-center justify-center flex-shrink-0 shadow-lg`}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-xs font-medium mb-1`}
                        >
                          <span className={exp.color.replace('bg-', 'text-')}>Education</span>
                        </span>
                        <h3 className="font-serif text-lg font-semibold text-foreground">
                          {exp.title}
                        </h3>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mb-3 text-sm">
                      <span className="font-medium text-foreground">
                        {exp.organization}
                      </span>
                      <span className="text-muted-foreground">•</span>
                      <span className="text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {exp.location}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="w-4 h-4" />
                      {exp.period}
                    </div>

                    <p className="text-muted-foreground text-sm mb-4">
                      {exp.description}
                    </p>

                    <ul className="space-y-1">
                      {exp.achievements.map((achievement, i) => (
                        <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                          <span className={`w-1.5 h-1.5 rounded-full ${exp.color} mt-2 flex-shrink-0`} />
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Center Dot (Desktop) */}
                  <div className={`hidden lg:flex absolute top-6 -left-[40px] -translate-x-1/2 z-10 w-4 h-4 rounded-full ${exp.color} border-4 border-background shadow-md`} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section >
  );
}
