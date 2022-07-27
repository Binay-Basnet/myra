import { useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { chakra, Tab, Tabs, Text } from '@chakra-ui/react';

import { en, useTranslation } from '@coop/shared/utils';

const TabCol = chakra(Tab, {
  baseStyle: {
    color: 'gray.600',
    height: '48px',
    fontSize: '14px',
    fontWeight: '500',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    _hover: {
      bg: 'highlight.500',
    },
    _focus: {
      boxShadow: 'none',
    },
    _selected: { color: '#37474F', bg: 'gray.200' },
  },
});

interface ITabColumnProps {
  list: {
    title: string;
    link: string;
    name?: string | undefined;
  }[];
}

export const TabColumn = ({ list }: ITabColumnProps) => {
  const { t } = useTranslation();

  const router = useRouter();

  const currentIndex = useMemo(
    () => list.findIndex((link) => router.pathname.includes(link?.name ?? '')),
    [router.pathname]
  );
  return (
    <Tabs variant="unstyled" index={currentIndex}>
      {list.map((item, index) => {
        return (
          <Link href={item.link} key={`${item}${index}`}>
            <TabCol>
              <Text
                noOfLines={1}
                align="left"
                title={t[item.title as keyof typeof en]}
              >
                {t[item.title as keyof typeof en]}
              </Text>
            </TabCol>
          </Link>
        );
      })}
    </Tabs>
  );
};
