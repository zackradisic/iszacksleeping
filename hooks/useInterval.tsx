import { useEffect } from 'react'

export const useInterval = (
  callback: () => void,
  ms: number,
  ...deps: any[]
) => {
  useEffect(() => {
    const interval = setInterval(callback, ms)
    return () => {
      clearInterval(interval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, callback, ms])
}
