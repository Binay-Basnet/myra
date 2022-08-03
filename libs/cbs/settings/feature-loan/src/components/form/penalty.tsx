import { useFormContext } from 'react-hook-form';

import { PenaltyRateType } from '@coop/cbs/data-access';
import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { SubHeadingText, SubText } from '@coop/shared/components';
import { FormInput, FormSwitchTab } from '@coop/shared/form';
import { Box, Grid, GridItem, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { BoxContainer, TextBoxContainer } from '../formui';

export const Penalty = () => {
  const { t } = useTranslation();
  const { watch } = useFormContext();
  const penalty = watch('isPenaltyApplicable');
  const penaltyType = watch('penalty.rateType');

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

  const penaltyTypeList = [
    {
      label: t['depositProductFlatRate'],
      value: PenaltyRateType.FlatRate,
    },
    {
      label: t['depositProductRelativeRate'],
      value: PenaltyRateType.RelativeRate,
    },
  ];

  return (
    <BoxContainer>
      <Box display={'flex'} justifyContent="space-between">
        <TextBoxContainer>
          <SubHeadingText>{t['loanProductpenalty']} </SubHeadingText>
          <SubText>{t['loanProductEnterPenaltydetails']} </SubText>
        </TextBoxContainer>
        <FormSwitchTab name="isPenaltyApplicable" options={enableSwitch} />
      </Box>
      {penalty && (
        <BoxContainer
          p="s16"
          border={'1px solid'}
          borderColor="border.layout"
          borderRadius={'4px'}
        >
          <Grid templateColumns="repeat(3,1fr)" gap="s16">
            <GridItem>
              <FormInput
                name="penalty.dayAfterInstallmentDate"
                type="number"
                label={t['loanProductDaysafterinstallmentdate']}
                placeholder={t['loanProductDayfromenddate']}
              />
            </GridItem>
            <GridItem>
              <FormSwitchTab
                name="penalty.rateType"
                options={penaltyTypeList}
                label={t['loanProductPenaltyType']}
              />
            </GridItem>
          </Grid>
          <InputGroupContainer>
            {penaltyType === PenaltyRateType.FlatRate && (
              <FormInput
                name="penalty.flatRatePenalty"
                type="number"
                label={t['loanProductFlatratePenalty']}
                textAlign={'right'}
                placeholder={'00.0'}
                rightElement={
                  <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                    %
                  </Text>
                }
              />
            )}
            {penaltyType === PenaltyRateType.RelativeRate && (
              <FormInput
                name="penalty.penaltyRate"
                type="number"
                label={t['loanProductpenalty']}
                textAlign={'right'}
                placeholder="0.00"
                rightElement={
                  <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                    %
                  </Text>
                }
              />
            )}

            {penaltyType === PenaltyRateType.RelativeRate && (
              <FormInput
                name="penalty.penaltyAmount"
                type="number"
                label={t['loanProductPenaltyAmount']}
                placeholder={t['loanProductPenaltyAmount']}
              />
            )}
          </InputGroupContainer>
        </BoxContainer>
      )}
    </BoxContainer>
  );
};
