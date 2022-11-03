import { KYMDocumentField } from '@coop/cbs/kym-form/formElements';
import { FormSection } from '@coop/shared/ui';
import { getKymSectionInstitution, useTranslation } from '@coop/shared/utils';

interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
  directorId: string;
}

export const DocumentComponent = ({ setSection, directorId }: IProps) => {
  const { t } = useTranslation();

  return (
    <FormSection templateColumns={2}>
      <KYMDocumentField
        mutationId={directorId}
        setKymCurrentSection={setSection}
        getKymSection={getKymSectionInstitution}
        label={t['kymInsPhotograph']}
        name="photograph"
      />
      <KYMDocumentField
        mutationId={directorId}
        setKymCurrentSection={setSection}
        getKymSection={getKymSectionInstitution}
        label={t['kymInsPhotographOfIdentityProofDocument']}
        name="documentPhotograph"
      />
    </FormSection>
  );
};
