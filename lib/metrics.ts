import { Generated, ColumnType } from 'kysely';
import { createKysely } from '@vercel/postgres-kysely';
import db from './db';

// define types
type Database = {
  tweetcount: TweetCountTable;
  githubmetrics: GitHubMetricsTable;
};

type TweetCountTable = {
  id: Generated<number>;
  count: number;
  updated_at: ColumnType<Date, string | undefined>;
};

type GitHubMetricsTable = {
  id: Generated<number>;
  commits: number;
  repos: number;
  updated_at: ColumnType<Date, string | undefined>;
};

type MetricsType = {
  tweetCount: number;
  githubCommits: number;
  githubRepos: number;
};

const kysely = createKysely<Database>(db);

// query to fetch tweet count and github metrics
export async function getMetrics(): Promise<MetricsType> {
  const res = await kysely
    .selectFrom(['tweetcount', 'githubmetrics'])
    .select([
      'tweetcount.count as tweetCount',
      'githubmetrics.commits as githubCommits',
      'githubmetrics.repos as githubRepos',
    ])
    .execute();

  return res[0];
}

// update tweet count
export const updateTweetCount = (tweetCount: number) => {
  kysely.updateTable('tweetcount')
    .set({ count: tweetCount })
    .where('tweetcount.id', '=', 1)
    .executeTakeFirst();
};

// update github metrics
export const updateGithubMetrics = (commits: number, repos: number) => {
  kysely.updateTable('githubmetrics')
    .set({ commits: commits, repos: repos })
    .where('githubmetrics.id', '=', 1)
    .executeTakeFirst();
};