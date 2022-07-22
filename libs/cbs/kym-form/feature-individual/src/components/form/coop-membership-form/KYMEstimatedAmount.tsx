import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import debounce from 'lodash/debounce';

import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import {
  Kym_Field_Custom_Id as KYMOptionEnum,
  KymIndMemberInput,
  useGetIndividualKymOptionsQuery,
  useSetMemberDataMutation,
} from '@coop/shared/data-access';
import { FormInput, FormRadioGroup } from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';
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
  const id = String(router?.query?.['id']);

  const methods = useForm<KymIndMemberInput>();

  const { watch } = methods;

  const { data: estimatedAnnualTransactionData } =
    useGetIndividualKymOptionsQuery({
      id,
      filter: { customId: KYMOptionEnum.EstimatedAnnualTransaction },
    });

  const { mutate } = useSetMemberDataMutation();

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        mutate({ id, data });
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
              name="estimatedAnnualTransactionAmount"
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
      </form>
    </FormProvider>
  );
};
