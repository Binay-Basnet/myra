import { useRef, useState } from 'react';
import { NextRouter, useRouter } from 'next/router';

// https://github.com/vercel/next.js/issues/18127#issuecomment-950907739
// Nextjs Seems to have router memoization problem. so had to create this hook
export const useReplace = () => {
  const router = useRouter();
  const routerRef = useRef(router);
  routerRef.current = router;

  const [{ replace }] = useState<Pick<NextRouter, 'replace'>>({
    replace: (path) => routerRef.current.replace(path),
  });
  return replace;
};
