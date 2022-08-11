import { BiBell } from 'react-icons/bi';
import { MdOutlineHelpOutline } from 'react-icons/md';
import { useRouter } from 'next/router';
import { Image } from '@chakra-ui/react';

import {
  Avatar,
  Box,
  Icon,
  IconButton,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Select,
  SwitchTabs,
  Text,
} from '@coop/shared/ui';

/* eslint-disable-next-line */
export interface TopLevelHeaderProps {}

const languageList = [
  { label: 'EN', value: 'en' },
  { label: 'ने', value: 'ne' },
];

const calendarList = [
  { label: 'AD', value: 'AD' },
  { label: 'BS', value: 'BS' },
];

export function TopLevelHeader() {
  const router = useRouter();

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

          <Popover placement="bottom-end">
            {({ isOpen }) => (
              <>
                <PopoverTrigger>
                  <Box
                    w="40px"
                    h="40px"
                    as="button"
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    bg={isOpen ? 'primary.dark' : 'primary.800'}
                    _hover={{ backgroundColor: 'primary.dark' }}
                  >
                    <Avatar src={'/avatar.png'} size="sm" />
                  </Box>
                </PopoverTrigger>
                <PopoverContent
                  bg="gray.0"
                  w="260px"
                  border="none"
                  boxShadow="0px 0px 2px rgba(0, 0, 0, 0.2), 0px 2px 10px rgba(0, 0, 0, 0.1)"
                  outline={'none'}
                  _focus={{
                    boxShadow:
                      '0px 0px 2px rgba(0, 0, 0, 0.2), 0px 2px 10px rgba(0, 0, 0, 0.1)',
                  }}
                  color="white"
                  zIndex="2000"
                >
                  <PopoverBody p="0">
                    <Box display="flex" flexDirection="column">
                      <Box
                        px="s12"
                        py="s16"
                        display="flex"
                        flexDirection="row"
                        alignItems="center"
                        borderBottom="1px solid #E6E6E6"
                      >
                        <Avatar src={'/avatar.png'} w="s32" h="s32" />
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

                      <Box p="s8" borderBottom="1px solid #E6E6E6">
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
                        p="s8"
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
                          value={router?.locale}
                          options={languageList}
                          onChange={(value) => {
                            router.push(`/${router.asPath}`, undefined, {
                              locale: value,
                            });
                          }}
                        />
                      </Box>

                      <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="space-between"
                        p="s8"
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
                        <SwitchTabs value="AD" options={calendarList} />
                      </Box>

                      <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="space-between"
                        py="s8"
                      >
                        <Box
                          _hover={{
                            bg: 'background.500',
                          }}
                          h="40px"
                          px="s16"
                          display="flex"
                          alignItems="center"
                        >
                          <Text
                            textAlign="start"
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
                          h="40px"
                          px="s16"
                          display="flex"
                          alignItems="center"
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
