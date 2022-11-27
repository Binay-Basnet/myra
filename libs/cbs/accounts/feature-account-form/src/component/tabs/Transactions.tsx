import { useRouter } from 'next/router';
import { AddIcon } from '@chakra-ui/icons';

import { useAccountDetails, useGetAccountTransactionList } from '@coop/cbs/data-access';
import { Button, DetailsCard } from '@myra-ui';

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

      <DetailsCard
        title="Recent Transactions"
        bg="white"
        hasTable
        // leftBtn={
        //   <Button
        //     variant="ghost"
        //     onClick={() =>
        //       router.push(`/accounts/details/${accountDetails?.accountId}?tab=transactions`)
        //     }
        //   >
        //     View all transactions
        //   </Button>
        // }
      >
        {transactionList?.map((item) => item && <TransactionCard transactionItem={item} />)}
      </DetailsCard>
    </>
  );
};
