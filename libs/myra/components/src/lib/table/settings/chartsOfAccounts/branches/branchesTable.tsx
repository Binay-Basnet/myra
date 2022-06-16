import { useMemo } from 'react';

import { PopoverComponent, TableListPageHeader } from '@coop/myra/components';
import { useGetBranchesListQuery } from '@coop/shared/data-access';
import { Column, Table } from '@coop/shared/ui';

export const SettingsBranchesTable = () => {
  const { data, isLoading } = useGetBranchesListQuery();

  const rowData = useMemo(
    () => data?.settings?.general?.branch?.list?.edges ?? [],
    [data]
  );

  const popoverTitle = ['View Detail', 'View Branch Profile'];

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        Header: 'Branch Code',
        accessor: 'node.branchCode',
      },

      {
        Header: 'Address',
        accessor: 'node.address.provinceId',
        maxWidth: 4,
      },

      {
        Header: 'District',
        accessor: 'node.address.districtId',
      },
      {
        Header: 'Manager',
        accessor: 'node.manager.id',
        width: '25%',
      },

      {
        Header: 'Contact Number',
        accessor: 'node.contactNumber',
        maxWidth: 48,
      },

      {
        accessor: 'actions',
        width: '10%',
        Cell: () => <PopoverComponent title={popoverTitle} />,
      },
    ],
    []
  );

  return (
    <>
      <TableListPageHeader heading={'Branches'} />

      <Table
        isLoading={isLoading}
        data={rowData ?? []}
        columns={columns}
        sort={true}
      />
    </>
  );
};
