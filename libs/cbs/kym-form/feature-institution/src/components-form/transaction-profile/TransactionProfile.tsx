import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormInput, FormRadioGroup } from '@coop/shared/form';
// import { InstitutionExpectedMonthlyTurnover } from '@coop/shared/data-access';
import { Box, Grid, GridItem, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

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
  const { t } = useTranslation();
  return (
    <GroupContainer>
      <>
        {/* {console.log('hello world', InstitutionExpectedMonthlyTurnover)} */}

        <InputGroupContainer id="Transaction Profile" scrollMarginTop={'200px'}>
          <FormInput
            // control={control}
            type="text"
            name="natureOfTransaction"
            label={t['kymInsNatureofTransaction']}
            placeholder={t['kymInsEnterNatureofTransaction']}
          />
          <FormInput
            type="number"
            name="annualTurnover"
            label={t['kymInsAnnualTurnover']}
            textAlign={'right'}
            placeholder="0.00"
          />

          <FormInput
            type="number"
            name="initialDepositAmount"
            label={t['kymInsInitialDepositAmount']}
            textAlign={'right'}
            placeholder="0.00"
          />
        </InputGroupContainer>
        <Grid templateColumns="repeat(2, 1fr)">
          <Box
            mt="s16"
            id="Expected Monthly Turnover"
            scrollMarginTop={'200px'}
          >
            <FormRadioGroup
              name="expectedMonthlyTurnover"
              label={t['kymInsExpectedMonthlyTurnover']}
              radioList={radioList1}
              orientation="vertical"
            />
          </Box>

          <Box
            mt="s16"
            id="Expected Monthly Transaction"
            scrollMarginTop={'200px'}
          >
            <FormRadioGroup
              name="expectedMonthlyTransaction"
              label={t['kymInsExpectedMonthlyTransaction']}
              radioList={radioList2}
              orientation="vertical"
            />
          </Box>
        </Grid>
      </>
    </GroupContainer>
  );
};
