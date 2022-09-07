import { useFormContext } from 'react-hook-form';

import {
  IndividualRequiredDocument,
  InstitutionRequiredDocument,
  KymMemberTypesEnum,
} from '@coop/cbs/data-access';
import { FormCheckboxGroup } from '@coop/shared/form';
import { Box, FormSection } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { TopText } from '../formui';

export const RequiredDocumentSetup = () => {
  const { t } = useTranslation();
  const { watch } = useFormContext();
  const typesOfMember = watch('typeOfMember');

  const individualList = [
    { label: t['depositProductForm'], value: IndividualRequiredDocument.Form },
    {
      label: t['depositProductPhoto'],
      value: IndividualRequiredDocument.Photo,
    },
    {
      label: t['depositProductSignature'],
      value: IndividualRequiredDocument.Signature,
    },
    {
      label: t['depositProductFingerprint'],
      value: IndividualRequiredDocument.Fingerprint,
    },
    {
      label: t['depositProductNomineeDocument'],
      value: IndividualRequiredDocument.NomineeDocument,
    },
  ];

  const instutionList = [
    {
      label: t['depositProductDecision'],
      value: InstitutionRequiredDocument.Decision,
    },
    {
      label: t['depositProductRegistered'],
      value: InstitutionRequiredDocument.Registered,
    },
    {
      label: t['depositProductSignature'],
      value: InstitutionRequiredDocument.Signature,
    },
    {
      label: t['depositProductTaxClearance'],
      value: InstitutionRequiredDocument.TaxClearance,
    },
  ];

  return (
    <FormSection
      header="depositProductRequiredDocumentSetup"
      templateColumns={2}
    >
      {typesOfMember?.includes(KymMemberTypesEnum.Individual) && (
        <Box display="flex" flexDirection="column" gap="s16" w="40%">
          <TopText>{t['depositProductIndividual']} </TopText>
          <FormCheckboxGroup
            name="individualDocuments"
            list={individualList}
            orientation="column"
          />
        </Box>
      )}

      {(typesOfMember?.includes(KymMemberTypesEnum.Institution) ||
        typesOfMember?.includes(KymMemberTypesEnum.Cooperative) ||
        typesOfMember?.includes(KymMemberTypesEnum.CooperativeUnion)) && (
        <Box display="flex" flexDirection="column" gap="s16" w="25%">
          <TopText>{t['depositProductInstitutional']} </TopText>
          <FormCheckboxGroup
            name="institutionDocuments"
            list={instutionList}
            orientation="column"
          />
        </Box>
      )}
    </FormSection>
  );
};
