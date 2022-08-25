import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { KymCooperativeFormInput } from '@coop/cbs/data-access';
import { KYMDocumentField } from '@coop/cbs/kym-form/formElements';
import { FormSection } from '@coop/shared/ui';
import { getKymCoopSection, useTranslation } from '@coop/shared/utils';

import { useCooperative } from '../../hooks/useCooperative';

interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}
export const KymCoopDocumentDeclarationForm = (props: IProps) => {
  const { t } = useTranslation();

  const router = useRouter();

  const id = String(router?.query?.['id']);

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
        <FormSection
          header="kymCoopDOCUMENTDECLARATION"
          gridLayout={true}
          templateColumns={2}
        >
          <KYMDocumentField
            mutationId={id}
            label={t['kymCoopAGMDecisionDocument']}
            name="agmBodDecisionDocument"
            setKymCurrentSection={setSection}
            getKymSection={getKymCoopSection}
          />
          <KYMDocumentField
            mutationId={id}
            label={t['kymCoopRegisteredCertificate']}
            name="registeredCertificate"
            setKymCurrentSection={setSection}
            getKymSection={getKymCoopSection}
          />
          <KYMDocumentField
            mutationId={id}
            label="MOA/AOA"
            name="moaAoa"
            setKymCurrentSection={setSection}
            getKymSection={getKymCoopSection}
          />
          <KYMDocumentField
            mutationId={id}
            label={t['kymCoopPANCertificate']}
            name="panCertificate"
            setKymCurrentSection={setSection}
            getKymSection={getKymCoopSection}
          />
          <KYMDocumentField
            mutationId={id}
            label={t['kymCoopTaxClearance']}
            name="taxClearance"
            setKymCurrentSection={setSection}
            getKymSection={getKymCoopSection}
          />
          <KYMDocumentField
            mutationId={id}
            label={t['kymCoopLatestAuditReport']}
            name="latestAuditReport"
            setKymCurrentSection={setSection}
            getKymSection={getKymCoopSection}
          />
          <KYMDocumentField
            mutationId={id}
            label={t['kymCoopLogo']}
            name="logo"
            setKymCurrentSection={setSection}
            getKymSection={getKymCoopSection}
          />
          <KYMDocumentField
            mutationId={id}
            label={t['kymCoopMinuteofCentralRep']}
            name="minuteOfCentralRep"
            setKymCurrentSection={setSection}
            getKymSection={getKymCoopSection}
          />
        </FormSection>
      </form>
    </FormProvider>
  );
};
