import { useMemo } from 'react';

import { PageHeader } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { useGetLoanCollateralListQuery } from '@coop/cbs/data-access';
import { localizedDate } from '@coop/cbs/utils';
import { getPaginationQuery } from '@coop/shared/utils';

export const CollateralManagementList = () => {
  const { data: meetingData, isLoading } = useGetLoanCollateralListQuery({
    pagination: getPaginationQuery(),
  });
  const rowData = meetingData?.bpm?.operations?.loanCollateral?.listCollateral?.edges ?? [];

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Created Date',
        accessorKey: 'node.date',
        accessorFn: (props) => localizedDate(props?.node?.date),
      },
      {
        header: 'Member Code',
        accessorKey: 'node.code',
      },
      {
        header: 'Name',
        accessorKey: 'node.name',
      },
      {
        header: 'Account Name',
        accessorKey: 'node.accountName',
      },
      {
        header: 'Collateral Type',
        accessorKey: 'node.collateralType',
      },
      {
        header: 'Collateral Name',
        accessorKey: 'node.collateralName',
      },
    ],
    []
  );

  return (
    <>
      <PageHeader heading="Collateral Management" />
      <Table
        isLoading={isLoading}
        data={rowData}
        columns={columns}
        pagination={{
          total: meetingData?.bpm?.operations?.loanCollateral?.listCollateral?.totalCount ?? 'Many',
          pageInfo: meetingData?.bpm?.operations?.loanCollateral?.listCollateral?.pageInfo,
        }}
      />
    </>
  );
};

export default CollateralManagementList;
