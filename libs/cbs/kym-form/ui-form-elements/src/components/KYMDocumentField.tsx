import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import debounce from 'lodash/debounce';

import {
  KymIndMemberInput,
  useGetKymDocumentsListQuery,
  useSetKymDocumentDataMutation,
} from '@coop/cbs/data-access';
import { FormFileInput } from '@coop/shared/form';

interface IKYMDocumentFieldProps {
  setKymCurrentSection: (section?: {
    section: string;
    subSection: string;
  }) => void;
  mutationId: string;
  name: string;
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  getKymSection: (id: string) =>
    | {
        section: string;
        subSection: string;
      }
    | undefined;
}

export const KYMDocumentField = ({
  setKymCurrentSection,
  mutationId,
  name,
  label,
  size,
  getKymSection,
}: IKYMDocumentFieldProps) => {
  const router = useRouter();

  const methods = useForm<KymIndMemberInput>();

  const { watch, reset } = methods;

  const {
    data: editValues,
    isFetching,
    refetch,
  } = useGetKymDocumentsListQuery(
    {
      memberId: mutationId,
    },
    { enabled: !!mutationId }
  );

  useEffect(() => {
    if (editValues) {
      const kymDocumentsList = editValues?.document?.listKYMDocuments?.data;

      const documentData = kymDocumentsList?.find(
        (doc) => doc?.fieldId === name
      );

      //

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
          if (mutationId) {
            mutate({
              memberId: mutationId,
              fieldId: name,
              identifiers: data[name],
            });
          }
        }
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, router.isReady]);

  useEffect(() => {
    if (mutationId && mutationId !== 'undefined') {
      refetch();
    }
  }, [mutationId]);

  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymSection(e.target.id);
          setKymCurrentSection(kymSection);
        }}
      >
        <FormFileInput size={size ?? 'lg'} label={label} name={name} />
      </form>
    </FormProvider>
  );
};
