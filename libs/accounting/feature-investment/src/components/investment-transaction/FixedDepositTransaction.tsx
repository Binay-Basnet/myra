import { FdInvestmentType } from '@coop/cbs/data-access';
import { FormAmountInput, FormSelect } from '@coop/shared/form';
import { Alert, Box, FormSection, GridItem, Text } from '@coop/shared/ui';

const fdTypeOptions = [
  { label: 'Type 1', value: FdInvestmentType.Type_1 },
  { label: 'Type 2', value: FdInvestmentType.Type_2 },
  { label: 'Type 3', value: FdInvestmentType.Type_3 },
];

export const FixedDepositTransaction = () => (
  // const { data: bank } = useGetCoaBankListQuery({
  //   accountCode: featureCode.accountCode as string[],
  // });

  // const bankListArr = bank?.settings?.chartsOfAccount?.accountsUnder?.data;

  // const bankList = bankListArr?.map((item) => ({
  //   label: item?.name?.local as string,
  //   value: item?.id as string,
  // }));

  <FormSection header="Fixed Deposit">
    <FormSelect name="fd.type" label="Type" options={fdTypeOptions} />

    <FormAmountInput name="fd.amount" label="FD Amount" />

    <GridItem colSpan={3} display="none">
      <Alert status="info" title="Bank Details" hideCloseIcon>
        {/* <Box display="flex" flexDirection="column"> */}
        <Box display="flex" gap="s4">
          <Text fontSize="r1" fontWeight={400} color="neutralColorLight.Gray-80">
            Bank Name:
          </Text>
          <Text fontSize="r1" fontWeight={600} color="neutralColorLight.Gray-80">
            Standard Chartered Bank Nepal
          </Text>
        </Box>
        <Box display="flex" gap="s4">
          <Text fontSize="r1" fontWeight={400} color="neutralColorLight.Gray-80">
            Account Name:
          </Text>
          <Text fontSize="r1" fontWeight={600} color="neutralColorLight.Gray-80">
            SC Saving Account
          </Text>
        </Box>
        <Box display="flex" gap="s4">
          <Text fontSize="r1" fontWeight={400} color="neutralColorLight.Gray-80">
            Account Number:
          </Text>
          <Text fontSize="r1" fontWeight={600} color="neutralColorLight.Gray-80">
            09100003422490
          </Text>
        </Box>
        {/* </Box> */}
      </Alert>
    </GridItem>
  </FormSection>
);
