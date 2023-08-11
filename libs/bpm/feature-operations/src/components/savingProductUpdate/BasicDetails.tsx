import { useMemo } from 'react';

import { FormSection, GridItem } from '@myra-ui';

import { SvUpdateType, useGetDepositProductSettingsListQuery } from '@coop/cbs/data-access';
import { FormSelect } from '@coop/shared/form';

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

export const SavingProductUpdateBasicDetails = () => {
  const { data, isLoading } = useGetDepositProductSettingsListQuery({
    paginate: {
      after: '',
      first: -1,
    },
  });
  const rowData = useMemo(() => data?.settings?.general?.depositProduct?.list?.edges ?? [], [data]);
  const productOptions = rowData?.map((item) => ({
    label: item?.node?.productName as string,
    value: item?.node?.id as string,
  }));

  return (
    <FormSection templateColumns={2}>
      <GridItem colSpan={2}>
        <FormSelect
          name="productId"
          label="Product Name"
          isLoading={isLoading}
          options={productOptions}
        />
      </GridItem>

      <FormSelect
        name="updateType"
        label="Update Type"
        options={updateOptions}
        menuPosition="fixed"
      />
    </FormSection>
  );
};
