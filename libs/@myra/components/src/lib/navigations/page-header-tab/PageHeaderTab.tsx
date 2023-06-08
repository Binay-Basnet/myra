import { useRouter } from 'next/router';
import { chakra, Tab, TabList, Tabs } from '@chakra-ui/react';
import qs from 'qs';

import { en, useTranslation } from '@coop/shared/utils';

const TabElement = chakra(Tab, {
  baseStyle: {
    color: 'gray.600',
    height: '3.125rem',
    fontSize: 'r1',
    fontWeight: '600',
    // width: '100px',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    _focus: {
      boxShadow: 'none',
    },
    _selected: {
      color: '#343C46',
      boxShadow: 'inset 0px -3px 0px -1px var(--myra-colors-primary-500)',
    },
  },
});

export interface PageHeaderTabProps {
  list: {
    title: string;
    key: string;
  }[];
  showTabsInFilter?: boolean;
}

export const PageHeaderTab = ({ list, showTabsInFilter }: PageHeaderTabProps) => {
  const router = useRouter();

  const { t } = useTranslation();

  const currentIndex = showTabsInFilter
    ? list.findIndex((value) => router?.query['filter']?.includes(value.key))
    : list.findIndex((value) => value.key === router.query['objState']);

  return (
    <Tabs variant="unstyled" index={currentIndex === -1 ? 0 : currentIndex}>
      <TabList>
        {list.map((item) => (
          <TabElement
            onClick={() => {
              if (showTabsInFilter) {
                router.push(
                  {
                    query: {
                      filter: qs.stringify({
                        objState: {
                          value: item.key,
                          compare: '=',
                        },
                      }),
                    },
                  },
                  undefined,
                  { shallow: true }
                );
              } else {
                router?.push({
                  query: {
                    ...router.query,
                    objState: item.key,
                  },
                });
              }
            }}
            key={`${item.key}`}
          >
            {t[item.title as keyof typeof en] ?? item.title}
          </TabElement>
        ))}
      </TabList>
    </Tabs>
  );
};

export default PageHeaderTab;
