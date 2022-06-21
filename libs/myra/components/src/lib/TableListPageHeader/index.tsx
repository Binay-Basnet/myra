import React from 'react';
import { Flex } from '@chakra-ui/react';
import { Box, Text } from '@coop/shared/ui';
import { TabRow } from '../tab/TabMemberPageRow';
import { useTranslation } from '@coop/shared/utils';

interface ITableListPageHeader {
  heading: string;
  tabItems?: {
    title: string;
    key: string;
  }[];
}

export const TableListPageHeader = ({
  tabItems,
  heading,
}: ITableListPageHeader) => {
  const { t } = useTranslation();
  return (
    <Box h="50px" w="100%" borderBottom="1px solid #E6E6E6" pl="s16">
      <Flex justify="flex-start" h="100%">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          maxH="50px"
        >
          <Text fontSize="r2" fontWeight="600" color="gray.800">
            {t[heading]}
          </Text>
        </Box>
        <Box ml="48px" display="flex" alignItems="flex-end">
          <TabRow list={tabItems ?? []} />
        </Box>
      </Flex>
    </Box>
  );
};
