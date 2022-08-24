import { Flex } from '@chakra-ui/react';

import { NeosysPageHeaderTab } from '@coop/neosys-admin/ui-components';
import { Box, Text } from '@coop/shared/ui';

interface INeosysTableListPageHeader {
  heading: string;
  tabItems?: {
    title: string;
    key: string;
  }[];
}

export const NeosysTableListPageHeader = ({
  tabItems,
  heading,
}: INeosysTableListPageHeader) => {
  return (
    <Box
      h="50px"
      bg="white"
      zIndex="10"
      w="100%"
      borderBottom="1px solid "
      borderColor="border.layout"
      px="s16"
    >
      <Flex justify="flex-start" alignItems="center" h="100%">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          maxH="50px"
        >
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
};
