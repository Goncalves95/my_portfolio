"use client";

import CountUp from "react-countup";
import { useState, useEffect } from "react";
import Link from "next/link";

// Import skills data from resume page - exact match with resume page
const skillsData = [
  { name: "HTML 5" },
  { name: "CSS 3" },
  { name: "JavaScript" },
  { name: "React.js" },
  { name: "Typescript" },
  { name: "Next.js" },
  { name: "Tailwind.css" },
  { name: "Node.js" },
  { name: "Angular" },
  { name: "Python" },
  { name: "Liquibase" },
  { name: "Azure" },
  { name: "Flask" },
  { name: "Django" },
  { name: "Pandas" },
  { name: "NumPy" },
  { name: "Scikit-Learn" },
  { name: "AWS" },
  { name: "Slack" },
  { name: "Adobe" },
  { name: "BootStrap" },
  { name: "GitHub" },
  { name: "Git" },
  { name: "PHP" },
  { name: "figma" },
  { name: "WordPress" },
  { name: "GoogleEnv" },
  { name: "VisualStudioCode" },
  { name: "MacOS" },
  { name: "Linux" },
  { name: "Docker" },
  { name: "SQL" },
  { name: "Heroku" },
  { name: "MySQL" },
  { name: "Azure"},
];

const defaultStats = [
  {
    num: 3,
    text: "Years of experience",
  },
  {
    num: 52,
    text: "Projects completed",
  },
  {
    num: skillsData.length,
    text: "Technologies mastered",
  },
  {
    num: 1561,
    text: "Code commits",
  },
];

const Stats = () => {
  const [stats, setStats] = useState(defaultStats);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const response = await fetch('/api/github/stats');
        if (response.ok) {
          const data = await response.json();
          
          const newStats = [
            {
              num: data.stats.yearsOfExperience,
              text: "Years of experience",
            },
            {
              num: data.stats.totalRepos,
              text: "GitHub repositories",
            },
            {
              num: skillsData.length,
              text: "Technologies mastered",
            },
            {
              num: data.stats.totalCommits,
              text: "Code commits",
            },
          ];
          
          setStats(newStats);
        }
      } catch (error) {
        console.error('Failed to fetch GitHub stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubStats();
  }, []);

  return (
    <section className="pt-4 pb-12 xl:pt-0 xl:pb-0">
      <div className="container mx-auto">
        <div className="flex flex-wrap gap-6 max-w-[80vw] mx-auto xl:max-w-none">
          {stats.map((item, index) => {
            const isTechItem = item.text === "Technologies mastered";
            
            return (
              <div
                className="flex-1 flex gap-4 items-center justify-center xl:justify-start"
                key={index}
              >
                {isTechItem ? (
                  <Link href="/resume#skills" className="flex gap-4 items-center hover:opacity-80 transition-opacity cursor-pointer group">
                    <CountUp
                      end={item.num}
                      duration={5}
                      delay={2}
                      className={`text-4xl xl:text-6xl font-extrabold text-accent stat-number-${index} group-hover:text-white transition-colors`}
                      onStart={() => {
                        // Green during animation
                        const element = document.querySelector(`.stat-number-${index}`);
                        if (element) element.classList.add('text-accent');
                      }}
                      onEnd={() => {
                        // White after animation
                        const element = document.querySelector(`.stat-number-${index}`);
                        if (element) {
                          element.classList.remove('text-accent');
                          element.classList.add('text-white');
                        }
                      }}
                    />
                    <p
                      className={`${
                        item.text.length < 15 ? "max-w-[100px]" : "max-w-[150px]"
                      } leading-snug text-white/80 group-hover:text-accent transition-colors`}
                    >
                      {item.text}
                    </p>
                  </Link>
                ) : (
                  <>
                    <CountUp
                      end={item.num}
                      duration={5}
                      delay={2}
                      className={`text-4xl xl:text-6xl font-extrabold text-accent stat-number-${index}`}
                      onStart={() => {
                        // Green during animation
                        const element = document.querySelector(`.stat-number-${index}`);
                        if (element) element.classList.add('text-accent');
                      }}
                      onEnd={() => {
                        // White after animation
                        const element = document.querySelector(`.stat-number-${index}`);
                        if (element) {
                          element.classList.remove('text-accent');
                          element.classList.add('text-white');
                        }
                      }}
                    />
                    <p
                      className={`${
                        item.text.length < 15 ? "max-w-[100px]" : "max-w-[150px]"
                      } leading-snug text-white/80`}
                    >
                      {item.text}
                    </p>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;
