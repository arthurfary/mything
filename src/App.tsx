import './App.css'
import { fetchUserEvents } from "./features/api/userEvents"
import { fetchCommitsFromEvents, fetchTreeUrlParentUrlPair } from "./features/api/userEvents"
import { useState, useEffect } from 'react';
import { getRecentCommitsPerRepo } from "./features/functions/commits"

function App() {
  const [data, setData] = useState<object[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const callApi = async () => {
      setIsLoading(true);
      try {
        const pushEvents = await fetchUserEvents("arthurfary", "PushEvent");
        // console.log("pushEvents: ", pushEvents)

        const commits = await fetchCommitsFromEvents(pushEvents);
        // console.log("commits: ", commits)

        const commitsPerRepo = getRecentCommitsPerRepo(commits)
        // console.log("commitsPerRepo", commitsPerRepo)

        const treePairs = await fetchTreeUrlParentUrlPair(commitsPerRepo);
        console.log("treePairs: ", treePairs)

        setData(treePairs)
        setError(null)
      }
      catch (err: unknown) {
        setError(err as Error)
      }
      finally {
        setIsLoading(false)
      }
    }
    callApi()
  }, [])

  console.log(data)

  if (isLoading) return <div>loading...</div>;
  if (error) return <div>error {error.message}</div>;

  return (
    <>



    </>
  )
}

export default App 
