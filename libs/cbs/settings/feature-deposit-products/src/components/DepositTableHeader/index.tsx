import { AddIcon } from '@chakra-ui/icons';
import { Flex } from '@chakra-ui/react';

import { Box, Button, Text } from '@coop/shared/ui';

interface IDepostiTableHeader {
  heading: string;
  //   tabItems?: {
  //     title: string;
  //     key: string;
  //   }[];
}

export const DepostiTableHeader = ({
  //   tabItems,
  heading,
}: IDepostiTableHeader) => {
  return (
    <Box
      h="50px"
      bg="white"
      zIndex="10"
      w="100%"
      borderBottom="1px solid #E6E6E6"
      pl="s16"
    >
      <Flex justify="space-between" alignItems="center" h="100%">
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
          <Button
            width="full"
            size="lg"
            justifyContent="start"
            leftIcon={<AddIcon h="11px" />}
            // onClick={() => {
            //   onOpenModal();
            // }}
          >
            {'New Deposit Product'}
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};
