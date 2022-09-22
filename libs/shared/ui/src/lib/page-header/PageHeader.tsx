import { Box, Flex, Text } from '@chakra-ui/react';

import PageHeaderTab from '../page-header-tab/PageHeaderTab';

/* eslint-disable-next-line */
export interface PageHeaderProps {
  heading: string;
  tabItems?: {
    title: string;
    key: string;
  }[];
}

export const PageHeader = ({ heading, tabItems }: PageHeaderProps) => (
  <Box
    h="60px"
    bg="white"
    zIndex="10"
    w="100%"
    borderBottom="1px solid "
    borderColor="border.layout"
    pl="s16"
  >
    <Flex justify="flex-start" alignItems="center" h="100%">
      <Box display="flex" justifyContent="center" alignItems="center" maxH="50px">
        <Text fontSize="r2" fontWeight="600" color="gray.800">
          {heading}
        </Text>
      </Box>
      <Box h="100%" ml="48px" display="flex" alignItems="flex-end">
        <PageHeaderTab list={tabItems ?? []} />
      </Box>
    </Flex>
  </Box>
);

export default PageHeader;
