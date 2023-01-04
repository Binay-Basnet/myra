import { useMemo } from 'react';

import { DetailsCard } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { GlTransaction } from '@coop/cbs/data-access';
import { amountConverter, useTranslation } from '@coop/shared/utils';

type CustomTransactionItem = GlTransaction & {
  index?: string | number;
};

type GlTransactionDetailProps = {
  data: CustomTransactionItem[] | null | undefined;
  totalAmount: string;
};

export const GlTransactionTable = ({ data, totalAmount }: GlTransactionDetailProps) => {
  const { t } = useTranslation();

  const rowData = useMemo(() => data ?? [], [data]);

  const glTransactionListWithIndex =
    rowData?.map((trans, index) => ({
      index: index + 1,
      ...trans,
    })) ?? [];

  const columns = useMemo<Column<typeof glTransactionListWithIndex[0]>[]>(
    () => [
      {
        header: 'SN',
        accessorKey: 'index',
        footer: 'Total Amount',
        meta: {
          width: '10%',
        },
      },
      {
        header: t['transDetailAccount'],
        accessorFn: (row) => row?.account,
      },
      {
        header: 'Debit',
        accessorFn: (row) => amountConverter(row?.debit ?? 0),
      },
      {
        header: 'credit',
        footer: totalAmount ?? 0,
        accessorFn: (row) => amountConverter(row?.credit ?? 0),
      },
    ],
    [totalAmount]
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
        isDetailPageTable
        showFooter
        isStatic
        isLoading={false}
        data={glTransactionListWithIndex ?? []}
        columns={columns}
      />
    </DetailsCard>
  );
};
