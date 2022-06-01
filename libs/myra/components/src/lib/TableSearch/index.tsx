import React from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HamburgerIcon,
  SearchIcon,
} from '@chakra-ui/icons';
import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { Box, Button, Icon, Text } from '@saccos/myra/ui';

export const TableSearch = () => {
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
        <Box
          w="184px"
          borderLeft="1px solid #E6E6E6"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <IconButton
            aria-label="Previous"
            variant="ghost"
            icon={<ChevronLeftIcon />}
            h="100%"
          />
          <Text fontSize="13px" fontWeight="600" color="#252525">
            1 - 20 / 50
          </Text>
          <IconButton
            variant="ghost"
            aria-label="Next"
            icon={<ChevronRightIcon />}
            h="100%"
          />
        </Box>
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
