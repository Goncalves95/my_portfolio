"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

// Sample projects data
const projects = [
  {
    title: "Restaurant Website",
    description: "Modern restaurant website with online ordering system, menu management, and reservation booking functionality.",
    tech: ["WordPress", "WooCommerce", "PHP", "MySQL"],
    image: "/assets/work/web-design-1.jpg",
    live: "https://restaurant.example.com"
  },
  {
    title: "Portfolio Website",
    description: "Creative portfolio website for photographer with gallery management, blog integration, and client portal.",
    tech: ["Webflow", "CMS", "Custom Code", "SEO"],
    image: "/assets/work/web-design-2.jpg",
    live: "https://portfolio.example.com"
  },
  {
    title: "Corporate Website",
    description: "Professional corporate website with content management, team profiles, and integrated CRM system.",
    tech: ["HubSpot", "Custom Theme", "Marketing", "Analytics"],
    image: "/assets/work/web-design-3.jpg",
    live: "https://corporate.example.com"
  }
];

const WebDesign = () => {
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
            Web Design
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Building data foundations for informed decisions. Creating beautiful, functional, 
            and conversion-focused websites that drive business results.
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
              <h3 className="text-xl font-semibold text-accent mb-3">Visual Design</h3>
              <p className="text-white/60">
                Brand identity, color theory, typography, layout design, visual hierarchy
              </p>
            </div>
            <div className="bg-[#27272c] p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-accent mb-3">CMS Development</h3>
              <p className="text-white/60">
                WordPress, Webflow, custom CMS, content strategy, SEO optimization
              </p>
            </div>
            <div className="bg-[#27272c] p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-accent mb-3">Performance</h3>
              <p className="text-white/60">
                Page speed optimization, mobile responsiveness, accessibility, analytics
              </p>
            </div>
          </div>
        </motion.div>

        {/* Design Principles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { delay: 0.6, duration: 0.4, ease: "easeIn" },
          }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Design Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#27272c] p-6 rounded-xl text-center">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-accent text-2xl">🎯</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">User-Centered</h3>
              <p className="text-white/60 text-sm">Design with the user in mind</p>
            </div>
            <div className="bg-[#27272c] p-6 rounded-xl text-center">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-accent text-2xl">📱</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Mobile First</h3>
              <p className="text-white/60 text-sm">Optimized for all devices</p>
            </div>
            <div className="bg-[#27272c] p-6 rounded-xl text-center">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-accent text-2xl">⚡</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Performance</h3>
              <p className="text-white/60 text-sm">Fast and efficient</p>
            </div>
            <div className="bg-[#27272c] p-6 rounded-xl text-center">
              <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                <span className="text-accent text-2xl">🔍</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">SEO Friendly</h3>
              <p className="text-white/60 text-sm">Built for search engines</p>
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
                  <Link href={project.live} target="_blank">
                    <Button className="w-full bg-accent text-primary hover:bg-accent/90 transition-all duration-300">
                      View Live Site
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { delay: 1.2, duration: 0.4, ease: "easeIn" },
          }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Technologies & Tools</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {["WordPress", "Webflow", "Figma", "Adobe XD", "Sketch", "HTML/CSS", "JavaScript", "PHP", "SEO", "Google Analytics"].map((tech, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-[#27272c] text-accent rounded-full text-sm border border-accent/20"
              >
                {tech}
              </span>
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
          className="text-center"
        >
          <div className="bg-[#27272c] p-8 rounded-xl">
            <h2 className="text-2xl font-bold text-white mb-4">
              Need a website that stands out?
            </h2>
            <p className="text-white/60 mb-6">
              Let's create a stunning web presence that drives results for your business.
            </p>
            <Link href="/contact?service=mst">
              <Button className="bg-accent text-primary hover:bg-accent/90">
                Start Your Project
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WebDesign;
