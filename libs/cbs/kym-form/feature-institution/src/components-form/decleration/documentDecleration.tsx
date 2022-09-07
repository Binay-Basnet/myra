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
import { FormSection } from '@coop/shared/ui';
import { getKymSectionInstitution, useTranslation } from '@coop/shared/utils';

interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const DocumentDeclarationInstitution = (props: IProps) => {
  const { t } = useTranslation();
  const { setSection } = props;

  return (
    <FormSection
      templateColumns={2}
      id="Documents Declaration"
      header="kymInsDocumentsDeclaration"
    >
      <KYMDocumentDeclarationField
        name="institutionAgmDocument"
        label={t['kymInsAGMDecisionDocument']}
        setSection={setSection}
      />
      <KYMDocumentDeclarationField
        name="InsRegisteredCertificate"
        label={t['kymInsRegisteredCertificate']}
        setSection={setSection}
      />
      <KYMDocumentDeclarationField
        name="InsMOA/AOA"
        label="MOA/AOA"
        setSection={setSection}
      />
      <KYMDocumentDeclarationField
        name="InsPanCertificate"
        label={t['kymInsPANCertificate']}
        setSection={setSection}
      />
      <KYMDocumentDeclarationField
        name="InsTaxClearance"
        label={t['kymInsTaxClearance']}
        setSection={setSection}
      />
      <KYMDocumentDeclarationField
        name="InsLatestAuditReport"
        label={t['kymInsLatestAuditReport']}
        setSection={setSection}
      />
    </FormSection>
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

  const { data: editValues, isFetching } = useGetKymDocumentsListQuery(
    {
      memberId: String(id),
    },
    { enabled: !!id }
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
