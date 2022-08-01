import { useFormContext } from 'react-hook-form';

import { SubHeadingText, SubText } from '@coop/shared/components';
import { FormInput, FormSwitchTab } from '@coop/shared/form';
import { Box, Grid, GridItem, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { BoxContainer, TextBoxContainer } from '../formui';

export const Rebate = () => {
  const { t } = useTranslation();
  const { watch } = useFormContext();
  const rebate = watch('isRebateApplicable');

  const enableSwitch = [
    {
      label: t['enable'],
      value: true,
    },
    {
      label: t['disable'],
      value: false,
    },
  ];

  return (
    <BoxContainer>
      <Box display={'flex'} justifyContent="space-between">
        <TextBoxContainer>
          <SubHeadingText>{t['loanProductRebate']} </SubHeadingText>
          <SubText>{t['loanProductEnterRebatedetails']} </SubText>
        </TextBoxContainer>
        <FormSwitchTab name="isRebateApplicable" options={enableSwitch} />
      </Box>
      {rebate && (
        <BoxContainer
          p="s16"
          border={'1px solid'}
          borderColor="border.layout"
          borderRadius={'4px'}
        >
          <Grid templateColumns="repeat(3,1fr)" gap="s16">
            <GridItem>
              <FormInput
                name="rebate.daysBeforeInstallmentDate"
                type="number"
                label={t['loanProductDaysafterinstallmentdate']}
                placeholder={t['loanProductDayfromenddate']}
              />
            </GridItem>
            <GridItem>
              <FormInput
                name="rebate.noOfInstallment"
                type="number"
                label={t['loanProductNoInstallment']}
                placeholder="0"
                helperText={t['loanProductEnterNumberInstallments']}
                textAlign={'right'}
              />
            </GridItem>
          </Grid>

          <Grid templateColumns="repeat(3,1fr)" gap="s16">
            <GridItem>
              <FormInput
                name="rebate.rebateAmount"
                type="number"
                label={t['loanProductRebateAmount']}
                placeholder={t['loanProductRebateAmount']}
              />
            </GridItem>
            <GridItem>
              <FormInput
                name="rebate.percentage"
                type="number"
                label={t['loanProductPercentageDepositedAmount']}
                textAlign={'right'}
                placeholder="0.00"
                rightElement={
                  <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                    %
                  </Text>
                }
              />
            </GridItem>
          </Grid>
        </BoxContainer>
      )}
    </BoxContainer>
  );
};
