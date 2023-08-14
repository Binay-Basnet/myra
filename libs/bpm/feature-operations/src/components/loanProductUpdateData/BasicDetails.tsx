import { FormSection, GridItem } from '@myra-ui';

import { LoanUpdateType, useGetLoanProductListQuery } from '@coop/cbs/data-access';
import { FormSelect } from '@coop/shared/form';

const updateOptions = [
  {
    label: 'Product Premium Update',
    value: LoanUpdateType?.ProductPremiumUpdate,
  },
  {
    label: 'Loan Processing Charge Update',
    value: LoanUpdateType?.ProductPremiumUpdate,
  },
  {
    label: 'Loan Limit Update',
    value: LoanUpdateType?.ProductPremiumUpdate,
  },
  {
    label: 'Account Premium Update',
    value: LoanUpdateType?.ProductPremiumUpdate,
  },
  {
    label: 'Product Tenure Update ',
    value: LoanUpdateType?.ProductPremiumUpdate,
  },
  {
    label: 'Penalty Update',
    value: LoanUpdateType?.ProductPremiumUpdate,
  },
];

type OptionType = { label: string; value: string };

export const LoanProductUpdateBasicDetails = () => {
  const { data, isFetching } = useGetLoanProductListQuery({
    paginate: {
      after: '',
      first: -1,
    },
  });

  const loanProductOptions = [
    ...(data?.settings?.general?.loanProducts?.list?.edges?.reduce(
      (previousValue, currentValue) => [
        ...previousValue,
        {
          label: currentValue?.node?.productName as string,
          value: currentValue?.node?.id as string,
        },
      ],
      [] as OptionType[]
    ) ?? []),
  ];
  return (
    <FormSection templateColumns={2}>
      <GridItem colSpan={2}>
        <FormSelect
          name="productId"
          label="Product Name"
          isLoading={isFetching}
          options={loanProductOptions}
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
