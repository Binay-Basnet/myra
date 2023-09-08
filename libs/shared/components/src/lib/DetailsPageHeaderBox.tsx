import { useRouter } from 'next/router';
import { Tab, TabIndicator, TabList, Tabs } from '@chakra-ui/react';
import isEmpty from 'lodash/isEmpty';

import { Box, Text } from '@myra-ui';

export const DetailsPageHeaderBox = (props: { title: string; tablist?: string[] }) => {
  const router = useRouter();
  const subTab = router?.query?.['subTab'];
  const { title, tablist } = props;
  return (
    <Box
      display="flex"
      alignItems="center"
      gap="s32"
      pl="s20"
      py="s10"
      bg="white"
      fontWeight="medium"
      borderBottom="1px"
      borderColor="border.layout"
      // position="sticky"
      // top={0}
      // zIndex={2}
    >
      <Text fontSize="r3">{title}</Text>
      {!isEmpty(tablist) && (
        <Tabs position="relative" variant="unstyled">
          <TabList>
            {tablist?.map((item) => (
              <Tab
                onClick={() =>
                  router.push(
                    {
                      query: {
                        ...router.query,
                        subTab: item.toLowerCase(),
                      },
                    },
                    undefined,
                    { shallow: true }
                  )
                }
              >
                <Text fontWeight={subTab === item?.toLowerCase() ? 'medium' : ''}>{item}</Text>
              </Tab>
            ))}
          </TabList>
          <TabIndicator mt="s8" height="2px" bg="red.500" />
        </Tabs>
      )}
    </Box>
  );
};

export default DetailsPageHeaderBox;
