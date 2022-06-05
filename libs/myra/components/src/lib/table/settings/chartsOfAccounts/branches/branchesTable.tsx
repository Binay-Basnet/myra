import { useMemo } from 'react';
import { BranchEdge, useGetBranchesListQuery } from '@coop/myra/graphql';
import { Column, Table } from '@coop/myra/ui';

import { PopoverComponent } from '../../../../popover/Popover';
import { TableListPageHeader } from '../../../../TableListPageHeader';
import { TableSearch } from '../../../../TableSearch';

export const SettingsBranchesTable = () => {
  const { data, isLoading } = useGetBranchesListQuery();

  const rowData = useMemo(
    () => data?.settings?.general?.branch?.list?.edges,
    [data]
  );

  const popoverTitle = ['View Detail', 'View Branch Profile'];

  const columns: Column<BranchEdge>[] = useMemo(
    () => [
      {
        Header: 'Branch Code',
        accessor: 'node.branchCode',
      },

      {
        Header: 'Address',
        accessor: 'node.address',
        maxWidth: 4,
      },

      {
        Header: 'District',
        accessor: 'node.district',
      },
      {
        Header: 'Manager',
        accessor: 'node.manager.name',
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
      <TableSearch />
      <Table
        isLoading={isLoading}
        data={rowData ?? []}
        columns={columns}
        sort={true}
      />
    </>
  );
};
