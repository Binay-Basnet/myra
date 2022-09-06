import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Avatar, Box } from '@chakra-ui/react';

import { TextFields, TopLevelHeader } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export interface HomePageLayoutProps {
  children: React.ReactNode;
}

const myraAppn = [
  {
    title: 'corebankingSystems',
    img: '/cbs.svg',
    link: '/members/list',
  },
  {
    title: 'inventoryManagement',
    img: '/inventory.svg',
    link: '/inventory/register',
  },
  {
    title: 'memberAndShareManagement',
    img: '/memberandshare.svg',
    link: '/members/list',
  },
  {
    title: 'accountingSystem',
    img: '/accounting.svg',
    link: '/accounting/sales/list',
  },
];

const moreFromMyra = [
  {
    title: 'assetsAndInventoryManagement',
    img: '/tern.svg',
    link: '/members/list',
  },
  {
    title: 'fixedAssetManagement',
    img: '/zcl.svg',
    link: '/members/list',
  },
  {
    title: 'hrTrainingAndCapacityManagement',
    img: '/btcd.svg',
    link: '/members/list',
  },
  {
    title: 'mobileApp',
    img: '/fct.svg',
    link: '/members/list',
  },
  {
    title: 'documentManagement',
    img: '/enj.svg',
    link: '/members/list',
  },
  {
    title: 'alternativeChannelsAndCrossConnectivity',
    img: '/tnt.svg',
    link: '/members/list',
  },
  {
    title: 'complainceManagement',
    img: '/bnty.svg',
    link: '/members/list',
  },
  {
    title: 'businessProcessManagement',
    img: '/rvn.svg',
    link: '/members/list',
  },
];

export function HomePageLayout(props: HomePageLayoutProps) {
  const { t } = useTranslation();
  const { children } = props;
  const router = useRouter();
  return (
    <Box>
      <Box position="fixed" top={0} width="100%" zIndex={11}>
        <TopLevelHeader />
      </Box>

      <Box display="flex">
        <Box
          position="fixed"
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          width="300px"
          height="calc(100% - 60px)"
          p="s16"
          gap="s32"
          pt="90px"
          overflowY="auto"
        >
          <Box display="flex" flexDir="column" gap="s16">
            <TextFields
              px="s16"
              fontSize={'s3'}
              color="gray.600"
              fontWeight={'600'}
              textTransform={'uppercase'}
            >
              {t['yourMyraApplication']}
            </TextFields>

            <Box display="flex" alignItems="center" flexDir="column">
              {myraAppn.map((item, index) => (
                <Box
                  key={index}
                  w="100%"
                  px="s16"
                  py="s8"
                  display="flex"
                  borderRadius="br2"
                  gap="s16"
                  minH={'48px'}
                  alignItems="center"
                  cursor="pointer"
                  _hover={{ bg: 'gray.200' }}
                  onClick={() => router.push(item.link)}
                >
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    w="s32"
                    h="s32"
                  >
                    <Image
                      width={'32px'}
                      height={'32px'}
                      src={item.img}
                      alt={t[item.title]}
                    />
                  </Box>
                  <TextFields
                    fontSize="r1"
                    fontWeight="Regular"
                    color="neutralColorLight.Gray-80"
                  >
                    {t[item.title]}
                  </TextFields>
                </Box>
              ))}
            </Box>
          </Box>
          <Box display="flex" flexDir="column" gap="s16">
            <TextFields
              px="s16"
              fontSize={'s3'}
              color="gray.600"
              fontWeight={'600'}
              textTransform={'uppercase'}
            >
              {t['moreFromMyra']}
            </TextFields>

            <Box display="flex" alignItems="center" flexDir="column">
              {moreFromMyra.map((item, index) => (
                <Box
                  key={index}
                  w="100%"
                  px="s16"
                  py="s8"
                  display="flex"
                  borderRadius="br2"
                  gap="s16"
                  alignItems="center"
                  cursor="pointer"
                  _hover={{ bg: 'gray.200', filter: 'none' }}
                  onClick={() => router.push(item.link)}
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
                      src={item.img}
                      // alt="corebanking"
                    />
                  </Box>
                  <TextFields
                    fontSize="r1"
                    fontWeight="Regular"
                    color="neutralColorLight.Gray-80"
                  >
                    {t[item.title]}
                  </TextFields>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>

        <Box width="calc(100% - 300px)" display="flex">
          <Box
            flex={0.8}
            p="s32"
            overflowX="hidden"
            position="relative"
            pt="90px"
            left="300px"
          >
            <Box minHeight="100vh">{children}</Box>
          </Box>

          <Box flex={0.2}></Box>
        </Box>
      </Box>
    </Box>
  );
}

export default HomePageLayout;
