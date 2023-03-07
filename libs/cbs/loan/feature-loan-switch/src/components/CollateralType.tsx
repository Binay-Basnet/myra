import { FormSection } from '@myra-ui';

import { LoanProduct } from '@coop/cbs/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';

type LoanProductProps = {
  loanProduct: LoanProduct;
};

export const CollateralType = ({ loanProduct }: LoanProductProps) => (
  <FormSection templateColumns={2}>
    <FormSelect
      name="collateralType"
      label="Collateral Type"
      options={loanProduct?.collateralValue?.map((collateralData) => ({
        label: collateralData?.name as string,
        value: collateralData?.type as string,
      }))}
    />
    <FormInput name="ownerName" label="Owner Name" />
    <FormInput name="relation" label="Relation with Owner" />
  </FormSection>
);
