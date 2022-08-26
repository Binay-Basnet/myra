import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import debounce from 'lodash/debounce';

import {
  KymIndMemberInput,
  useGetIndividualKymEditDataQuery,
  useSetMemberDataMutation,
} from '@coop/cbs/data-access';
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
        <Box p="s20" display="flex" gap="s16" alignItems="center">
          <FormCheckbox name="declarationAgreement" fontSize="s3" />
          <TextFields variant="formInput" mt="-6px">
            I/We agree to the&nbsp;
            <TextFields as="span" variant="link">
              Terms and condition.
            </TextFields>
          </TextFields>
        </Box>
      </form>
    </FormProvider>
  );
};
