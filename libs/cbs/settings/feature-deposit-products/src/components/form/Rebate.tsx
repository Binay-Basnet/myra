import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';

import { Alert, Box, FormSection, Grid, GridItem, Text } from '@myra-ui';

import { FormAmountInput, FormInput, FormSwitchTab } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

import { BoxContainer, SubHeadingText, SubText, TextBoxContainer } from '../formui';

export const Rebate = () => {
  const { t } = useTranslation();
  const { watch } = useFormContext();
  const rebate = watch('rebate');

  const router = useRouter();

  const enableSwitch = [
    {
      label: t['enable'],
      value: true,
      isDisabled: router?.asPath?.includes('/edit'),
    },
    {
      label: t['disable'],
      value: false,
      isDisabled: router?.asPath?.includes('/edit'),
    },
  ];

  return (
    <FormSection>
      <GridItem colSpan={3}>
        <BoxContainer>
          <Box display="flex" justifyContent="space-between">
            <TextBoxContainer>
              <SubHeadingText>{t['depositProductRebate']} </SubHeadingText>
              <SubText>{t['depositProductEnterRebatedetails']} </SubText>
            </TextBoxContainer>
            <FormSwitchTab name="rebate" options={enableSwitch} />
          </Box>
          {rebate && (
            <BoxContainer p="s16" border="1px solid" borderColor="border.layout" borderRadius="4px">
              <Grid templateColumns="repeat(3,1fr)" gap="s16">
                <GridItem>
                  <FormInput
                    name="rebateData.dayBeforeInstallmentDate"
                    type="number"
                    label={t['depositProductDayBeforetheinstallmentdate']}
                    isDisabled={router?.asPath?.includes('/edit')}
                  />
                </GridItem>
                <GridItem>
                  <FormInput
                    name="rebateData.noOfInstallment"
                    type="number"
                    label={t['depositProductNoInstallment']}
                    helperText={t['depositProductEnterNumberInstallments']}
                    textAlign="right"
                    isDisabled={router?.asPath?.includes('/edit')}
                  />
                </GridItem>
              </Grid>

              <Grid templateColumns="repeat(3,1fr)" gap="s16">
                <GridItem>
                  <FormInput
                    name="rebateData.rebateRate"
                    type="number"
                    label={t['depositProductPercentageDepositedAmount']}
                    textAlign="right"
                    rightElement={
                      <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                        %
                      </Text>
                    }
                    isDisabled={router?.asPath?.includes('/edit')}
                  />
                </GridItem>
                <GridItem>
                  <FormAmountInput
                    type="number"
                    name="rebateData.rebateAmount"
                    label={t['depositProductRebateAmount']}
                    isDisabled={router?.asPath?.includes('/edit')}
                  />
                </GridItem>

                <GridItem colSpan={3}>
                  <Alert status="warning">
                    <Text fontWeight="Medium" fontSize="r1">
                      {t['rebateAlert']}
                    </Text>
                  </Alert>
                </GridItem>
              </Grid>
            </BoxContainer>
          )}
        </BoxContainer>
      </GridItem>
    </FormSection>
  );
};
