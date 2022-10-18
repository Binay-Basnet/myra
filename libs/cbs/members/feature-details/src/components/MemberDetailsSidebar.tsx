import Image from 'next/image';

import { Box, DetailPageTabs, Text } from '@coop/shared/ui';

export const MemberDetailsSidebar = () => (
  <>
    <Box
      borderBottom="1px"
      borderBottomColor="border.layout"
      display="flex"
      flexDirection="column"
      gap="s16"
      p="s16"
    >
      {' '}
      <Box position="relative" h="284px">
        <Image src="/loginLogo.png" layout="fill" alt="logo" />
      </Box>
      <Box display="flex" flexDirection="column" gap="s8">
        <Text fontSize="l1" fontWeight="600">
          {' '}
          name here
        </Text>
        <Text fontSize="r1" fontWeight="600">
          {' '}
          name here
        </Text>
        <Text fontSize="r1" fontWeight="600">
          {' '}
          name here
        </Text>
      </Box>
    </Box>

    <DetailPageTabs
      tabs={[
        'Overview',
        'Accounts',
        'Share',
        'Reports',
        'Bio',
        'Transactions',
        'Activity',
        'Cheque',
        'Documents',
        'Tasks',
      ]}
    />
  </>
);
