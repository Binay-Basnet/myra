import { useRouter } from 'next/router';

import { Button, Text } from '@myra-ui';

import { LedgerList } from '@coop/cbs/data-access';
import { amountConverter, quantityConverter } from '@coop/shared/utils';

import { BalanceCard } from '../details';
import { LedgerLists } from '../details/LedgerList';
import { useCOALeafNodeDetails } from '../../hooks';

export const LeafNodeOverview = () => {
  const router = useRouter();

  const { leafNodeData } = useCOALeafNodeDetails();

  const accountSummary = [
    {
      title: 'No. of Accounts',
      value: quantityConverter(leafNodeData?.noOfAccounts ?? 0),
    },
    {
      title: 'Transactions (Dr.)',
      value: amountConverter(leafNodeData?.drAmount ?? 0),
    },
    {
      title: 'Transactions (Cr.)',
      value: amountConverter(leafNodeData?.crAmount ?? 0),
    },
    {
      title: 'Closing Balance',
      value: leafNodeData?.closingBalance as string,
    },
  ];

  return (
    <>
      <Text fontSize="r3" fontWeight="600" color="gray.800">
        Overview
      </Text>

      <BalanceCard summary={accountSummary} />

      <LedgerLists
        ledgers={leafNodeData?.ledgers?.slice(0, 5) as LedgerList[]}
        headerButton={
          <Button
            variant="ghost"
            onClick={() =>
              router.push({
                query: {
                  ...router.query,
                  tab: 'ledger',
                },
              })
            }
          >
            View All Ledgers
          </Button>
        }
      />
    </>
  );
};
