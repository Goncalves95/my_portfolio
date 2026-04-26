"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

// Sample project ideas
const projectIdeas = [
  {
    title: "AI-Powered Analytics Platform",
    description: "Machine learning dashboard for real-time business intelligence with predictive analytics and automated reporting.",
    category: "AI/ML",
    timeline: "3-4 months",
    tech: ["Python", "TensorFlow", "React", "PostgreSQL", "Docker"]
  },
  {
    title: "Blockchain Supply Chain",
    description: "Transparent supply chain management system using blockchain technology for traceability and verification.",
    category: "Blockchain",
    timeline: "4-5 months",
    tech: ["Solidity", "Web3.js", "React", "Node.js", "IPFS"]
  },
  {
    title: "Healthcare Management System",
    description: "Comprehensive healthcare platform with patient records, appointment scheduling, and telemedicine capabilities.",
    category: "Healthcare",
    timeline: "5-6 months",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Twilio", "HIPAA"]
  },
  {
    title: "IoT Smart Home Dashboard",
    description: "Centralized smart home management system with real-time monitoring and automation controls.",
    category: "IoT",
    timeline: "2-3 months",
    tech: ["React Native", "Node.js", "MQTT", "MongoDB", "Raspberry Pi"]
  },
  {
    title: "E-Learning Platform",
    description: "Interactive online learning platform with video streaming, quizzes, and progress tracking.",
    category: "Education",
    timeline: "3-4 months",
    tech: ["Next.js", "WebRTC", "Node.js", "MongoDB", "AWS"]
  },
  {
    title: "Social Media Analytics",
    description: "Comprehensive social media monitoring and analytics tool for brand management and engagement tracking.",
    category: "Marketing",
    timeline: "2-3 months",
    tech: ["Python", "React", "Redis", "GraphQL", "Twitter API"]
  }
];

const NewProjects = () => {
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
            New Projects
          </h1>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Always looking for exciting collaborations. Let's work together to bring your vision to life.
          </p>
        </motion.div>

        {/* Collaboration Areas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { delay: 0.4, duration: 0.4, ease: "easeIn" },
          }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Areas of Expertise</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#27272c] p-6 rounded-xl text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-semibold text-accent mb-2">AI & Machine Learning</h3>
              <p className="text-white/60 text-sm">Predictive models, NLP, computer vision</p>
            </div>
            <div className="bg-[#27272c] p-6 rounded-xl text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⛓️</span>
              </div>
              <h3 className="text-xl font-semibold text-accent mb-2">Blockchain</h3>
              <p className="text-white/60 text-sm">Smart contracts, DeFi, Web3 applications</p>
            </div>
            <div className="bg-[#27272c] p-6 rounded-xl text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-semibold text-accent mb-2">Mobile Development</h3>
              <p className="text-white/60 text-sm">React Native, Flutter, native apps</p>
            </div>
            <div className="bg-[#27272c] p-6 rounded-xl text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌐</span>
              </div>
              <h3 className="text-xl font-semibold text-accent mb-2">Cloud & DevOps</h3>
              <p className="text-white/60 text-sm">AWS, Docker, CI/CD, microservices</p>
            </div>
          </div>
        </motion.div>

        {/* Project Ideas */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { delay: 0.6, duration: 0.4, ease: "easeIn" },
          }}
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Project Ideas & Concepts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projectIdeas.map((project, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  transition: { delay: 0.8 + index * 0.1, duration: 0.4, ease: "easeIn" },
                }}
                className="bg-[#27272c] p-6 rounded-xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">{project.title}</h3>
                  <span className="px-2 py-1 bg-accent/20 text-accent text-xs rounded-full">
                    {project.category}
                  </span>
                </div>
                <p className="text-white/60 mb-4 text-sm">{project.description}</p>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-accent text-sm">{project.timeline}</span>
                  <div className="flex flex-wrap gap-1">
                    {project.tech.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-2 py-1 bg-primary/20 text-white/60 text-xs rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full text-xs">
                  Discuss This Project
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Collaboration Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { delay: 1.2, duration: 0.4, ease: "easeIn" },
          }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">How We Work Together</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-accent">1</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Discovery</h3>
              <p className="text-white/60 text-sm">Understanding your vision and requirements</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-accent">2</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Planning</h3>
              <p className="text-white/60 text-sm">Creating roadmap and technical specifications</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-accent">3</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Development</h3>
              <p className="text-white/60 text-sm">Building your solution with agile methodology</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-accent">4</span>
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">Launch</h3>
              <p className="text-white/60 text-sm">Deployment and ongoing support</p>
            </div>
          </div>
        </motion.div>

        {/* Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { delay: 1.4, duration: 0.4, ease: "easeIn" },
          }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Technologies I Love Working With</h2>
          <div className="flex flex-wrap justify-center gap-3">
            {["React", "Next.js", "Node.js", "Python", "TypeScript", "PostgreSQL", "MongoDB", "Docker", "AWS", "TensorFlow", "Blockchain", "React Native"].map((tech, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-accent/10 text-accent rounded-full text-sm border border-accent/20"
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
            transition: { delay: 1.6, duration: 0.4, ease: "easeIn" },
          }}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-accent/20 to-accent/10 p-8 rounded-xl border border-accent/20">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Build Something Amazing?
            </h2>
            <p className="text-white/60 mb-6 max-w-2xl mx-auto">
              Whether you have a specific project in mind or just want to explore possibilities, 
              I'm excited to collaborate and bring innovative ideas to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-accent text-primary hover:bg-accent/90">
                  Start a Conversation
                </Button>
              </Link>
              <Link href="/work">
                <Button variant="outline" className="border-accent text-accent hover:bg-accent/10">
                  View My Work
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewProjects;
