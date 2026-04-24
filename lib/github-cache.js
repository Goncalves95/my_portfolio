// Simple in-memory cache for GitHub API responses
const cache = new Map();
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

export function getCachedData(key) {
  const cached = cache.get(key);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    return cached.data;
  }
  return null;
}

export function setCachedData(key, data) {
  cache.set(key, {
    data,
    timestamp: Date.now()
  });
}

export function clearCache() {
  cache.clear();
}

// Cache keys
export const CACHE_KEYS = {
  USER_DATA: 'github_user_data',
  REPOS_DATA: 'github_repos_data',
  STATS_DATA: 'github_stats_data'
};
