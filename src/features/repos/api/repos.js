import octokit_api from "../../../lib/github-api-client"

async function fetchUserRepos(username) {
  const response = await octokit_api.request('GET /users/{username}/repos', {
    username: username,
  })

  return response
}

export default fetchUserRepos
