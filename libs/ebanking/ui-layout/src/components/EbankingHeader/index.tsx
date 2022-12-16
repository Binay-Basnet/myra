import { BiBell } from 'react-icons/bi';
import { IoCheckmark } from 'react-icons/io5';
import { VscDebugDisconnect } from 'react-icons/vsc';
import { useRouter } from 'next/router';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { useQueryClient } from '@tanstack/react-query';

import {
  Avatar,
  Box,
  Button,
  Icon,
  IconButton,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  SwitchTabs,
  Text,
} from '@myra-ui';

import { logout, useAppDispatch, useAppSelector } from '@coop/ebanking/data-access';

const languageList = [
  { label: 'EN', value: 'en' },
  { label: 'ने', value: 'ne' },
];

export const EbankingHeader = () => {
  const router = useRouter();
  const user = useAppSelector((state) => state?.auth?.user);
  const coopUser = useAppSelector((state) => state?.auth?.cooperative?.user);

  return (
    <Box
      as="header"
      position="sticky"
      bg="primary.600"
      h="60px"
      w="100%"
      top="0"
      zIndex="20"
      display="flex"
      alignItems="center"
    >
      <Box w="24.8%" flexShrink={0}>
        <Popover placement="bottom-end" gutter={0}>
          <PopoverTrigger>
            <Box
              as="button"
              w="300px"
              h="60px"
              px="s16"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              gap="s8"
              cursor="pointer"
              _hover={{ bg: 'primary.900' }}
            >
              <Box display="flex" alignItems="center" gap="s8">
                {/* <Box w="s32" h="s32" position="relative" flexShrink={0}>
                  <Image src="/logo.png" layout="fill" alt="Logo Image" />
                </Box> */}
                <Avatar
                  w="42px"
                  h="42px"
                  src={
                    user?.cooperatives?.find((coop) => coop?.id === coopUser?.cooperativeId)
                      ?.logoUrl as string
                  }
                  name={coopUser?.cooperativeName as string}
                />
                <Box display="flex" flexDir="column" alignItems="start">
                  <Text fontSize="r1" textAlign="left" noOfLines={1} color="white" fontWeight="500">
                    {coopUser?.cooperativeName}
                  </Text>
                  <Text fontSize="r1" noOfLines={1} color="primary.200">
                    {coopUser?.cooperativeDistrict}
                  </Text>
                </Box>
              </Box>

              <Box>
                <Icon as={ChevronDownIcon} size="lg" color="white" />
              </Box>
            </Box>
          </PopoverTrigger>

          <PopoverContent
            w="300px"
            borderRadius="none"
            borderBottomRadius="br2"
            overflow="hidden"
            _focus={{
              boxShadow: 'E1',
            }}
            boxShadow="E1"
            p="0"
          >
            {user?.cooperatives?.map((coop) => (
              <Box
                key={coop?.id}
                cursor="pointer"
                h="50px"
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                px="s12"
                gap="s8"
                bg="white"
                _hover={{ bg: 'gray.100' }}
                onClick={() =>
                  coop?.id !== coopUser?.cooperativeId && router.push(`/switch?id=${coop?.id}`)
                }
              >
                <Box display="flex" alignItems="center" gap="s8">
                  <Avatar size="xs" src={String(coop?.logoUrl)} name={String(coop?.name)} />
                  <Text fontSize="r1" color="gray.800" noOfLines={1}>
                    {coop?.name}
                  </Text>
                </Box>
                {coop?.id === coopUser?.cooperativeId && (
                  <Icon as={IoCheckmark} color="primary.500" />
                )}
              </Box>
            ))}

            <Box
              borderTop="1px"
              borderTopColor="border.layout"
              cursor="pointer"
              h="50px"
              display="flex"
              alignItems="center"
              px="s12"
              gap="s8"
              bg="white"
              _hover={{ bg: 'gray.100' }}
              color="primary.500"
              onClick={() => router.push('/setup/connect')}
            >
              <Icon as={VscDebugDisconnect} />
              <Text fontSize="r1" fontWeight={500}>
                Connect to an existing COOP
              </Text>
            </Box>
          </PopoverContent>
        </Popover>
      </Box>

      <Box w="100%" display="flex" alignItems="center" justifyContent="space-between">
        {/* <Box mt="-1.2px" w="50vw"> */}
        {/*   <BasicSearchBar /> */}
        {/* </Box> */}
        <Box />

        <HeaderRightSection />
      </Box>
    </Box>
  );
};

export const HeaderRightSection = () => {
  const router = useRouter();
  // const { mutateAsync } = useSetPreferenceMutation();
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  // const userId = useAppSelector((state) => state?.auth?.user?.id);
  const user = useAppSelector((state) => state.auth?.user);
  const coopUser = useAppSelector((state) => state.auth?.cooperative);
  return (
    <Box pr="s16" display="flex" justifyContent="end" gap="s16">
      <IconButton
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
              <Button
                w="40px"
                h="40px"
                variant="ghost"
                _hover={{ backgroundColor: 'secondary.900' }}
              >
                <Avatar
                  src={coopUser?.user?.memberProfilePicUrl as string}
                  name={coopUser?.user?.memberName as string}
                  w="s32"
                  h="s32"
                />{' '}
              </Button>
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
                  {coopUser?.token && (
                    <Box
                      px="s12"
                      py="s16"
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                      borderBottom="1px solid"
                      borderColor="border.layout"
                    >
                      <Avatar
                        src={coopUser?.user?.memberProfilePicUrl as string}
                        name={coopUser?.user?.memberName as string}
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
                          {coopUser?.user?.memberName}
                        </Text>
                        <Text fontWeight="Regular" fontSize="s2" color="gray.600">
                          {user?.id?.slice(0, 19)}
                        </Text>
                      </Box>
                    </Box>
                  )}

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
                        router.push(`/${router.asPath}`, undefined, {
                          locale: value,
                        });
                      }}
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
                      //       loading: 'Updating Language Preference',
                      //       success: 'Updated Language Preference',
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
                    py="s8"
                    px="s8"
                  >
                    <Box
                      _hover={{
                        bg: 'background.500',
                        borderRadius: 'br2',
                      }}
                      h="40px"
                      px="s8"
                      display="flex"
                      alignItems="center"
                      cursor="pointer"
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
                      px="s8"
                      display="flex"
                      alignItems="center"
                      cursor="pointer"
                      onClick={() => {
                        router.replace('/login').then(() => {
                          dispatch(logout());
                          queryClient.resetQueries();
                        });
                      }}
                    >
                      <Text fontWeight="Regular" fontSize="r1" color="neutralColorLight.Gray-80">
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
  );
};
