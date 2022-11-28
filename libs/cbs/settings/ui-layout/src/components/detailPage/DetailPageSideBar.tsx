import { useMemo } from 'react';
import { IoCopyOutline } from 'react-icons/io5';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, chakra, Tab, Tabs, Text } from '@chakra-ui/react';

import { Divider, Icon } from '@myra-ui';
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
        return pathArray[pathArray.length - 1] === linkArray[linkArray.length - 1];
      }),
    [router.pathname]
  );

  return (
    <Box display="flex" flexDirection="column" gap="s16">
      <Box display="flex" flexDirection="column" p="s16" gap="s16">
        <Box display="flex" justifyContent="space-between">
          <Box>
            <Text color="neutralColorLight.Gray-80" fontWeight="SemiBold" fontSize="r2">
              House Loan
            </Text>
            <Box display="flex" gap="s10" alignItems="center">
              <Text color="neutralColorLight.Gray-70" fontWeight="Medium" fontSize="s3">
                ASM0493
              </Text>
              <Icon _hover={{ cursor: 'pointer' }} size="sm" as={IoCopyOutline} />
            </Box>
          </Box>
          <Box>
            <Text color="neutralColorLight.Gray-80" fontWeight="Regular" fontSize="s3">
              Interest
            </Text>
            <Text color="neutralColorLight.Gray-80" fontWeight="Medium" fontSize="s3">
              8.03%
            </Text>
          </Box>
        </Box>

        <Box display="flex" flexDirection="column" justifyContent="space-between">
          <Text color="neutralColorLight.Gray-80" fontWeight="Regular" fontSize="s3">
            Product Type
          </Text>
          <Text color="neutralColorLight.Gray-80" fontWeight="Medium" fontSize="s3">
            Assets Purchases & Maintanance Loan
          </Text>
        </Box>
      </Box>

      <Divider />

      <Tabs p="s16" variant="unstyled" index={currentIndex}>
        {tablinks.map(({ title, to }) => (
          <Link href={to} key={title}>
            <TabCol>
              <Text>{t[title]}</Text>
            </TabCol>
          </Link>
        ))}
      </Tabs>
    </Box>
  );
};
