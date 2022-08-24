import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import debounce from 'lodash/debounce';

import {
  FormFieldSearchTerm,
  KymIndMemberInput,
  useGetIndividualKymEditDataQuery,
  useGetIndividualKymOptionsQuery,
  useSetMemberDataMutation,
} from '@coop/cbs/data-access';
import { FormInput, FormRadioGroup } from '@coop/shared/form';
import { Box, FormSection } from '@coop/shared/ui';
import { getKymSection, useTranslation } from '@coop/shared/utils';

import { getFieldOption } from '../../../utils/getFieldOption';

interface IKYMEstimatedAmountProps {
  setKymCurrentSection: (section?: {
    section: string;
    subSection: string;
  }) => void;
}

export const KYMEstimatedAmount = ({
  setKymCurrentSection,
}: IKYMEstimatedAmountProps) => {
  const { t } = useTranslation();

  const router = useRouter();
  const id = router?.query?.['id'];

  const methods = useForm<KymIndMemberInput>();

  const { watch, reset } = methods;

  const { data: estimatedAnnualTransactionData } =
    useGetIndividualKymOptionsQuery({
      searchTerm: FormFieldSearchTerm.EstimatedAnnualTransaction,
    });

  const { data: editValues } = useGetIndividualKymEditDataQuery(
    {
      id: String(id),
    },
    { enabled: !!id }
  );

  useEffect(() => {
    if (editValues) {
      const editValueData =
        editValues?.members?.individual?.formState?.data?.formData;

      reset({
        ...editValueData?.estimatedTransactions,
        estimatedAnnualTransactionFrequencyId:
          editValueData?.estimatedTransactions
            ?.estimatedAnnualTransactionFrequencyId ?? '',
      });
    }
  }, [editValues]);

  const { mutate } = useSetMemberDataMutation();

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        if (id) {
          mutate({ id: String(id), data });
        }
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, router.isReady]);

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
            placeholder="0.00"
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
              placeholder="0.00"
              textAlign="right"
            />
          </InputGroupContainer> */}

        <Box
          p="s20"
          id="kymAccIndEstimatedWithdrawDepositAmountintheInstitureion"
        >
          <FormRadioGroup
            label={t['kynIndEstimatednoofAnnualTransaction']}
            id="estimatedAnnualTransactionFrequencyId"
            name="estimatedAnnualTransactionFrequencyId"
            options={getFieldOption(
              estimatedAnnualTransactionData,
              (label) => label
            )}
            labelFontSize="s3"
          />
        </Box>

        <FormSection>
          <FormInput
            type="number"
            name="estimatedAnnualDepositAmount"
            label={t['kynIndEstimatedAnnualDeposit']}
            placeholder="0.00"
            textAlign="right"
          />
          <FormInput
            type="number"
            name="estimatedAnnualLoanAmount"
            label={t['kynIndEstimatedAnnualLoan']}
            placeholder="0.00"
            textAlign="right"
          />
        </FormSection>
      </form>
    </FormProvider>
  );
};
