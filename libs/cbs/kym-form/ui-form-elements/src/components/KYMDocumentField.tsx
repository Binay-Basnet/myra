import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import debounce from 'lodash/debounce';

import {
  KymIndMemberInput,
  useGetKymDocumentsListQuery,
  useSetKymDocumentDataMutation,
} from '@coop/shared/data-access';
import { FormFileInput } from '@coop/shared/form';
import { getKymSection } from '@coop/shared/utils';

interface IKYMDocumentFieldProps {
  setKymCurrentSection: (section?: {
    section: string;
    subSection: string;
  }) => void;
  name: string;
  label?: string;
}

export const KYMDocumentField = ({
  setKymCurrentSection,
  name,
  label,
}: IKYMDocumentFieldProps) => {
  const router = useRouter();
  const id = router?.query?.['id'];

  const methods = useForm<KymIndMemberInput>();

  const { watch, reset } = methods;

  const { data: editValues, isFetching } = useGetKymDocumentsListQuery(
    {
      memberId: String(id),
    },
    { enabled: !!id }
  );

  useEffect(() => {
    if (editValues) {
      const kymDocumentsList = editValues?.document?.listKYMDocuments?.data;

      console.log({ kymDocumentsList });

      const documentData = kymDocumentsList?.find(
        (doc) => doc?.fieldId === name
      );

      // console.log({ documentData });

      if (documentData) {
        reset({
          [name]: documentData.docData.map((file) => ({
            url: file?.url,
            fileName: file?.identifier,
          })),
        });
      }
    }
  }, [isFetching]);

  const { mutate } = useSetKymDocumentDataMutation();

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        if (!data[name]?.[0]?.url) {
          if (id) {
            mutate({
              memberId: id as string,
              fieldId: name,
              identifiers: data[name],
            });
          }
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
        <FormFileInput size="lg" label={label} name={name} />
      </form>
    </FormProvider>
  );
};
