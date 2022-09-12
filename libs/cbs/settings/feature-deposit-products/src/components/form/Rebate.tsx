import { useFormContext } from 'react-hook-form';

import { FormInput, FormSwitchTab } from '@coop/shared/form';
import { Box, FormSection, Grid, GridItem, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import {
  BoxContainer,
  SubHeadingText,
  SubText,
  TextBoxContainer,
} from '../formui';

export const Rebate = () => {
  const { t } = useTranslation();
  const { watch } = useFormContext();
  const rebate = watch('rebate');

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
    <FormSection>
      <GridItem colSpan={3}>
        <BoxContainer>
          <Box display={'flex'} justifyContent="space-between">
            <TextBoxContainer>
              <SubHeadingText>{t['depositProductRebate']} </SubHeadingText>
              <SubText>{t['depositProductEnterRebatedetails']} </SubText>
            </TextBoxContainer>
            <FormSwitchTab
              name={'rebate'}
              options={enableSwitch}
              defaultValue={'false'}
            />
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
                    name="rebateData.dayBeforeInstallmentDate"
                    type="number"
                    label={t['depositProductDayaftertheinstallmentdate']}
                  />
                </GridItem>
                <GridItem>
                  <FormInput
                    name="rebateData.noOfInstallment"
                    type="number"
                    label={t['depositProductNoInstallment']}
                    helperText={t['depositProductEnterNumberInstallments']}
                    textAlign={'right'}
                  />
                </GridItem>
              </Grid>

              <Grid templateColumns="repeat(3,1fr)" gap="s16">
                <GridItem>
                  <FormInput
                    name="rebateData.rebateAmount"
                    type="number"
                    label={t['depositProductRebateAmount']}
                  />
                </GridItem>
                <GridItem>
                  <FormInput
                    name="rebateData.rebateRate"
                    type="number"
                    label={t['depositProductPercentageDepositedAmount']}
                    textAlign={'right'}
                    rightElement={
                      <Text
                        fontWeight="Medium"
                        fontSize="r1"
                        color="primary.500"
                      >
                        %
                      </Text>
                    }
                  />
                </GridItem>
              </Grid>
            </BoxContainer>
          )}
        </BoxContainer>
      </GridItem>
    </FormSection>
  );
};
