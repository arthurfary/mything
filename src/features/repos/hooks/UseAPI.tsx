import { useState, useEffect } from "react";

export const UseAPI = ((
  apiFunc: (...apiArgs: unknown[]) => Promise<object[]>,
  ...apiArgs: unknown[]
) => {
  const [data, setData] = useState<object[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const ans = await apiFunc(...apiArgs);
        setData(ans)
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
  }, [apiFunc])

  return { data, isLoading, error }
})

