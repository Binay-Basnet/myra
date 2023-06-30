import { useFormContext, useWatch } from 'react-hook-form';

import { Box, FormSection, Grid, GridItem, Text } from '@myra-ui';

import {
  GroupContainer,
  InputGroupContainer,
  SectionContainer,
} from '@coop/cbs/kym-form/ui-containers';
import {
  FormAddress,
  FormDatePicker,
  FormFileInput,
  FormInput,
  FormRadioGroup,
  FormSwitch,
} from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

import { CentralRepresentativeTraining } from './CentralRepresentativeTraining';
import { CustomCoopUnionInstitutionInformationInput } from '../../../types';

const CRDirectorsSelection = () => {
  const { t } = useTranslation();

  const { control } = useFormContext<CustomCoopUnionInstitutionInformationInput>();
  const { notAmongDirectors, directors } = useWatch<CustomCoopUnionInstitutionInformationInput>({
    control,
  });

  return (
    <GroupContainer>
      {!notAmongDirectors && (
        <FormRadioGroup
          name="centralRepresentativeDirectorIndex"
          options={
            directors?.map((director, index) => ({
              label: director.fullName,
              value: String(index),
            })) ?? []
          }
          orientation="vertical"
          size="md"
          label={t['kymCoopUnionSelectCentralRepresentativeamongDirectors']}
        />
      )}

      <FormSwitch
        id="centralRepresentativeDetails"
        name="notAmongDirectors"
        label={t['kymCoopUnionCRNotDir']}
      />
    </GroupContainer>
  );
};

export const AddRepresentative = () => {
  const { t } = useTranslation();

  const { watch } = useFormContext<CustomCoopUnionInstitutionInformationInput>();

  const notAmongDirectors = watch('notAmongDirectors');

  const isPermanentAndTemporaryAddressSame = watch(
    'centralRepresentative.isPermanentAndTemporaryAddressSame'
  );

  return (
    <FormSection id="kymCoopUnionAccDetailsofdirectorsaffiliatedwithotherFirms">
      <GridItem colSpan={3}>
        <CRDirectorsSelection />
      </GridItem>

      <GridItem colSpan={3}>
        {notAmongDirectors && (
          <Box display="flex" alignItems="center">
            <Box>
              <SectionContainer>
                <SectionContainer gap="s20">
                  <InputGroupContainer>
                    <FormInput
                      isRequired
                      type="text"
                      name="centralRepresentative.fullName"
                      id="centralRepresentative.fullName"
                      label={t['kymCoopUnionDirFullName']}
                    />
                    <FormInput
                      isRequired
                      type="text"
                      name="centralRepresentative.designationEn"
                      id="centralRepresentative.designationEn"
                      label={t['kymCoopUnionDirDesignation']}
                    />
                  </InputGroupContainer>

                  <Text fontSize="r1" fontWeight="SemiBold">
                    {t['kymCoopUnionDirPermanentAddress']}
                  </Text>
                  <InputGroupContainer>
                    <FormAddress name="centralRepresentative.permanentAddress" />
                  </InputGroupContainer>

                  <Box
                    id="Temporary Address"
                    gap="s16"
                    display="flex"
                    flexDirection="column"
                    scrollMarginTop="200px"
                  >
                    <Text fontSize="r1" fontWeight="SemiBold">
                      {t['kymCoopUnionDirTemporaryAddress']}
                    </Text>

                    <FormSwitch
                      id="centralRepresentative.isPermanentAndTemporaryAddressSame"
                      name="centralRepresentative.isPermanentAndTemporaryAddressSame"
                      label={t['kymCoopUnionDirTemporaryAddressPermanent']}
                    />

                    {!isPermanentAndTemporaryAddressSame && (
                      <InputGroupContainer>
                        <FormAddress name="centralRepresentative.temporaryAddress" />
                      </InputGroupContainer>
                    )}
                  </Box>
                  <InputGroupContainer>
                    <FormDatePicker
                      name="centralRepresentative.dateOfMembership"
                      id="centralRepresentative.dateOfMembership"
                      label={t['kymCoopUnionDirDateofMembership']}
                    />
                    <FormInput
                      type="text"
                      name="centralRepresentative.highestQualification"
                      id="centralRepresentative.highestQualification"
                      label={t['kymCoopUnionDirHighestQualification']}
                    />
                    <FormInput
                      isRequired
                      type="number"
                      name="centralRepresentative.mobileNumber"
                      id="centralRepresentative.mobileNumber"
                      label={t['kymCoopUnionDirMobileNo']}
                    />
                    <FormInput
                      isRequired
                      type="text"
                      name="centralRepresentative.email"
                      id="centralRepresentative.email"
                      label={t['kymCoopUnionDirEmail']}
                    />
                    <FormInput
                      type="string"
                      name="centralRepresentative.citizenshipNo"
                      id="centralRepresentative.citizenshipNo"
                      label={t['kymCoopUnionDirCitizenshipPassportDrivingLicenseNo']}
                    />

                    <FormInput
                      type="string"
                      name="centralRepresentative.panNo"
                      id="centralRepresentative.panNo"
                      label={t['kymCoopUnionPANNo']}
                    />
                  </InputGroupContainer>

                  <CentralRepresentativeTraining />
                </SectionContainer>

                <Grid templateColumns="repeat(2, 1fr)" gap="s32" mt="s20">
                  <Box w="124px">
                    <FormFileInput
                      size="md"
                      label={t['kymCoopUnionDirPhotograph']}
                      name="centralRepresentative.documents.0.identifiers"
                    />
                  </Box>
                  <Box display="flex" flexDirection="column" gap="s8">
                    <Text fontSize="s3" fontWeight="500">
                      {t['kymCoopUnionDirPhotographOfIdentityProofDocument']}
                    </Text>
                    <Box w="124px">
                      <FormFileInput
                        size="md"
                        name="centralRepresentative.documents.1.identifiers"
                      />
                    </Box>
                  </Box>

                  <Box display="flex" flexDirection="column" gap="s8">
                    <Text fontSize="s3" fontWeight="500">
                      {t['kymCoopUnionDirSpecimenSignature']}
                    </Text>
                    <Box w="124px">
                      <FormFileInput
                        size="md"
                        name="centralRepresentative.documents.2.identifiers"
                      />
                    </Box>
                  </Box>

                  <Box display="flex" flexDirection="column" gap="s8">
                    <Text fontSize="s3" fontWeight="500">
                      {t['kymCoopUnionCRDecisionDocument']}
                    </Text>
                    <Box w="124px">
                      <FormFileInput
                        size="md"
                        name="centralRepresentative.documents.3.identifiers"
                      />
                    </Box>
                  </Box>
                </Grid>
              </SectionContainer>
            </Box>
          </Box>
        )}
      </GridItem>
    </FormSection>
  );
};
