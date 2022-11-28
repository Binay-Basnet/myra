import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { CoopUnionInstitutionInformationInput } from '@coop/cbs/data-access';
import { KYMDocumentField } from '@coop/cbs/kym-form/formElements';
import { FormCheckbox } from '@coop/shared/form';
import { Box, FormSection, TextFields } from '@myra-ui';
import { getKymSectionCoOperativeUnion, useTranslation } from '@coop/shared/utils';

import { useCoopUnionInstitution } from '../../../hooks/useCoopUnionInstitution';

interface IDocumentDeclarationInstitutionCOOPUnionProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const DocumentDeclarationInstitutionCOOPUnion = ({
  setSection,
}: IDocumentDeclarationInstitutionCOOPUnionProps) => {
  const router = useRouter();

  const id = String(router?.query?.['id']);

  const { t } = useTranslation();

  const methods = useForm<CoopUnionInstitutionInformationInput>();

  useCoopUnionInstitution({ methods });

  return (
    <FormSection
      templateColumns={2}
      id="kymCoopUnionAccDocumentsDeclaration"
      header="kymCoopUnionDecDocumentsDeclaration"
    >
      <KYMDocumentField
        mutationId={id}
        name="agmBodDecisionDocument"
        label={t['kymCoopUnionDecAGMDecisionDocument']}
        setKymCurrentSection={setSection}
        getKymSection={getKymSectionCoOperativeUnion}
      />
      <KYMDocumentField
        mutationId={id}
        name="registeredCertificate"
        label={t['kymCoopUnionDecRegisteredCertificate']}
        setKymCurrentSection={setSection}
        getKymSection={getKymSectionCoOperativeUnion}
      />
      <KYMDocumentField
        mutationId={id}
        name="moaAoa"
        label={t['kymCoopUnionDecMOAAOA']}
        setKymCurrentSection={setSection}
        getKymSection={getKymSectionCoOperativeUnion}
      />
      <KYMDocumentField
        mutationId={id}
        name="panCertificate"
        label={t['kymCoopUnionDecPANCertificate']}
        setKymCurrentSection={setSection}
        getKymSection={getKymSectionCoOperativeUnion}
      />
      <KYMDocumentField
        mutationId={id}
        name="taxClearance"
        label={t['kymCoopUnionDecTaxClearance']}
        setKymCurrentSection={setSection}
        getKymSection={getKymSectionCoOperativeUnion}
      />
      <KYMDocumentField
        mutationId={id}
        name="lastAuditReport"
        label={t['kymCoopUnionDecLatestAuditReport']}
        setKymCurrentSection={setSection}
        getKymSection={getKymSectionCoOperativeUnion}
      />
      <KYMDocumentField
        mutationId={id}
        name="logo"
        label="Logo"
        setKymCurrentSection={setSection}
        getKymSection={getKymSectionCoOperativeUnion}
      />
      <KYMDocumentField
        mutationId={id}
        name="minuteOfCentralRep"
        label={t['kymCoopUnionDecMinuteofCentralRep']}
        setKymCurrentSection={setSection}
        getKymSection={getKymSectionCoOperativeUnion}
      />

      <Box
        display="flex"
        gap="s16"
        alignItems="start"
        id="kymCoopUnionAccAccountHolderDeclaration"
        scrollMarginTop={'200px'}
      >
        <FormProvider {...methods}>
          <form
            onFocus={(e) => {
              const kymSection = getKymSectionCoOperativeUnion(e.target.id);

              setSection(kymSection);
            }}
          >
            <Box p="s20" display="flex" gap="s16" alignItems="center">
              <FormCheckbox name="declarationAgreement" fontSize="s3" />
              <TextFields variant="formInput" mt="-6px">
                I/We agree to the&nbsp;
                <TextFields as="span" variant="link">
                  Terms and condition.
                </TextFields>
              </TextFields>
            </Box>
          </form>
        </FormProvider>
      </Box>
    </FormSection>
  );
};
