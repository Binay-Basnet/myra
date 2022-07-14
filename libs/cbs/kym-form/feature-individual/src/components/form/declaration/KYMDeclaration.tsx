import React from 'react';
import { Control, useFormContext } from 'react-hook-form';

import {
  ContainerWithDivider,
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import {
  Kym_Field_Custom_Id,
  useGetIndividualKymOptionsQuery,
} from '@coop/shared/data-access';
import {
  FormInput,
  FormRadioGroup,
  FormSelect,
  FormSwitchTab,
  FormTextArea,
} from '@coop/shared/form';
import { Box, Grid, GridItem, TextFields } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

import { getFieldOption } from '../../../utils/getFieldOption';

interface IKYMDeclaration {
  control: Control<any>;
}

const details = ['Citizen', 'Permanent Resident', 'Resident'];
const booleanList = [
  {
    label: 'Yes',
    value: 'yes',
  },
  {
    label: 'No',
    value: 'no',
  },
];

export const KYMDeclaration = () => {
  const { t } = useTranslation();
  const { watch } = useFormContext();
  const { data: familyRelationShipData, isLoading: familyRelationshipLoading } =
    useGetIndividualKymOptionsQuery({
      filter: {
        customId: Kym_Field_Custom_Id.Relationship,
      },
    });
  const {
    data: foreignEmploymentOptions,
    isLoading: foreignEmploymentOptionsLoading,
  } = useGetIndividualKymOptionsQuery({
    filter: { customId: Kym_Field_Custom_Id.ForeignEmploymentOptions },
  });

  const hasBeneficialOwner = watch('hasBeneficialOwner');

  return (
    <GroupContainer>
      <Box
        display="flex"
        flexDirection="column"
        gap="s16"
        id="Next to Kin"
        scrollMarginTop={'200px'}
      >
        <TextFields variant="bodyRegular" fontWeight={600}>
          {t['kynIndNominee']}
        </TextFields>
        <ContainerWithDivider>
          <Box
            id="kymAccIndBeneficialOwner"
            scrollMarginTop={'200px'}
            display="flex"
            flexDirection="column"
            gap="s32"
          >
            <FormSwitchTab
              label={t['kynIndDoyouhavebeneficialowner']}
              options={booleanList}
              name="hasBeneficialOwner"
            />
            {hasBeneficialOwner === 'yes' && (
              <Grid
                gap={2}
                templateColumns="repeat(3,1fr)"
                alignItems="last baseline"
              >
                <GridItem colSpan={1}>
                  <FormSelect
                    name={'beneficialRelationshipId'}
                    isLoading={familyRelationshipLoading}
                    options={getFieldOption(familyRelationShipData)}
                    placeholder={t['kynIndRelationship']}
                    label={t['kynIndIyespleasewritenameandrelationship']}
                  />
                </GridItem>

                <GridItem mt="20px" colSpan={2}>
                  <FormInput
                    type="text"
                    id="beneficialFullName"
                    name={'beneficialFullName'}
                    label=" "
                    placeholder={t['kynIndFullName']}
                  />
                </GridItem>
              </Grid>
            )}
          </Box>

          <Box
            id="kymAccIndFamilymembersinpolitics"
            scrollMarginTop={'200px'}
            display="flex"
            flexDirection="column"
            gap="s32"
          >
            <FormSwitchTab
              label={t['kynIndPoliticallyexposedperson']}
              options={booleanList}
              name="isPoliticallyExposed"
            />

            <InputGroupContainer>
              <Box display="flex" flexDirection="column">
                <FormTextArea
                  name="politicallyExposedDetails"
                  id="politicallyExposedDetails"
                  label={t['kynIndPleasespecify']}
                  placeholder={t['kynIndEnterDetails']}
                />
              </Box>
            </InputGroupContainer>
          </Box>

          <Box
            id="kymAccIndConvictedNonconvictedStatus"
            scrollMarginTop={'200px'}
            display="flex"
            flexDirection="column"
            gap="s32"
          >
            <FormSwitchTab
              label={t['kynIndDeclarationofconvicted']}
              options={booleanList}
              name="isConvicted"
            />

            <InputGroupContainer>
              <Box display="flex" flexDirection="column">
                <FormTextArea
                  name="convictedDetails"
                  id="convictedDetails"
                  label={t['kynIndPleasespecify']}
                  placeholder={t['kynIndEnterDetails']}
                />
              </Box>
            </InputGroupContainer>
          </Box>

          <Box
            id="kymAccIndResidentialpermitofforeigncountry"
            scrollMarginTop={'200px'}
            display="flex"
            flexDirection="column"
            gap="s32"
          >
            <FormSwitchTab
              label={t['kynIndForeignCountry']}
              options={booleanList}
              name="hasForeignResidentialPermit"
            />

            <Box display="flex" flexDirection="column">
              <FormRadioGroup
                name="foreignResidentialPermitTypeId"
                label={t['kynIndSpecifyfollowingdetails']}
                options={getFieldOption(foreignEmploymentOptions)}
                labelFontSize="s3"
              />
            </Box>
          </Box>
        </ContainerWithDivider>
      </Box>
    </GroupContainer>
  );
};
