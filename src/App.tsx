import './App.css'
import { UseAPI } from './features/hooks/UseAPI';
import { fetchUserEvents } from "./features/api/userEvents"
import { fetchCommitsFromEvents } from "./features/api/userEvents"

function App() {
  const { data, isLoading, error } = UseAPI(fetchUserEvents, "arthurfary", "PushEvent")

  const commitsUrls = fetchCommitsFromEvents(data);
  console.log("commitsUrls", commitsUrls)

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
