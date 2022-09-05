import { KYMDocumentField } from '@coop/cbs/kym-form/formElements';
import { Grid } from '@coop/shared/ui';
import { getKymSectionInstitution, useTranslation } from '@coop/shared/utils';

interface IProps {
  setSection: React.Dispatch<
    React.SetStateAction<{ section: string; subSection: string }>
  >;
  directorId: string;
}

export const DocumentComponent = ({ setSection, directorId }: IProps) => {
  const { t } = useTranslation();

  return (
    <Grid templateColumns="repeat(2, 1fr)" rowGap="s32" columnGap="s20">
      <KYMDocumentField
        mutationId={directorId}
        setKymCurrentSection={setSection}
        getKymSection={getKymSectionInstitution}
        label={t['kymInsPhotograph']}
        name={`photograph`}
      />
      <KYMDocumentField
        mutationId={directorId}
        setKymCurrentSection={setSection}
        getKymSection={getKymSectionInstitution}
        label={t['kymInsPhotographOfIdentityProofDocument']}
        name={`documentPhotograph`}
      />
    </Grid>
  );
};
