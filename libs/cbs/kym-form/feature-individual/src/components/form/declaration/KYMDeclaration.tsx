import { useFormContext } from 'react-hook-form';

import { Box, FormSection, GridItem } from '@myra-ui';

import {
  FormFieldSearchTerm,
  KymIndMemberInput,
  useGetIndividualKymOptionsQuery,
} from '@coop/cbs/data-access';
import {
  FormInput,
  FormRadioGroup,
  FormSelect,
  FormSwitchTab,
  FormTextArea,
} from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

import { getFieldOption } from '../../../utils/getFieldOption';

const booleanList = [
  {
    label: 'Yes',
    value: true,
  },
  {
    label: 'No',
    value: false,
  },
];

export const KYMDeclaration = () => {
  const { t } = useTranslation();

  const { watch } = useFormContext<KymIndMemberInput>();

  const isConvicted = watch('isConvicted');

  const { data: familyRelationShipData, isLoading: familyRelationshipLoading } =
    useGetIndividualKymOptionsQuery({
      searchTerm: FormFieldSearchTerm.Relationship,
    });

  const { data: foreignEmploymentOptions } = useGetIndividualKymOptionsQuery({
    searchTerm: FormFieldSearchTerm?.ForeignEmploymentOptions,
  });

  const hasBeneficialOwner = watch('hasBeneficialOwner');
  const isPoliticallyExposed = watch('isPoliticallyExposed');
  const hasForeignResidentialPermit = watch('hasForeignResidentialPermit');

  return (
    <>
      <FormSection id="kymAccIndBeneficialOwner" header={t['kymIndNominee']}>
        <GridItem colSpan={3}>
          <FormSwitchTab
            label={t['kymIndDoyouhavebeneficialowner']}
            options={booleanList}
            name="hasBeneficialOwner"
          />
        </GridItem>
        {hasBeneficialOwner && (
          <>
            <GridItem colSpan={1}>
              <FormSelect
                name="beneficialRelationshipId"
                isLoading={familyRelationshipLoading}
                options={getFieldOption(familyRelationShipData)}
                label={t['kymIndBeneficialOwnerRelationship']}
              />
            </GridItem>

            <GridItem mt="20px" colSpan={2}>
              <FormInput
                type="text"
                id="beneficialFullName"
                name="beneficialFullName"
                label={t['kymIndBeneficialOwnerName']}
              />
            </GridItem>
          </>
        )}
      </FormSection>

      <FormSection id="kymAccIndFamilymembersinpolitics">
        <GridItem colSpan={3}>
          <FormSwitchTab
            label={t['kymIndPoliticallyexposedperson']}
            options={booleanList}
            name="isPoliticallyExposed"
          />
        </GridItem>
        {isPoliticallyExposed && (
          <GridItem colSpan={3}>
            <Box w="50%">
              <FormTextArea
                name="politicallyExposedDetails"
                id="politicallyExposedDetails"
                label={t['kymIndPleasespecify']}
              />
            </Box>
          </GridItem>
        )}
      </FormSection>

      <FormSection id="kymAccIndConvictedNonconvictedStatus">
        <GridItem colSpan={3}>
          <FormSwitchTab
            label={t['kymIndDeclarationofconvicted']}
            options={booleanList}
            name="isConvicted"
          />
        </GridItem>
        {isConvicted && (
          <GridItem colSpan={3}>
            <Box w="50%">
              <FormTextArea
                id="convictedDetails"
                label={t['kymIndPleasespecify']}
                name="convictedDetails"
              />
            </Box>
          </GridItem>
        )}
      </FormSection>

      <FormSection id="kymAccIndResidentialpermitofforeigncountry">
        <GridItem colSpan={3}>
          <FormSwitchTab
            label={t['kymIndForeignCountry']}
            options={booleanList}
            name="hasForeignResidentialPermit"
          />
        </GridItem>
        <GridItem colSpan={3}>
          {hasForeignResidentialPermit && (
            <FormRadioGroup
              name="foreignResidentialPermitTypeId"
              label={t['kymIndSpecifyfollowingdetails']}
              options={getFieldOption(foreignEmploymentOptions)}
              labelFontSize="s3"
            />
          )}
        </GridItem>
      </FormSection>
    </>
  );
};
