import { IoHelpCircleOutline, IoNotificationsOutline } from 'react-icons/io5';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQueryClient } from '@tanstack/react-query';

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

import { formatAddress } from '@coop/cbs/utils';
import { logout, useAppSelector } from '@coop/employee-portal/data-access';

const languageList = [
  { label: 'EN', value: 'en' },
  { label: 'ने', value: 'ne' },
];

const calendarList = [
  { label: 'AD', value: 'AD' },
  { label: 'BS', value: 'BS' },
];

export const EmployeePortalHeader = () => {
  const me = useAppSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const queryClient = useQueryClient();

  return (
    <Box
      h="3.75rem"
      px="s16"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      bg="secondary.700"
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
            src={me?.organization?.basicDetails?.logo || ''}
            name={me?.organization?.basicDetails?.name || ''}
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
              {me?.organization?.basicDetails?.name}
            </Text>
            <Text fontSize="s3" color="white" p={0} lineHeight="100%">
              {formatAddress(me?.organization?.address)}
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
                  icon={<Avatar src={me?.profilePic || ''} name={me?.firstName?.local} size="sm" />}
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
                        <Avatar
                          src={me?.profilePic || ''}
                          name={me?.firstName?.local}
                          w="s32"
                          h="s32"
                        />
                        <Box
                          ml="14px"
                          display="flex"
                          flexDirection="column"
                          justifyContent="space-between"
                        >
                          <Text fontWeight="SemiBold" fontSize="s2" color="primary.500">
                            {me?.firstName?.local}
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
                        <SwitchTabs value="en" options={languageList} />
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
                          value="AD"
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
  );
};
