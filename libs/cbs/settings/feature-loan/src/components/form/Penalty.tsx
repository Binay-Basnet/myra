import { useFormContext } from 'react-hook-form';

import { useGetCoaListQuery } from '@coop/cbs/data-access';
import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { SubHeadingText, SubText } from '@coop/shared/components';
import { FormInput, FormSelect, FormSwitchTab } from '@coop/shared/form';
import { Box, FormSection, GridItem, Text } from '@coop/shared/ui';
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

  const { data: coa } = useGetCoaListQuery({
    filter: {
      active: true,
    },
  });

  const coaData = coa?.settings?.general?.chartsOfAccount?.accounts?.data;

  const coaList = coaData?.map((item) => {
    return {
      label: item?.name?.en as string,
      value: item?.id as string,
    };
  });

  return (
    <FormSection>
      <GridItem colSpan={3}>
        <BoxContainer>
          <Box display={'flex'} justifyContent="space-between">
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
                border={'1px solid'}
                borderColor="border.layout"
                borderRadius="br2"
              >
                <SubHeadingText>
                  {t['loanProductPenaltyonPrincipal']}
                </SubHeadingText>
                <InputGroupContainer>
                  <FormInput
                    name="penaltyOnPrincipal.dayAfterInstallmentDate"
                    type="number"
                    label={t['loanProductDaysafterinstallmentdate']}
                  />

                  <FormInput
                    name="penaltyOnPrincipal.penaltyRate"
                    type="number"
                    label={t['loanProductpenalty']}
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
                  <FormInput
                    name="penaltyOnPrincipal.penaltyAmount"
                    type="number"
                    label={t['loanProductPenaltyAmount']}
                  />
                  <FormSelect
                    name="penaltyOnPrincipal.penaltyLedgerMapping"
                    label={t['loanProductPenaltyedgerMapping']}
                    options={coaList}
                  />
                </InputGroupContainer>
              </BoxContainer>
              <BoxContainer
                p="s16"
                border={'1px solid'}
                borderColor="border.layout"
                borderRadius="br2"
              >
                <SubHeadingText>
                  {t['loanProductPenaltyonInterest']}
                </SubHeadingText>
                <InputGroupContainer>
                  <FormInput
                    name="penaltyOnInterest.dayAfterInstallmentDate"
                    type="number"
                    label={t['loanProductDaysafterinstallmentdate']}
                  />

                  <FormInput
                    name="penaltyOnInterest.penaltyRate"
                    type="number"
                    label={t['loanProductpenalty']}
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
                  <FormInput
                    name="penaltyOnInterest.penaltyAmount"
                    type="number"
                    label={t['loanProductPenaltyAmount']}
                  />
                  <FormSelect
                    name="penaltyOnInterest.penaltyLedgerMapping"
                    label={t['loanProductPenaltyedgerMapping']}
                    options={coaList}
                  />
                </InputGroupContainer>
              </BoxContainer>
              <BoxContainer
                p="s16"
                border={'1px solid'}
                borderColor="border.layout"
                borderRadius="br2"
              >
                <SubHeadingText>
                  {t['loanProductPenaltyonInstallment']}
                </SubHeadingText>
                <InputGroupContainer>
                  <FormInput
                    name="penaltyOnInstallment.dayAfterInstallmentDate"
                    type="number"
                    label={t['loanProductDaysafterinstallmentdate']}
                  />

                  <FormInput
                    name="penaltyOnInstallment.penaltyRate"
                    type="number"
                    label={t['loanProductpenalty']}
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
                  <FormInput
                    name="penaltyOnInstallment.penaltyAmount"
                    type="number"
                    label={t['loanProductPenaltyAmount']}
                  />
                  <FormSelect
                    name="penaltyOnInstallment.penaltyLedgerMapping"
                    label={t['loanProductPenaltyedgerMapping']}
                    options={coaList}
                  />
                </InputGroupContainer>
              </BoxContainer>
            </Box>
          )}
        </BoxContainer>
      </GridItem>
    </FormSection>
  );
};
