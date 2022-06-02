import { useMemo } from 'react';
import { Box, chakra, Tab, Tabs, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const TabCol = chakra(Tab, {
  baseStyle: {
    color: '#37474F',
    height: '48px',
    fontSize: '14px',
    fontWeight: '500',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    _focus: {
      boxShadow: 'none',
    },
    _selected: {
      color: '#37474F',
      bg: '#FFFFFF',
      borderLeft: '3px solid',
      borderLeftColor: 'primary.500',
      fontWeight: '600',
    },
  },
});

interface IVerticalSidebarProps {
  tablinks: {
    title: string;
    to: string;
  }[];
}

export const VerticalSideBar = ({ tablinks }: IVerticalSidebarProps) => {
  const route = useRouter();
  const currentIndex = useMemo(
    () => tablinks.findIndex((link) => route.pathname.includes(link.to)),
    [route.pathname]
  );

  return (
    <Box>
      <Tabs variant="unstyled" index={currentIndex}>
        {tablinks.map(({ title, to }, index) => {
          return (
            <Link href={to}>
              <TabCol key={`${title}${index}`}>
                <Text>{title}</Text>
              </TabCol>
            </Link>
          );
        })}
      </Tabs>
    </Box>
  );
};
