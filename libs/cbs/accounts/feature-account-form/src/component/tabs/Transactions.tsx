import { useRouter } from 'next/router';
import { AddIcon } from '@chakra-ui/icons';

import { Button, DetailsCard } from '@myra-ui';

import { TransactionTable } from '@coop/cbs/components';
import { ObjState, useAccountDetails } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';

import { TabHeader } from '../details';

export const Transactions = () => {
  const router = useRouter();

  const { accountDetails, transactionList, transactionLoading } = useAccountDetails();
  const isClosed = accountDetails?.objState === ObjState?.Inactive;

  return (
    <>
      <TabHeader
        heading="Transaction"
        headerButton={
          <Button
            size="md"
            justifyContent="start"
            leftIcon={<AddIcon />}
            isDisabled={isClosed}
            onClick={() =>
              router.push(
                `${ROUTES.CBS_TRANS_DEPOSIT_ADD}?memberId=${accountDetails?.member?.id}&accountId=${accountDetails?.accountId}`
              )
            }
          >
            New Deposit
          </Button>
        }
      />

      <DetailsCard
        title={isClosed ? 'Past Transactions' : 'Recent Transactions'}
        bg="white"
        hasTable
      >
        <TransactionTable data={transactionList} isLoading={transactionLoading} />
      </DetailsCard>
    </>
  );
};
