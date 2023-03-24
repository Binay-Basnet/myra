import { IconType } from 'react-icons';
import { IoChatboxEllipsesOutline, IoPhonePortraitSharp, IoTvOutline } from 'react-icons/io5';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, Tab, TabList, Tabs, Text } from '@chakra-ui/react';

import { Icon } from '@myra-ui';

import { en, useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface TabMenuProps {}

const NAVBAR_TAB_OBJECT: Record<string, number> = {
  '/alternative-channels/users/mBanking': 0,
  '/alternative-channels/users/eBanking': 1,
  '/alternative-channels/users/smsBanking': 2,
};

const demotabs: { title: keyof typeof en; icon: IconType; link: string }[] = [
  {
    title: 'acMBanking',
    icon: IoPhonePortraitSharp,
    link: '/alternative-channels/users/mBanking',
  },
  {
    title: 'acEBanking',
    icon: IoTvOutline,
    link: '/alternative-channels/users/eBanking',
  },
  {
    title: 'acSMSBanking',
    icon: IoChatboxEllipsesOutline,
    link: '/alternative-channels/users/smsBanking',
  },
];

export const TabMenu = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const currentIndex =
    NAVBAR_TAB_OBJECT[
      Object.keys(NAVBAR_TAB_OBJECT).find((string) => router.asPath.includes(string)) ?? ''
    ];

  return (
    <Box
      height="3.125rem"
      px="s16"
      pt="s4"
      pb="5px"
      background="secondary.700"
      alignItems="center"
      display="flex"
    >
      <Box w="240px">
        <Text fontWeight="500" fontSize="s16" color="gray.0" letterSpacing="wide">
          {t['settingsAlternativeChannel']}
        </Text>
      </Box>
      <Tabs index={currentIndex} size="md" height="100%" variant="enclosed">
        <TabList border="none" height="100%" display="flex" gap="s8">
          {demotabs.map(({ title, icon, link }) => {
            const isActive = router.asPath.includes(link);

            return (
              <Link href={link} key={title}>
                <Tab
                  _focus={{}}
                  px="s16"
                  py="s4"
                  display="flex"
                  alignItems="center"
                  gap="s8"
                  border="none"
                  _hover={{
                    bg: 'background.500',
                    color: 'neutralColorLight.Gray-60',
                    borderRadius: 'br2',
                  }}
                  _selected={{
                    bg: 'background.500',
                    color: 'gray.800',
                    borderRadius: 'br2',
                  }}
                  _active={{
                    color: 'gray.800',
                  }}
                  color="gray.0"
                >
                  <Icon as={icon} size="md" color={isActive ? 'primary.500' : 'primary.300'} />

                  <Text fontSize="r1" lineHeight="0" fontWeight={isActive ? '600' : '500'}>
                    {t[title]}
                  </Text>
                </Tab>
              </Link>
            );
          })}
        </TabList>
      </Tabs>
    </Box>
  );
};

export default TabMenu;
