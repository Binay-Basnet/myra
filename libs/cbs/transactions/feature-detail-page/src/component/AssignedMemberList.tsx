import { useMemo } from 'react';
import { DetailsCard } from '@myra-ui';

import { Column, Table } from '@coop/shared/table';
import { amountConverter, useTranslation } from '@coop/shared/utils';

type AssignedMemberListProps = {
  data:
    | ({
        member?: string | null | undefined;
        account?: string | null | undefined;
        amount?: string | null | undefined;
      } | null)[]
    | null
    | undefined;
};

export const AssignedMemberList = ({ data }: AssignedMemberListProps) => {
  const { t } = useTranslation();

  const rowData = useMemo(() => data ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        id: '1',
        header: t['transDetailSN'],
        accessorFn: (row) => row?.account,
      },
      {
        id: '2',
        header: t['transDetailMember'],
        accessorFn: (row) => row?.member,
      },
      {
        id: '3',
        header: t['transDetailAccountName'],
        accessorFn: (row) => row?.account,
      },
      {
        id: '4',
        header: t['transDetailAmount'],
        accessorFn: (row) => amountConverter(row?.amount ?? 0),
      },
    ],
    []
  );
  return (
    <DetailsCard title={t['transDetailAssignedMemberList']} hasTable>
      <Table showFooter isStatic isLoading={false} data={rowData ?? []} columns={columns} />
    </DetailsCard>
  );
};
