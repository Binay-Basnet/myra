import React from 'react';
import { AiOutlineSetting } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import {
  AddIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  HamburgerIcon,
  SearchIcon,
} from '@chakra-ui/icons';
import {
  Flex,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { Box, Button, Divider, Icon, MainLayout, Text } from '@saccos/myra/ui';

import { TabColumn } from '../tab/TabforMemberPage';
import { TabRow } from '../tab/TabMemberPageRow';

interface IPageLayoutProps {
  children: React.ReactNode;
  heading: string;
  columns: {
    title: string;
    link: string;
  }[];
  rows: {
    title: string;
    key: string;
  }[];
  btnOnClick: () => void;
  mainTitle: string;
}

export const PageLayout = ({
  children,
  heading,
  columns,
  rows,
  btnOnClick,
  mainTitle,
}: IPageLayoutProps) => {
  return (
    <MainLayout>
      <Box mt="110px" display="flex">
        <Box width="275px" p="s24" flexShrink={0}>
          <Text fontSize="l1" fontWeight="600" color="gray.800">
            {heading}
          </Text>
          <Divider my="s16" />
          <Button
            width="full"
            size="lg"
            justifyContent="start"
            leftIcon={<AddIcon h="11px" />}
            onClick={btnOnClick}
          >
            New {heading}
          </Button>
          <Divider my="s16" />
          <TabColumn list={columns} />
          <Divider my="s16" />
          <Button
            variant="ghost"
            color="#37474F"
            height="s48"
            width="full"
            justifyContent="start"
            leftIcon={
              <Icon as={AiOutlineSetting} size="md" color="primary.500" />
            }
          >
            {heading} Settings
          </Button>
        </Box>

        <Box p="s16" width="100%" borderRadius="br3">
          <Box bg="white" borderRadius="br3">
            <Box h="50px" w="100%" borderBottom="1px solid #E6E6E6" pl="s16">
              <Flex justify="flex-start" h="100%">
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  maxH="50px"
                >
                  <Text fontSize="r2" fontWeight="600" color="gray.800">
                    {mainTitle}
                  </Text>
                </Box>
                <Box ml="48px" display="flex" alignItems="flex-end">
                  <TabRow list={rows} />
                </Box>
              </Flex>
            </Box>
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
                    <HamburgerIcon color="#1DB954" />{' '}
                    <Text ml="10px">Default</Text>
                  </Button>
                  <Button variant="ghost">
                    <Icon as={BsThreeDotsVertical} color="#636972" />{' '}
                    <Text ml="10px">Options</Text>
                  </Button>
                </Box>
              </Box>
            </Box>
            <Box width="100%">{children}</Box>
          </Box>
        </Box>
      </Box>
    </MainLayout>
  );
};
