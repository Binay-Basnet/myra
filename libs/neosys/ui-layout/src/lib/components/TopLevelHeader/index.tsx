import { BiBell } from 'react-icons/bi';
import { MdOutlineHelpOutline } from 'react-icons/md';
import { Image } from '@chakra-ui/react';

import { Avatar, Box, Icon, IconButton } from '@coop/shared/ui';

/* eslint-disable-next-line */
export interface TopLevelHeaderProps {}

export function TopLevelHeader(props: TopLevelHeaderProps) {
  return (
    <Box px="s16" py="s10" h="60px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Image src={'/logo.svg'} alt="neosys" />

        <Box display="flex" alignItems="center" gap="s10">
          <IconButton
            h="40px"
            icon={<Icon size="md" as={BiBell} />}
            aria-label="History"
            variant={'ghost'}
            color={'gray.0'}
            _hover={{ backgroundColor: 'primary.dark' }}
          />

          <IconButton
            h="40px"
            icon={<Icon size="md" as={MdOutlineHelpOutline} />}
            aria-label="History"
            variant={'ghost'}
            color={'gray.0'}
            _hover={{ backgroundColor: 'primary.dark' }}
          />

          <Box
            w="32px"
            h="32px"
            as="button"
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Avatar src={'/avatar.png'} size="sm" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default TopLevelHeader;
