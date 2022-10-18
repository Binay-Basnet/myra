import { useFormContext } from 'react-hook-form';

import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { SubHeadingText, SubText } from '@coop/shared/components';
import { FormInput, FormSwitchTab } from '@coop/shared/form';
import { Alert, Box, FormSection, GridItem, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { BoxContainer, TextBoxContainer } from '../formui';

export const Penalty = () => {
  const { t } = useTranslation();
  const { watch } = useFormContext();
  const penalty = watch('isPenaltyApplicable');
  // const penaltyType = watch('penaltyType');

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

  // const penaltyList = [
  //   {
  //     label: t['loanProductPrincipal'],
  //     value: 'principal',
  //   },
  //   {
  //     label: t['loanProductInterest'],
  //     value: 'interest',
  //   },
  //   {
  //     label: t['loanProductInstallment'],
  //     value: 'installment',
  //   },
  // ];

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
                  {/* <FormSwitchTab name="penaltyType" options={penaltyList} /> */}
                </Box>
                <InputGroupContainer>
                  <FormInput
                    name="penaltyOnPrincipal.dayAfterInstallmentDate"
                    type="number"
                    label={t['depositProductDayaftertheinstallmentdate']}
                  />

                  <FormInput
                    name="penaltyOnPrincipal.penaltyRate"
                    type="number"
                    label={t['loanProductpenaltyRate']}
                    textAlign="right"
                    rightElement={
                      <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                        %
                      </Text>
                    }
                  />
                  <FormInput
                    name="penaltyOnPrincipal.penaltyAmount"
                    type="number"
                    label={t['loanProductPenaltyAmount']}
                  />

                  <GridItem colSpan={3}>
                    <Alert status="warning">
                      <Text fontWeight="Medium" fontSize="r1">
                        {t['penaltyAlert']}
                      </Text>
                    </Alert>
                  </GridItem>
                </InputGroupContainer>

                {/* <FormSelect
                  name="penaltyOnInterest.penaltyLedgerMapping"
                  label={t['loanProductPenaltyedgerMapping']}
                  options={coaList}
                /> */}
                {/* {penaltyType === 'principal' && (
                  <InputGroupContainer>
                    <FormInput
                      name="penaltyOnPrincipal.dayAfterInstallmentDate"
                      type="number"
                      label={t['depositProductDayaftertheinstallmentdate']}
                    />

                    <FormInput
                      name="penaltyOnPrincipal.penaltyRate"
                      type="number"
                      label={t['loanProductpenaltyRate']}
                      textAlign="right"
                      rightElement={
                        <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                          %
                        </Text>
                      }
                    />
                    <FormInput
                      name="penaltyOnPrincipal.penaltyAmount"
                      type="number"
                      label={t['loanProductPenaltyAmount']}
                    />
                   
                    <GridItem colSpan={3}>
                  <Alert status="warning">
          <Text fontWeight="Medium" fontSize="r1">
            {t['penaltyAlert']}
          </Text>
        </Alert>
                </GridItem>
                  </InputGroupContainer>
                )}

                {penaltyType === 'interest' && (
                  <InputGroupContainer>
                    <FormInput
                      name="penaltyOnInterest.dayAfterInstallmentDate"
                      type="number"
                      label={t['depositProductDayaftertheinstallmentdate']}
                    />

                    <FormInput
                      name="penaltyOnInterest.penaltyRate"
                      type="number"
                      label={t['loanProductpenaltyRate']}
                      textAlign="right"
                      rightElement={
                        <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                          %
                        </Text>
                      }
                    />
                    <FormInput
                      name="penaltyOnInterest.penaltyAmount"
                      type="number"
                      label={t['loanProductPenaltyAmount']}
                    />
                  
                    <GridItem colSpan={3}>
                  <Alert status="warning">
          <Text fontWeight="Medium" fontSize="r1">
            {t['penaltyAlert']}
          </Text>
        </Alert>
                </GridItem>
                  </InputGroupContainer>
                )}

                {penaltyType === 'installment' && (
                  <InputGroupContainer>
                    <FormInput
                      name="penaltyOnInstallment.dayAfterInstallmentDate"
                      type="number"
                      label={t['depositProductDayaftertheinstallmentdate']}
                    />

                    <FormInput
                      name="penaltyOnInstallment.penaltyRate"
                      type="number"
                      label={t['loanProductpenaltyRate']}
                      textAlign="right"
                      rightElement={
                        <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                          %
                        </Text>
                      }
                    />
                    <FormInput
                      name="penaltyOnInstallment.penaltyAmount"
                      type="number"
                      label={t['loanProductPenaltyAmount']}
                    />
                    
                    <GridItem colSpan={3}>
                  <Alert status="warning">
          <Text fontWeight="Medium" fontSize="r1">
            {t['penaltyAlert']}
          </Text>
        </Alert>
                </GridItem>
                  </InputGroupContainer>
                )} */}
              </BoxContainer>
            </Box>
          )}
        </BoxContainer>
      </GridItem>
    </FormSection>
  );
};
