import { useRef, useState } from 'react';
import { GlobalHotKeys } from 'react-hotkeys';
import { BiBell } from 'react-icons/bi';
import { BsArrowRight } from 'react-icons/bs';
import { CgMenuGridO } from 'react-icons/cg';
import { RiHistoryFill } from 'react-icons/ri';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { format } from 'date-fns';

import {
  DateType,
  Language,
  logout,
  RootState,
  setPreference,
  useAppDispatch,
  useAppSelector,
  useSetPreferenceMutation,
} from '@coop/cbs/data-access';
import {
  asyncToast,
  Avatar,
  Box,
  Button,
  Divider,
  Grid,
  Icon,
  IconButton,
  Modal,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Select,
  ShortcutTab,
  SwitchTabs,
  Text,
  TextFields,
} from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import SearchBar from '../search-bar/SearchBar';

/* eslint-disable-next-line */
export interface TopLevelHeaderProps {
  imageSrc?: string;
}

const languageList = [
  { label: 'EN', value: 'en' },
  { label: 'ने', value: 'ne' },
];

const calendarList = [
  { label: 'AD', value: DateType.Ad },
  { label: 'BS', value: DateType.Bs },
];
const keyMap = {
  inputFocus: ['ctrl+/'],
  appSwitcher: 'alt+o',
  showHelpOptions: ['alt+l'],

  // up: ["i"],
  // shiftUp: ["shift+i"],
  // delete: ["r"],
  // addFocus: ["a"]
};
const currentDate = format(new Date(), 'yyyy-MM-dd');
const closingDate = format(new Date(), 'yyyy-MM-dd');

