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
import { Grid } from '@coop/shared/ui';
import { getKymSectionInstitution, useTranslation } from '@coop/shared/utils';

interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const DocumentComponent = ({ setSection }: IProps) => {
  const { t } = useTranslation();

  return (
    <Grid templateColumns="repeat(2, 1fr)" rowGap="s32" columnGap="s20">
      <KYMDocumentDeclarationField
        setSection={setSection}
        label={t['kymInsPhotograph']}
        // control={control}
        name={`photograph`}
      />
      <KYMDocumentDeclarationField
        setSection={setSection}
        label={t['kymInsPhotographOfIdentityProofDocument']}
        // control={control}
        name={`documentPhotograph`}
      />
    </Grid>
  );
};

interface IKYMDocumentDeclarationFieldProps {
  setSection: (section?: { section: string; subSection: string }) => void;
  name: string;
  label: string;
}

const KYMDocumentDeclarationField = ({
  setSection,
  name,
  label,
}: IKYMDocumentDeclarationFieldProps) => {
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
      const kymDocumentsList =
        editValues?.members?.document?.listKYMDocuments?.data;

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
          const kymSection = getKymSectionInstitution(e.target.id);
          setSection(kymSection);
        }}
      >
        <FormFileInput size="lg" label={label} name={name} />
      </form>
    </FormProvider>
  );
};
