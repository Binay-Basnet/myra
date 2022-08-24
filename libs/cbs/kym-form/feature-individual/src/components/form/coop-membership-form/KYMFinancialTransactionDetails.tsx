import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import debounce from 'lodash/debounce';

import {
  KymIndMemberInput,
  useGetIndividualKymEditDataQuery,
  useSetMemberDataMutation,
} from '@coop/cbs/data-access';
import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormInput } from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';
import { getKymSection, useTranslation } from '@coop/shared/utils';

interface IKYMFinancialTransactionDetailsProps {
  setKymCurrentSection: (section?: {
    section: string;
    subSection: string;
  }) => void;
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
      const editValueData =
        editValues?.members?.individual?.formState?.data?.formData;

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
        <GroupContainer
          borderBottom={'1px solid'}
          borderBottomColor="border.layout"
          id="kymAccIndFinancialTransactionDetails"
          scrollMarginTop={'200px'}
        >
          <Text fontSize="r1" fontWeight="SemiBold">
            {t['kynIndFINANCIALTRANSACTIONDETAILS']}
          </Text>

          <Box display="flex" flexDirection="column" gap="s16">
            <Text fontSize={'s3'} fontWeight="500" color="gray.700">
              {t['kynIndDetailsoftheamount']}
            </Text>
            <InputGroupContainer>
              <FormInput
                type="number"
                name="initialShare"
                textAlign="right"
                label={t['kymIndFinancialShare']}
                placeholder="0.00"
              />
              <FormInput
                type="number"
                name="initialSaving"
                label={t['kymIndFinancialSavings']}
                textAlign="right"
                placeholder="0.00"
              />
              <FormInput
                type="number"
                name="otherFinancialAmount"
                label={t['kymIndFinancialOther']}
                textAlign="right"
                placeholder="0.00"
              />
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
                      placeholder="0.00"
                    />
                  );
                }
              )} */}
            </InputGroupContainer>
          </Box>
        </GroupContainer>
      </form>
    </FormProvider>
  );
};
