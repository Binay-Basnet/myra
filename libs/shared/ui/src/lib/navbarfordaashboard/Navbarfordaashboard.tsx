/* eslint-disable-next-line */
import {
  Box,
  Text,
  Image,
  Flex,
  Spacer,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
} from '@chakra-ui/react';
import { Select, SwitchTabs, Icon, IconButton } from '@coop/shared/ui';
import { useRouter } from 'next/router';
import { AiOutlineSetting } from 'react-icons/ai';
import { MdOutlineHelpOutline } from 'react-icons/md';
import { BiBell } from 'react-icons/bi';
import { CgMenuGridO } from 'react-icons/cg';
import Link from 'next/link';
import React from 'react';
import { useTranslation } from '@coop/shared/utils';
import { IoHomeSharp, IoGrid } from 'react-icons/io5';

const languageList = [
  { label: 'EN', value: 'en' },
  { label: 'ने', value: 'ne' },
];

const calendarList = [
  { label: 'AD', value: 'AD' },
  { label: 'BS', value: 'BS' },
];

/* eslint-disable-next-line */
export interface NavbarfordaashboardProps {}

const ActiveLink = (props: { children: React.ReactNode; href: string }) => {
  const { children, href } = props;
  const router = useRouter();
  const style = {
    marginRight: 10,
    height: '60px',
    width: '130px',
    boxShadow: router?.asPath === href ? ' inset 0px -4px 0px #8CC63F' : 'none',
  };

  return (
    <Link href={href}>
      <Text
        fontFamily="Inter"
        fontSize="14px"
        fontWeight="600"
        color="#FFFFFF"
        display="flex"
        justifyContent="center"
        cursor="pointer"
        alignItems="center"
        style={style}
      >
        {children}
      </Text>
    </Link>
  );
};

export const Navbarfordaashboard = () => {
  const { t } = useTranslation();
  const router = useRouter();
  // const [isClose, setIsClose] = useState(true);
  // const locale = router?.locale;
  // const [langActiveTab, setLangActiveTab] = useState<number>(
  //   locale === 'ne' ? 1 : 0
  // );
  // const [activeTab, setActiveTab] = useState(0);
  return (
    <Box h="60px" px="5" background="primary.dark">
      <Flex>
        <Box cursor="pointer">
          <Image src="/dashboardnavbar/MyraLogo.png" alt="logo" />
        </Box>
        <Spacer />
        <Box display="flex" alignItems="flex-end" h="60px">
          <ActiveLink href="/">
            <Icon as={IoHomeSharp} mr="s12" />
            {t['home']}
          </ActiveLink>
          <ActiveLink href="/dashboard-main">
            <Icon as={IoGrid} mr="s12" ml="s4" />
            {t['dashboard']}
          </ActiveLink>
        </Box>
        <Spacer />

        <Flex justify="flex-end" alignItems="center" gap="s4">
          <IconButton
            ml="s16"
            icon={<Icon size="md" as={BiBell} />}
            aria-label="help"
            variant="ghost"
            color="white"
            borderRadius="br1"
            _hover={{ backgroundColor: 'secondary.900' }}
          />
          <IconButton
            icon={<Icon size="md" as={MdOutlineHelpOutline} />}
            aria-label="help"
            variant="ghost"
            color="gray.0"
            borderRadius="br1"
            _hover={{ backgroundColor: 'secondary.900' }}
          />
          <Link href="/settings/general/audit-log">
            <IconButton
              _hover={{ backgroundColor: 'secondary.900' }}
              icon={<Icon size="md" as={AiOutlineSetting} />}
              aria-label="settings"
              variant="ghost"
              color="white"
              borderRadius="br1"
            />
          </Link>

          <IconButton
            _hover={{ backgroundColor: 'secondary.900' }}
            icon={<Icon size="lg" as={CgMenuGridO} />}
            aria-label="menu"
            variant="ghost"
            color="white"
            borderRadius="br1"
          />

          <Popover placement="bottom-end">
            {({ isOpen }) => (
              <>
                <PopoverTrigger>
                  <Box
                    w="40px"
                    h="40px"
                    as="button"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    bg={isOpen ? 'secondary.900' : 'secondary.700'}
                    _hover={{ backgroundColor: 'secondary.900' }}
                  >
                    <Avatar src="/avatar.png" size="sm" />
                  </Box>
                </PopoverTrigger>
                <PopoverContent
                  bg="gray.0"
                  w="260px"
                  border="none"
                  boxShadow="0px 0px 2px rgba(0, 0, 0, 0.2), 0px 2px 10px rgba(0, 0, 0, 0.1)"
                  outline="none"
                  _focus={{
                    boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.2), 0px 2px 10px rgba(0, 0, 0, 0.1)',
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
                        borderBottom="1px solid"
                        borderColor="border.layout"
                      >
                        <Avatar src="/avatar.png" w="s32" h="s32" />
                        <Box
                          ml="14px"
                          display="flex"
                          flexDirection="column"
                          justifyContent="space-between"
                        >
                          <Text fontWeight="SemiBold" fontSize="s2" color="primary.500">
                            Anish Bhusal
                          </Text>
                          <Text fontWeight="Regular" fontSize="s2" color="gray.500">
                            Teller
                          </Text>
                        </Box>
                      </Box>

                      <Box p="s8" borderBottom="1px solid" borderColor="border.layout">
                        <Select
                          label="Branch"
                          __placeholder="Lalitpur"
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
                        borderBottom="1px solid"
                        borderColor="border.layout"
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
                        borderBottom="1px solid"
                        borderColor="border.layout"
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
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navbarfordaashboard;
