import { FormProvider, useForm } from 'react-hook-form';

import { KYMDocumentField } from '@coop/cbs/kym-form/formElements';
import { GroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { CoopUnionInstitutionInformationInput } from '@coop/shared/data-access';
import { FormCheckbox } from '@coop/shared/form';
import { Box, Grid, Text, TextFields } from '@coop/shared/ui';
import {
  getKymSectionCoOperativeUnion,
  useTranslation,
} from '@coop/shared/utils';

import { useCooperativeUnionInstitution } from '../../../hooks';

interface IDocumentDeclarationInstitutionCOOPUnionProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const DocumentDeclarationInstitutionCOOPUnion = ({
  setSection,
}: IDocumentDeclarationInstitutionCOOPUnionProps) => {
  const { t } = useTranslation();

  const methods = useForm<CoopUnionInstitutionInformationInput>();

  useCooperativeUnionInstitution({ methods });

  return (
    <GroupContainer
      scrollMarginTop={'200px'}
      id="kymCoopUnionAccDocumentsDeclaration"
    >
      <Text
        fontSize="r1"
        fontWeight="semibold"
        color="neutralColorLight.Gray-80"
      >
        {t['kymCoopUnionDecDocumentsDeclaration']}
      </Text>
      <Grid templateColumns={'repeat(2, 1fr)'} gap="s32">
        <KYMDocumentField
          name="documents"
          label={t['kymCoopUnionDecAGMDecisionDocument']}
          setKymCurrentSection={setSection}
          getKymSection={getKymSectionCoOperativeUnion}
        />
        <KYMDocumentField
          name="documents"
          label={t['kymCoopUnionDecRegisteredCertificate']}
          setKymCurrentSection={setSection}
          getKymSection={getKymSectionCoOperativeUnion}
        />
        <KYMDocumentField
          name="documents"
          label={t['kymCoopUnionDecMOAAOA']}
          setKymCurrentSection={setSection}
          getKymSection={getKymSectionCoOperativeUnion}
        />
        <KYMDocumentField
          name="documents"
          label={t['kymCoopUnionDecPANCertificate']}
          setKymCurrentSection={setSection}
          getKymSection={getKymSectionCoOperativeUnion}
        />
        <KYMDocumentField
          name="documents"
          label={t['kymCoopUnionDecTaxClearance']}
          setKymCurrentSection={setSection}
          getKymSection={getKymSectionCoOperativeUnion}
        />
        <KYMDocumentField
          name="documents"
          label={t['kymCoopUnionDecLatestAuditReport']}
          setKymCurrentSection={setSection}
          getKymSection={getKymSectionCoOperativeUnion}
        />
        <KYMDocumentField
          name="documents"
          label="Logo"
          setKymCurrentSection={setSection}
          getKymSection={getKymSectionCoOperativeUnion}
        />
        <KYMDocumentField
          name="documents"
          label={t['kymCoopUnionDecMinuteofCentralRep']}
          setKymCurrentSection={setSection}
          getKymSection={getKymSectionCoOperativeUnion}
        />
      </Grid>
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
            <Box display="flex" gap="s16" alignItems="center">
              <FormCheckbox
                name="declarationAgreement"
                fontSize="s3"
                id="weAgree"
              />
              <TextFields variant="formInput">
                I/We agree to the Terms and condition
              </TextFields>
            </Box>
          </form>
        </FormProvider>
      </Box>
    </GroupContainer>
  );
};
