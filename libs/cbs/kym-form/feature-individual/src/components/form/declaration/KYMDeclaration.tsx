import React from 'react';
import { Control } from 'react-hook-form';

import {
  ContainerWithDivider,
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import {
  Kym_Field_Custom_Id,
  useGetIndividualKymOptionQuery,
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
    value: 'Yes',
  },
  {
    label: 'No',
    value: 'No',
  },
];

export const KYMDeclaration = () => {
  const { t } = useTranslation();
  const { data: familyRelationShipData, isLoading: familyRelationshipLoading } =
    useGetIndividualKymOptionQuery({
      fieldName: 'family_relationship',
    });
  const {
    data: foreignEmploymentOptions,
    isLoading: foreignEmploymentOptionsLoading,
  } = useGetIndividualKymOptionsQuery({
    filter: { customId: Kym_Field_Custom_Id.ForeignEmploymentOptions },
  });

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
              name="beneficialOwner"
            />
            <Grid
              gap={2}
              templateColumns="repeat(3,1fr)"
              alignItems="last baseline"
            >
              <GridItem colSpan={1}>
                <FormSelect
                  name={'beneficialRelationShipId'}
                  isLoading={familyRelationshipLoading}
                  options={getFieldOption(familyRelationShipData)}
                  placeholder={t['kynIndRelationship']}
                  label={t['kynIndIyespleasewritenameandrelationship']}
                />
              </GridItem>

              <GridItem mt="20px" colSpan={2}>
                <FormInput
                  type="text"
                  id="fullName"
                  name="fullName"
                  label=" "
                  placeholder={t['kynIndFullName']}
                />
              </GridItem>
            </Grid>
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
              name="politicallyExposedPerson"
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
              name="declarationOfConvicted"
            />

            <InputGroupContainer>
              <Box display="flex" flexDirection="column">
                <FormTextArea
                  name="convictionDetails"
                  id="convictionDetails"
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
              name="residentForeign"
            />

            <Box display="flex" flexDirection="column">
              {/* TODO CHANGE THIS NAME */}
              <FormRadioGroup
                id="foreignEmployment"
                name="residentForeignDetails"
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
