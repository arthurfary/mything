import octokit_api from "../../lib/github-api-client"

async function fetchUrl(url) {
  const req_str = `${url}`
  const response = await octokit_api.request(req_str)
  return response.data
}

export default fetchUrl
