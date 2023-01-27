import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';

import { Alert, Box, FormSection, GridItem, Text } from '@myra-ui';

import { PenaltyType } from '@coop/cbs/data-access';
import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { SubHeadingText, SubText } from '@coop/shared/components';
import { FormAmountInput, FormInput, FormSwitchTab } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

import { BoxContainer, TextBoxContainer } from '../formui';

export const Penalty = () => {
  const { t } = useTranslation();

  const router = useRouter();

  const { watch } = useFormContext();
  const penalty = watch('isPenaltyApplicable');

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

  const penaltyList = [
    {
      label: t['loanProductRemainingPrincipal'],
      value: PenaltyType.RemainingPrincipal,
      isDisabled: router?.asPath?.includes('/edit'),
    },
    {
      label: t['loanProductPenalInterest'],
      value: PenaltyType.PenalInterest,
      isDisabled: router?.asPath?.includes('/edit'),
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
                    isDisabled={router?.asPath?.includes('/edit')}
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
                    isDisabled={router?.asPath?.includes('/edit')}
                  />
                  <FormAmountInput
                    type="number"
                    name="penaltyAmount"
                    label={t['loanProductPenaltyAmount']}
                    isDisabled={router?.asPath?.includes('/edit')}
                  />

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
