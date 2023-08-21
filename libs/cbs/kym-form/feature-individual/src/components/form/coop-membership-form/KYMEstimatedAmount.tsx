import { Box, FormSection } from '@myra-ui';

import { FormFieldSearchTerm, useGetIndividualKymOptionsQuery } from '@coop/cbs/data-access';
import { FormAmountInput, FormRadioGroup } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

import { getFieldOption } from '../../../utils/getFieldOption';

export const KYMEstimatedAmount = () => {
  const { t } = useTranslation();

  const { data: estimatedAnnualTransactionData } = useGetIndividualKymOptionsQuery({
    searchTerm: FormFieldSearchTerm.EstimatedAnnualTransaction,
  });

  return (
    <>
      <FormSection
        id="kymAccIndEstimatedWithdrawDepositAmountintheInstitureion"
        header="kynIndESTIMATEDWITHDRAWDEPOSITAMOUNTINTHEINSTITUTION"
      >
        <FormAmountInput
          isRequired
          name="estimatedAnnualTransactionAmount"
          label={t['kynIndEstimatedannualaccounttransaction']}
        />
      </FormSection>

      <Box p="s20" id="kymAccIndEstimatedWithdrawDepositAmountintheInstitureion">
        <FormRadioGroup
          isRequired
          label={t['kynIndEstimatednoofAnnualTransaction']}
          id="estimatedAnnualTransactionFrequencyId"
          name="estimatedAnnualTransactionFrequencyId"
          options={getFieldOption(estimatedAnnualTransactionData, (label) => label)}
          labelFontSize="s3"
        />
      </Box>

      <FormSection>
        <FormAmountInput
          isRequired
          name="estimatedAnnualDepositAmount"
          label={t['kynIndEstimatedAnnualDeposit']}
        />
        <FormAmountInput
          isRequired
          name="estimatedAnnualLoanAmount"
          label={t['kynIndEstimatedAnnualLoan']}
        />
      </FormSection>
    </>
  );
};
