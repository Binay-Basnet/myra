import { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';

import { NatureOfDepositProduct } from '@coop/cbs/data-access';
import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import {
  FormEditableTable,
  FormInput,
  FormSwitchTab,
  FormTextArea,
} from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { DividerContainer, SubHeadingText } from '../formui';

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
  }>();
  const depositNature = watch('nature');
  const allowLoan = watch('allowLoan');
  const withdrawRestricted = watch('withdrawRestricted');
  const { t } = useTranslation();

  const ladderRateEditData = watch('ladderRateData');

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

  const ladderRate = watch('ladderRate');

  const ladderSwitch = [
    {
      label: t['yes'],
      value: true,
    },
    {
      label: t['no'],
      value: false,
    },
  ];

  return (
    <DividerContainer>
      <Box display="flex" flexDirection={'row'} justifyContent="space-between">
        <SubHeadingText>
          {t['depositProductAutoOpenwhenmemberjoins']}
        </SubHeadingText>
        <FormSwitchTab name="autoOpen" options={yesNo} />
      </Box>
      <Box display="flex" flexDirection={'row'} justifyContent="space-between">
        <SubHeadingText>
          {t['depositProductAlternativeChannels']}
        </SubHeadingText>
        <FormSwitchTab name={'alternativeChannels'} options={yesNo} />
      </Box>
      {depositNature === NatureOfDepositProduct.VoluntaryOrOptional && (
        <Box
          display="flex"
          flexDirection={'row'}
          justifyContent="space-between"
        >
          <SubHeadingText>{t['depositProductATMFacility']} </SubHeadingText>
          <FormSwitchTab name={'atmFacility'} options={yesNo} />
        </Box>
      )}
      {depositNature === NatureOfDepositProduct.VoluntaryOrOptional && (
        <Box
          display="flex"
          flexDirection={'row'}
          justifyContent="space-between"
        >
          <SubHeadingText>{t['depositProductChequeIssue']}</SubHeadingText>
          <FormSwitchTab name={'chequeIssue'} options={yesNo} />
        </Box>
      )}
      <Box display={'flex'} flexDirection="column" gap="s16">
        <Box
          display="flex"
          flexDirection={'row'}
          justifyContent="space-between"
        >
          <SubHeadingText>{t['depositProductAllowLoan']} </SubHeadingText>
          <FormSwitchTab name={'allowLoan'} options={yesNo} />
        </Box>

        {allowLoan && (
          <Box
            display={'flex'}
            justifyContent="space-between"
            p="s16"
            border="1px solid"
            borderColor={'border.layout'}
            borderRadius="6px"
          >
            <InputGroupContainer>
              <FormInput
                type="number"
                textAlign="right"
                name="percentageOfDeposit"
                label={t['depositProductPercentageDeposit']}
                placeholder="0.00"
                rightElement={
                  <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                    %
                  </Text>
                }
              />
            </InputGroupContainer>
          </Box>
        )}
      </Box>
      {depositNature !== NatureOfDepositProduct.Mandatory && (
        <Box
          display="flex"
          flexDirection={'row'}
          justifyContent="space-between"
        >
          <SubHeadingText>
            {t['depositProductSupportMultipleAccount']}
          </SubHeadingText>
          <FormSwitchTab name={'supportMultiple'} options={yesNo} />
        </Box>
      )}
      <Box display="flex" flexDirection={'row'} justifyContent="space-between">
        <SubHeadingText>{t['depositProductStaffProduct']} </SubHeadingText>
        <FormSwitchTab name={'staffProduct'} options={yesNo} />
      </Box>

      <Box display="flex" flexDirection={'row'} justifyContent="space-between">
        <SubHeadingText>{t['depositProductIsThisForMinor']} </SubHeadingText>
        <FormSwitchTab name={'isForMinors'} options={yesNo} />
      </Box>

      {depositNature === NatureOfDepositProduct.RecurringSaving && (
        <Box display={'flex'} flexDirection="column" gap="s16">
          <Box
            display="flex"
            flexDirection={'row'}
            justifyContent="space-between"
          >
            <SubHeadingText>
              {t['depositProductWidthdrawRestricted']}
            </SubHeadingText>
            <FormSwitchTab name={'withdrawRestricted'} options={yesNo} />
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
                  placeholder={t['depositProductNote']}
                  rows={3}
                />
              </Box>
            </Box>
          )}
        </Box>
      )}
      {depositNature === NatureOfDepositProduct.RecurringSaving && (
        <Box
          display="flex"
          flexDirection={'row'}
          justifyContent="space-between"
        >
          <SubHeadingText>
            {t['depositProductWealthBuildingProduct']}
          </SubHeadingText>
          <FormSwitchTab name={'wealthBuildingProduct'} options={yesNo} />
        </Box>
      )}
      {depositNature === NatureOfDepositProduct.RecurringSaving && (
        <Box display={'flex'} flexDirection="column" gap="s20">
          <Box
            alignItems="center"
            display={'flex'}
            justifyContent="space-between"
          >
            <Text
              color="neutralColorLight.Gray-70"
              fontSize={'s3'}
              fontWeight="Medium"
            >
              {t['depositProductLadderRate']}
            </Text>
            <FormSwitchTab name="ladderRate" options={ladderSwitch} />
          </Box>
          {ladderRate && (
            <FormEditableTable<SalesTable>
              name="ladderRateData"
              columns={[
                {
                  accessor: 'type',
                  header: t['depositProductInterestType'],
                  cell: () => 'More Than',
                },
                {
                  accessor: 'amount',
                  header: t['depositProductInterestLadderAmount'],
                  isNumeric: true,
                },
                {
                  accessor: 'rate',
                  header: t['depositProductInterestLadderRate'],
                  fieldType: 'percentage',
                  isNumeric: true,
                },
              ]}
            />
          )}
        </Box>
      )}
    </DividerContainer>
  );
};
