"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaStar, FaCodeBranch, FaExternalLinkAlt } from "react-icons/fa";

const GithubRepos = () => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await fetch('/api/github/stats');
        if (response.ok) {
          const data = await response.json();
          setRepos(data.featuredRepos || []);
        }
      } catch (error) {
        console.error('Failed to fetch GitHub repos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      </div>
    );
  }

  if (repos.length === 0) {
    return null;
  }

  return (
    <section className="py-12">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="h2 text-center mb-8">GitHub Repositories</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo, index) => (
              <motion.div
                key={repo.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-[#27272c] rounded-lg p-6 border border-white/10 hover:border-accent/50 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-white mb-2">
                      {repo.name}
                    </h3>
                    <p className="text-white/60 text-sm mb-3 line-clamp-2">
                      {repo.description}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  {repo.language && (
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-accent rounded-full"></div>
                      <span className="text-sm text-white/80">{repo.language}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-500 text-sm" />
                      <span className="text-sm text-white/60">{repo.stars}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <FaCodeBranch className="text-blue-500 text-sm" />
                      <span className="text-sm text-white/60">{repo.forks}</span>
                    </div>
                  </div>
                  
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent-hover transition-colors"
                    title="View on GitHub"
                  >
                    <FaGithub className="text-xl" />
                  </a>
                </div>

                <div className="mt-3 text-xs text-white/40">
                  Last updated: {new Date(repo.updated_at).toLocaleDateString()}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <a
              href="https://github.com/Goncalves95"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent hover:text-accent-hover transition-colors"
            >
              <FaGithub className="text-xl" />
              <span>View all repositories</span>
              <FaExternalLinkAlt className="text-sm" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GithubRepos;
