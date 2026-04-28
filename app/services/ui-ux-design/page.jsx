"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

// Sample projects data
const projects = [
  {
    title: "Mobile Banking App",
    description: "Complete UI/UX redesign of a mobile banking application with improved user flow, accessibility features, and modern visual design.",
    tech: ["Figma", "User Research", "Prototyping", "Mobile Design"],
    image: "/assets/work/ui-ux-1.jpg",
    caseStudy: "https://behance.net/gallery/banking-app"
  },
  {
    title: "SaaS Dashboard",
    description: "Enterprise dashboard design with complex data visualization, user onboarding flow, and comprehensive design system.",
    tech: ["Sketch", "Design System", "Data Viz", "Enterprise"],
    image: "/assets/work/ui-ux-2.jpg",
    caseStudy: "https://behance.net/gallery/saas-dashboard"
  },
  {
    title: "E-Commerce Redesign",
    description: "Complete redesign of e-commerce platform focusing on conversion optimization, mobile-first approach, and enhanced user experience.",
    tech: ["Adobe XD", "A/B Testing", "Conversion", "Mobile First"],
    image: "/assets/work/ui-ux-3.jpg",
    caseStudy: "https://behance.net/gallery/ecommerce-redesign"
  }
];

const UiUxDesign = () => {
  return (
    <section className="min-h-screen py-12 xl:py-0">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            transition: { delay: 0.2, duration: 0.4, ease: "easeIn" },
          }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-accent mb-4">
            UI/UX Design
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Transforming interactions into engaging experiences. Creating intuitive, beautiful, 
            and user-centered designs that delight and convert.
          </p>
        </motion.div>

        {/* Services Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { delay: 0.4, duration: 0.4, ease: "easeIn" },
          }}
          className="mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-[#27272c] p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-accent mb-3">User Research</h3>
              <p className="text-white/60">
                User interviews, personas, journey mapping, usability testing, analytics
              </p>
            </div>
            <div className="bg-[#27272c] p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-accent mb-3">Interface Design</h3>
              <p className="text-white/60">
                Wireframing, prototyping, visual design, design systems, responsive layouts
              </p>
            </div>
            <div className="bg-[#27272c] p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-accent mb-3">User Testing</h3>
              <p className="text-white/60">
                A/B testing, usability testing, accessibility audits, performance optimization
              </p>
            </div>
          </div>
        </motion.div>

        {/* Design Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { delay: 0.6, duration: 0.4, ease: "easeIn" },
          }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Design Process</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-accent">1</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Research</h3>
              <p className="text-white/60 text-sm">Understanding user needs and business goals</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-accent">2</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Ideate</h3>
              <p className="text-white/60 text-sm">Brainstorming solutions and concepts</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-accent">3</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Design</h3>
              <p className="text-white/60 text-sm">Creating wireframes and visual designs</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-accent">4</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Test</h3>
              <p className="text-white/60 text-sm">Validating designs with real users</p>
            </div>
          </div>
        </motion.div>

        {/* Projects Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { delay: 0.8, duration: 0.4, ease: "easeIn" },
          }}
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Featured Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 1.0 + index * 0.1, duration: 0.4, ease: "easeIn" },
                }}
                className="bg-[#27272c] rounded-xl overflow-hidden group"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                  <p className="text-white/60 mb-4 text-sm">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-accent/20 text-accent text-xs rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <Link href={project.caseStudy} target="_blank">
                    <Button variant="outline" className="w-full border-accent text-accent hover:bg-accent hover:text-primary transition-all duration-300">
                      View Case Study
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { delay: 1.4, duration: 0.4, ease: "easeIn" },
          }}
          className="mt-16 text-center"
        >
          <div className="bg-[#27272c] p-8 rounded-xl">
            <h2 className="text-2xl font-bold text-white mb-4">
              Need a design that converts?
            </h2>
            <p className="text-white/60 mb-6">
              Let's create a user experience that your customers will love.
            </p>
            <Link href="/contact?service=cst">
              <Button className="bg-accent text-primary hover:bg-accent/90">
                Discuss Your Project
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default UiUxDesign;
