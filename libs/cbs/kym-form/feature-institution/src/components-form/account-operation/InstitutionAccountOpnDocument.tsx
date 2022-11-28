import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { debounce } from 'lodash';

import {
  KymInsInput,
  useGetKymDocumentsListQuery,
  useSetKymDocumentDataMutation,
} from '@coop/cbs/data-access';
import { FormFileInput } from '@coop/shared/form';
import { Box } from '@myra-ui';
import { getKymSectionInstitution, useTranslation } from '@coop/shared/utils';

import { useInstitution } from '../hooks/useInstitution';

interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

type KYMInstitutionInput = Omit<KymInsInput, 'companyStamp'> & {
  companyStamp: { url?: string | undefined; identifier: string | undefined }[];
};

export const InstitutionAccountOpnDocument = (props: IProps) => {
  const router = useRouter();
  const { t } = useTranslation();
  const id = String(router?.query?.['id']);

  const methods = useForm<KYMInstitutionInput>({
    defaultValues: {},
  });

  const { watch, reset } = methods;

  const { setSection } = props;

  useInstitution({ methods });

  const { data: editValues, isFetching } = useGetKymDocumentsListQuery(
    {
      memberId: String(id),
    },
    { enabled: !!id }
  );

  useEffect(() => {
    if (editValues) {
      const kymDocumentsList = editValues?.document?.listKYMDocuments?.data;

      const documentData = kymDocumentsList?.find((doc) => doc?.fieldId === 'companyStamp');

      //

      if (documentData) {
        reset({
          companyStamp: documentData.docData.map((file) => ({
            url: file?.url,
            identifier: file?.identifier,
          })),
        });
      }
    }
  }, [isFetching]);

  const { mutate } = useSetKymDocumentDataMutation();

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        if (!data['companyStamp']?.[0]?.url) {
          if (id) {
            mutate({
              memberId: id as string,
              fieldId: 'companyStamp',
              identifiers: data['companyStamp'],
            });
          }
        }
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, router.isReady]);

  return (
    <Box p="s20">
      <FormProvider {...methods}>
        <form
          onFocus={(e) => {
            const kymSection = getKymSectionInstitution(e.target.id);
            setSection(kymSection);
          }}
        >
          <Box w="13%">
            <FormFileInput size="md" label={t['kymInsCompanyStamp']} name="companyStamp" />
          </Box>
        </form>
      </FormProvider>
    </Box>
  );
};
