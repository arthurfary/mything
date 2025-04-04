import { Octokit } from "octokit";

const token = import.meta.env.VITE_GITHUB_TOKEN

const octokit_api = new Octokit({
  auth: token
});

export default octokit_api
