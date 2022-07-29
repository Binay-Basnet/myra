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
  const id = String(router?.query?.['id']);

  const methods = useForm<KymIndMemberInput>();

  const { watch, reset } = methods;

  const { data: editValues, refetch } = useGetKymDocumentsListQuery({
    memberId: id,
  });

  useEffect(() => {
    if (editValues) {
      const kymDocumentsList =
        editValues?.members?.document?.listKYMDocuments?.data;

      const documentData = kymDocumentsList?.find(
        (doc) => doc?.fieldId === name
      );

      if (documentData) {
        reset({ [name]: documentData.identifier });
      }
    }
  }, [editValues]);

  const { mutate } = useSetKymDocumentDataMutation({
    onSuccess: () => refetch(),
  });

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        console.log({ data });
        mutate({ memberId: id, fieldId: name, identifiers: data[name] });
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
