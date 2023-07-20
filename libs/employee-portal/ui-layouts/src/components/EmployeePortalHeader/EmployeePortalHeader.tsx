import { IoHelpCircleOutline, IoNotificationsOutline } from 'react-icons/io5';
import Link from 'next/link';

import {
  Avatar,
  Box,
  Icon,
  IconButton,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  SwitchTabs,
  Text,
} from '@myra-ui';

const PROFILE_DATA = {
  name: 'Anjil Bishwokarma',
  organization: {
    logo: '',
    name: 'Nefscun',
    address: 'Lalitpur',
  },
  profileUrl:
    'https://images.unsplash.com/photo-1573865526739-10659fec78a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2515&q=80',
  address: 'Manabhawan, Lalitpur',
  preference: {
    language: 'en',
    dateType: 'ad',
  },
};

const languageList = [
  { label: 'EN', value: 'en' },
  { label: 'ने', value: 'ne' },
];

const calendarList = [
  { label: 'AD', value: 'AD' },
  { label: 'BS', value: 'BS' },
];

export const EmployeePortalHeader = () => (
  <Box
    h="3.75rem"
    px="s16"
    display="flex"
    alignItems="center"
    justifyContent="space-between"
    bg="primary.600"
  >
    <Link href="/">
      <Box
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
          src={PROFILE_DATA.organization.logo}
          name={PROFILE_DATA.organization.name}
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
            {PROFILE_DATA.organization.name}
          </Text>
          <Text fontSize="s3" color="white" p={0} lineHeight="100%">
            {PROFILE_DATA.organization.address}
          </Text>
        </Box>
      </Box>
    </Link>

    <Box display="flex" gap="s8">
      <IconButton
        icon={<Icon size="lg" as={IoNotificationsOutline} />}
        aria-label="help"
        variant="ghost"
        color="white"
        borderRadius="br1"
        _hover={{ backgroundColor: 'secondary.900' }}
      />
      <IconButton
        icon={<Icon size="lg" as={IoHelpCircleOutline} />}
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
                icon={<Avatar src={PROFILE_DATA.profileUrl} size="sm" />}
                aria-label="menu"
                variant="ghost"
                color="white"
                borderRadius="br1"
              />
            </PopoverTrigger>

            <Box zIndex={15}>
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
                      <Avatar src={PROFILE_DATA.profileUrl} w="s32" h="s32" />
                      <Box
                        ml="14px"
                        display="flex"
                        flexDirection="column"
                        justifyContent="space-between"
                      >
                        <Text fontWeight="SemiBold" fontSize="s2" color="primary.500">
                          {PROFILE_DATA.name}
                        </Text>

                        <Text fontWeight="Regular" fontSize="s2" color="gray.600">
                          Employee
                        </Text>
                      </Box>
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
                        value="en"
                        options={languageList}
                        // onChange={(value) => {
                        //   asyncToast({
                        //     id: 'update-language-preference',
                        //     promise: mutateAsync({
                        //       id: userId || '',
                        //       data: {
                        //         language: value === 'en' ? Language?.English : Language?.Nepali,
                        //       },
                        //     }),
                        //     msgs: {
                        //       loading: `Updating Language to ${
                        //         value === 'en' ? 'English' : 'Nepali'
                        //       }`,
                        //       success: `Updated Language to ${
                        //         value === 'en' ? 'English' : 'Nepali'
                        //       }`,
                        //     },
                        //     onSuccess: (res) => {
                        //       res?.user?.preference?.update?.record &&
                        //         dispatch(
                        //           setPreference({
                        //             preference: res?.user?.preference?.update?.record,
                        //           })
                        //         );

                        //       router.push(`/${router.asPath}`, undefined, {
                        //         locale: value,
                        //       });
                        //     },
                        //   });
                        // }}
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
                        value={PROFILE_DATA.preference?.dateType ?? 'AD'}
                        options={calendarList}
                        // onChange={(value) => {
                        //   asyncToast({
                        //     id: 'update-calendar-preference',
                        //     promise: mutateAsync({
                        //       id: userId || '',
                        //       data: {
                        //         date: value === DateType.Ad ? DateType.Ad : DateType.Bs,
                        //       },
                        //     }),
                        //     msgs: {
                        //       loading: `Updating Calendar to ${
                        //         value === DateType.Ad ? 'AD' : 'BS'
                        //       }`,
                        //       success: `Updated Calendar to ${value === DateType.Ad ? 'AD' : 'BS'}`,
                        //     },
                        //     onSuccess: (res) =>
                        //       res?.user?.preference?.update?.record &&
                        //       dispatch(
                        //         setPreference({
                        //           preference: res?.user?.preference?.update?.record,
                        //         })
                        //       ),
                        //   });
                        // }}
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
                          bg: 'highlight.500',
                          borderRadius: 'br2',
                        }}
                        h="40px"
                        px="s16"
                        display="flex"
                        alignItems="center"
                        cursor="pointer"
                        // onClick={() => router.push('/change-password')}
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
                        // onClick={() => {
                        //   dispatch(logout());
                        //   router.replace('/login').then(() => queryClient.clear());
                        // }}
                      >
                        <Text fontWeight="Regular" fontSize="r1" color="neutralColorLight.Gray-80">
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
);
