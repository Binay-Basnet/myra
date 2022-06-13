import { useMemo } from 'react';
import { Column, Table } from '@coop/shared/ui';

export const FamilyMemberTable = () => {
  const data = [
    {
      id: 1,
      relationship: 'Grandfather',
      fullName: 'Bal Bahadur Nepal',
    },
    {
      id: 2,
      relationship: 'Grandmother',
      fullName: 'Hari maya Nepal',
    },
    {
      id: 3,
      relationship: 'Father',
      fullName: 'Shyam Nepal',
    },
    {
      id: 4,
      relationship: 'mother',
      fullName: 'Parbati Nepal',
    },
  ];

  const rowData = useMemo(() => data ?? [], [data]);

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        Header: 'SN',
        accessor: 'id',
        maxWidth: 4,
        disableSortBy: false,
      },

      {
        Header: 'Relationship',
        accessor: 'relationship',
      },
      {
        Header: 'Full Name',
        accessor: 'fullName',
        width: '80%',
      },
    ],
    []
  );

  return (
    <Table
      isLoading={false}
      data={rowData}
      columns={columns}
      isStatic={true}
      size="compact"
    />
  );
};
