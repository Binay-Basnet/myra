import React from 'react';
import { Flex } from '@chakra-ui/react';

import { Box, PageHeaderTab, Text } from '@coop/shared/ui';

interface ITableListPageHeader {
  heading: string;
  tabItems?: {
    title: string;
    key: string;
  }[];
}

export const SettingsPageHeader = ({
  tabItems,
  heading,
}: ITableListPageHeader) => {
  // const { t } = useTranslation();

  return (
    <Box
      h="60px"
      bg="white"
      zIndex="10"
      w="100%"
      top="110px"
      position="sticky"
      borderBottom="1px solid #E6E6E6"
      pl="s16"
    >
      <Flex justify="flex-start" alignItems="center" h="100%">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          maxH="50px"
        >
          <Text fontSize="r2" fontWeight="600" color="gray.800">
            {/*{t[heading]}*/}
            {heading}
          </Text>
        </Box>
        <Box ml="48px" display="flex" alignItems="flex-end">
          <PageHeaderTab list={tabItems ?? []} />
        </Box>
      </Flex>
    </Box>
  );
};
