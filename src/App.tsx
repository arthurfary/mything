import './App.css'
import { UseAPI } from './features/repos/hooks/UseAPI';
import fetchUserEvents from "./features/repos/api/userEvents"

function App() {
  const { data, isLoading, error } = UseAPI(fetchUserEvents, "arthurfary", "PushEvent")

  if (isLoading) return <div>loading...</div>;
  if (error) return <div>error {error.message}</div>;

  return (
    <>
      {
        data?.map((event, key) => {
          return <p key={key}>{event.repo.name}</p>
        })
      }
      < p > hello</p >
    </>
  )
}

export default App 
