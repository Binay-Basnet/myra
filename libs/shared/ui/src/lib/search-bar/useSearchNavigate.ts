import React, { RefObject, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface UseSearchNavigateProps {
  list: Array<{
    link: string;
    [key: string]: string;
  }>;

  searchBarRef: RefObject<HTMLInputElement>;
  setSearchAction: React.Dispatch<
    React.SetStateAction<'EMPTY' | 'FOCUS' | 'SIMPLE' | 'USER'>
  >;
  setInputSearch: React.Dispatch<React.SetStateAction<string>>;
}

export const useSearchNavigate = ({
  list,
  searchBarRef,
  setSearchAction,
  setInputSearch,
}: UseSearchNavigateProps) => {
  const [focusState, setFocusState] = useState<'EMPTY' | number>('EMPTY');

  const router = useRouter();

  useEffect(() => {
    const arrowKeyEvent = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') {
        setFocusState((prev) =>
          prev === 'EMPTY' ? 0 : prev === list.length - 1 ? 0 : prev + 1
        );
      }

      if (e.key === 'ArrowUp') {
        setFocusState((prev) =>
          prev === 'EMPTY' ? 0 : prev === 0 ? 0 : prev - 1
        );
      }
    };

    document.addEventListener('keydown', arrowKeyEvent);

    return () => document.removeEventListener('keydown', arrowKeyEvent);
  }, [JSON.stringify(list)]);

  useEffect(() => {
    const enterKeyEvent = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && e.shiftKey && focusState !== 'EMPTY') {
        window.open(list[focusState].link, '_blank');
      } else if (e.key === 'Enter' && focusState !== 'EMPTY') {
        router.push(list[focusState].link).then(() => {
          setSearchAction('EMPTY');
          searchBarRef?.current?.blur();
          setInputSearch('');
        });
      }
    };

    document.addEventListener('keydown', enterKeyEvent);

    return () => document.removeEventListener('keydown', enterKeyEvent);
  }, [focusState]);

  return { focusState, setFocusState };
};
