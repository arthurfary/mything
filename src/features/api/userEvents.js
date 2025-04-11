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
  // Create array of promises that will each resolve to a url pair
  const urlPairsPromises = commitData.map(async commit => {
    const treeUrl = commit.commit.tree.url;

    // Some commits might not have parents (e.g., initial commits)
    let parentTreeUrl = null;
    if (commit.parents.length > 0) {
      const parentCommit = await fetchUrl(commit.parents[0].url);
      parentTreeUrl = parentCommit.commit.tree.url;
    }

    return {
      treeUrl: treeUrl,
      parentTreeUrl: parentTreeUrl
    };
  });

  const urlPairs = await Promise.all(urlPairsPromises);
  return urlPairs;
}
