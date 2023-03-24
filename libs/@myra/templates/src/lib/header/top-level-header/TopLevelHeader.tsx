import React, { useRef, useState } from 'react';
import { GlobalHotKeys } from 'react-hotkeys';
import { AiOutlineSetting } from 'react-icons/ai';
import { CgMenuGridO } from 'react-icons/cg';
import Image from 'next/legacy/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

import {
  asyncToast,
  FloatingShortcutButton,
  Modal,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  SearchBar,
  ShortcutTab,
} from '@myra-ui/components';
import { Select, SwitchTabs } from '@myra-ui/forms';
import { Avatar, Box, Divider, Grid, Icon, IconButton, Text } from '@myra-ui/foundations';

import {
  DateType,
  logout,
  RootState,
  saveToken,
  setPreference,
  useAppDispatch,
  useAppSelector,
  useSetPreferenceMutation,
  useSwitchRoleMutation,
} from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { useTranslation } from '@coop/shared/utils';

import { HeaderTransactionDate } from './HeaderTransactionDate';

// const ROLE_SLUG: Record<string, string> = {
//   SUPERADMIN: 'Super Admin',
//   BRANCH_MANAGER: 'Branch Manager',
//   TELLER: 'Teller',
//   AGENT: 'Market Representative',
//   ACCOUNTANT: 'Accountant',
//   HEAD_TELLER: 'Head Teller',
//   CUSTOMER_SERVICE_REPRESENTATIVE: 'Customer Service Representative',
//   NOT_DEFINED_ROLE: 'Undefined Role',
// } as const;

// enum GetRoleSlug {
//   AGENT = 'Market Representative',
//   BRANCH_MANAGER = 'Branch Manager',
//   HEAD_TELLER = 'Head Teller',
//   SUPERADMIN = 'Super Admin',
//   TELLER = 'Teller',
//   USER = 'User',
//
//
// }

/* eslint-disable-next-line */
export interface TopLevelHeaderProps {
  imageSrc?: string;
}

// const languageList = [
//   { label: 'EN', value: 'en' },
//   { label: 'ने', value: 'ne' },
// ];

const calendarList = [
  { label: 'AD', value: 'AD' },
  { label: 'BS', value: 'BS' },
];
const keyMap = {
  inputFocus: ['ctrl+/'],
  appSwitcher: 'alt+o',

  settingShortcut: ['ctrl+shift+alt+s'],
  showHelpOptions: ['alt+i'],
  showProfile: ['alt+p'],

  // up: ["i"],
  // shiftUp: ["shift+i"],
  // delete: ["r"],
  // addFocus: ["a"]
};

const AppSwitcherIconWrapper = (props: {
  children: React.ReactNode;
  onClick: React.MouseEventHandler<HTMLDivElement> | undefined;
}) => {
  const { children, onClick } = props;
  return (
    <Box
      display="flex"
      flexDirection="row"
      textAlign="center"
      alignItems="center"
      gap="s16"
      p="s12"
      cursor="pointer"
      borderRadius="br2"
      _hover={{ bg: 'primary.0' }}
      onClick={onClick}
    >
      {children}
    </Box>
  );
};

const AppSwitcherText = (props: { children: React.ReactNode }) => {
  const { children } = props;
  return (
    <Text
      textAlign="left"
      fontSize="r1"
      fontWeight="Medium"
      color="neutralColorLight.Gray-60"
      lineHeight="125%"
    >
      {children}
    </Text>
  );
};

