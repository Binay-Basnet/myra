import { useFormContext } from 'react-hook-form';

import { FormSection, GridItem } from '@myra-ui';

import { ExternalLoanType, MortageType } from '@coop/cbs/data-access';
// import { ExternalLoanType, useExternalLoanAccountListQuery } from '@coop/cbs/data-access';
import {
  FormAmountInput,
  FormDatePicker,
  FormInput,
  FormOrganizationSelect,
  FormSelect,
} from '@coop/shared/form';

const loanTypeList = [
  { label: 'Co-operative Sector', value: ExternalLoanType.CooperativeSector },
  { label: 'Other Sector', value: ExternalLoanType.OtherSector },
];

const mortageTypeOptions = [
  { label: 'Collateral', value: MortageType.Collateral },
  { label: 'Loan Against Fd', value: MortageType.LoanAgainstFd },
];

export const ExternalLoanInfo = () => {
  const { watch } = useFormContext();
  const appliedAmount = watch('appliedAmount');
  const sanctionedAmount = watch('sanctionedAmount');
  const loanAppliedDate = watch('loanAppliedDate');

  return (
    <FormSection>
      <GridItem colSpan={2}>
        <FormInput name="loanName" type="text" label="External Loan Name" />
      </GridItem>

      <FormOrganizationSelect name="organizationId" label="Name of Organization" />

      <FormSelect name="loanType" label="Loan Type" options={loanTypeList} />

      <FormSelect name="mortageType" label="Mortage Type" options={mortageTypeOptions} />

      <FormDatePicker name="loanAppliedDate" label="Loan Applied Date" />

      <FormDatePicker
        maxDate={loanAppliedDate}
        name="loanApprovedDate"
        label="Loan Approved Date"
      />

      <FormAmountInput name="appliedAmount" type="number" label="Applied Amount" />

      <FormAmountInput
        rules={{
          max: {
            value: appliedAmount,
            message: 'Sanctioned amount should not exceed Applied amount ',
          },
        }}
        name="sanctionedAmount"
        type="number"
        label="Sanctioned Amount"
      />

      <FormAmountInput
        rules={{
          max: {
            value: sanctionedAmount,
            message: 'Disbursed amount should not exceed Sanctioned amount ',
          },
        }}
        name="disbursedAmount"
        type="number"
        label="Disbursed Amount"
      />

      <FormInput name="loanAccountNumber" type="text" label="Loan Account Number" />
    </FormSection>
  );
};
