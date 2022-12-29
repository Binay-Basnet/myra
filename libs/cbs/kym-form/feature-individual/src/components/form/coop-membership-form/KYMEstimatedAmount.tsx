import { FormProvider, useForm } from 'react-hook-form';

import { Box, FormSection } from '@myra-ui';

import {
  FormFieldSearchTerm,
  KymIndMemberInput,
  useGetIndividualKymOptionsQuery,
} from '@coop/cbs/data-access';
import { FormAmountInput, FormRadioGroup } from '@coop/shared/form';
import { getKymSection, useTranslation } from '@coop/shared/utils';

import { useIndividual } from '../../hooks/useIndividual';
import { getFieldOption } from '../../../utils/getFieldOption';

interface IKYMEstimatedAmountProps {
  setKymCurrentSection: (section?: { section: string; subSection: string }) => void;
}

export const KYMEstimatedAmount = ({ setKymCurrentSection }: IKYMEstimatedAmountProps) => {
  const { t } = useTranslation();

  const methods = useForm<KymIndMemberInput>();
  useIndividual({ methods });

  const { data: estimatedAnnualTransactionData } = useGetIndividualKymOptionsQuery({
    searchTerm: FormFieldSearchTerm.EstimatedAnnualTransaction,
  });

  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymSection(e.target.id);
          setKymCurrentSection(kymSection);
        }}
      >
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

        {/* <Text fontSize="r1" fontWeight="SemiBold">
            {t['kynIndESTIMATEDWITHDRAWDEPOSITAMOUNTINTHEINSTITUTION']}
          </Text>

          <InputGroupContainer>
            <FormInput
              type="number"
              name="estimatedAnnualTransactionAmount"
              label={t['kynIndEstimatedannualaccounttransaction']}
              __placeholder="0.00"
              textAlign="right"
            />
          </InputGroupContainer> */}

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
      </form>
    </FormProvider>
  );
};
