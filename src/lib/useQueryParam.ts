'use client';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

const getQuery = () => {
  if (typeof window !== 'undefined') {
    return new URLSearchParams(window.location.search);
  }
  return new URLSearchParams();
};

const getQueryStringVal = (key: string): string | null => {
  return getQuery().get(key);
};

const useQueryParam = (
  key: string,
  defaultVal: string
): [string, (val: string) => void] => {
  const [query, setQuery] = useState<string | null>(getQueryStringVal(key));
  const router = useRouter()

  const updateUrl = useCallback((newVal: string) => {
    setQuery(newVal);

    const query = getQuery();

    if (newVal.trim() !== '') {
      query.set(key, newVal);
    } else {
      query.delete(key);
    }

    // This check is necessary if using the hook with Gatsby
    if (typeof window !== 'undefined') {
      const { protocol, pathname, host } = window.location;
      const newUrl = `${protocol}//${host}${pathname}?${query.toString()}`;
      router.push(newUrl)
    }
  },[]);

  useEffect(() => {
    if (defaultVal && query === null) {
      updateUrl(defaultVal)
    }
  }, [])

  return [query ?? defaultVal, updateUrl];
};

export default useQueryParam;