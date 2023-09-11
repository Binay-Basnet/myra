import { useMemo, useRef } from 'react';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';

import { Box, Scrollable, WIPState } from '@myra-ui';

import { AccountDetailsPathBar } from '@coop/cbs/accounts/ui-components';
import { AccountDetailsSidebar } from '@coop/cbs/accounts/ui-layouts';
import { ObjState, useAccountDetails, useIssueFdCertificateMutation } from '@coop/cbs/data-access';

import {
  GeneralUpdates,
  InterestUpdateTab,
  LedgerListTab,
  LockTransactionModal,
  Overview,
  Transactions,
  UnlockTransactionModal,
  WithdrawSlip,
} from '../component';

export const AccountDetails = () => {
  const router = useRouter();

  const tabQuery = router.query['tab'] as string;

  const {
    isOpen: isLockModalOpen,
    onClose: onLockModalClose,
    onToggle: onLockModalToggle,
  } = useDisclosure();

  const {
    isOpen: isUnlockModalOpen,
    onClose: onUnlockModalClose,
    onToggle: onUnlockModalToggle,
  } = useDisclosure();

  const confirmCancelRef = useRef<HTMLButtonElement | null>(null);

  const { accountDetails } = useAccountDetails();

  const { mutateAsync } = useIssueFdCertificateMutation();
  const isClosed = accountDetails?.objState === ObjState?.Inactive;

  const accountOptions = useMemo(() => {
    const temp = [];
    if (!isClosed) {
      temp.push({
        label: accountDetails?.transactionConstraints?.blockId
          ? 'Update Transaction Lock'
          : 'Lock Transaction',
        handler: () => onLockModalToggle(),
      });
    }
    if (accountDetails?.accountType === 'TERM_SAVING_OR_FD') {
      temp.push({
        label: 'Issue FD Certificate',
        handler: () =>
          mutateAsync({ accountId: router?.query?.['id'] as string }).then((res) =>
            window.open(res?.account?.issueFDCertificate, '_blank')
          ),
      });
    }

    if (accountDetails?.transactionConstraints) {
      temp.push({
        label: 'Unlock Transaction',
        handler: () => onUnlockModalToggle(),
      });
    }

    return temp;
  }, [accountDetails]);

  return (
    <>
      <AccountDetailsPathBar
        title="Savings Account List"
        options={!isClosed ? accountOptions : undefined}
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

            {tabQuery === 'account premium update' && <InterestUpdateTab />}

            {tabQuery === 'general updates' && <GeneralUpdates />}

            {tabQuery &&
              ![
                'undefined',
                'overview',
                'transactions',
                'withdraw slip',
                'ledger',
                'account premium update',
                'general updates',
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

      <LockTransactionModal isOpen={isLockModalOpen} onClose={onLockModalClose} />

      <UnlockTransactionModal
        isOpen={isUnlockModalOpen}
        onClose={onUnlockModalClose}
        cancelRef={confirmCancelRef}
      />
    </>
  );
};
