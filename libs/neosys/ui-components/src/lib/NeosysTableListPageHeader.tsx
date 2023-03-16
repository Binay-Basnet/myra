import { Flex } from '@chakra-ui/react';

import { Box, Text } from '@myra-ui';

import { NeosysPageHeaderTab } from '@coop/neosys-admin/ui-components';

interface INeosysTableListPageHeader {
  heading: string;
  tabItems?: {
    title: string;
    key: string;
  }[];
}

export const NeosysTableListPageHeader = ({ tabItems, heading }: INeosysTableListPageHeader) => (
  <Box
    h="3.125rem"
    bg="white"
    zIndex="10"
    w="100%"
    borderBottom="1px solid "
    borderColor="border.layout"
    px="s16"
  >
    <Flex justify="flex-start" alignItems="center" h="100%">
      <Box display="flex" justifyContent="center" alignItems="center" maxH="3.125rem">
        <Text fontSize="r2" fontWeight="600" color="gray.800">
          {heading}
        </Text>
      </Box>
      <Box ml="48px" display="flex" alignItems="flex-end">
        <NeosysPageHeaderTab list={tabItems ?? []} />
      </Box>
    </Flex>
  </Box>
);
