import React from 'react';

import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import {
  Kym_Field_Custom_Id as KYMOptionEnum,
  useGetIndividualKymOptionsQuery,
} from '@coop/shared/data-access';
import { FormInput, FormRadioGroup } from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { getFieldOption } from '../../../utils/getFieldOption';

export const KYMEstimatedAmount = () => {
  const { t } = useTranslation();
  const { data: estimatedAnnualTransactionData } =
    useGetIndividualKymOptionsQuery({
      filter: { customId: KYMOptionEnum.EstimatedAnnualTransaction },
    });

  return (
    <GroupContainer
      id="kymAccIndEstimatedWithdrawDepositAmountintheInstitureion"
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
        <FormRadioGroup
          label={t['kynIndEstimatednoofAnnualTransaction']}
          id="estimatedAnnualTransactionFrequencyId"
          name="estimatedAnnualTransactionFrequencyId"
          options={getFieldOption(
            estimatedAnnualTransactionData,
            (label) => `${t['upto']} ${label}`
          )}
          labelFontSize="s3"
        />
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
