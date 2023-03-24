import { useRouter } from 'next/router';

import { Box, Scrollable, WIPState } from '@myra-ui';

import { AccountDetailsPathBar } from '@coop/cbs/accounts/ui-components';
import { AccountDetailsSidebar } from '@coop/cbs/accounts/ui-layouts';
import { NatureOfDepositProduct, useAccountDetails } from '@coop/cbs/data-access';

import {
  AddNomineeModal,
  AddTenureModal,
  InterestUpdateTab,
  LedgerListTab,
  Overview,
  Transactions,
  WithdrawSlip,
} from '../component';

interface IAccountDetailsProps {
  pathbarOptions?: { label: string; handler: () => void }[];
  isNomineeAccountModalOpen?: boolean;
  handleNomineeModalClose?: () => void;
  isTenureModalOpen?: boolean;
  handleTenureModalClose?: () => void;
}

export const AccountDetails = ({
  pathbarOptions,
  handleNomineeModalClose,
  isNomineeAccountModalOpen,
  handleTenureModalClose,
  isTenureModalOpen,
}: IAccountDetailsProps) => {
  const router = useRouter();

  const tabQuery = router.query['tab'] as string;
  const { accountDetails } = useAccountDetails();

  return (
    <>
      <AccountDetailsPathBar
        title="Savings Account List"
        options={
          accountDetails?.accountType === NatureOfDepositProduct?.TermSavingOrFd ||
          accountDetails?.accountType === NatureOfDepositProduct?.RecurringSaving
            ? pathbarOptions
            : undefined
        }
      />
      <Box display="flex">
        <Box
          w="320px"
          position="fixed"
          h="calc(100vh - 110px)"
          borderRight="1px"
          borderRightColor="border.layout"
          overflowY="auto"
        >
          <AccountDetailsSidebar />
        </Box>
        <Scrollable detailPage>
          <Box
            display="flex"
            p="s16"
            flexDir="column"
            gap="s16"
            ml="320px"
            bg="background.500"
            minH="calc(100vh - 170px)"
          >
            {(tabQuery === 'overview' || tabQuery === 'undefined' || !tabQuery) && <Overview />}

            {tabQuery === 'transactions' && <Transactions />}

            {tabQuery === 'withdraw slip' && <WithdrawSlip />}

            {tabQuery === 'ledger' && <LedgerListTab />}

            {tabQuery === 'interest update' && <InterestUpdateTab />}

            {tabQuery &&
              ![
                'undefined',
                'overview',
                'transactions',
                'withdraw slip',
                'ledger',
                'interest update',
              ].includes(tabQuery) && (
                <Box h="calc(100vh - 110px)">
                  <WIPState />
                </Box>
              )}

            {/* {tabQuery === 'accounts' && <Account />}
        {tabQuery === 'activity' && <Activity />}
        {tabQuery === 'bio' && <Bio />}
        {tabQuery === 'cheque' && <Cheque />}
        {tabQuery === 'documents' && <Documents />}
        {tabQuery === 'reports' && <Reports />}
        {tabQuery === 'share' && <Share />}
        {tabQuery === 'tasks' && <Tasks />}
        {tabQuery === 'transactions' && <Transactions />} */}
          </Box>
        </Scrollable>
      </Box>
      <AddNomineeModal
        isOpen={isNomineeAccountModalOpen as boolean}
        onClose={handleNomineeModalClose as () => void}
      />
      <AddTenureModal
        isOpen={isTenureModalOpen as boolean}
        onClose={handleTenureModalClose as () => void}
      />
    </>
  );
};
