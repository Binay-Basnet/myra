import { useFormContext } from 'react-hook-form';

import { Box, FormSection, GridItem, Text } from '@myra-ui';

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
    <Box display="flex" flexDirection="column" id="Next to Kin" scrollMarginTop="200px">
      <Box p="s20" pb="0">
        <Text variant="bodyRegular" fontWeight="SemiBold">
          {t['kynIndNominee']}
        </Text>
      </Box>

      <FormSection id="kymAccIndBeneficialOwner">
        <GridItem colSpan={3}>
          <FormSwitchTab
            label={t['kynIndDoyouhavebeneficialowner']}
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
                label={t['kynIndIyespleasewritenameandrelationship']}
              />
            </GridItem>

            <GridItem mt="20px" colSpan={2}>
              <FormInput
                type="text"
                id="beneficialFullName"
                name="beneficialFullName"
                label="Name"
              />
            </GridItem>
          </>
        )}
      </FormSection>

      <FormSection id="kymAccIndFamilymembersinpolitics">
        <GridItem colSpan={3}>
          <FormSwitchTab
            label={t['kynIndPoliticallyexposedperson']}
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
                label={t['kynIndPleasespecify']}
              />
            </Box>
          </GridItem>
        )}
      </FormSection>

      <FormSection id="kymAccIndConvictedNonconvictedStatus">
        <GridItem colSpan={3}>
          <FormSwitchTab
            label={t['kynIndDeclarationofconvicted']}
            options={booleanList}
            name="isConvicted"
          />
        </GridItem>
        {isConvicted && (
          <GridItem colSpan={3}>
            <Box w="50%">
              <FormTextArea
                id="convictedDetails"
                label={t['kynIndPleasespecify']}
                name="convictedDetails"
              />
            </Box>
          </GridItem>
        )}
      </FormSection>

      <FormSection id="kymAccIndResidentialpermitofforeigncountry">
        <GridItem colSpan={3}>
          <FormSwitchTab
            label={t['kynIndForeignCountry']}
            options={booleanList}
            name="hasForeignResidentialPermit"
          />
        </GridItem>
        <GridItem colSpan={3}>
          {hasForeignResidentialPermit && (
            <FormRadioGroup
              name="foreignResidentialPermitTypeId"
              label={t['kynIndSpecifyfollowingdetails']}
              options={getFieldOption(foreignEmploymentOptions)}
              labelFontSize="s3"
            />
          )}
        </GridItem>
      </FormSection>
    </Box>
  );
};
