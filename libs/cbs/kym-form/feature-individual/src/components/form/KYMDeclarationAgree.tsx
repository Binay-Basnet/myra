import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import debounce from 'lodash/debounce';

import {
  KymIndMemberInput,
  useGetIndividualKymEditDataQuery,
  useSetMemberDataMutation,
} from '@coop/shared/data-access';
import { FormCheckbox } from '@coop/shared/form';
import { Box, TextFields } from '@coop/shared/ui';

export const KYMDeclarationAgree = () => {
  const router = useRouter();

  const id = router?.query?.['id'];

  const methods = useForm<KymIndMemberInput>();

  const { watch, reset } = methods;

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
        declarationAgreement: editValueData?.declaration?.declarationAgreement,
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
      // onFocus={(e) => {
      //   const kymSection = getKymSection(e.target.id);
      //   setKymCurrentSection(kymSection);
      // }}
      >
        <Box display="flex" gap="s16" alignItems="start">
          <FormCheckbox name="declarationAgreement" fontSize="s3">
            {''}
          </FormCheckbox>
          <TextFields variant="formInput" mt="-6px">
            I hereby declare that the information provided by me/us in this form
            and documents provided to the co-operative are true and correct. All
            transaction in this account are from legitimate source. If found
            otherwise, I shall bear the consequences thereof.
          </TextFields>
        </Box>
      </form>
    </FormProvider>
  );
};
