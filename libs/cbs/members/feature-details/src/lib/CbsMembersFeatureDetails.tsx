import { useRouter } from 'next/router';

import { Box } from '@myra-ui';

import { AddMinorModal, MemberDetailsSidebar } from '../components';
import {
  Accounts,
  Activity,
  Bio,
  Documents,
  Loan,
  MemberShareInfo,
  Overview,
  Reports,
  Tasks,
  Transactions,
  WithdrawSlip,
} from '../tabs';

export interface CbsMemberDetailsProps {
  isAddMinorModalOpen?: boolean;
  handleMinorAccountClose: () => void;
}
export const MemberDetails = ({
  isAddMinorModalOpen,
  handleMinorAccountClose,
}: CbsMemberDetailsProps) => {
  const router = useRouter();

  const memberId = router.query['id'] as string;
  const tabQuery = router.query['tab'] as string;

  return (
    <>
      {/* <MemberDetailsPathBar title="Member List" /> */}
      <Box
        w="320px"
        position="fixed"
        h="calc(100vh - 110px)"
        overflowY="auto"
        sx={{
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        <MemberDetailsSidebar />
      </Box>
      <Box
        display="flex"
        p="s16"
        flexDir="column"
        ml="320px"
        gap="s16"
        bg="background.500"
        minH="calc(100vh - 110px)"
      >
        {(tabQuery === 'overview' || tabQuery === 'undefined' || !tabQuery) && <Overview />}
        {tabQuery === 'saving accounts' && <Accounts />}
        {tabQuery === 'activity' && <Activity />}
        {tabQuery === 'loan' && <Loan />}
        {tabQuery === 'bio' && <Bio />}
        {tabQuery === 'documents' && <Documents />}
        {tabQuery === 'reports' && <Reports />}
        {tabQuery === 'tasks' && <Tasks />}
        {tabQuery === 'share' && <MemberShareInfo />}
        {tabQuery === 'transactions' && <Transactions />}
        {tabQuery === 'withdraw slip' && <WithdrawSlip />}
      </Box>

      <AddMinorModal
        isOpen={isAddMinorModalOpen as boolean}
        onClose={handleMinorAccountClose}
        memberId={memberId}
      />
    </>
  );
};
