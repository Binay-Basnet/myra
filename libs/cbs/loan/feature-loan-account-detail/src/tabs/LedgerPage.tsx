import { useMemo } from 'react';
import { useRouter } from 'next/router';

import { Box, Button, Column, DetailsCard, Table, Text, Tooltip } from '@myra-ui';

import { AccountLedgerDetails } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';
import { amountConverter } from '@coop/shared/utils';

import { TabHeader } from '../component';
import { useLoanAccountDetailHooks } from '../hooks/useLoanAccountDetailHooks';

type CustomTransactionItem = AccountLedgerDetails & {
  index?: string | number;
};

export const LedgerPage = () => {
  const router = useRouter();
  const { ledgerList } = useLoanAccountDetailHooks();

  const rowData = useMemo(() => ledgerList ?? [], [ledgerList]);

  const ledgerListWithIndex =
    rowData?.map((ledger, index) => ({
      index: index + 1,
      ...ledger,
    })) ?? [];

  const columns = useMemo<Column<CustomTransactionItem>[]>(
    () => [
      {
        header: 'SN',
        accessorKey: 'index',
      },
      {
        header: 'Ledger Name',
        meta: { width: '80%' },
        cell: (props) => (
          <Box gap="s4">
            <Button
              variant="link"
              onClick={() =>
                router.push(
                  `${ROUTES.SETTINGS_GENERAL_COA_DETAILS}?id=${props?.row?.original?.ledgerId}`
                )
              }
            >
              <Tooltip title={props?.row?.original?.ledgerName as string} />
            </Button>
          </Box>
        ),
      },
      {
        header: 'Balance',
        cell: (props) => (
          <Text fontWeight="Regular" fontSize="r1" lineHeight="17px" color="gray.800">
            {props?.row?.original?.balanceType}&nbsp;
            {amountConverter(props?.row?.original?.balance ?? 0)}
          </Text>
        ),
      },
    ],
    [ledgerList]
  );
  return (
    <>
      <TabHeader heading="Ledger" />
      <DetailsCard title="Ledger Lists" hasTable>
        <Table
          isDetailPageTable
          showFooter
          isStatic
          isLoading={false}
          data={ledgerListWithIndex ?? []}
          columns={columns}
        />
      </DetailsCard>
    </>
  );
};
