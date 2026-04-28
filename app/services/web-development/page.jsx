"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

// Sample projects data
const projects = [
  {
    title: "Personal Portfolio Website",
    description: "Modern portfolio website built with Next.js 14, featuring dynamic project management, contact forms with email integration, GitHub API integration, and responsive design with smooth animations.",
    tech: ["Next.js", "React", "TailwindCSS", "Framer Motion", "GitHub API", "Resend"],
    image: "/assets/work/portfolio-website.png",
    github: "https://github.com/Goncalves95/my_portfolio",
    demo: "https://iamfernando.vercel.app/"
  },
  {
    title: "Task Management App",
    description: "Collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Socket.io"],
    image: "/assets/work/web-dev-2.jpg",
    github: "https://github.com/Goncalves95/task-manager",
    demo: "https://tasks.example.com"
  },
  {
    title: "API Dashboard",
    description: "Analytics dashboard for monitoring API performance, with real-time metrics, error tracking, and automated reporting.",
    tech: ["Vue.js", "Python", "Redis", "Docker"],
    image: "/assets/work/web-dev-3.jpg",
    github: "https://github.com/Goncalves95/api-dashboard",
    demo: "https://analytics.example.com"
  }
];

const WebDevelopment = () => {
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
            Web Development
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Where code meets creativity. Building robust, scalable, and user-friendly web applications 
            with modern technologies and best practices.
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
              <h3 className="text-xl font-semibold text-accent mb-3">Frontend Development</h3>
              <p className="text-white/60">
                React, Next.js, Vue.js, TypeScript, responsive design, modern UI/UX
              </p>
            </div>
            <div className="bg-[#27272c] p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-accent mb-3">Backend Development</h3>
              <p className="text-white/60">
                Node.js, Python, RESTful APIs, GraphQL, database design, authentication
              </p>
            </div>
            <div className="bg-[#27272c] p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-accent mb-3">DevOps & Deployment</h3>
              <p className="text-white/60">
                Docker, CI/CD, cloud platforms, performance optimization, monitoring
              </p>
            </div>
          </div>
        </motion.div>

        {/* Projects Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { delay: 0.6, duration: 0.4, ease: "easeIn" },
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
                  transition: { delay: 0.8 + index * 0.1, duration: 0.4, ease: "easeIn" },
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
                  <div className="flex gap-3">
                    <Link href={project.github} target="_blank">
                      <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-primary transition-all duration-300">
                        View Code
                      </Button>
                    </Link>
                    <Link href={project.demo} target="_blank">
                      <Button className="bg-accent text-primary hover:bg-accent/90 transition-all duration-300">
                        Live Demo
                      </Button>
                    </Link>
                  </div>
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
            transition: { delay: 1.2, duration: 0.4, ease: "easeIn" },
          }}
          className="mt-16 text-center"
        >
          <div className="bg-[#27272c] p-8 rounded-xl">
            <h2 className="text-2xl font-bold text-white mb-4">
              Ready to start your next project?
            </h2>
            <p className="text-white/60 mb-6">
              Let's discuss how I can help bring your web development ideas to life.
            </p>
            <Link href="/contact?service=est">
              <Button className="bg-accent text-primary hover:bg-accent/90">
                Get in Touch
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WebDevelopment;
