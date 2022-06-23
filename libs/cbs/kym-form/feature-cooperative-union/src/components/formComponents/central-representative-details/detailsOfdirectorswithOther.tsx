import React, { useMemo, useState } from 'react';
import { Control, useFieldArray } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { FaMap } from 'react-icons/fa';
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';
import { CloseIcon } from '@chakra-ui/icons';

import {
  AccordianContainer,
  DynamicBoxContainer,
  DynamicBoxGroupContainer,
  GroupContainer,
  InputGroupContainer,
  SectionContainer,
} from '@coop/cbs/kym-form/ui-containers';
import {
  KymIndMemberInput,
  useAllAdministrationQuery,
} from '@coop/shared/data-access';
import {
  FormFileInput,
  FormInput,
  FormRadioGroup,
  FormSelect,
  FormSwitch,
} from '@coop/shared/form';
import {
  Box,
  Button,
  Collapse,
  Grid,
  GridItem,
  Icon,
  IconButton,
  Text,
} from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const AddRepresentative = ({ watch, control }) => {
  const { t } = useTranslation();
  const { data } = useAllAdministrationQuery();

  const [temporaryAddress, setTemporaryAddress] = useState(false);
  const [isOpen, setIsOpen] = React.useState(true);

  const province = useMemo(() => {
    return (
      data?.administration?.all?.map((d) => ({
        label: d.name,
        value: d.id,
      })) ?? []
    );
  }, [data?.administration?.all]);
  const directorList = watch('boardOfDirectorsDetails');
  const direcctorArray = directorList?.map((a) => a?.fullName);

  // FOR PERMANENT ADDRESS
  const currentProvinceId = watch(
    'centralRepresentativeDetails.permanentStateId'
  );
  const currentDistrictId = watch(
    'centralRepresentativeDetails.permanentDistrictId'
  );

  const districtList = useMemo(
    () =>
      data?.administration.all.find((d) => d.id === currentProvinceId)
        ?.districts ?? [],
    [currentProvinceId]
  );

  const localityList = useMemo(
    () =>
      districtList.find((d) => d.id === currentDistrictId)?.municipalities ??
      [],
    [currentDistrictId]
  );

  // FOR TEMPORARY ADDRESS
  const currentTempProvinceId = watch(
    `centralRepresentativeDetails.temporaryStateId`
  );
  const currentTemptDistrictId = watch(
    'centralRepresentativeDetails.temporaryDistrictId'
  );

  const districtTempList = useMemo(
    () =>
      data?.administration.all.find((d) => d.id === currentTempProvinceId)
        ?.districts ?? [],
    [currentTempProvinceId]
  );

  const localityTempList = useMemo(
    () =>
      districtTempList.find((d) => d.id === currentTemptDistrictId)
        ?.municipalities ?? [],
    [currentTemptDistrictId]
  );
  const tab = watch('centralRepresentativeDetails.notAmongDirectors') ?? false;
  return (
    <>
      {!tab && (
        <Box
          display="flex"
          alignItems="flex-start"
          justifyContent="flex-start"
          flexDirection={'column'}
          px="s16"
        >
          <FormRadioGroup
            name="directorchoosing"
            radioList={direcctorArray}
            orientation="vertical"
            size={'md'}
          />
        </Box>
      )}
      <FormSwitch
        px={'s16'}
        name="centralRepresentativeDetails.notAmongDirectors"
        label="Central Representative is not among Directors"
      />
      {tab && (
        <Box display="flex" alignItems="center">
          {/* <DynamicBoxGroupContainer> */}

          <DynamicBoxGroupContainer
            id="Details of directors affiliated with other Firms"
            scrollMarginTop={'200px'}
          >
            <SectionContainer>
              <AccordianContainer>
                <InputGroupContainer>
                  <FormInput
                    type="text"
                    name={`centralRepresentativeDetails.fullName`}
                    label={t['kymCoopUnionDirFullName']}
                    placeholder={t['kymCoopUnionDirEnterFullName']}
                  />
                  <FormInput
                    type="text"
                    name={`centralRepresentativeDetails.designation`}
                    label={t['kymCoopUnionDirDesignation']}
                    placeholder={t['kymCoopUnionDirEnterDesignation']}
                  />
                </InputGroupContainer>
              </AccordianContainer>

              <AccordianContainer>
                <Text fontSize="r1" fontWeight="SemiBold">
                  {t['kymCoopUnionDirPermanentAddress']}
                </Text>
                {/* <Box
              id="Permanent Address"
              gap="s32"
              display={'flex'}
              flexDirection="column"
            > */}
                <InputGroupContainer>
                  <FormSelect
                    name={`centralRepresentativeDetails.permanentStateId`}
                    label={t['kymCoopUnionDirState']}
                    placeholder={t['kymCoopUnionDirSelectState']}
                    options={province}
                  />
                  <FormSelect
                    name={`centralRepresentativeDetails.permanentDistrictId`}
                    label={t['kymCoopUnionDirDistrict']}
                    placeholder={t['kymCoopUnionDirSelectDistrict']}
                    options={districtList.map((d) => ({
                      label: d.name,
                      value: d.id,
                    }))}
                  />
                  <FormSelect
                    name={`centralRepresentativeDetails.permanentVdcOrMunicId`}
                    label={t['kymCoopUnionDirVDCMunicipality']}
                    placeholder={t['kymCoopUnionDirSelectVDCMunicipality']}
                    options={localityList.map((d) => ({
                      label: d.name,
                      value: d.id,
                    }))}
                  />
                  <FormInput
                    type="number"
                    name={`centralRepresentativeDetails.permanentWardId`}
                    label={t['kymCoopUnionDirWardNo']}
                    placeholder={t['kymCoopUnionDirEnterWardNo']}
                  />
                  <FormInput
                    type="text"
                    name={`centralRepresentativeDetails.permanentLocality`}
                    label={t['kymCoopUnionDirLocality']}
                    placeholder={t['kymCoopUnionDirEnterLocality']}
                  />
                </InputGroupContainer>

                <Button
                  alignSelf="start"
                  leftIcon={<Icon size="md" as={FaMap} />}
                >
                  {t['pinOnMap']}
                </Button>
                {/* </Box> */}
              </AccordianContainer>

              <Box
                id="Temporary Address"
                gap="s32"
                display={'flex'}
                flexDirection="column"
                scrollMarginTop={'200px'}
              >
                <Text fontSize="r1" fontWeight="SemiBold">
                  {t['kymCoopUnionDirTemporaryAddress']}
                </Text>

                <FormSwitch
                  control={control}
                  name="isPermanentAndTemporaryAddressSame"
                  label={t['kymCoopUnionDirTemporaryAddressPermanent']}
                />

                <InputGroupContainer>
                  <FormSelect
                    name={`centralRepresentativeDetails.temporaryStateId`}
                    label={t['kymCoopUnionDirState']}
                    placeholder={t['kymCoopUnionDirSelectState']}
                    options={province}
                  />
                  <FormSelect
                    name={`centralRepresentativeDetails.temporaryDistrictId`}
                    label={t['kymCoopUnionDirDistrict']}
                    placeholder={t['kymCoopUnionDirSelectDistrict']}
                    options={districtTempList.map((d) => ({
                      label: d.name,
                      value: d.id,
                    }))}
                  />
                  <FormSelect
                    name={`centralRepresentativeDetails.temporaryVdcOrMunicId`}
                    label={t['kymCoopUnionDirVDCMunicipality']}
                    placeholder={t['kymCoopUnionDirSelectVDCMunicipality']}
                    options={localityTempList.map((d) => ({
                      label: d.name,
                      value: d.id,
                    }))}
                  />
                  <FormInput
                    type="number"
                    name={`centralRepresentativeDetails.temporaryWardId`}
                    label={t['kymCoopUnionDirWardNo']}
                    placeholder={t['kymCoopUnionDirEnterWardNo']}
                  />
                  <FormInput
                    type="text"
                    name={`centralRepresentativeDetails.temporaryLocality`}
                    label={t['kymCoopUnionDirLocality']}
                    placeholder={t['kymCoopUnionDirEnterLocality']}
                  />
                </InputGroupContainer>
                <Button
                  mt="-16px"
                  alignSelf="start"
                  leftIcon={<Icon size="md" as={FaMap} />}
                >
                  {t['pinOnMap']}
                </Button>
              </Box>
              <InputGroupContainer>
                <FormInput
                  type="date"
                  name={`centralRepresentativeDetails.dateOfMembership`}
                  label={t['kymCoopUnionDirDateofMembership']}
                  placeholder="DD-MM-YYYY"
                />
                <FormInput
                  type="text"
                  name={`centralRepresentativeDetails.highestQualification`}
                  label={t['kymCoopUnionDirHighestQualification']}
                  placeholder={t['kymCoopUnionDirEnterHigestQualification']}
                />
                <FormInput
                  type="number"
                  name={`centralRepresentativeDetails.contactNumber`}
                  label={t['kymCoopUnionDirMobileNo']}
                  placeholder={t['kymCoopUnionDirEnterMobileNo']}
                />
                <FormInput
                  type="text"
                  name={`centralRepresentativeDetails.email`}
                  label={t['kymCoopUnionDirEmail']}
                  placeholder={t['kymCoopUnionDirEnterEmail']}
                />
                <FormInput
                  type="string"
                  name={`centralRepresentativeDetails.citizenshipOrPassportOrLisenceNo`}
                  label={
                    t['kymCoopUnionDirCitizenshipPassportDrivingLicenseNo']
                  }
                  placeholder={t['keyCoopUnionDirEnterNo']}
                />
              </InputGroupContainer>
              <Text fontSize="r1" fontWeight="SemiBold">
                {t['kymCoopUnionDirTrainingRelatedtoCoop']}
              </Text>
              <InputGroupContainer>
                <FormInput
                  type="text"
                  name={`centralRepresentativeDetails.subjectOfTraining`}
                  label={t['kymCoopUnionDirSubjectOfTraining']}
                  placeholder={t['kymCoopUnionDirEnterSubjectOfTraining']}
                />
                <FormInput
                  type="date"
                  name={`centralRepresentativeDetails.dateOfTraining`}
                  label={t['kymCoopUnionDirDateOfTraining']}
                  placeholder={t['kymCoopUnionDirEnterDateOfTraining']}
                />
                <FormInput
                  type="number"
                  name={`centralRepresentativeDetails.trainingOrganization`}
                  label={t['kymCoopUnionDirTrainingOrganization']}
                  placeholder={t['kymCoopUnionDirEnterTrainingOrganization']}
                />
              </InputGroupContainer>
              <Grid
                templateColumns="repeat(2, 1fr)"
                rowGap="s32"
                columnGap="s20"
              >
                <Box w="124px">
                  <FormFileInput
                    size="md"
                    label={t['kymCoopUnionDirPhotograph']}
                    // control={control}
                    name={`centralRepresentativeDetails.photograph`}
                  />
                </Box>
                <Box display={'flex'} flexDirection="column" gap={'s8'}>
                  <Text fontSize={'s3'} fontWeight="500">
                    {t['kymCoopUnionDirPhotographOfIdentityProofDocument']}
                  </Text>
                  <Box w="124px">
                    <FormFileInput
                      size="md"
                      // control={control}
                      name={`centralRepresentativeDetails.identityDocumentPhoto`}
                    />
                  </Box>
                </Box>
              </Grid>
              <InputGroupContainer>
                <Box w="124px">
                  <FormFileInput
                    name={`centralRepresentativeDetails.signature`}
                    label={t['kymCoopUnionDirSpecimenSignature']}
                  />
                </Box>
              </InputGroupContainer>
            </SectionContainer>
          </DynamicBoxGroupContainer>
        </Box>
      )}
    </>
  );
};
