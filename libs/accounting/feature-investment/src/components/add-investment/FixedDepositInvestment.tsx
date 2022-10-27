import { InputGroupContainer } from '@coop/accounting/ui-components';
import { FdInvestmentType, useGetCoaBankListQuery } from '@coop/cbs/data-access';
import {
  FormAmountInput,
  FormDatePicker,
  FormInput,
  FormNumberInput,
  FormSelect,
  FormTextArea,
} from '@coop/shared/form';
import { Box, FormSection, GridItem, Text } from '@coop/shared/ui';
import { featureCode } from '@coop/shared/utils';

const fdInvestmentTypeOptions = [
  { label: 'Type 1', value: FdInvestmentType.Type_1 },
  { label: 'Type 2', value: FdInvestmentType.Type_2 },
  { label: 'Type 3', value: FdInvestmentType.Type_3 },
];

export const FixedDepositInvestment = () => {
  const { data: bank } = useGetCoaBankListQuery({
    accountCode: featureCode.accountCode as string[],
  });

  const bankListArr = bank?.settings?.chartsOfAccount?.accountsUnder?.data;

  const bankList = bankListArr?.map((item) => ({
    label: item?.name?.local as string,
    value: item?.id as string,
  }));

  return (
    <FormSection header="Fixed Deposit">
      <FormSelect name="fd.type" label="FD Type" options={fdInvestmentTypeOptions} />

      <FormAmountInput name="fd.fdAmount" label="FD Amount" />

      <FormNumberInput
        name="fd.rate"
        label="Interest Rate"
        rightElement={
          <Text fontWeight="Medium" fontSize="r1" color="primary.500">
            %
          </Text>
        }
      />

      <FormInput name="fd.certificateNo" label="FD Certificate Number" />

      <FormDatePicker name="fd.startDate" label="FD Start Date" />

      <FormDatePicker name="fd.maturityDate" label="Maturity Date" />

      <GridItem colSpan={3}>
        <Box display="flex" flexDirection="column" gap="s12">
          <Text fontSize="s2" fontWeight="500" lineHeight="1.5">
            Nominee Details
          </Text>

          <InputGroupContainer>
            <GridItem colSpan={2}>
              <FormSelect
                name="fd.interestNomineeBank"
                label="Interest Nominee Bank"
                options={bankList}
              />
            </GridItem>

            <FormInput name="fd.bankACNo" label="Bank Account Number" />
          </InputGroupContainer>
        </Box>
      </GridItem>

      <FormSelect
        name="fd.interestLedgerMapping"
        label="Interest Received Ledger Mapping"
        options={bankList}
      />

      <GridItem colSpan={3}>
        <FormTextArea name="fd.notes" label="Notes" rows={3} />
      </GridItem>
    </FormSection>
  );
};
