import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { NatureOfDepositProduct } from '@coop/cbs/data-access';
import { SubText } from '@coop/shared/components';
import { FormInput, FormSwitchTab, FormTextArea } from '@coop/shared/form';
import { Box, FormSection, GridItem, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { AllowChequeIssue } from './AllowChequeIssue';
import { AtmFacility } from './AtmFacility';
import { SubHeadingText } from '../formui';

type SalesTable = {
  type: string;
  amount: number;
  rate: number;
};

export const Questions = () => {
  const { watch, setValue } = useFormContext<{
    ladderRateData: SalesTable[];
    nature: NatureOfDepositProduct;
    ladderRate: boolean;
    allowLoan: boolean;
    withdrawRestricted: boolean;
    alternativeChannels: SalesTable[];
    chequeIssue: SalesTable[];
    atmFacility: SalesTable[];
  }>();
  const { t } = useTranslation();

  const depositNature = watch('nature');
  const allowLoan = watch('allowLoan');
  const withdrawRestricted = watch('withdrawRestricted');
  const ladderRateEditData = watch('ladderRateData');
  const chequeIssue = watch('chequeIssue');
  const atmFacility = watch('atmFacility');

  useEffect(() => {
    setValue(
      'ladderRateData',
      ladderRateEditData?.map((data) => ({ ...data, type: 'More Than' }))
    );
  }, [ladderRateEditData?.length]);

  const yesNo = [
    { label: t['yes'], value: true },
    { label: t['no'], value: false },
  ];

  return (
    <>
      {(depositNature === NatureOfDepositProduct.Current ||
        depositNature === NatureOfDepositProduct.Saving) && (
        <FormSection>
          <GridItem colSpan={3}>
            <Box display="flex" flexDirection="row" justifyContent="space-between">
              <SubHeadingText>{t['depositProductAutoOpenwhenmemberjoins']}</SubHeadingText>
              <FormSwitchTab name="autoOpen" options={yesNo} />
            </Box>
          </GridItem>
        </FormSection>
      )}

      <FormSection>
        <GridItem colSpan={3}>
          <Box display="flex" flexDirection="row" justifyContent="space-between">
            <SubHeadingText>{t['depositProductStaffProduct']} </SubHeadingText>
            <FormSwitchTab name="staffProduct" options={yesNo} />
          </Box>
        </GridItem>
      </FormSection>

      <FormSection>
        <GridItem colSpan={3}>
          <Box display="flex" flexDirection="row" justifyContent="space-between">
            <SubHeadingText>{t['depositProductIsThisForMinor']} </SubHeadingText>
            <FormSwitchTab name="isForMinors" options={yesNo} />
          </Box>
        </GridItem>
      </FormSection>

      <FormSection>
        <GridItem colSpan={3}>
          <Box display="flex" flexDirection="row" justifyContent="space-between">
            <Box>
              <SubHeadingText>{t['depositProductAlternativeChannels']}</SubHeadingText>
              <SubText>{t['depositProductAlternativeChannelseBanking']}</SubText>
            </Box>
            <FormSwitchTab name="alternativeChannels" options={yesNo} />
          </Box>
        </GridItem>
      </FormSection>

      {(depositNature === NatureOfDepositProduct.Current ||
        depositNature === NatureOfDepositProduct.Saving) && (
        <FormSection>
          <GridItem colSpan={3}>
            <Box display="flex" flexDirection="row" justifyContent="space-between">
              <SubHeadingText>{t['depositProductATMFacility']} </SubHeadingText>
              <FormSwitchTab name="atmFacility" options={yesNo} />
            </Box>
            {atmFacility && <AtmFacility />}
          </GridItem>
        </FormSection>
      )}

      {(depositNature === NatureOfDepositProduct.Current ||
        depositNature === NatureOfDepositProduct.Saving) && (
        <FormSection>
          <GridItem colSpan={3}>
            <Box display="flex" flexDirection="row" justifyContent="space-between">
              <SubHeadingText>{t['depositProductChequeIssue']}</SubHeadingText>
              <FormSwitchTab name="chequeIssue" options={yesNo} />
            </Box>

            {chequeIssue && <AllowChequeIssue />}
          </GridItem>
        </FormSection>
      )}

      {depositNature !== NatureOfDepositProduct.Current && (
        <FormSection>
          <GridItem colSpan={3}>
            <Box display="flex" flexDirection="column" gap="s16">
              <Box display="flex" flexDirection="row" justifyContent="space-between">
                <SubHeadingText>{t['depositProductAllowLoan']} </SubHeadingText>
                <FormSwitchTab name="allowLoan" options={yesNo} />
              </Box>

              {allowLoan && (
                <Box
                  display="flex"
                  justifyContent="space-between"
                  p="s16"
                  border="1px solid"
                  borderColor="border.layout"
                  borderRadius="6px"
                >
                  <Box w="25%">
                    <FormInput
                      type="number"
                      textAlign="right"
                      name="percentageOfDeposit"
                      label={t['depositProductPercentageDeposit']}
                      rightElement={
                        <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                          %
                        </Text>
                      }
                    />
                  </Box>
                </Box>
              )}
            </Box>
          </GridItem>
        </FormSection>
      )}

      {/* {depositNature !== NatureOfDepositProduct.Current && ( */}
      <FormSection>
        <GridItem colSpan={3}>
          <Box display="flex" flexDirection="row" justifyContent="space-between">
            <SubHeadingText>{t['depositProductSupportMultipleAccount']}</SubHeadingText>
            <FormSwitchTab name="supportMultiple" options={yesNo} />
          </Box>
        </GridItem>
      </FormSection>
      {/* )} */}

      {(depositNature === NatureOfDepositProduct.RecurringSaving ||
        depositNature === NatureOfDepositProduct.Saving) && (
        <FormSection>
          <GridItem colSpan={3}>
            <Box display="flex" flexDirection="column" gap="s16">
              <Box display="flex" flexDirection="row" justifyContent="space-between">
                <SubHeadingText>{t['depositProductWidthdrawRestricted']}</SubHeadingText>
                <FormSwitchTab name="withdrawRestricted" options={yesNo} />
              </Box>
              {withdrawRestricted && (
                <Box
                  border="1px solid"
                  borderColor="border.layout"
                  borderRadius="6px"
                  p="s16"
                  minH="156px"
                >
                  <Box>
                    <FormTextArea
                      name="specifyWithdrawRestriction"
                      label={t['depositProductSpecify']}
                      rows={3}
                    />
                  </Box>
                </Box>
              )}
            </Box>
          </GridItem>
        </FormSection>
      )}

      {(depositNature === NatureOfDepositProduct.Saving ||
        depositNature === NatureOfDepositProduct.RecurringSaving) && (
        <FormSection>
          <GridItem colSpan={3}>
            <Box display="flex" flexDirection="row" justifyContent="space-between">
              <SubHeadingText>{t['depositProductWealthBuildingProduct']}</SubHeadingText>
              <FormSwitchTab name="wealthBuildingProduct" options={yesNo} />
            </Box>
          </GridItem>
        </FormSection>
      )}
    </>
  );
};
