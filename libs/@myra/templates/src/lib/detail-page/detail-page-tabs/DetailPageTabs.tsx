import { useRouter } from 'next/router';
import { chakra, Tab, Tabs, Text } from '@chakra-ui/react';

import { Box } from '@myra-ui/foundations';

export interface DetailPageTabsProps {
  tabs: string[];
}

const TabCol = chakra(Tab, {
  baseStyle: {
    color: 'gray.800',
    height: '40px',
    fontSize: 'r1',
    fontWeight: '400',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    textTransform: 'capitalize',
    _selected: {
      bg: '#EEF2F7',
      fontWeight: '600',
      borderRadius: 'br2',
    },
    _focus: {
      boxShadow: 'none',
    },
    _hover: {
      bg: 'gray.100',
      borderRadius: 'br2',
    },
  },
});

export const DetailPageTabs = ({ tabs }: DetailPageTabsProps) => {
  const router = useRouter();

  const selectedIndex = tabs.findIndex((tab) => tab.toLowerCase() === router?.query['tab']);

  return (
    <Box p="s16">
      <Box>
        <Tabs variant="unstyled" index={selectedIndex === -1 ? 0 : selectedIndex}>
          <Box display="flex" alignItems="center" flexDir="column">
            {tabs.map((tab) => (
              <Box
                key={tab}
                w="100%"
                onClick={() =>
                  router.push({
                    query: {
                      ...router.query,
                      tab: tab.toLowerCase(),
                    },
                  })
                }
              >
                <TabCol>
                  <Text textTransform="capitalize">{tab.toLowerCase()}</Text>
                </TabCol>
              </Box>
            ))}
          </Box>
        </Tabs>
      </Box>
    </Box>
  );
};

export default DetailPageTabs;
