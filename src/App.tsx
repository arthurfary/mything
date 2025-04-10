import './App.css'
import { UseAPI } from './features/hooks/UseAPI';
import { fetchUserEvents } from "./features/api/userEvents"
import { fetchCommitsFromEvents, fetchTreeUrlParentUrlPair } from "./features/api/userEvents"
import { useState, useEffect } from 'react';

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

        const treePairs = await fetchTreeUrlParentUrlPair(commits);
        // console.log("treePairs: ", treePairs)

        //TODO: right now its fetching both tree and parent tree
        // should be able to choose amount of items trees per repo
        // create the way of showyng difference in a component
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
      {
        data?.map((event, _) => {
          {
            return event.payload.commits?.map((commit, key) => {
              return (
                <p key={key}>{commit.url}</p>
              )
            })
          }
        })
      }
      < p > hello</p >
    </>
  )
}

export default App 
