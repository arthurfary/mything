import { useEffect, useState } from "react";
import fetchUserRepos from "../api/repos";

export const UserRepositories = (user: string) => {
  const [data, setData] = useState<object[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const ans = await fetchUserRepos(user);
        setData(ans.data)
        setError(null)
      }
      catch (err: unknown) {
        setError(err as Error)
      }
      finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [user])

  return { data, isLoading, error }
}


