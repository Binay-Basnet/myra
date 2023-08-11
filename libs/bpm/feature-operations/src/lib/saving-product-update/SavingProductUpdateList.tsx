import { useMemo } from 'react';

import { PageHeader } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { useGetOperationsSavingProductUpdateListQuery } from '@coop/cbs/data-access';
import { localizedDate } from '@coop/cbs/utils';
import { getPaginationQuery } from '@coop/shared/utils';

export const BPMOperationsSavingProductUpdateList = () => {
  const { data: meetingData, isLoading } = useGetOperationsSavingProductUpdateListQuery({
    pagination: getPaginationQuery(),
  });
  const rowData =
    meetingData?.bpm?.operations?.savingProduct?.listSavingProductUpdateHistory?.edges ?? [];

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
      <PageHeader heading="Saving Product Update List" />
      <Table
        isLoading={isLoading}
        data={rowData}
        columns={columns}
        pagination={{
          total:
            meetingData?.bpm?.operations?.savingProduct?.listSavingProductUpdateHistory
              ?.totalCount ?? 'Many',
          pageInfo:
            meetingData?.bpm?.operations?.savingProduct?.listSavingProductUpdateHistory?.pageInfo,
        }}
      />
    </>
  );
};
