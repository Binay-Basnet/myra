import { FormProvider, useForm } from 'react-hook-form';

import {
  FormFieldSearchTerm,
  KymIndMemberInput,
  useGetIndividualKymOptionsQuery,
} from '@coop/cbs/data-access';
import { FormInput, FormRadioGroup } from '@coop/shared/form';
import { Box, FormSection } from '@myra-ui';
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
          <FormInput
            type="number"
            name="estimatedAnnualTransactionAmount"
            label={t['kynIndEstimatedannualaccounttransaction']}
            textAlign="right"
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
            label={t['kynIndEstimatednoofAnnualTransaction']}
            id="estimatedAnnualTransactionFrequencyId"
            name="estimatedAnnualTransactionFrequencyId"
            options={getFieldOption(estimatedAnnualTransactionData, (label) => label)}
            labelFontSize="s3"
          />
        </Box>

        <FormSection>
          <FormInput
            type="number"
            name="estimatedAnnualDepositAmount"
            label={t['kynIndEstimatedAnnualDeposit']}
            textAlign="right"
          />
          <FormInput
            type="number"
            name="estimatedAnnualLoanAmount"
            label={t['kynIndEstimatedAnnualLoan']}
            textAlign="right"
          />
        </FormSection>
      </form>
    </FormProvider>
  );
};
