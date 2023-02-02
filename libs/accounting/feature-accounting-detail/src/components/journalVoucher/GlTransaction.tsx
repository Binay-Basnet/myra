import { useMemo } from 'react';

import { DetailsCard, Tooltip } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { RedirectButton, ROUTES } from '@coop/cbs/utils';
import { amountConverter, useTranslation } from '@coop/shared/utils';

type GlTransactionDetailProps = {
  data:
    | ({
        account: string;
        serviceCenter?: string | null | undefined;
        debit?: string | null | undefined;
        credit?: string | null | undefined;
        ledgerId?: string | null | undefined;
      } | null)[]
    | null
    | undefined;
  totalDebit: string;
  totalCredit: string;
};

export const GlTransaction = ({ data, totalDebit, totalCredit }: GlTransactionDetailProps) => {
  const { t } = useTranslation();
  const rowData = useMemo(() => data ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Ledger',
        footer: t['transDetailTotal'],
        accessorFn: (row) => row?.account,
        cell: (props) => {
          const accountId = props.getValue() as string;
          return (
            <RedirectButton
              link={`${ROUTES.CBS_TRANS_ALL_LEDGERS_DETAIL}?id=${props?.row?.original?.ledgerId}`}
              label={<Tooltip title={accountId} />}
            />
          );
        },
        meta: {
          width: '50%',
        },
      },
      {
        header: 'Service Center',
        accessorFn: (row) => row?.serviceCenter,
      },
      {
        header: t['transDetailDebit'],
        footer: totalDebit,
        accessorFn: (row) => amountConverter(row?.debit ?? 0),
      },
      {
        header: t['transDetailCredit'],
        footer: totalCredit,
        accessorFn: (row) => amountConverter(row?.credit ?? 0),
      },
    ],
    [totalDebit, totalCredit]
  );

  if (data?.length === 0) return null;
  return (
    <DetailsCard
      title={t['transDetailGLTransactions']}
      hasTable
      // leftBtn={
      //   <Button variant="ghost" leftIcon={<IoPrintOutline />}>
      //     {t['transDetailPrintPdf']}
      //   </Button>
      // }
    >
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
