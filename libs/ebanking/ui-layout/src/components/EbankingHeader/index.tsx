import { BiBell } from 'react-icons/bi';
import Image from 'next/image';
import { ChevronDownIcon } from '@chakra-ui/icons';

import { Avatar, Box, Button, Icon, IconButton, SearchBar, Text } from '@coop/shared/ui';

export const EbankingHeader = () => (
  <Box
    as="header"
    position="sticky"
    bg="primary.600"
    h="60px"
    w="100%"
    top="0"
    zIndex="20"
    display="flex"
    alignItems="center"
  >
    <Box
      w="25vw"
      mr="5.25vw"
      px="s16"
      h="100%"
      display="flex"
      alignItems="center"
      gap="s8"
      cursor="pointer"
      _hover={{ bg: 'primary.900' }}
    >
      <Box w="s32" h="s32" position="relative" flexShrink={0}>
        <Image src="/logo.png" layout="fill" alt="Logo Image" />
      </Box>
      <Box display="flex" flexDir="column" flexShrink={0}>
        <Text fontSize="r1" noOfLines={1} color="white" fontWeight="500">
          Namuna Bachat Tatha Ring Shahakari
        </Text>
        <Text fontSize="r1" noOfLines={1} color="primary.200">
          Lalitpur
        </Text>
      </Box>

      <Box>
        <Icon as={ChevronDownIcon} size="lg" color="white" />
      </Box>
    </Box>

    <Box w="100%" display="flex" alignItems="center" justifyContent="space-between">
      <Box mt="-1.2px" w="50vw">
        <SearchBar />
      </Box>

      <Box pr="s16" display="flex" justifyContent="end" gap="s16">
        <IconButton
          icon={<Icon size="md" as={BiBell} />}
          aria-label="help"
          variant="ghost"
          color="white"
          borderRadius="br1"
          _hover={{ backgroundColor: 'secondary.900' }}
        />
        <Button w="40px" h="40px" variant="ghost" _hover={{ backgroundColor: 'secondary.900' }}>
          <Avatar src="/avatar.png" size="sm" />
        </Button>
      </Box>
    </Box>
  </Box>
);
