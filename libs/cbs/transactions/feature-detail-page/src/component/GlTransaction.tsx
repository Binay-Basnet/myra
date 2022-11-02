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
};

export const GlTransaction = ({ data }: GlTransactionDetailProps) => {
  const { t } = useTranslation();

  const rowData = useMemo(() => data ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: t['transDetailAccount'],
        accessorFn: (row) => row?.account,
        meta: {
          width: '500px',
        },
      },
      {
        header: t['transDetailDebit'],
        accessorFn: (row) => row?.debit,
      },
      {
        header: t['transDetailCredit'],
        accessorFn: (row) => row?.credit,
      },
    ],
    []
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
      <Table isStatic isLoading={false} data={rowData ?? []} columns={columns} />
    </DetailsCard>
  );
};
