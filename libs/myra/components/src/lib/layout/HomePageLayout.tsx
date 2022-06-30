import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Box } from '@chakra-ui/react';

import { TextFields, TopLevelHeader } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export interface HomePageLayoutProps {
  children: React.ReactNode;
}

const myraAppn = [
  {
    title: 'corebankingSystems',
    img: '/ppc.svg',
    link: '/members/list',
  },
  {
    title: 'inventoryManagement',
    img: '/exp.svg',
    link: '/inventory/items',
  },
  {
    title: 'loanManagementSystem',
    img: '/theta.svg',
    link: '/members/list',
  },
  {
    title: 'accountingSystem',
    img: '/hpb.svg',
    link: '/members/list',
  },
];

const moreFromMyra = [
  {
    title: 'assetsAndInventoryManagement',
    img: '/tern.svg',
    link: '/members/list',
  },
  {
    title: 'memberAndShareManagement',
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
    title: 'crm',
    img: '/bnty.svg',
    link: '/members/list',
  },
  {
    title: 'reconciliationSoftware',
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
          p="s16"
          gap="s32"
          mt="80px"
        >
          <Box display="flex" flexDir="column" gap="s32">
            <TextFields
              color="neutralColorLight.Gray-80"
              fontWeight="SemiBold"
              fontSize="r2"
            >
              {t['yourMyraApplication']}
            </TextFields>

            <Box display="flex" alignItems="center" flexDir="column" gap="s16">
              {myraAppn.map((item) => (
                <Box
                  w="100%"
                  display="flex"
                  gap="s16"
                  alignItems="center"
                  cursor="pointer"
                  onClick={() => router.push(item.link)}
                >
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    w="s32"
                    h="s32"
                    borderRadius="50%"
                  >
                    <Image
                      width={32}
                      height={32}
                      src={item.img}
                      alt="corebanking"
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
          <Box display="flex" flexDir="column" gap="s32">
            <TextFields
              color="neutralColorLight.Gray-80"
              fontWeight="SemiBold"
              fontSize="r2"
            >
              {t['moreFromMyra']}
            </TextFields>

            <Box display="flex" alignItems="center" flexDir="column" gap="s16">
              {moreFromMyra.map((item) => (
                <Box
                  w="100%"
                  display="flex"
                  alignItems="center"
                  cursor="pointer"
                  onClick={() => router.push(item.link)}
                >
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    w="s32"
                    h="s32"
                    borderRadius="50%"
                  >
                    <Image
                      width={32}
                      height={32}
                      src={item.img}
                      alt="corebanking"
                    />
                  </Box>
                  <TextFields
                    ml="s16"
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
