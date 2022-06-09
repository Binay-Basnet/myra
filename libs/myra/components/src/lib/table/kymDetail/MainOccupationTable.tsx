import { useMemo } from 'react';
import { Column, Table } from '@coop/myra/ui';

export const MainOccupationTable = () => {
  const data = [
    {
      id: 1,
      occupation: 'Business',
      firmName: 'Bal Bahadur Nepal',
      PVNo: '1232532',
      address: 'Tokha-12, Lalitpur',
      income: '30,00,000',
    },
    {
      id: 2,
      occupation: 'Agricutlture',
      firmName: 'Arava Nepal Modern Agriculture Co. Ltd',
      PVNo: '34356',
      address: 'Manbhawan-1, Kathmandu',
      income: '24,00,000',
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
        Header: 'Occupation',
        accessor: 'occupation',
      },
      {
        Header: 'Org / Firm Name',
        accessor: 'firmName',
        width: '80%',
      },

      {
        Header: 'Pan / VAT No',
        accessor: 'PVNo',
        isNumeric: true,
      },
      {
        Header: 'Address',
        accessor: 'address',
        width: '20%',
      },
      {
        Header: 'Estimated Annual Income',
        accessor: 'income',
        isNumeric: true,
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
