import { FormSection, GridItem, Text } from '@myra-ui';

import { ExternalLoanType, useExternalLoanAccountListQuery } from '@coop/cbs/data-access';
import { FormAmountInput, FormInput, FormSelect } from '@coop/shared/form';
import { getRouterQuery } from '@coop/shared/utils';

export const ExternalLoanInfo = () => {
  const { data } = useExternalLoanAccountListQuery({
    pagination: getRouterQuery({ type: ['PAGINATION'] }),
  });

  const accountList = data?.accounting?.externalLoan?.account?.list?.edges;

  const orgList =
    accountList &&
    accountList?.map((item) => ({
      label: item?.node?.name as string,
      value: item?.node?.id as string,
    }));

  const loanTypeList = [
    { label: 'Collateral', value: ExternalLoanType.Collateral },
    { label: 'Loan Against Fd', value: ExternalLoanType.LoanAgainstFd },
  ];

  return (
    <>
      <FormSection divider={false}>
        <GridItem colSpan={2}>
          <FormInput name="loanName" type="text" label="External Loan" />
        </GridItem>
        <GridItem colSpan={1}>
          <FormSelect
            name="nameOfOrganization"
            label="Name of Organization"
            options={orgList ?? []}
          />
        </GridItem>
        <FormSelect name="typeOfLoan" label="Type of Loan" options={loanTypeList} />

        <FormInput name="loanAppliedDate" type="date" label="Loan Applied Date" />
        <FormInput name="loanApprovedDate" type="date" label="Loan Approved Date" />
      </FormSection>

      <FormSection divider={false}>
        <FormAmountInput name="appliedAmount" type="text" label="Applied Amount" />
        <FormAmountInput name="approvedAmount" type="text" label="Approved Amount" />
        <FormInput name="loanNumber" type="text" label="Loan Number" />
      </FormSection>

      <FormSection>
        <FormInput name="effectiveStartDate" type="date" label="Effective Start Date" />
        <FormInput name="maturityDate" type="date" label="Maturity Date" />
        <FormInput
          name="interestRate"
          type="number"
          textAlign="right"
          rightElement={
            <Text fontWeight="Medium" fontSize="r1" color="primary.500">
              %
            </Text>
          }
          label="Interest Rate"
        />
      </FormSection>
    </>
  );
};
