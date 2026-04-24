"use client";

import CountUp from "react-countup";
import { useState, useEffect } from "react";

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
    num: 25,
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
              num: data.stats.languages.length,
              text: "Technologies used",
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
            return (
              <div
                className="flex-1 flex gap-4 items-center justify-center xl:justify-start"
                key={index}
              >
                <CountUp
                  end={item.num}
                  duration={5}
                  delay={2}
                  className="text-4xl xl:text-6xl font-extrabold"
                />
                <p
                  className={`${
                    item.text.length < 15 ? "max-w-[100px]" : "max-w-[150px]"
                  } leading-snug text-white/80`}
                >
                  {item.text}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Stats;
