import { Box, Avatar } from '@saccos/myra/ui';
import {
  Image,
  Text,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { RiHistoryFill } from 'react-icons/ri';
import { IoSearchSharp } from 'react-icons/io5';
import { CgMenuGridO } from 'react-icons/cg';
import { MdOutlineHelpOutline } from 'react-icons/md';
import { BiBell } from 'react-icons/bi';

/* eslint-disable-next-line */
export interface TopLevelHeaderProps {
  imageSrc?: string;
}

export function TopLevelHeader(props: TopLevelHeaderProps) {
  return (
    <Box
      h="60px"
      background={'secondary.700'}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'flex-start'}
    >
      <Box
        h="100%"
        w="300px"
        display={'flex'}
        justifyContent={'flex-start'}
        alignItems={'center'}
        flexDirection={'row'}
        pl="16px"
        pr="16px"
      >
        <Image boxSize={'32px'} src={'logo.svg'} alt="logo" />
        <Box
          maxH="100%"
          pl="8px"
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'flex-start'}
        >
          <Text
            fontSize="16px"
            fontWeight="bold"
            color={'white'}
            fontFamily="Mukta"
          >
            नमुना बचत तथ ऋण सहकारी{' '}
          </Text>
          <Text fontSize="16px" color={'white'} fontFamily="Mukta">
            ललितपुर
          </Text>
        </Box>
      </Box>
      <Box
        h="100%"
        flex={1}
        pl="16px"
        pr="16px"
        display={'flex'}
        justifyContent={'space-between'}
        alignItems="center"
      >
        <Box
          w="50%"
          display={'flex'}
          justifyContent={'flex-start'}
          alignItems={'center'}
        >
          <IconButton
            icon={<RiHistoryFill />}
            aria-label="History"
            variant={'ghost'}
            color={'white'}
          />
          <InputGroup flex={1}>
            <InputLeftElement
              pointerEvents="none"
              children={<IoSearchSharp color="white" />}
            />
            <Input type="search" placeholder="खोज्नुहोस्" color={'white'} />
          </InputGroup>
        </Box>
        <Box
          flex={1}
          display={'flex'}
          justifyContent={'flex-end'}
          alignItems="center"
        >
          <IconButton
            icon={<BiBell />}
            aria-label="help"
            variant={'ghost'}
            color={'white'}
          />
          <IconButton
            icon={<MdOutlineHelpOutline />}
            aria-label="help"
            variant={'ghost'}
            color={'white'}
          />
          <Avatar src={'avatar.png'} size="sm" />{' '}
          <IconButton
            icon={<CgMenuGridO />}
            aria-label="menu"
            variant={'ghost'}
            color={'white'}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default TopLevelHeader;
