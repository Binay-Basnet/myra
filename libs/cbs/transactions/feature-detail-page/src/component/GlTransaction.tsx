import { useMemo } from 'react';
import { IoPrintOutline } from 'react-icons/io5';

import { Column, Table } from '@coop/shared/table';
import { Button, DetailsCard } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

type GlTransactionDetailProps = {
  data:
    | ({
        account: string;
        debit?: string | null | undefined;
        credit?: string | null | undefined;
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
        header: t['transDetailAccount'],
        footer: t['transDetailTotal'],
        accessorFn: (row) => row?.account,
        meta: {
          width: '500px',
        },
      },
      {
        header: t['transDetailDebit'],
        footer: totalDebit,
        accessorFn: (row) => row?.debit,
      },
      {
        header: t['transDetailCredit'],
        footer: totalCredit,
        accessorFn: (row) => row?.credit,
      },
    ],
    [totalDebit, totalCredit]
  );
  return (
    <DetailsCard
      title={t['transDetailGLTransactions']}
      hasTable
      leftBtn={
        <Button variant="ghost" leftIcon={<IoPrintOutline />}>
          {t['transDetailPrintPdf']}
        </Button>
      }
    >
      <Table showFooter isStatic isLoading={false} data={rowData ?? []} columns={columns} />
    </DetailsCard>
  );
};
