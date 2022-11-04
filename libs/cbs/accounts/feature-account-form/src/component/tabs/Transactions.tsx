import { useRouter } from 'next/router';
import { AddIcon } from '@chakra-ui/icons';

import { Button, DetailsCard } from '@coop/shared/ui';
import { useAccountDetails, useGetAccountTransactionList } from '@coop/shared/utils';

import { TabHeader, TransactionCard } from '../details';

export const Transactions = () => {
  const router = useRouter();

  const { accountDetails } = useAccountDetails();

  const { transactionList } = useGetAccountTransactionList({
    accountId: accountDetails?.accountId,
  });

  return (
    <>
      <TabHeader
        heading="Transaction"
        headerButton={
          <Button
            size="md"
            justifyContent="start"
            leftIcon={<AddIcon />}
            onClick={() => router.push('/transactions/deposit/add')}
          >
            New Deposit
          </Button>
        }
      />

      <DetailsCard title="Recent Transactions" bg="white" hasTable>
        {transactionList?.map((item) => item && <TransactionCard transactionItem={item} />)}
      </DetailsCard>
    </>
  );
};
