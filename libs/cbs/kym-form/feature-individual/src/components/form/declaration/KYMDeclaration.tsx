import React from 'react';
import { Control } from 'react-hook-form';

import {
  ContainerWithDivider,
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { useGetIndividualKymOptionQuery } from '@coop/shared/data-access';
import {
  FormInput,
  FormRadioGroup,
  FormSelect,
  FormSwitchTab,
  FormTextArea,
} from '@coop/shared/form';
import { Box, Grid, GridItem, Text, TextFields } from '@coop/shared/ui';
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
  } = useGetIndividualKymOptionQuery({
    fieldName: 'foreign_employment_options',
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
            id="Beneficial Owner"
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
            id="Family members in politics"
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
            id="Convicted/Non-convicted Status"
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
            id="Residential permit of foreign country?"
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
                lanel={t['kynIndSpecifyfollowingdetails']}
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
