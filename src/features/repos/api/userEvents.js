import octokit_api from "../../../lib/github-api-client";

async function fetchUserEvents(username, type) {
  const req_str = `GET /users/${username}/events${type ? "?type=" + type : ""}`
  const response = await octokit_api.request(req_str)
  return response.data
}

export default fetchUserEvents
