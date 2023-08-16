import { useMemo } from 'react';

import { PageHeader } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { useGetOperationsLoanProductUpdateListQuery } from '@coop/cbs/data-access';
import { localizedDate } from '@coop/cbs/utils';
import { getPaginationQuery } from '@coop/shared/utils';

export const BPMOperationsLoanProductUpdateList = () => {
  const { data: meetingData, isLoading } = useGetOperationsLoanProductUpdateListQuery({
    pagination: getPaginationQuery(),
  });
  const rowData =
    meetingData?.bpm?.operations?.loanProduct?.listLoanProductUpdateHistory?.edges ?? [];

  const columns = useMemo<Column<typeof rowData[0]>[]>(
    () => [
      {
        header: 'Updated Date',
        accessorKey: 'node.date',
        accessorFn: (props) => localizedDate(props?.node?.date),
      },
      {
        header: 'Product Code',
        accessorKey: 'node.productCode',
      },
      {
        header: 'Product Name',
        accessorKey: 'node.productName',
      },
      {
        header: 'Update Type',
        accessorKey: 'node.updateType',

        meta: {
          width: '50%',
        },
      },
    ],
    []
  );

  return (
    <>
      <PageHeader heading="Loan Product Update List" />
      <Table
        isLoading={isLoading}
        data={rowData}
        columns={columns}
        pagination={{
          total:
            meetingData?.bpm?.operations?.loanProduct?.listLoanProductUpdateHistory?.totalCount ??
            'Many',
          pageInfo:
            meetingData?.bpm?.operations?.loanProduct?.listLoanProductUpdateHistory?.pageInfo,
        }}
      />
    </>
  );
};
