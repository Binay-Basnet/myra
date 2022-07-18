import React from 'react';
import { BiBell } from 'react-icons/bi';
import Image from 'next/image';

import {
  Avatar,
  Box,
  Button,
  Icon,
  IconButton,
  SearchBar,
  Text,
} from '@coop/shared/ui';

interface IEbankingMainLayoutProps {
  children: React.ReactNode;
}

export const EbankingMainLayout = ({ children }: IEbankingMainLayoutProps) => {
  return (
    <>
      <Box
        as="header"
        position="sticky"
        bg="primary.600"
        h="60px"
        px="s16"
        w="100%"
        top="0"
        zIndex="20"
        display="flex"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box w="300px" display="flex" gap="s8">
          <Box w="s32" h="s32" position="relative">
            <Image src="/logo.png" layout="fill" alt="Logo Image" />
          </Box>
          <Box display="flex" flexDir="column" gap="s4">
            <Text
              fontSize="r1"
              noOfLines={1}
              color="white"
              fontWeight="500"
              lineHeight="100%"
            >
              Namuna Bachat Tatha Ring Shahakari
            </Text>
            <Text
              fontSize="r1"
              noOfLines={1}
              color="primary.200"
              lineHeight="100%"
            >
              Lalitpur
            </Text>
          </Box>
        </Box>

        <Box mt="-1.2px" w="50vw">
          <SearchBar />
        </Box>

        <Box w="300px" display="flex" justifyContent="end" gap="s16">
          <IconButton
            icon={<Icon size="md" as={BiBell} />}
            aria-label="help"
            variant={'ghost'}
            color={'white'}
            borderRadius={'br1'}
            _hover={{ backgroundColor: 'secondary.900' }}
          />
          <Button
            w="40px"
            h="40px"
            variant="ghost"
            _hover={{ backgroundColor: 'secondary.900' }}
          >
            <Avatar src={'/avatar.png'} size="sm" />
          </Button>
        </Box>
      </Box>

      <Box w="80%" h="100%" display="flex" mx="auto">
        <Box w="18.5%" flexShrink={0} borderRadius="br2"></Box>
        <Box borderX="1px" borderColor="gray.200" px="s16" py="s32">
          {children}
        </Box>

        <Box w="18.5%" flexShrink={0} borderRadius="br2"></Box>
      </Box>
    </>
  );
};
