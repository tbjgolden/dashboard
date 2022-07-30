import { useEffect, useState } from "preact/hooks";

const defaultIntervalMs = 60 * 60 * 1000;

export function useAutoUpdate<T, U>(
  fetcher: () => Promise<U>,
  process: (data: U) => T | Promise<T>,
  intervalMs = defaultIntervalMs
): T | null {
  const [state, setState] = useState<T | null>(null);

  useEffect(() => {
    const ref = { isMounted: false };

    const fetch = async (): Promise<void> => {
      let data: T;
      try {
        data = await process(await fetcher());
      } catch (error) {
        try {
          data = await process(await fetcher());
        } catch (error) {
          console.error(error);
          return;
        }
      }

      setState(data);
    };

    const interval = setInterval(async () => {
      let data: T;
      try {
        data = await fetch();
      } catch (error) {
        try {
          data = await fetch();
        } catch (error) {
          console.e;
        }
      }
    }, intervalMs);
    fetch();

    return () => {
      ref.isMounted = true;
      clearInterval(interval);
    };
  }, []);

  return state[0];
}
