import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import debounce from 'lodash/debounce';

import {
  KymIndMemberInput,
  useGetIndividualKymEditDataQuery,
  useSetMemberDataMutation,
} from '@coop/cbs/data-access';
import { FormInput } from '@coop/shared/form';
import { FormSection } from '@myra-ui';
import { getKymSection, useTranslation } from '@coop/shared/utils';

interface IKYMFinancialTransactionDetailsProps {
  setKymCurrentSection: (section?: { section: string; subSection: string }) => void;
}

export const KYMFinancialTransactionDetails = ({
  setKymCurrentSection,
}: IKYMFinancialTransactionDetailsProps) => {
  const { t } = useTranslation();

  const methods = useForm<KymIndMemberInput>();

  const { watch, reset } = methods;

  const router = useRouter();
  const id = router?.query?.['id'];

  // const { data: financialTransactionDetailsData } =
  //   useGetIndividualKymOptionsQuery({
  //     id,
  //     filter: { customId: KYMOptionEnum.FinancialTransactionDetails },
  //   });

  const { data: editValues } = useGetIndividualKymEditDataQuery(
    {
      id: String(id),
    },
    { enabled: !!id }
  );

  useEffect(() => {
    if (editValues) {
      const editValueData = editValues?.members?.individual?.formState?.data?.formData;

      reset({
        ...editValueData?.initialTransactionDetails,
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
          id="kymAccIndFinancialTransactionDetails"
          header="kynIndFINANCIALTRANSACTIONDETAILS"
          subHeader="kynIndDetailsoftheamount"
        >
          <FormInput
            type="number"
            name="initialShare"
            textAlign="right"
            label={t['kymIndFinancialShare']}
          />
          <FormInput
            type="number"
            name="initialSaving"
            label={t['kymIndFinancialSavings']}
            textAlign="right"
          />

          <FormInput type="number" name="initialLoan" label={t['kymIndLoan']} textAlign="right" />

          <FormInput
            type="number"
            name="otherFinancialAmount"
            label={t['kymIndFinancialOther']}
            textAlign="right"
          />
        </FormSection>
        {/* {financialTransactionDetailsData?.members?.individual?.options.list?.data?.[0]?.options?.map(
                (option, index) => {
                  register(`initialTransactionDetails.options.${index}.id`, {
                    value: option.id,
                  });
                  return (
                    <FormInput
                      key={index}
                      id={`financialTransaction.${String(option?.name?.local)}`}
                      type="number"
                      // name={String(option?.name?.local)}
                      name={`initialTransactionDetails.options.${index}.value`}
                      textAlign="right"
                      label={option?.name.local}
                      __placeholder="0.00"
                    />
                  );
                }
              )} */}
      </form>
    </FormProvider>
  );
};
