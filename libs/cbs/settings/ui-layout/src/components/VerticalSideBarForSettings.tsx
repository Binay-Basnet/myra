import { useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, chakra, Tab, Tabs, Text } from '@chakra-ui/react';

import { useTranslation } from '@coop/shared/utils';

const TabCol = chakra(Tab, {
  baseStyle: {
    color: 'gray.600',
    height: '40px',
    fontSize: 's3',
    fontWeight: '500',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    _focus: {
      boxShadow: 'none',
    },
    _hover: {
      bg: 'gray.200',
    },
    _selected: { color: '#37474F', bg: 'gray.200', borderRadius: 'br2' },
  },
});

interface IVerticalSidebarProps {
  tablinks: {
    title: string;
    to: string;
  }[];
}

export const VerticalSideBarForSettings = ({ tablinks }: IVerticalSidebarProps) => {
  const route = useRouter();
  const currentIndex = useMemo(
    () => tablinks.findIndex((link) => link?.to === route.pathname),
    [route.pathname]
  );

  const { t } = useTranslation();
  return (
    <Box>
      <Tabs variant="unstyled" index={currentIndex}>
        {tablinks.map(({ title, to }) => (
          <Link href={to} key={title}>
            <TabCol>
              <Text>{t[title]}</Text>
            </TabCol>
          </Link>
        ))}
      </Tabs>
    </Box>
  );
};
