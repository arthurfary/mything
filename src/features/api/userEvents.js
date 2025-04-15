import octokit_api from "../../lib/github-api-client"
import { fetchUrl } from "./fetchUrl.js"

export async function fetchUserEvents(username, type = "") {
  const req_str = `GET /users/${username}/events`
  const response = await octokit_api.request(req_str)

  if (type) {
    return response.data.filter(event => event.type === type);
  }

  return response.data
}

export async function fetchCommitsFromEvents(events) {
  // First, extract all commits from events
  const commitsPromises = events.map(event => event.payload.commits);
  // Wait for all promises to resolve
  const allCommitsArrays = await Promise.all(commitsPromises);
  // Flatten the array of arrays into a single array of commits
  const allCommits = allCommitsArrays.flat();

  // Now fetch each commit URl
  const commitUrlPromises = allCommits.map(commit => {
    return octokit_api.request(commit.url);
  });
  // Wait for all URL requests to complete
  const commitResponses = await Promise.all(commitUrlPromises);

  const commitData = commitResponses.map(response => response.data)

  console.log("commitData: ", commitData)
  return commitData;
}

export async function fetchTreeUrlParentUrlPair(commitData) {
  const result = {};

  for (const repo of Object.keys(commitData)) {
    console.log("repo", commitData[repo]); // This shows Array(3) [ {…}, {…}, {…} ]

    const commitPromises = commitData[repo].map(async commit => {
      const treeUrl = commit.commit.tree.url;

      let parentTreeUrl = null;

      if (commit.parents && commit.parents.length > 0) {
        try {
          const parentCommit = await fetchUrl(commit.parents[0].url);
          parentTreeUrl = parentCommit.commit.tree.url;
        } catch (error) {
          console.error(`Error fetching parent commit: ${error.message}`);
        }
      }

      return {
        treeUrl: treeUrl,
        parentTreeUrl: parentTreeUrl,
        commitSha: commit.sha
      };
    });

    result[repo] = await Promise.all(commitPromises);
  }

  return result;
}
