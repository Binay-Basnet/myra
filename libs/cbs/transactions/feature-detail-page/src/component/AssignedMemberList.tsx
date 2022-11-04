import { useMemo } from 'react';

import { Column, Table } from '@coop/shared/table';
import { DetailsCard } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

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
        header: t['transDetailSN'],
        accessorFn: (row) => row?.account,
      },
      {
        header: t['transDetailMember'],
        accessorFn: (row) => row?.member,
      },
      {
        header: t['transDetailAccountName'],
        accessorFn: (row) => row?.account,
      },
      {
        header: t['transDetailAmount'],
        accessorFn: (row) => row?.amount,
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
