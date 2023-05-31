import React from 'react';
import { IoIosArrowDown, IoIosArrowForward } from 'react-icons/io';
import Image from 'next/legacy/image';
import { useRouter } from 'next/router';

import { Avatar, Box, Collapse, Icon, Text, TopLevelHeader } from '@myra-ui';

import { useTranslation } from '@coop/shared/utils';

export interface HomePageLayoutProps {
  children: React.ReactNode;
}

const notSubscribed = [
  {
    title: 'mobileApp',
    img: '/fct.svg',
    link: '/cbs/members/list',
  },
  {
    title: 'documentManagement',
    img: '/enj.svg',
    link: '/cbs/members/list',
  },

  {
    title: 'complainceManagement',
    img: '/bnty.svg',
    link: '/cbs/members/list',
  },
];

const comingSoon = [
  {
    title: 'businessProcessManagement',
    img: '/rvn.svg',
    link: '/cbs/members/list',
  },
  {
    title: 'assetsAndInventoryManagement',
    img: '/tern.svg',
    link: '/cbs/members/list',
  },
  {
    title: 'fixedAssetManagement',
    img: '/zcl.svg',
    link: '/cbs/members/list',
  },
];

const myraAppn = [
  {
    title: 'corebankingSystems',
    img: '/cbs.svg',
    link: '/cbs/members/list',
  },
  {
    title: 'memberAndShareManagement',
    img: '/memberandshare.svg',
    link: '/cbs/members/list',
  },
  {
    title: 'accountingSystem',
    img: '/accounting.svg',
    link: '/accounting/sales/sales-entry/list',
  },
  {
    title: 'alternativeChannelsAndCrossConnectivity',
    img: '/tnt.svg',
    link: '/alternative-channels/users/mBanking',
  },
  {
    title: 'inventoryManagement',
    img: '/inventory.svg',
    link: '/inventory/inventory/register/list',
  },
  {
    title: 'hrTrainingAndCapacityManagement',
    img: '/btcd.svg',
    link: '/hr/employee/employee/list',
  },
];

export const HomePageLayout = (props: HomePageLayoutProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const { t } = useTranslation();
  const { children } = props;
  const router = useRouter();

  return (
    <Box>
      <Box position="fixed" top={0} width="100%" zIndex={11}>
        <TopLevelHeader />
      </Box>
      <Box
        display="flex"
        width="300px"
        position="fixed"
        flexDirection="column"
        justifyContent="flex-start"
        height="calc(100vh - s60)"
        px="s16"
        py="s24"
        gap="s32"
        overflowY="auto"
      >
        {' '}
        <Box display="flex" flexDir="column" gap="s16">
          <Text px="s16" fontSize="s3" color="gray.600" fontWeight="600" textTransform="uppercase">
            {t['yourMyraApplication']}
          </Text>

          <Box display="flex" alignItems="center" flexDir="column">
            {myraAppn.map((item) => (
              <Box
                key={item?.link}
                w="100%"
                px="s16"
                py="s8"
                display="flex"
                borderRadius="br2"
                gap="s16"
                minH="48px"
                maxH="56px"
                alignItems="center"
                cursor="pointer"
                _hover={{ bg: 'gray.200' }}
                onClick={() => router?.push(item?.link)}
              >
                <Box flexShrink={0} display="flex" justifyContent="center" alignItems="center">
                  <Image width="32" height="32" src={item.img} alt={t[item.title]} />
                </Box>
                <Text fontSize="r1" fontWeight="Regular" color="neutralColorLight.Gray-80">
                  {t[item.title]}
                </Text>
              </Box>
            ))}
          </Box>
        </Box>
        <Box display="flex" flexDir="column" gap="s8">
          <Box
            display="flex"
            h="32px"
            pr="s16"
            alignItems="center"
            justifyContent="space-between"
            cursor="pointer"
            onClick={() => setIsOpen(!isOpen)}
          >
            <Text
              px="s16"
              fontSize="s3"
              color="gray.600"
              fontWeight="600"
              textTransform="uppercase"
            >
              {t['moreFromMyra']}
            </Text>
            {isOpen ? (
              <Icon size="sm" as={IoIosArrowDown} />
            ) : (
              <Icon size="sm" as={IoIosArrowForward} />
            )}
          </Box>
          <Collapse in={isOpen} style={{ marginTop: '0px' }}>
            <Box gap="s32" py="s8" display="flex" alignItems="center" flexDir="column">
              <Box width="100%">
                <Text
                  px="s16"
                  fontSize="r1"
                  fontWeight="Medium"
                  marginBottom="s16"
                  color="neutralColorLight.Gray-60"
                >
                  Not Subscribed
                </Text>
                {notSubscribed.map((ns) => (
                  <Box
                    key={ns?.link}
                    w="100%"
                    px="s16"
                    py="s8"
                    display="flex"
                    borderRadius="br2"
                    gap="s16"
                    minH="48px"
                    maxH="56px"
                    alignItems="center"
                    cursor="pointer"
                    _hover={{ bg: 'gray.200', filter: 'none' }}
                    onClick={() => router.push(ns.link)}
                    filter="grayscale(100%)"
                  >
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      w="s32"
                      borderRadius="50%"
                    >
                      <Avatar
                        width="s32"
                        height="s32"
                        src={ns.img}
                        // alt="corebanking"
                      />
                    </Box>
                    <Text fontSize="r1" fontWeight="Regular" color="neutralColorLight.Gray-80">
                      {t[ns.title]}
                    </Text>
                  </Box>
                ))}
              </Box>
              <Box width="100%">
                <Text
                  px="s16"
                  fontSize="r1"
                  fontWeight="Medium"
                  marginBottom="s16"
                  color="neutralColorLight.Gray-60"
                >
                  Coming Soon
                </Text>
                {comingSoon.map((ns) => (
                  <Box
                    key={ns?.link}
                    w="100%"
                    px="s16"
                    py="s8"
                    display="flex"
                    borderRadius="br2"
                    gap="s16"
                    minH="48px"
                    maxH="56px"
                    alignItems="center"
                    cursor="pointer"
                    _hover={{ bg: 'gray.200', filter: 'none' }}
                    onClick={() => router.push(ns.link)}
                    filter="grayscale(100%)"
                  >
                    <Box
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      w="s32"
                      borderRadius="50%"
                    >
                      <Avatar
                        width="s32"
                        height="s32"
                        src={ns.img}
                        // alt="corebanking"
                      />
                    </Box>
                    <Text fontSize="r1" fontWeight="Regular" color="neutralColorLight.Gray-80">
                      {t[ns.title]}
                    </Text>
                  </Box>
                ))}
              </Box>
            </Box>
          </Collapse>
        </Box>
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        py="s24"
        px="s16"
        ml="300px"
        mr="300px"
        flexGrow="1"
        overflowX="hidden"
        position="relative"
        mt="s60"
      >
        {children}
      </Box>
    </Box>
  );
};

export default HomePageLayout;
