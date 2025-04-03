import { Octokit } from "octokit";

token = import.meta.env.GITHUB_TOKEN

console.log(token)

const octokit_api = new Octokit({
  auth: token
});

export default octokit_api
