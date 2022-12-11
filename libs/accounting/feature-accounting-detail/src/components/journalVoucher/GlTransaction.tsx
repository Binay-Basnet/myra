import { useMemo } from 'react';

import { DetailsCard } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { amountConverter, useTranslation } from '@coop/shared/utils';

type GlTransactionDetailProps = {
  data:
    | ({
        account: string;
        debit?: string | null | undefined;
        credit?: string | null | undefined;
      } | null)[]
    | null
    | undefined;
  totalDebit: string | null | undefined;
  totalCredit: string | null | undefined;
};

export const GlTransaction = ({ data, totalDebit, totalCredit }: GlTransactionDetailProps) => {
  const { t } = useTranslation();

  const rowData = useMemo(() => data ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: t['transDetailAccount'],
        footer: 'Total Amount',
        accessorFn: (row) => row?.account,
        meta: {
          width: '500px',
        },
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
  return (
    <DetailsCard title={t['transDetailGLTransactions']} hasTable>
      <Table showFooter isStatic isLoading={false} data={rowData ?? []} columns={columns} />
    </DetailsCard>
  );
};
