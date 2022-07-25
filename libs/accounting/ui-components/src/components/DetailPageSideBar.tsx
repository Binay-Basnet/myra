import { useMemo } from 'react';
import { IoCopyOutline } from 'react-icons/io5';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, chakra, Image, Tab, Tabs, Text } from '@chakra-ui/react';

import { Divider, Icon } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

const TabCol = chakra(Tab, {
  baseStyle: {
    color: 'gray.800',
    height: '48px',
    fontSize: 'r1',
    fontWeight: '400',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    _selected: {
      bg: '#EEF2F7',
      fontWeight: '600',
    },
    _focus: {
      boxShadow: 'none',
    },
  },
});

interface IVerticalSidebarProps {
  tablinks: {
    title: string;
    to: string;
  }[];
}

export const DetailPageSideBar = ({ tablinks }: IVerticalSidebarProps) => {
  const { t } = useTranslation();
  const router = useRouter();
  const pathArray = router.pathname.split('/');

  const currentIndex = useMemo(
    () =>
      tablinks.findIndex((link) => {
        const linkArray = link.to.split('/');
        return (
          pathArray[pathArray.length - 1] === linkArray[linkArray.length - 1]
        );
      }),
    [router.pathname]
  );

  return (
    <Box display="flex" flexDirection="column" gap="s16">
      <Box display="flex" p="s16">
        <Box px="s16" py="s8">
          <Image
            height="48px"
            width="34px"
            src={'/standard.png'}
            alt={'title'}
          />
        </Box>
        <Box display="flex" gap="s10">
          <Box>
            <Text
              color="neutralColorLight.Gray-80"
              fontWeight="SemiBold"
              fontSize="r2"
            >
              SC Saving Account
            </Text>

            <Text
              color="neutralColorLight.Gray-70"
              fontWeight="Regular"
              fontSize="s3"
            >
              Standard Chartered Bank Nepal
            </Text>
            <Box display="flex" gap="s10" alignItems="center">
              <Text
                color="neutralColorLight.Gray-70"
                fontWeight="Medium"
                fontSize="s3"
              >
                09100003422490
              </Text>
              <Icon
                _hover={{ cursor: 'pointer' }}
                size="sm"
                as={IoCopyOutline}
              />
            </Box>
          </Box>
        </Box>
      </Box>

      <Divider />

      <Tabs p="s16" variant="unstyled" index={currentIndex}>
        {tablinks.map(({ title, to }, index) => {
          return (
            <Link href={to} key={`${title}${index}`}>
              <TabCol>
                <Text>{t[title]}</Text>
              </TabCol>
            </Link>
          );
        })}
      </Tabs>
    </Box>
  );
};
