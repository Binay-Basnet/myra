import React, { useState } from 'react';
import { AiOutlineSetting } from 'react-icons/ai';
import { BiBell } from 'react-icons/bi';
import { CgMenuGridO } from 'react-icons/cg';
import { IoSearchSharp } from 'react-icons/io5';
import { MdOutlineHelpOutline } from 'react-icons/md';
import { RiHistoryFill } from 'react-icons/ri';
import {
  IconButton,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
} from '@chakra-ui/react';
import {
  Avatar,
  Box,
  Button,
  Icon,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Select,
  SwitchTabs,
} from '@coop/shared/ui';
import { format } from 'date-fns';
import Link from 'next/link';
import { useRouter } from 'next/router';

/* eslint-disable-next-line */
export interface TopLevelHeaderProps {
  imageSrc?: string;
}

const languageList = [
  { key: 'en', value: 'EN' },
  { key: 'ne', value: 'ने' },
];

const calendarList = [
  { key: 'ad', value: 'AD' },
  { key: 'bs', value: 'BS' },
];

const currentDate = format(new Date(), 'yyyy-MM-dd');
const closingDate = format(new Date(), 'yyyy-MM-dd');

export function TopLevelHeader(props: TopLevelHeaderProps) {
  const router = useRouter();
  const [isClose, setIsClose] = useState(true);
  const locale = router?.locale;
  const [langActiveTab, setLangActiveTab] = useState<number>(
    locale === 'ne' ? 1 : 0
  );
  const [activeTab, setActiveTab] = useState(0);

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
            ml={'s16'}
            borderRadius={'6px'}
            border="none"
            onFocus={() => {
              setIsClose(false);
            }}
            onBlur={() => setIsClose(true)}
            flex={1}
            borderColor="secondary.700"
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
          <Popover placement="bottom-end" arrowPadding={0} gutter={3}>
            {({ isOpen }) => (
              <>
                <PopoverTrigger>
                  <Box
                    bg={isOpen ? 'secondary.900' : 'secondary.700'}
                    _hover={{ backgroundColor: 'secondary.900' }}
                    px="s12"
                    py="s10"
                  >
                    <Text
                      p="s10 s12"
                      fontSize={'s3'}
                      fontWeight="500"
                      color="gray.0"
                    >
                      {' '}
                      Date: {currentDate}
                    </Text>
                  </Box>
                </PopoverTrigger>
                <PopoverContent
                  bg="gray.0"
                  w="260px"
                  border="2px"
                  borderColor="#E0E5EB"
                  boxShadow={'none'}
                  outline={'none'}
                  _focus={{ boxShadow: 'none' }}
                >
                  {currentDate !== closingDate && (
                    <PopoverBody border="1px" borderColor="#E0E5EB">
                      <Text fontSize={'r1'} fontWeight="400" color="danger.500">
                        The transaction date is not same as the calendar date
                      </Text>
                    </PopoverBody>
                  )}
                  <PopoverBody border="1px" borderColor="#E0E5EB">
                    <Text fontSize={'s3'} fontWeight="500" color="gray.700">
                      Transaction Date
                    </Text>
                    <Text fontSize={'s3'} fontWeight="500" color="gray.800">
                      {closingDate}
                    </Text>
                  </PopoverBody>
                  <PopoverBody border="1px" borderColor="#E0E5EB">
                    <Text fontSize={'s3'} fontWeight="500" color="gray.700">
                      Calender Date
                    </Text>
                    <Text fontSize={'s3'} fontWeight="500" color="gray.800">
                      {currentDate}
                    </Text>
                  </PopoverBody>
                  <PopoverBody p="s8">
                    <Button
                      variant="solid"
                      display="flex"
                      justifyContent={'center'}
                      w="100%"
                    >
                      Close Day
                    </Button>
                  </PopoverBody>
                </PopoverContent>
              </>
            )}
          </Popover>

          <IconButton
            ml="s16"
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

          <Popover placement="bottom-end">
            {({ isOpen }) => (
              <>
                <PopoverTrigger>
                  <Box
                    w="40px"
                    h="40px"
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    bg={isOpen ? 'secondary.900' : 'secondary.700'}
                    _hover={{ backgroundColor: 'secondary.900' }}
                  >
                    <Avatar src={'/avatar.png'} size="sm" />
                  </Box>
                </PopoverTrigger>
                <PopoverContent
                  bg="gray.0"
                  w="260px"
                  border="2px"
                  borderColor="#E0E5EB"
                  boxShadow={'none'}
                  outline={'none'}
                  _focus={{ boxShadow: 'none' }}
                  color="white"
                  zIndex="2000"
                >
                  <PopoverBody px="s8" paddingTop="s8">
                    <Box display="flex" flexDirection="column">
                      <Box
                        p="12px"
                        display="flex"
                        flexDirection="row"
                        borderBottom="1px solid #E6E6E6"
                      >
                        <Avatar src={'/avatar.png'} size="sm" />
                        <Box
                          ml="14px"
                          display="flex"
                          flexDirection="column"
                          justifyContent="space-between"
                        >
                          <Text
                            fontWeight="SemiBold"
                            fontSize="s2"
                            color="primary.500"
                          >
                            Anish Bhusal
                          </Text>
                          <Text
                            fontWeight="Regular"
                            fontSize="s2"
                            color="gray.500"
                          >
                            Teller
                          </Text>
                        </Box>
                      </Box>

                      <Box p="12px" borderBottom="1px solid #E6E6E6">
                        <Select
                          label="Branch"
                          placeholder="Lalitpur"
                          options={[
                            {
                              label: 'Lalitpur',
                              value: 'lalitpur',
                            },
                            {
                              label: 'Option 2',
                              value: 'option-2',
                            },
                            {
                              label: 'Option 3',
                              value: 'option-3',
                            },
                          ]}
                        />
                      </Box>

                      <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="space-between"
                        p="12px"
                        borderBottom="1px solid #E6E6E6"
                      >
                        <Text
                          mb="4px"
                          fontWeight="Medium"
                          fontSize="s3"
                          color="neutralColorLight.Gray-80"
                        >
                          Language
                        </Text>
                        <SwitchTabs
                          list={languageList}
                          activeTab={langActiveTab}
                          setActiveTab={setLangActiveTab}
                          onClick={() => {
                            const locale = langActiveTab === 1 ? 'en' : 'ne';
                            router.push(`/${router.asPath}`, undefined, {
                              locale,
                            });
                          }}
                        />
                      </Box>

                      <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="space-between"
                        p="12px"
                        borderBottom="1px solid #E6E6E6"
                      >
                        <Text
                          mb="4px"
                          fontWeight="Medium"
                          fontSize="s3"
                          color="neutralColorLight.Gray-80"
                        >
                          Calendar
                        </Text>
                        <SwitchTabs
                          activeTab={activeTab}
                          setActiveTab={setActiveTab}
                          list={calendarList}
                        />
                      </Box>

                      <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="space-between"
                        paddingTop="12px"
                      >
                        <Box
                          _hover={{
                            bg: 'background.500',
                          }}
                          px="s8"
                          py="s8"
                        >
                          <Text
                            textAlign="start"
                            mb="4px"
                            fontWeight="Regular"
                            fontSize="r1"
                            color="neutralColorLight.Gray-80"
                          >
                            Profile Settings
                          </Text>
                        </Box>

                        <Box
                          _hover={{
                            bg: 'background.500',
                          }}
                          px="s8"
                          py="s8"
                        >
                          <Text
                            fontWeight="Regular"
                            fontSize="r1"
                            color="neutralColorLight.Gray-80"
                          >
                            Logout
                          </Text>
                        </Box>
                      </Box>
                    </Box>
                  </PopoverBody>
                </PopoverContent>
              </>
            )}
          </Popover>
        </Box>
      </Box>
    </Box>
  );
}

export default TopLevelHeader;
