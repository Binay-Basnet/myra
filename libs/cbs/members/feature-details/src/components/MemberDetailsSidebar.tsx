import { Box, DetailPageTabs } from '@myra-ui';

import { AvatarComponentForMemberDetails } from './AvatarForMemberDetails';

export const MemberDetailsSidebar = () => (
  <Box bg="white">
    <AvatarComponentForMemberDetails />

    <DetailPageTabs
      tabs={[
        'Overview',
        'Saving Accounts',
        'Share',
        // 'Reports',
        'Loan',
        'Bio',
        'Transactions',
        // 'Activity',
        'Withdraw Slip',
        // 'Documents',
        // 'Tasks',
      ]}
    />
  </Box>
);
