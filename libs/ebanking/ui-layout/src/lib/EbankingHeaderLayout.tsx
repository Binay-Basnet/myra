import { BiBell } from 'react-icons/bi';
import Image from 'next/image';

import { Avatar, Box, Button, Icon, IconButton } from '@coop/shared/ui';

interface IEbankingHeaderLayoutProps {
  children: React.ReactNode;
}

export const EbankingHeaderLayout = ({ children }: IEbankingHeaderLayoutProps) => (
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
      <Box position="relative" h="s32" w="285px">
        <Image src="/img.png" alt="logo" layout="fill" />{' '}
      </Box>
      <Box w="250px" display="flex" justifyContent="end" gap="s16">
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
    <Box w="100%" h="100%" display="flex" justifyContent="center" bg="white" minH="100vh">
      <Box w="445px" px="s16" display="flex" flexDir="column" py="s32" gap="s32">
        {children}
      </Box>
    </Box>
  </>
);
