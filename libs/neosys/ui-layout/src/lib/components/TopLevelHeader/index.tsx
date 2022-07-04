import { BiBell } from 'react-icons/bi';
import { MdOutlineHelpOutline } from 'react-icons/md';
import { Image } from '@chakra-ui/react';

import { Avatar, Box, Icon, IconButton } from '@coop/shared/ui';

/* eslint-disable-next-line */
export interface TopLevelHeaderProps {}

export function TopLevelHeader(props: TopLevelHeaderProps) {
  return (
    <Box p="10px 16px" h="60px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Image src={'/logo.svg'} alt="neosys" />

        <Box display="flex" alignItems="center" gap="s10">
          <IconButton
            h="40px"
            icon={<Icon size="md" as={BiBell} />}
            aria-label="History"
            variant={'ghost'}
            color={'gray.0'}
            // _hover={{ backgroundColor: 'secondary.800' }}
          />

          <IconButton
            h="40px"
            icon={<Icon size="md" as={MdOutlineHelpOutline} />}
            aria-label="History"
            variant={'ghost'}
            color={'gray.0'}
            // _hover={{ backgroundColor: 'secondary.800' }}
          />

          <Box
            w="32px"
            h="32px"
            as="button"
            // display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            // bg={isOpen ? 'secondary.900' : 'secondary.700'}
            // _hover={{ backgroundColor: 'secondary.900' }}
          >
            <Avatar src={'/avatar.png'} size="sm" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default TopLevelHeader;
