import { useMemo } from 'react';
import { IoCopyOutline } from 'react-icons/io5';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Box, chakra, Tab, Tabs, Text } from '@chakra-ui/react';

import { Avatar, Divider, Icon } from '@coop/shared/ui';

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
  // const { t } = useTranslation();
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
      <Box display="flex" flexDirection="column" p="s16" gap="s16">
        <Box display="flex" gap="s16">
          <Avatar
            name={'Rani Dhakal'}
            size="lg"
            src={'memberDetails.avatar'}
            // onClick={() =>
            //   handleModalOpen(
            //     memberDetails.avatar,
            //     memberDetails.name ?? 'Member'
            //   )
            // }
            cursor="pointer"
          />

          <Box display="flex" flexDirection="column" gap="s4">
            <Text fontSize="r1" fontWeight="500" color="primary.500">
              {'Rani Dhakal'}
            </Text>
            <Text fontSize="s3" fontWeight="400" color="gray.800">
              {'Kathmandu Branch'}
            </Text>
            <Box display="flex" alignItems="center" gap="s10">
              <Text fontSize="s3" fontWeight="400" color="gray.800">
                {'123456'}
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
                <Text>{title}</Text>
              </TabCol>
            </Link>
          );
        })}
      </Tabs>
    </Box>
  );
};
