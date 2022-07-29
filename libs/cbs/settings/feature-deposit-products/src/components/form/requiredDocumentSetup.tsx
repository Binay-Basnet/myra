import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';

import {
  IndividualRequiredDocument,
  InstitutionRequiredDocument,
  KymMemberTypesEnum,
} from '@coop/shared/data-access';
import { FormCheckboxGroup } from '@coop/shared/form';
import { Box, Grid } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { BoxContainer, TopText } from '../formui';

export const RequiredDocumentSetup = () => {
  const router = useRouter();
  const url = router.asPath.split('/');
  const { t } = useTranslation();
  const { watch } = useFormContext();
  const typesOfMember = watch('typeOfMember');

  console.log(typesOfMember);

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
    <BoxContainer>
      <TopText> {t['depositProductRequiredDocumentSetup']} </TopText>
      <Grid templateColumns={'repeat(2,1fr)'}>
        {url.includes('edit') && (
          <>
            {typesOfMember?.includes(KymMemberTypesEnum.Individual) && (
              <Box display="flex" flexDirection="column" gap="s16">
                <TopText>{t['depositProductIndividual']} </TopText>
                <FormCheckboxGroup
                  name="individualDocuments"
                  list={individualList}
                  orientation="column"
                />
              </Box>
            )}

            {typesOfMember?.includes(
              KymMemberTypesEnum.Institution ||
                KymMemberTypesEnum.Cooperative ||
                KymMemberTypesEnum.CooperativeUnion
            ) && (
              <Box display="flex" flexDirection="column" gap="s16">
                <TopText>{t['depositProductInstitutional']} </TopText>
                <FormCheckboxGroup
                  name="institutionDocuments"
                  list={instutionList}
                  orientation="column"
                />
              </Box>
            )}
          </>
        )}
        {/* {(typesOfMember ||
          typeOfNature?.typeOfNature?.includes(
            KymMemberTypesEnum.Individual
          )) && (
          <Box display="flex" flexDirection="column" gap="s16">
            <TopText>{t['depositProductIndividual']} </TopText>
            <FormCheckboxGroup
              name="individualDocuments"
              list={individualList}
              orientation="column"
            />
          </Box>
        )}

        {(typesOfMember ||
          typeOfNature?.typeOfNature?.includes(
            KymMemberTypesEnum.Institution ||
              KymMemberTypesEnum.Cooperative ||
              KymMemberTypesEnum.CooperativeUnion
          )) && (
          <Box display="flex" flexDirection="column" gap="s16">
            <TopText>{t['depositProductInstitutional']} </TopText>
            <FormCheckboxGroup
              name="institutionDocuments"
              list={instutionList}
              orientation="column"
            />
          </Box>
        )} */}
      </Grid>
    </BoxContainer>
  );
};
