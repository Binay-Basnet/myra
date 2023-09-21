import { useFormContext } from 'react-hook-form';
import { useGetSalaryStructureOptions } from '@hr/common';

import { Box, FormSection, GridItem } from '@myra-ui';

import { PaymentMode, useGetBankListQuery } from '@coop/cbs/data-access';
import { FormAccountSelect, FormInput, FormSelect, FormSwitchTab } from '@coop/shared/form';

export const PayrollSetup = () => {
  const { salaryStructureOptions } = useGetSalaryStructureOptions();
  const { watch } = useFormContext();

  const coopMemberIdWatch = watch('coopMemberId');
  const { data: bankList } = useGetBankListQuery();
  const bankListData = bankList?.bank?.bank?.list;

  const salaryPaymentModeWatch = watch('salaryPaymentMode');

  return (
    <FormSection
      id="Payroll Setup"
      header="Payroll Setup"
      subHeader="Following fields are optional and can be updated later from Employee > Payroll ? Payroll Setup"
    >
      <FormSelect name="payGroup" label="Pay Group" />
      <FormInput name="panNumber" label="Pan" />
      <FormSelect
        name="salaryStructureId"
        label="Salary Structure"
        options={salaryStructureOptions}
      />
      <GridItem colSpan={3}>
        <FormSwitchTab
          name="salaryPaymentMode"
          label="Payment Mode"
          options={[
            {
              label: 'Cash',
              value: PaymentMode?.Cash,
            },
            {
              label: 'Account',
              value: PaymentMode?.Account,
            },
            {
              label: 'Bank Transfer',
              value: PaymentMode?.BankTransfer,
            },
          ]}
        />
      </GridItem>
      {salaryPaymentModeWatch === PaymentMode?.Account && (
        <GridItem colSpan={3}>
          <Box w="-webkit-fit-content">
            <FormAccountSelect name="account" label="Select Account" memberId={coopMemberIdWatch} />
          </Box>
        </GridItem>
      )}
      {salaryPaymentModeWatch === PaymentMode?.BankTransfer && (
        <>
          <FormSelect
            name="bank"
            label="Bank"
            options={bankListData?.map((item) => ({ label: item?.name, value: item?.id }))}
          />
          <FormInput name="accountName" label="Account Name" />
          <FormInput name="accountNumber" label="Account Number" />
        </>
      )}
    </FormSection>
  );
};

export default PayrollSetup;
