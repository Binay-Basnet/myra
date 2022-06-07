import { Box, Avatar } from '@coop/myra/ui';
import {
  Image,
  Text,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from '@chakra-ui/react';
import { RiHistoryFill } from 'react-icons/ri';
import Link from 'next/link';
import { IoSearchSharp } from 'react-icons/io5';
import { CgMenuGridO } from 'react-icons/cg';
import { MdOutlineHelpOutline } from 'react-icons/md';
import { BiBell } from 'react-icons/bi';
import { useState } from 'react';
import { Icon } from '@coop/myra/ui';
import { AiOutlineSetting } from 'react-icons/ai';
/* eslint-disable-next-line */
export interface TopLevelHeaderProps {
  imageSrc?: string;
}

export function TopLevelHeader(props: TopLevelHeaderProps) {
  const [isClose, setIsClose] = useState(true);
  return (
    <Box
      h="60px"
      background={'secondary.700'}
      display={'flex'}
      alignItems={'center'}
      justifyContent={'flex-start'}
      pr={'s16'}
      cursor={'pointer'}
    >
      <Box
        h="100%"
        w="300px"
        display={'flex'}
        justifyContent={'flex-start'}
        alignItems={'center'}
        flexDirection={'row'}
        pl="s16"
        pr="s16"
      >
        <Image boxSize={'32px'} src={'/logo.svg'} alt="logo" />
        <Link href="/">
          <Box
            maxH="100%"
            pl="s8"
            display={'flex'}
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'flex-start'}
          >
            <Text fontSize="r1" fontWeight="bold" color={'white'}>
              नमुना बचत तथ ऋण सहकारी{' '}
            </Text>
            <Text fontSize="r1" color={'white'}>
              ललितपुर
            </Text>
          </Box>
        </Link>
      </Box>
      <Box
        h="100%"
        flex={1}
        pl="r1"
        pr="r1"
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
            icon={<Icon size="md" as={RiHistoryFill} />}
            aria-label="History"
            variant={'ghost'}
            color={'gray.0'}
            _hover={{ backgroundColor: 'secondary.800' }}
          />
          <InputGroup
            onFocus={() => {
              setIsClose(false);
            }}
            onBlur={() => setIsClose(true)}
            flex={1}
            bg={isClose ? 'secondary.800' : 'gray.0'}
            color={isClose ? 'gray.0' : 'gray.500'}
            _hover={{ color: 'gray.800', backgroundColor: 'gray.0' }}
          >
            <InputLeftElement
              pointerEvents="none"
              color={'currentColor'}
              children={<IoSearchSharp />}
            />
            <Input
              borderRadius={'none'}
              type="search"
              placeholder="खोज्नुहोस्"
              color={'gray.500'}
              fontSize="r1"
            />
            {isClose && (
              <InputRightElement
                pointerEvents="none"
                color={'currentcolor'}
                children={
                  <Text fontSize={'r1'} alignItems="center" pr="s12">
                    Ctrl+/
                  </Text>
                }
              />
            )}
          </InputGroup>
        </Box>
        <Box
          flex={1}
          display={'flex'}
          justifyContent={'flex-end'}
          alignItems="center"
        >
          <IconButton
            icon={<Icon size="md" as={BiBell} />}
            aria-label="help"
            variant={'ghost'}
            color={'white'}
            borderRadius={'br1'}
            _hover={{ backgroundColor: 'secondary.900' }}
          />
          <IconButton
            icon={<Icon size="md" as={MdOutlineHelpOutline} />}
            aria-label="help"
            variant={'ghost'}
            color={'gray.0'}
            borderRadius={'br1'}
            _hover={{ backgroundColor: 'secondary.900' }}
          />
          <Link href={'/settings/general/organization'}>
            <IconButton
              _hover={{ backgroundColor: 'secondary.900' }}
              icon={<Icon size="md" as={AiOutlineSetting} />}
              aria-label="settings"
              variant={'ghost'}
              color={'white'}
              borderRadius={'br1'}
            />
          </Link>

          <IconButton
            _hover={{ backgroundColor: 'secondary.900' }}
            icon={<Icon size="lg" as={CgMenuGridO} />}
            aria-label="menu"
            variant={'ghost'}
            color={'white'}
            borderRadius={'br1'}
          />

          <Box
            w="40px"
            h="40px"
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            _hover={{ backgroundColor: 'secondary.900' }}
          >
            <Avatar src={'/avatar.png'} size="sm" />{' '}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default TopLevelHeader;
