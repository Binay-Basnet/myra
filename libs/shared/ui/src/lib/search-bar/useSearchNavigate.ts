import React, { RefObject, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { useGetNewIdMutation } from '@coop/cbs/data-access';

interface UseSearchNavigateProps {
  list:
    | Array<{
        link: string | undefined | null;
        hasParam?: boolean;
        [key: string]: string | boolean | undefined | null;
      } | null>
    | undefined
    | null;

  searchBarRef: RefObject<HTMLInputElement>;
  setSearchAction: React.Dispatch<React.SetStateAction<'EMPTY' | 'FOCUS' | 'SIMPLE' | 'USER'>>;
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
      if ((e.target as Element).id === 'search-input') {
        if (e.key === 'ArrowDown') {
          setFocusState((prev) =>
            prev === 'EMPTY' ? 0 : prev === Number(list?.length ?? 0) - 1 ? 0 : prev + 1
          );
        }

        if (e.key === 'ArrowUp') {
          setFocusState((prev) => (prev === 'EMPTY' ? 0 : prev === 0 ? 0 : prev - 1));
        }
      }
    };

    document.addEventListener('keydown', arrowKeyEvent);

    return () => document.removeEventListener('keydown', arrowKeyEvent);
  }, [JSON.stringify(list)]);

  const { mutateAsync } = useGetNewIdMutation();

  const getLink = async () => {
    if (focusState === 'EMPTY') return ' ';

    const hasParams = list?.[focusState]?.hasParam;

    const response = hasParams ? await mutateAsync({}) : null;

    const link = response
      ? `${list?.[focusState]?.link}/${response?.newId}`
      : list?.[focusState]?.link;
    return link;
  };

  useEffect(() => {
    const enterKeyEvent = async (e: KeyboardEvent) => {
      const link = await getLink();

      if (link) {
        if ((e.target as Element).id === 'search-input') {
          if (e.key === 'Enter' && e.shiftKey && focusState !== 'EMPTY') {
            window.open(link, '_blank');
          } else if (e.key === 'Enter' && focusState !== 'EMPTY') {
            router.push(link).then(() => {
              setSearchAction('EMPTY');
              searchBarRef?.current?.blur();
              setInputSearch('');
            });
          }
        }
      }
    };

    document.addEventListener('keydown', enterKeyEvent);

    return () => document.removeEventListener('keydown', enterKeyEvent);
  }, [focusState]);

  return { focusState, setFocusState };
};
