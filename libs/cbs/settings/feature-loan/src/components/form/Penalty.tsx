import { useFormContext } from 'react-hook-form';

import { PenaltyType } from '@coop/cbs/data-access';
import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { SubHeadingText, SubText } from '@coop/shared/components';
import { FormAmountInput, FormInput, FormSwitchTab } from '@coop/shared/form';
import { Alert, Box, FormSection, GridItem, Text } from '@myra-ui';
import { useTranslation } from '@coop/shared/utils';

import { BoxContainer, TextBoxContainer } from '../formui';

export const Penalty = () => {
  const { t } = useTranslation();
  const { watch } = useFormContext();
  const penalty = watch('isPenaltyApplicable');

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

  const penaltyList = [
    {
      label: t['loanProductRemainingPrincipal'],
      value: PenaltyType.RemainingPrincipal,
    },
    {
      label: t['loanProductPenalInterest'],
      value: PenaltyType.PenalInterest,
    },
  ];

  return (
    <FormSection>
      <GridItem colSpan={3}>
        <BoxContainer>
          <Box display="flex" justifyContent="space-between">
            <TextBoxContainer>
              <SubHeadingText>{t['loanProductpenalty']} </SubHeadingText>
              <SubText>{t['loanProductEnterPenaltydetails']} </SubText>
            </TextBoxContainer>
            <FormSwitchTab name="isPenaltyApplicable" options={enableSwitch} />
          </Box>
          {penalty && (
            <Box display="flex" flexDirection="column" gap="s16">
              <BoxContainer
                p="s16"
                border="1px solid"
                borderColor="border.layout"
                borderRadius="br2"
              >
                <Box display="flex" flexDirection="column" justifyContent="space-between">
                  <TextBoxContainer>
                    <SubHeadingText>{t['loanProductPenaltyOn']} </SubHeadingText>
                  </TextBoxContainer>
                  <FormSwitchTab name="penaltyType" options={penaltyList} />
                </Box>

                <InputGroupContainer>
                  <FormInput
                    name="penaltyDayAfterInstallmentDate"
                    type="number"
                    label={t['depositProductDayaftertheinstallmentdate']}
                  />

                  <FormInput
                    name="penaltyRate"
                    type="number"
                    label={t['loanProductpenaltyRate']}
                    textAlign="right"
                    rightElement={
                      <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                        %
                      </Text>
                    }
                  />
                  <FormAmountInput name="penaltyAmount" label={t['loanProductPenaltyAmount']} />

                  <GridItem colSpan={3}>
                    <Alert status="warning">
                      <Text fontWeight="Medium" fontSize="r1">
                        {t['penaltyAlert']}
                      </Text>
                    </Alert>
                  </GridItem>
                </InputGroupContainer>
              </BoxContainer>
            </Box>
          )}
        </BoxContainer>
      </GridItem>
    </FormSection>
  );
};
