import { useMemo } from 'react';

import { Column, DetailsCard, Table, Text } from '@myra-ui';

import { BalanceType, CashTransferLedgerView } from '@coop/cbs/data-access';
import { RedirectButton, ROUTES } from '@coop/cbs/utils';
import { amountConverter } from '@coop/shared/utils';

type MyLedgerListProps = {
  data: [CashTransferLedgerView] | null | undefined;
  totalCr: string | null | undefined;
  totalDr: string | null | undefined;
};

export const MyLedger = ({ data, totalCr, totalDr }: MyLedgerListProps) => {
  const getTypeProps = (typeVariant: BalanceType | null | undefined) => {
    switch (typeVariant) {
      case 'DR':
        return { text: typeVariant };

      case 'CR':
        return { text: typeVariant };

      default:
        return { text: '-' };
    }
  };

  const rowData = useMemo(() => data ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Ledger',
        footer: 'Total',
        accessorFn: (row) => row?.ledgerName,
        cell: (props) => {
          const accountId = props.getValue() as string;
          return (
            <RedirectButton
              link={`${ROUTES.CBS_TRANS_ALL_LEDGERS_DETAIL}?id=${props?.row?.original?.ledgerId}`}
              label={accountId}
            />
          );
        },
      },
      {
        header: 'Debit',
        footer: amountConverter(Number(totalDr)),
        accessorFn: (row) => amountConverter(row?.dr ?? 0),
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Credit',
        footer: amountConverter(Number(totalCr)) as string,
        accessorFn: (row) => amountConverter(row?.cr ?? 0),
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Balance',
        accessorFn: (row) => amountConverter(row?.balance ?? 0),
        meta: {
          isNumeric: true,
        },
      },
      {
        header: ' ',
        accessorFn: (row) => row?.balanceType,
        cell: (props) => (
          <Text fontSize="s3" fontWeight="Regular">
            {getTypeProps(props?.row?.original?.balanceType)?.text}
          </Text>
        ),
      },
    ],
    []
  );

  if (rowData?.length === 0) return null;
  return (
    <DetailsCard title="My Ledger" subTitle="Source Ledger & account." hasTable>
      <Table
        isDetailPageTable
        showFooter
        isStatic
        isLoading={false}
        data={rowData ?? []}
        columns={columns}
      />
    </DetailsCard>
  );
};
