/**
 * Gets up to N most recent commits for each repository
 * @param {Array} commitData - Array of GitHub commit objects
 * @param {number} limit - Maximum number of commits per repository (default: 3)
 * @returns {Array} - Filtered array with N most recent commits per repository
 */

export function getRecentCommitsPerRepo(commitData, limit = 3) {
  // Extract repo name from each commit URL
  // Example URL: https://github.com/arthurfary/mything/commit/354f2d03a724c255381611c730b424646bbe74bc
  const extractRepoName = (commit) => {
    const url = commit.html_url;
    // Extract owner/repo format from URL
    const matches = url.match(/github\.com\/([^\/]+\/[^\/]+)/);
    return matches ? matches[1] : null;
  };

  // Group commits by repository
  const commitsByRepo = commitData.reduce((groups, commit) => {
    const repoName = extractRepoName(commit);
    if (!repoName) return groups;

    if (!groups[repoName]) {
      groups[repoName] = [];
    }

    groups[repoName].push(commit);
    return groups;
  }, {});


  const filteredCommits = Object.keys(commitsByRepo).reduce((curr, repoName) => {
    curr[repoName] = commitsByRepo[repoName].sort((a, b) => {
      const dateA = new Date(a.commit.committer.date);
      const dateB = new Date(b.commit.committer.date);
      return dateB - dateA; // Descending order (newest first)
    })
      .slice(0, limit);

    return curr
  }, {});

  // console.log("filtered", filteredCommits)

  return filteredCommits;
}
