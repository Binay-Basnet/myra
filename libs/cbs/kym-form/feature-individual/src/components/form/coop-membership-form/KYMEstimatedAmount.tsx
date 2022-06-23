import React from 'react';

import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormInput } from '@coop/shared/form';
import { Box, RadioGroup, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

const annualFamilyIncome = ['Upto 50', 'Upto 100', 'Upto 500', 'Above 500'];

export const KYMEstimatedAmount = () => {
  const { t } = useTranslation();
  return (
    <GroupContainer
      id="Estimated Withdraw/Deposit Amount in the Institureion"
      scrollMarginTop={'200px'}
    >
      <Text fontSize="r1" fontWeight="SemiBold">
        {t['kynIndESTIMATEDWITHDRAWDEPOSITAMOUNTINTHEINSTITUTION']}
      </Text>

      <InputGroupContainer>
        <FormInput
          type="number"
          name="estimatedAnnualAccountTransactionAmount"
          label={t['kynIndEstimatedannualaccounttransaction']}
          placeholder="0.00"
          textAlign="right"
        />
      </InputGroupContainer>

      <Box display="flex" flexDirection="column">
        <Text fontSize="s3" mb="s16">
          {t['kynIndEstimatednoofAnnualTransaction']}
        </Text>
        {/* <Box display="flex" flexDirection="column" gap="s8">
          {annualFamilyIncome.map((item, index) => (
            <Checkbox key={index} id="annualIncomeCheckbox">
              <Text fontSize="s3">{item}</Text>
            </Checkbox>
          ))}
        </Box> */}
        <RadioGroup radioList={annualFamilyIncome} labelFontSize="s3" />
      </Box>

      <InputGroupContainer>
        <FormInput
          type="number"
          name="estimatedAnnualDepositAmount"
          label={t['kynIndEstimatedAnnualDeposit']}
          placeholder="0.00"
          textAlign="right"
        />
      </InputGroupContainer>

      <InputGroupContainer>
        <FormInput
          type="number"
          name="estimatedAnnualLoanAmount"
          label={t['kynIndEstimatedAnnualLoan']}
          placeholder="0.00"
          textAlign="right"
        />
      </InputGroupContainer>
    </GroupContainer>
  );
};
