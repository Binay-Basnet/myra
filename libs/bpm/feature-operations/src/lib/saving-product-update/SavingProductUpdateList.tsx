import { useMemo } from 'react';

import { PageHeader } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { SvUpdateType, useGetOperationsSavingProductUpdateListQuery } from '@coop/cbs/data-access';
import { localizedDate } from '@coop/cbs/utils';
import { getPaginationQuery } from '@coop/shared/utils';

const updateOptions = [
  {
    label: 'Product Premium Update',
    value: SvUpdateType?.ProductPremiumUpdate,
  },
  {
    label: 'Account Open Fees and Charges Update',
    value: SvUpdateType?.AccountOpenFeesAndChargeUpdate,
  },
  {
    label: 'Account Close Fees and Charges Update',
    value: SvUpdateType?.AccountCloseFeesAndChargeUpdate,
  },
  {
    label: 'Cheque Settings Update',
    value: SvUpdateType?.ChequeSettingsUpdate,
  },
  {
    label: 'Balance Limit Update',
    value: SvUpdateType?.BalanceLimitUpdate,
  },
  {
    label: 'Account Premium Update',
    value: SvUpdateType?.AccountPremiumUpdate,
  },
  {
    label: 'Product Tenure Uppdate',
    value: SvUpdateType?.ProductTenureUpdate,
  },
  {
    label: 'Premature Penalty Update',
    value: SvUpdateType?.PrematurePenaltyUpdate,
  },
  {
    label: 'Withdraw Penalty Update',
    value: SvUpdateType?.WithdrawPenaltyUpdate,
  },
  {
    label: 'Rebate Update',
    value: SvUpdateType?.RebateUpdate,
  },
  {
    label: 'Penalty Charge Update',
    value: SvUpdateType?.PenaltyChargeUpdate,
  },
];

export const BPMOperationsMinorsList = () => {
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
        cell: (props) =>
          updateOptions?.find((d) => d?.value === props?.row?.original?.node?.updateType)?.label,

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
