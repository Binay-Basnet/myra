import React from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { HamburgerIcon, SearchIcon } from '@chakra-ui/icons';
import { Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { Box, Button, Icon, SmallPagination, Text } from '@coop/myra/ui';

export const TableSearch = ({ pagination }: any) => {
  return (
    <Box
      h="50px"
      w="100%"
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      borderBottom="1px solid #E6E6E6"
    >
      <Box w="500px" pt="15px" pl="s16">
        <InputGroup size="sm">
          <InputLeftElement pointerEvents="none" h="22px" zIndex="0">
            <SearchIcon color="gray.300" />
          </InputLeftElement>
          <Input
            variant="unstyled"
            type="search"
            placeholder="Search Members"
          />
        </InputGroup>
      </Box>
      <Box display="flex">
        <SmallPagination
          limit={20}
          total={100}
          startCursor={pagination?.startCursor}
          endCursor={pagination?.endCursor}
        />
        <Box
          flex={1}
          borderLeft="1px solid #E6E6E6"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Button variant="ghost">
            <HamburgerIcon color="#1DB954" /> <Text ml="10px">Default</Text>
          </Button>
          <Button variant="ghost">
            <Icon as={BsThreeDotsVertical} color="#636972" />{' '}
            <Text ml="10px">Options</Text>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
