import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormInput, FormRadioGroup } from '@coop/myra/components';
// import { InstitutionExpectedMonthlyTurnover } from '@coop/shared/data-access';
import { Box, Grid, GridItem, Text } from '@coop/shared/ui';

const radioList1 = [
  'Less than 5 Lakhs',
  'Less than 10 Lakhs',
  'Above 10 Lakhs',
];

const radioList2 = [
  'Less than 10 Lakhs',
  'Less than 25 Lakhs',
  'Above 25 Lakhs',
];

export const TransactionProfileInstitution = () => {
  return (
    <GroupContainer id="Basic Information" scrollMarginTop={'200px'}>
      <>
        {/* {console.log('hello world', InstitutionExpectedMonthlyTurnover)} */}

        <InputGroupContainer>
          <FormInput
            // control={control}
            type="text"
            name="natureOfTransaction"
            label="Nature of Transaction"
            placeholder="Enter Nature of Transaction"
          />
          <FormInput
            type="number"
            name="annualTurnover"
            label="Annual Turnover"
            textAlign={'right'}
            placeholder="0.00"
          />

          <FormInput
            type="number"
            name="initialDepositAmount"
            label="Initial Deposit Amount"
            textAlign={'right'}
            placeholder="0.00"
          />
        </InputGroupContainer>
        <Grid templateColumns="repeat(2, 1fr)">
          <Box mt="s16">
            <FormRadioGroup
              name="expectedMonthlyTurnover"
              label="Expected Monthly Turnover"
              radioList={radioList1}
              orientation="vertical"
            />
          </Box>

          <Box mt="s16">
            <FormRadioGroup
              name="expectedMonthlyTransaction"
              label="Expected Monthly Transaction"
              radioList={radioList2}
              orientation="vertical"
            />
          </Box>
        </Grid>
      </>
    </GroupContainer>
  );
};
