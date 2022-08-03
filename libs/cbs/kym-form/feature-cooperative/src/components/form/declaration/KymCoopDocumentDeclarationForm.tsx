import { FormProvider, useForm } from 'react-hook-form';

import { KYMDocumentField } from '@coop/cbs/kym-form/formElements';
import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { KymCooperativeFormInput } from '@coop/shared/data-access';
import { Grid, Text } from '@coop/shared/ui';
import { getKymCoopSection, useTranslation } from '@coop/shared/utils';

import { useCooperative } from '../../hooks/useCooperative';

interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}
export const KymCoopDocumentDeclarationForm = (props: IProps) => {
  const { t } = useTranslation();
  const { setSection } = props;
  const methods = useForm<KymCooperativeFormInput>({
    defaultValues: {},
  });
  useCooperative({ methods });
  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymCoopSection(e.target.id);
          setSection(kymSection);
        }}
      >
        <GroupContainer id="Document Declaration">
          <Text fontSize="r1" fontWeight="SemiBold">
            {t['kymCoopDOCUMENTDECLARATION']}
          </Text>
          <Grid templateColumns="repeat(2, 1fr)" rowGap="s32" columnGap="s20">
            <KYMDocumentField
              label={t['kymCoopAGMDecisionDocument']}
              name="passportSizePhoto"
              setKymCurrentSection={setSection}
              getKymSection={getKymCoopSection}
            />
            <KYMDocumentField
              label={t['kymCoopRegisteredCertificate']}
              name="signaturePhoto"
              setKymCurrentSection={setSection}
              getKymSection={getKymCoopSection}
            />
            <KYMDocumentField
              label="MOA/AOA"
              name="citizenshipPhoto"
              setKymCurrentSection={setSection}
              getKymSection={getKymCoopSection}
            />
            <KYMDocumentField
              label={t['kymCoopPANCertificate']}
              name="fingerprintPhoto"
              setKymCurrentSection={setSection}
              getKymSection={getKymCoopSection}
            />

            <KYMDocumentField
              label={t['kymCoopTaxClearance']}
              name="citizenshipPhoto"
              setKymCurrentSection={setSection}
              getKymSection={getKymCoopSection}
            />

            <KYMDocumentField
              label={t['kymCoopLatestAuditReport']}
              name="citizenshipPhoto"
              setKymCurrentSection={setSection}
              getKymSection={getKymCoopSection}
            />

            <KYMDocumentField
              label={t['kymCoopLogo']}
              name="citizenshipPhoto"
              setKymCurrentSection={setSection}
              getKymSection={getKymCoopSection}
            />

            <KYMDocumentField
              label={t['kymCoopMinuteofCentralRep']}
              name="citizenshipPhoto"
              setKymCurrentSection={setSection}
              getKymSection={getKymCoopSection}
            />
          </Grid>
        </GroupContainer>
      </form>
    </FormProvider>
  );
};
