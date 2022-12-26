import { useMemo } from 'react';

import { DetailsCard } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { amountConverter, useTranslation } from '@coop/shared/utils';

type GlTransactionDetailProps = {
  tableData:
    | ({
        account: string;
        serviceCenter?: string | null | undefined;
        debit?: string | null | undefined;
        credit?: string | null | undefined;
      } | null)[]
    | null
    | undefined;
  totalDebit: string;
  totalCredit: string;
};

export const GlTransaction = ({ tableData, totalCredit, totalDebit }: GlTransactionDetailProps) => {
  const { t } = useTranslation();

  const rowData = useMemo(() => tableData ?? [], [tableData]);

  const glListWithIndex =
    rowData?.map((gl, index) => ({
      index: index + 1,
      ...gl,
    })) ?? [];

  const columns = useMemo<Column<typeof glListWithIndex[0]>[]>(
    () => [
      {
        header: 'SN',
        accessorKey: 'index',
      },
      {
        header: t['transDetailAccount'],
        footer: 'Total Amount',
        accessorFn: (row) => row?.account,
        meta: {
          width: '500px',
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
    [totalCredit, totalDebit]
  );
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
        showFooter
        isDetailPageTable
        isStatic
        isLoading={false}
        data={glListWithIndex ?? []}
        columns={columns}
      />
    </DetailsCard>
  );
};