export const TopLevelHeader = () => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const auth = useAppSelector((state) => state?.auth);
  const user = useAppSelector((state) => state?.auth?.user);
  const userId = user?.id;

  const { mutateAsync } = useSetPreferenceMutation();

  const { mutateAsync: switchRole } = useSwitchRoleMutation();

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
  const settingShortcut = useRef<HTMLButtonElement>(null);
  const showHelpOptions = useRef<HTMLButtonElement>(null);
  const showProfile = useRef<HTMLButtonElement>(null);
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
      if (showHelpOptions.current) {
        showHelpOptions.current?.click();
      }
    },
    settingShortcut() {
      if (settingShortcut.current) {
        settingShortcut.current?.click();
      }
    },
    showProfile() {
      if (showProfile.current) {
        showProfile.current?.click();
      }
    },
  };

  const switchRoleOrBranch = async (
    label: string,
    value: string,
    type: 'BRANCH' | 'ROLE' = 'BRANCH'
  ) => {
    await asyncToast({
      id: 'new-role',
      msgs: {
        loading: `Switching to ${label}`,
        success: `Switched to ${label}`,
      },
      promise: switchRole({
        role: type === 'ROLE' ? value : undefined,
        branch: type === 'BRANCH' ? value : undefined,
      }),
      onSuccess: (response) => {
        const tokens = response?.auth?.switchRole?.data?.token;

        // const me = response?.auth?.switchRole?.data?.me;
        //
        if (tokens?.access && tokens?.refresh) {
          dispatch(
            saveToken({
              accessToken: tokens?.access,
              refreshToken: tokens?.refresh,
            })
          );
        }

        router.reload();

        //
        // if (
        //   me?.user &&
        //   me?.permission?.myPermission &&
        //   me?.preference &&
        //   me?.rolesList &&
        //   me?.branches
        // ) {
        //   dispatch(
        //     authenticate({
        //       user: me?.user,
        //       permissions: me?.permission?.myPermission,
        //       preference: me?.preference,
        //       availableRoles: me?.rolesList as RoleInfo[],
        //       availableBranches: me?.branches as BranchMinimal[],
        //     })
        //   );
        //   updateAbility(ability, me?.permission?.myPermission);
        // }
      },
    });
  };

  /* eslint-disable no-nested-ternary */
  return (
    <GlobalHotKeys keyMap={keyMap} handlers={handlers}>
      <Box
        w="100%"
        h="3.75rem"
        zIndex="20"
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
            <Avatar
              h="s32"
              w="s32"
              src={user?.organization?.basicDetails?.logo as string}
              name={user?.organization?.basicDetails?.name as string}
            />

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
                {user?.organization?.basicDetails?.name}
              </Text>
              <Text fontSize="s3" color="white" p={0} lineHeight="100%">
                {user?.organization?.address?.district?.local}
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
            {/* <IconButton
              h="40px"
              icon={<Icon size="md" as={RiHistoryFill} />}
              aria-label="History"
              variant="ghost"
              color="gray.0"
              _hover={{ backgroundColor: 'secondary.800' }}
            /> */}
            <SearchBar />
          </Box>
          <Box gap="s8" flex={1} display="flex" justifyContent="flex-end" alignItems="center">
            <HeaderTransactionDate />

            <FloatingShortcutButton />

            <IconButton
              icon={<Icon size="lg" as={AiOutlineSetting} />}
              aria-label="help"
              variant="ghost"
              color="white"
              borderRadius="br1"
              _hover={{ backgroundColor: 'secondary.900' }}
              onClick={() => router.push(ROUTES.SETTINGS_GENERAL_SERVICE_CENTER_LIST)}
              ref={settingShortcut}
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

                  <Box zIndex={15}>
                    <PopoverContent
                      bg="gray.0"
                      w="370px"
                      h="auto"
                      px="s16"
                      py="s16"
                      border="none"
                      boxShadow="0px 0px 2px rgba(0, 0, 0, 0.2), 0px 2px 10px rgba(0, 0, 0, 0.1)"
                      outline="none"
                      _focus={{
                        boxShadow:
                          '0px 0px 2px rgba(0, 0, 0, 0.2), 0px 2px 10px rgba(0, 0, 0, 0.1)',
                      }}
                      color="white"
                      zIndex="15"
                    >
                      <PopoverBody p={0}>
                        <Box display="flex-column" gridTemplateColumns="repeat(3,1fr)" gap="s8">
                          <AppSwitcherIconWrapper
                            onClick={() => router.push(ROUTES.CBS_MEMBER_LIST)}
                          >
                            <Image
                              width={32}
                              height={32}
                              src="/cbs.svg"
                              alt="Core Banking System"
                            />
                            <AppSwitcherText>{t['corebankingSystems']}</AppSwitcherText>
                          </AppSwitcherIconWrapper>
                          <AppSwitcherIconWrapper
                            onClick={() => router.push('/inventory/register')}
                          >
                            <Image
                              width={32}
                              height={32}
                              src="/inventory.svg"
                              alt="Inventory System"
                            />
                            <AppSwitcherText> {t['inventoryManagement']}</AppSwitcherText>
                          </AppSwitcherIconWrapper>
                          <AppSwitcherIconWrapper
                            onClick={() => router.push(ROUTES.CBS_MEMBER_LIST)}
                          >
                            <Image
                              height={32}
                              width={32}
                              src="/memberandshare.svg"
                              alt="Fixed Asset Management"
                            />
                            <AppSwitcherText> {t['memberAndShareManagement']}</AppSwitcherText>
                          </AppSwitcherIconWrapper>
                          <AppSwitcherIconWrapper
                            onClick={() => router.push('/accounting/sales/sales-entry/list')}
                          >
                            <Image
                              width={32}
                              height={32}
                              src="/accounting.svg"
                              alt="Accounting System"
                            />
                            <AppSwitcherText> {t['accountingSystem']}</AppSwitcherText>
                          </AppSwitcherIconWrapper>

                          <AppSwitcherIconWrapper
                            onClick={() => router.push('/alternative-channels/users/mBanking')}
                          >
                            <Image
                              width={32}
                              height={32}
                              src="/tnt.svg"
                              alt="Alternativer channel"
                            />
                            <AppSwitcherText>
                              {t['alternativeChannelsAndCrossConnectivity']}
                            </AppSwitcherText>
                          </AppSwitcherIconWrapper>
                        </Box>
                        <Divider my="s8" />
                        <Box>
                          <AppSwitcherIconWrapper
                            onClick={() => router.push(ROUTES.SETTINGS_GENERAL_SERVICE_CENTER_LIST)}
                          >
                            <Image width={32} height={32} src="/settings.svg" alt="Settings" />
                            <AppSwitcherText>{t['settings']}</AppSwitcherText>
                          </AppSwitcherIconWrapper>
                        </Box>
                      </PopoverBody>
                    </PopoverContent>
                  </Box>
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
                      icon={<Avatar src={user?.profilePic || ''} size="sm" />}
                      aria-label="menu"
                      variant="ghost"
                      color="white"
                      borderRadius="br1"
                      ref={showProfile}
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

                  <Box zIndex={15}>
                    <PopoverContent
                      bg="gray.0"
                      w="260px"
                      border="none"
                      boxShadow="0px 0px 2px rgba(0, 0, 0, 0.2), 0px 2px 10px rgba(0, 0, 0, 0.1)"
                      outline="none"
                      _focus={{
                        boxShadow:
                          '0px 0px 2px rgba(0, 0, 0, 0.2), 0px 2px 10px rgba(0, 0, 0, 0.1)',
                      }}
                      color="white"
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
                            zIndex="2000"
                          >
                            <Avatar src={user?.profilePic || ''} w="s32" h="s32" />
                            <Box
                              ml="14px"
                              display="flex"
                              flexDirection="column"
                              justifyContent="space-between"
                            >
                              <Text fontWeight="SemiBold" fontSize="s2" color="primary.500">
                                {user?.firstName?.local} {user?.lastName?.local}
                              </Text>
                              {user?.currentRole && (
                                <Text fontWeight="Regular" fontSize="s2" color="gray.600">
                                  {user?.currentRole.name}
                                </Text>
                              )}
                            </Box>
                          </Box>

                          <Box p="s8" borderBottom="1px solid " borderColor="border.layout">
                            {user?.currentBranch && (
                              <Select
                                menuPosition="absolute"
                                value={{
                                  label: user?.currentBranch?.name || 'Branch',
                                  value: user?.currentBranch?.id as string,
                                }}
                                label="Branch"
                                options={auth.availableBranches?.map((branch) => ({
                                  label: branch.name,
                                  value: branch.id,
                                }))}
                                onChange={async (newValue) => {
                                  if (newValue && 'label' in newValue) {
                                    await switchRoleOrBranch(
                                      String(newValue.label),
                                      String(newValue.value)
                                    );
                                  }
                                }}
                              />
                            )}
                          </Box>

                          <Box p="s8" borderBottom="1px solid " borderColor="border.layout">
                            {user?.currentRole && (
                              <Select
                                menuPosition="absolute"
                                value={{
                                  label: user?.currentRole?.name,
                                  value: user?.currentRole?.id as string,
                                }}
                                label="Role"
                                options={auth.availableRoles?.map((role) => ({
                                  label: role.name,
                                  value: role.id,
                                }))}
                                onChange={async (newValue) => {
                                  if (newValue && 'label' in newValue) {
                                    await switchRoleOrBranch(
                                      String(newValue.label),
                                      String(newValue.value),
                                      'ROLE'
                                    );
                                  }
                                }}
                              />
                            )}
                          </Box>

                          {/* <Box
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
                                      language:
                                        value === 'en' ? Language?.English : Language?.Nepali,
                                    },
                                  }),
                                  msgs: {
                                    loading: `Updating Language to ${
                                      value === 'en' ? 'English' : 'Nepali'
                                    }`,
                                    success: `Updated Language to ${
                                      value === 'en' ? 'English' : 'Nepali'
                                    }`,
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
                          </Box> */}

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
                                    loading: `Updating Calendar to ${
                                      value === DateType.Ad ? 'AD' : 'BS'
                                    }`,
                                    success: `Updated Calendar to ${
                                      value === DateType.Ad ? 'AD' : 'BS'
                                    }`,
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
                            {/* <Box
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
                            </Box> */}

                            <Box
                              _hover={{
                                bg: 'highlight.500',
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
                                bg: 'highlight.500',
                                borderRadius: 'br2',
                              }}
                              h="40px"
                              px="s16"
                              display="flex"
                              alignItems="center"
                              cursor="pointer"
                              onClick={() => {
                                dispatch(logout());
                                router.replace('/login').then(() => queryClient.clear());
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
                  </Box>
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
        width="3xl"
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