// export const Input = forwardRef<HTMLInputElement, InputProps>(
//   (props: InputProps, ref) => {
//     return (
//       <ChakraInput
//         {...props}
//         ref={ref}
//         onKeyDown={(e) => {
//           if (e.key === 'Escape') {
//             e.currentTarget?.blur();
//           }
//         }}
//       />
//     );
//   }
// );
export const TopLevelHeader = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { mutateAsync } = useSetPreferenceMutation();
  const userId = useAppSelector((state) => state?.auth?.user?.id);

  const preference = useAppSelector((state: RootState) => state?.auth?.preference);

  const helpOptions = [
    {
      title: t['shortcutsModalGeneral'],
      shortcuts: [
        { subTitle: t['shortcutsModalFocusOut'], shortcutKeys: ['Esc'] },
        { subTitle: t['shortcutModalSearch'], shortcutKeys: ['Ctrl', '/'] },
        { subTitle: t['shortcutModalHistory'], shortcutKeys: ['Alt', '/'] },
        { subTitle: t['shortcutModalAppSwitcher'], shortcutKeys: ['Alt', 'O'] },
        { subTitle: t['shortcutModalHelp'], shortcutKeys: ['Alt', 'I'] },
      ],
    },
    {
      subTitle: t['shortcutModalAppHeader'],
      shortcuts: [
        { subTitle: t['shortcutModalAppMenu'], shortcutKeys: ['Alt', 'M'] },
        { subTitle: t['shortcutModalDirectMenuOpen'], shortcutKeys: ['1'] },
      ],
    },
    {
      title: t['shortcutModalForms'],
      shortcuts: [
        { subTitle: t['shortcutModalSave'], shortcutKeys: ['Ctrl or Shift', 'S'] },
        { subTitle: t['shortcutModalNavigateBtnFields'], shortcutKeys: ['Tab'] },
        { subTitle: t['shortcutModalCancel'], shortcutKeys: ['Ctrl', 'X'] },
      ],
    },
    {
      title: t['shortcutModalObject'],
      shortcuts: [
        { subTitle: t['shortcutModalNewOpen'], shortcutKeys: ['Shift', 'N'] },
        { subTitle: t['shortcutModalObjectMenu'], shortcutKeys: ['.', '.'] },
        { subTitle: t['shortcutModalSwitchTabs'], shortcutKeys: ['<', '>'] },
      ],
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  // const handleModalOpen = () => {
  //   setIsModalOpen(true);
  // };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  const inputRef = useRef<HTMLInputElement>(null);
  const appSwitcherRef = useRef<HTMLButtonElement>(null);
  const helpIconRef = useRef<HTMLButtonElement>(null);
  const handlers = {
    inputFocus() {
      inputRef.current?.focus();
    },

    appSwitcher() {
      if (appSwitcherRef.current) {
        appSwitcherRef.current?.click();
      }
    },
    showHelpOptions() {
      if (helpIconRef.current) {
        helpIconRef.current?.click();
      }
    },
  };

  return (
    <GlobalHotKeys keyMap={keyMap} handlers={handlers}>
      <Box
        h="60px"
        background="secondary.700"
        display="flex"
        alignItems="asdcenter"
        justifyContent="flex-start"
      >
        <Link href="/">
          <Box
            px="s16"
            h="100%"
            w="300px"
            display="flex"
            justifyContent="flex-start"
            alignItems="center"
            flexDirection="row"
            cursor="pointer"
            _hover={{ backgroundColor: 'secondary.900' }}
          >
            <Image height={32} width={32} src="/neosystest.png" alt="logo" />

            <Box
              maxH="100%"
              pl="s8"
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="flex-start"
              gap="s2"
            >
              <Text fontSize="s3" fontWeight="bold" color="white" noOfLines={1} lineHeight="130%">
                Neosys Saving and Credit Cooperative
              </Text>
              <Text fontSize="s3" color="white" p={0} lineHeight="100%">
                Lalitpur
              </Text>
            </Box>
          </Box>
        </Link>

        <Box
          h="100%"
          flex={1}
          px="s16"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          <Box w="50%" display="flex" justifyContent="flex-start" alignItems="center" gap="s16">
            <IconButton
              h="40px"
              icon={<Icon size="md" as={RiHistoryFill} />}
              aria-label="History"
              variant="ghost"
              color="gray.0"
              _hover={{ backgroundColor: 'secondary.800' }}
            />
            <SearchBar />
          </Box>
          <Box flex={1} display="flex" justifyContent="flex-end" alignItems="center">
            <Popover placement="bottom-end" arrowPadding={0} gutter={3}>
              {({ isOpen }) => (
                <>
                  <PopoverTrigger>
                    <Box
                      as="button"
                      bg={isOpen ? 'secondary.900' : 'secondary.700'}
                      _hover={{ backgroundColor: 'secondary.900' }}
                      px="s12"
                      py="s10"
                      borderRadius="br1"
                    >
                      <Text p="s10 s12" fontSize="s3" fontWeight="500" color="gray.0">
                        Date: {currentDate}
                      </Text>
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
                  >
                    {currentDate !== closingDate && (
                      <PopoverBody>
                        <Text fontSize="r1" fontWeight="400" color="danger.500">
                          The transaction date is not same as the calendar date
                        </Text>
                      </PopoverBody>
                    )}
                    <PopoverBody borderBottom="1px" borderColor="border.layout">
                      <Text fontSize="s3" fontWeight="500" color="gray.700">
                        Transaction Date
                      </Text>
                      <Text fontSize="s3" fontWeight="500" color="gray.800">
                        {closingDate}
                      </Text>
                    </PopoverBody>
                    <PopoverBody borderBottom="1px" borderColor="border.layout">
                      <Text fontSize="s3" fontWeight="500" color="gray.700">
                        Calender Date
                      </Text>
                      <Text fontSize="s3" fontWeight="500" color="gray.800">
                        {currentDate}
                      </Text>
                    </PopoverBody>
                    <PopoverBody p="s8">
                      <Button variant="solid" display="flex" justifyContent="center" w="100%">
                        Close Day
                      </Button>
                    </PopoverBody>
                  </PopoverContent>
                </>
              )}
            </Popover>

            <IconButton
              ml="s16"
              width="40px"
              height="40px"
              icon={<Icon size="md" as={BiBell} />}
              aria-label="help"
              variant="ghost"
              color="white"
              borderRadius="br1"
              _hover={{ backgroundColor: 'secondary.900' }}
            />

            <Popover placement="bottom-end" gutter={3}>
              {() => (
                <>
                  <PopoverTrigger>
                    <IconButton
                      width="40px"
                      height="40px"
                      _hover={{ backgroundColor: 'secondary.900' }}
                      icon={<Icon size="lg" as={CgMenuGridO} />}
                      aria-label="menu"
                      variant="ghost"
                      color="white"
                      borderRadius="br1"
                      ref={appSwitcherRef}
                    />
                  </PopoverTrigger>

                  <PopoverContent
                    bg="gray.0"
                    w="370px"
                    h="auto"
                    px="s12"
                    py="s24"
                    border="none"
                    boxShadow="0px 0px 2px rgba(0, 0, 0, 0.2), 0px 2px 10px rgba(0, 0, 0, 0.1)"
                    outline="none"
                    _focus={{
                      boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.2), 0px 2px 10px rgba(0, 0, 0, 0.1)',
                    }}
                    color="white"
                    zIndex="10"
                  >
                    <PopoverBody p={0}>
                      <Box display="grid" gridTemplateColumns="repeat(3,1fr)" gap="s8">
                        <Box
                          display="flex"
                          flexDirection="column"
                          textAlign="center"
                          alignItems="center"
                          gap="s8"
                          p="s8"
                          cursor="pointer"
                          borderRadius="br2"
                          _hover={{ bg: 'primary.0' }}
                          onClick={() => router.push('/members/list')}
                        >
                          <Image width={48} height={48} src="/cbs.svg" alt="Core Banking System" />
                          <Text
                            fontSize="s3"
                            fontWeight="Medium"
                            color="neutralColorLight.Gray-60"
                            lineHeight="125%"
                          >
                            {t['corebankingSystems']}
                          </Text>
                        </Box>

                        <Box
                          display="flex"
                          flexDirection="column"
                          textAlign="center"
                          alignItems="center"
                          gap="s8"
                          cursor="pointer"
                          p="s8"
                          borderRadius="br2"
                          _hover={{ bg: 'primary.0' }}
                          onClick={() => router.push('/inventory/register')}
                        >
                          <Image
                            width={48}
                            height={48}
                            src="/inventory.svg"
                            alt="Inventory System"
                          />
                          <Text
                            fontSize="s3"
                            fontWeight="Medium"
                            color="neutralColorLight.Gray-60"
                            lineHeight="125%"
                          >
                            {t['inventoryManagement']}
                          </Text>
                        </Box>

                        <Box
                          display="flex"
                          flexDirection="column"
                          textAlign="center"
                          alignItems="center"
                          gap="s8"
                          p="s8"
                          cursor="pointer"
                          borderRadius="br2"
                          _hover={{ bg: 'primary.0' }}
                          onClick={() => router.push('/loan')}
                        >
                          <Image
                            height={48}
                            width={48}
                            src="/memberandshare.svg"
                            alt="Fixed Asset Management"
                          />
                          <Text
                            fontSize="s3"
                            fontWeight="Medium"
                            color="neutralColorLight.Gray-60"
                            lineHeight="125%"
                            overflow="hidden"
                            textOverflow="ellipsis"
                          >
                            {t['memberAndShareManagement']}
                          </Text>
                        </Box>

                        <Box
                          display="flex"
                          flexDirection="column"
                          textAlign="center"
                          alignItems="center"
                          gap="s8"
                          p="s8"
                          cursor="pointer"
                          borderRadius="br2"
                          _hover={{ bg: 'primary.0' }}
                          onClick={() => router.push('/accounting/sales/list')}
                        >
                          <Image
                            width={48}
                            height={48}
                            src="/accounting.svg"
                            alt="Accounting System"
                          />
                          <Text
                            fontSize="s3"
                            fontWeight="Medium"
                            color="neutralColorLight.Gray-60"
                            lineHeight="125%"
                          >
                            {t['accountingSystem']}
                          </Text>
                        </Box>
                      </Box>
                      <Divider mt="s24" mb="s24" />
                      <Box>
                        <Box display="grid" gridTemplateColumns="repeat(3,1fr)">
                          <Box
                            display="flex"
                            flexDirection="column"
                            textAlign="center"
                            alignItems="center"
                            gap="s8"
                            p="s8"
                            cursor="pointer"
                            borderRadius="br2"
                            _hover={{ bg: 'primary.0' }}
                            onClick={() => router.push('/settings/general/audit-log')}
                          >
                            <Image width={48} height={48} src="/settings.svg" alt="Settings" />
                            <Text
                              fontSize="s3"
                              fontWeight="Medium"
                              color="neutralColorLight.Gray-60"
                              lineHeight="125%"
                            >
                              {t['settings']}
                            </Text>
                          </Box>
                        </Box>

                        <Box display="flex" justifyContent="flex-end" gap="s4" mt="s16">
                          <TextFields variant="link">{t['exploreAllApplications']}</TextFields>
                          <Icon size="sm" as={BsArrowRight} color="primary.500" />
                        </Box>
                      </Box>
                    </PopoverBody>
                  </PopoverContent>
                </>
              )}
            </Popover>

            <Popover placement="bottom-end" gutter={3}>
              {() => (
                <>
                  <PopoverTrigger>
                    <IconButton
                      width="40px"
                      height="40px"
                      _hover={{ backgroundColor: 'secondary.900' }}
                      icon={<Avatar src="/avatar.png" size="sm" />}
                      aria-label="menu"
                      variant="ghost"
                      color="white"
                      borderRadius="br1"
                      ref={appSwitcherRef}
                    />
                    {/* <Box
                      w="40px"
                      h="40px"
                      as="button"
                      borderRadius="br1"
                      display={'flex'}
                      justifyContent={'center'}
                      alignItems={'center'}
                      bg={isOpen ? 'secondary.900' : 'secondary.700'}
                      _hover={{ backgroundColor: 'secondary.900' }}
                    >
                      <Avatar src={'/avatar.png'} size="sm" />
                    </Box> */}
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
                            <Text fontWeight="Regular" fontSize="s2" color="gray.600">
                              Teller
                            </Text>
                          </Box>
                        </Box>

                        <Box p="s8" borderBottom="1px solid " borderColor="border.layout">
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
                          borderBottom="1px solid "
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
                              asyncToast({
                                id: 'update-language-preference',
                                promise: mutateAsync({
                                  id: userId || '',
                                  data: {
                                    language: value === 'en' ? Language?.English : Language?.Nepali,
                                  },
                                }),
                                msgs: {
                                  loading: 'Updating Language Preference',
                                  success: 'Updated Language Preference',
                                },
                                onSuccess: (res) => {
                                  res?.user?.preference?.update?.record &&
                                    dispatch(
                                      setPreference({
                                        preference: res?.user?.preference?.update?.record,
                                      })
                                    );

                                  router.push(`/${router.asPath}`, undefined, {
                                    locale: value,
                                  });
                                },
                              });
                            }}
                          />
                        </Box>

                        <Box
                          display="flex"
                          flexDirection="column"
                          justifyContent="space-between"
                          p="s8"
                          borderBottom="1px solid "
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
                          <SwitchTabs
                            value={preference?.date ?? DateType.Ad}
                            options={calendarList}
                            onChange={(value) => {
                              asyncToast({
                                id: 'update-calendar-preference',
                                promise: mutateAsync({
                                  id: userId || '',
                                  data: {
                                    date: value === DateType.Ad ? DateType.Ad : DateType.Bs,
                                  },
                                }),
                                msgs: {
                                  loading: 'Updating Calendar Preference',
                                  success: 'Updated Calendar Preference',
                                },
                                onSuccess: (res) =>
                                  res?.user?.preference?.update?.record &&
                                  dispatch(
                                    setPreference({
                                      preference: res?.user?.preference?.update?.record,
                                    })
                                  ),
                              });
                            }}
                          />
                        </Box>

                        <Box
                          display="flex"
                          flexDirection="column"
                          justifyContent="space-between"
                          py="s8"
                          px="s8"
                        >
                          <Box
                            _hover={{
                              bg: 'background.500',
                              borderRadius: 'br2',
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
                              borderRadius: 'br2',
                            }}
                            h="40px"
                            px="s16"
                            display="flex"
                            alignItems="center"
                            cursor="pointer"
                            onClick={() => router.push('/change-password')}
                          >
                            <Text
                              textAlign="start"
                              fontWeight="Regular"
                              fontSize="r1"
                              color="neutralColorLight.Gray-80"
                            >
                              Change Password
                            </Text>
                          </Box>

                          <Box
                            _hover={{
                              bg: 'background.500',
                              borderRadius: 'br2',
                            }}
                            h="40px"
                            px="s16"
                            display="flex"
                            alignItems="center"
                            cursor="pointer"
                            onClick={() => {
                              dispatch(logout());
                              router.push('/login');
                            }}
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

      <Modal
        open={isModalOpen}
        onClose={handleModalClose}
        isCentered
        title={
          <Text fontSize="r2" color="neutralColorLight.Gray-80" fontWeight="SemiBold">
            {t['shortcutsModalAll']}
          </Text>
        }
        modalContentProps={{ minW: '60vw' }}
      >
        <Grid templateColumns="repeat(2, 1fr)" rowGap="s48" columnGap="80px" mx="-s8" py="s8">
          {helpOptions.map(({ title, shortcuts }) => (
            <Box display="flex" flexDirection="column" gap="s16" key={title}>
              <Text fontSize="r2" fontWeight={500} color="black">
                {title}
              </Text>

              {shortcuts.map(({ subTitle, shortcutKeys }) => (
                <Box
                  key={subTitle}
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Text color="neutralColorLight.Gray-70" fontSize="r1" fontWeight={400}>
                    {subTitle}
                  </Text>

                  <Box display="flex" gap="s12">
                    {shortcutKeys.map((key) => (
                      <ShortcutTab shortcut={key} key={key} />
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>
          ))}
        </Grid>
      </Modal>
    </GlobalHotKeys>
  );
};

export default TopLevelHeader;
