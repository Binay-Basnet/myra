import { useRouter } from 'next/router';

import { KYMDocumentField } from '@coop/cbs/kym-form/formElements';
import { FormSection } from '@myra-ui';
// import { useTranslation } from '@coop/shared/utils';
import { getKymSection } from '@coop/shared/utils';

interface IKYMDocumentDeclarationProps {
  setKymCurrentSection: (section?: { section: string; subSection: string }) => void;
}

export const KYMDocumentDeclaration = ({ setKymCurrentSection }: IKYMDocumentDeclarationProps) => {
  // const { t } = useTranslation();

  const router = useRouter();

  const id = String(router?.query?.['id']);

  return (
    <FormSection header="kynIndDOCUMENTDECLARATION" templateColumns={2}>
      <KYMDocumentField
        mutationId={id}
        label="Passport Size Photo"
        name="passportSizePhoto"
        setKymCurrentSection={setKymCurrentSection}
        getKymSection={getKymSection}
      />

      <KYMDocumentField
        mutationId={id}
        label="Signature"
        name="signaturePhoto"
        setKymCurrentSection={setKymCurrentSection}
        getKymSection={getKymSection}
      />

      <KYMDocumentField
        mutationId={id}
        label="Citizenship Photo"
        name="citizenshipPhoto"
        setKymCurrentSection={setKymCurrentSection}
        getKymSection={getKymSection}
      />

      <KYMDocumentField
        mutationId={id}
        label="Fingerprint Photo"
        name="fingerprintPhoto"
        setKymCurrentSection={setKymCurrentSection}
        getKymSection={getKymSection}
      />
      {/* {fileUploadsData?.members?.individual?.options?.list?.data?.[0]?.options?.map(
              (option, index) => (
                <FormFileInput
                  key={index}
                  size="lg"
                  label={option.name?.local}
                  name="documentsTemp"
                />
              )
            )} */}
    </FormSection>
  );
};
