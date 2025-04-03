import { useEffect, useState } from "react";
import fetchUserRepos from "../api/repos";

export const userRepositories = (user) => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const ans = await fetchUserRepos(user);
        setData(ans)
        setError(null)
      }
      catch (err) {
        setError(err)
      }
      finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [user])

  return { data, isLoading, error }
}


