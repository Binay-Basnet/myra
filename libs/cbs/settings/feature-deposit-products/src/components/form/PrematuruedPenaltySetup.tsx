import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';

import { Alert, Box, FormSection, Grid, GridItem, Text } from '@myra-ui';

import { PrematurePenaltyDateType } from '@coop/cbs/data-access';
import { BoxContainer } from '@coop/shared/components';
import { FormAmountInput, FormInput, FormSelect, FormSwitchTab } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

import { SubHeadingText, TextBoxContainer } from '../formui';

export const PrematuredPenalty = () => {
  const { t } = useTranslation();
  const { watch } = useFormContext();
  const router = useRouter();

  const prematurePenaltyEnable = watch('isPrematurePenaltyApplicable');

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

  const penaltyDataType = [
    {
      label: t['depositProductEffectiveDaysFromStart'],
      value: PrematurePenaltyDateType.EffectiveDaysFromStart,
    },
    {
      label: t['depositProductRemainingDaystoGetMatured'],
      value: PrematurePenaltyDateType.RemainingDaysToGetMatured,
    },
  ];

  // const { data: coa } = useGetCoaListQuery({
  //   filter: {
  //     active: true,
  //   },
  // });

  // const coaData = coa?.settings?.general?.chartsOfAccount?.accounts?.data;

  // const coaList = coaData?.map((item) => ({
  //   label: item?.name?.en as string,
  //   value: item?.id as string,
  // }));

  return (
    <FormSection header="depositProductPrematuredPenaltySetup">
      <GridItem colSpan={3}>
        <BoxContainer>
          <Box display="flex" justifyContent="space-between">
            <TextBoxContainer>
              <SubHeadingText>{t['prematurePenaltyEnable']} </SubHeadingText>
              {/* <SubText>{t['depositProductEnterPenaltydetails']} </SubText> */}
            </TextBoxContainer>
            <FormSwitchTab name="isPrematurePenaltyApplicable" options={enableSwitch} />
          </Box>
          {/* <Box display="flex" justifyContent="space-between">
            <Text></Text>
          </Box> */}
          {prematurePenaltyEnable && (
            <Grid templateColumns="repeat(3,1fr)" gap="s16">
              <FormSelect
                name="prematurePenalty.penaltyDateType"
                label={t['depositProductPenaltyDateType']}
                options={penaltyDataType}
                isDisabled={router?.asPath?.includes('/edit')}
              />
              <FormInput
                name="prematurePenalty.noOfDays"
                label={t['depositProductNumberofDays']}
                isDisabled={router?.asPath?.includes('/edit')}
              />

              <FormInput
                isRequired
                name="prematurePenalty.penaltyRate"
                label={t['depositProductPenaltyRate']}
                rightElement={
                  <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                    %
                  </Text>
                }
                textAlign="right"
                isDisabled={router?.asPath?.includes('/edit')}
              />
              <FormAmountInput
                type="number"
                name="prematurePenalty.penaltyAmount"
                label={t['depositProductPenaltyAmount']}
                isDisabled={router?.asPath?.includes('/edit')}
              />
              <GridItem colSpan={3}>
                <Alert status="warning">
                  <Text fontWeight="Medium" fontSize="r1">
                    {t['penaltyAlert']}
                  </Text>
                </Alert>
              </GridItem>
            </Grid>
          )}
          {/* {prematurePenaltyEnable && (
            <Grid templateColumns="repeat(3,1fr)" gap="s16">
              <FormSelect
                name="prematurePenalty.penaltyDateType"
                label={t['depositProductPenaltyDateType']}
                options={penaltyDataType}
              />
              <FormInput name="prematurePenalty.noOfDays" label={t['depositProductNumberofDays']} />

              <FormInput
                name="prematurePenalty.penaltyRate"
                label={t['depositProductPenaltyRate']}
                rightElement={
                  <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                    %
                  </Text>
                }
                textAlign="right"
              />
              <FormAmountInput
              type="number"
                name="prematurePenalty.penaltyAmount"
                label={t['depositProductPenaltyAmount']}
              />
              <GridItem colSpan={3}>
                <Alert status="warning">
                  <Text fontWeight="Medium" fontSize="r1">
                    {t['penaltyAlert']}
                  </Text>
                </Alert>
              </GridItem>
            </Grid>
          )} */}
        </BoxContainer>
      </GridItem>
    </FormSection>
  );
};
