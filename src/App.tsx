import './App.css'
import { userRepositories } from './features/repos/hooks/userRepositories'


function App() {
  const { data, isLoading, error } = userRepositories('arthurfary')

  if (isLoading) return <div>loading...</div>;
  if (error) return <div>error {error}</div>;

  console.log(data)

  return (
    <p>{data}</p>
  )
}

export default App 
