import React, { useMemo, useState } from 'react';
import { Control, useFieldArray } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { FaMap } from 'react-icons/fa';
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';
import { CloseIcon } from '@chakra-ui/icons';
import { useTranslation } from '@coop/shared/utils';

import {
  AccordianContainer,
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
  FormSelect,
  FormSwitch,
} from '@coop/shared/form';
import { useAllAdministrationQuery } from '@coop/shared/data-access';
import {
  Box,
  Button,
  Collapse,
  Grid,
  Icon,
  IconButton,
  Text,
} from '@coop/shared/ui';

const AddDirector = ({ watch, index, control, removeDirector }) => {
  const { t } = useTranslation();
  const { data } = useAllAdministrationQuery();

  const [temporaryAddress, setTemporaryAddress] = useState(false);
  const [isOpen, setIsOpen] = React.useState(true);

  // FOR PERMANENT ADDRESS
  const currentProvinceId = watch(
    `boardOfDirectorsDetails.${index}.permanentStateId`
  );
  const currentDistrictId = watch(
    `boardOfDirectorsDetails.${index}.permanentDistrictId`
  );

  // FOR TEMPORARY ADDRESS
  const currentTempProvinceId = watch(
    `boardOfDirectorsDetails.${index}.temporaryStateId`
  );
  const currentTemptDistrictId = watch(
    `boardOfDirectorsDetails.${index}.temporaryDistrictId`
  );

  const province = useMemo(() => {
    return (
      data?.administration?.all?.map((d) => ({
        label: d.name,
        value: d.id,
      })) ?? []
    );
  }, [data?.administration?.all]);

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
  return (
    <>
      <Box display="flex" alignItems="center">
        <Box
          flex={1}
          px={2}
          py={3}
          bg="gray.200"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          cursor={'pointer'}
          onClick={() => setIsOpen(!isOpen)}
        >
          <Text fontSize="r1">{`Director ${index + 1}`}</Text>
          <Box>
            {isOpen ? (
              <IconButton
                size="xs"
                variant={'ghost'}
                aria-label="close"
                icon={<IoChevronUpOutline />}
              />
            ) : (
              <IconButton
                size="xs"
                variant={'ghost'}
                aria-label="close"
                icon={<IoChevronDownOutline />}
              />
            )}
          </Box>
        </Box>
        {!isOpen && (
          <IconButton
            size="sm"
            variant={'ghost'}
            aria-label="close"
            icon={<CloseIcon />}
            ml="s16"
            onClick={removeDirector}
          />
        )}
      </Box>

      {/* <DynamicBoxGroupContainer> */}
      <Collapse in={isOpen} style={{ marginTop: '0px' }}>
        <DynamicBoxGroupContainer>
          <SectionContainer>
            <AccordianContainer>
              <InputGroupContainer>
                <FormInput
                  type="text"
                  name={`boardOfDirectorsDetails.${index}.fullName`}
                  label={t['kymCoopUnionFullName']}
                  placeholder={t['kymCoopUnionEnterFullName']}
                />
                <FormInput
                  type="text"
                  name={`boardOfDirectorsDetails.${index}.designation`}
                  label={t['kymCoopUnionDesignation']}
                  placeholder={t['kymCoopUnionEnterDesignation']}
                />
              </InputGroupContainer>
            </AccordianContainer>

            <AccordianContainer>
              <Text fontSize="r1" fontWeight="SemiBold">
                {t['kymCoopUnionPermanentAddress']}
              </Text>
              {/* <Box
              id="Permanent Address"
              gap="s32"
              display={'flex'}
              flexDirection="column"
            > */}
              <InputGroupContainer>
                <FormSelect
                  name={`boardOfDirectorsDetails.${index}.permanentStateId`}
                  label={t['kymCoopUnionState']}
                  placeholder={t['kymCoopUnionSelectState']}
                  options={province}
                />
                <FormSelect
                  name={`boardOfDirectorsDetails.${index}.permanentDistrictId`}
                  label={t['kymCoopUnionDistrict']}
                  placeholder={t['kymCoopUnionSelectDistrict']}
                  options={districtList.map((d) => ({
                    label: d.name,
                    value: d.id,
                  }))}
                />
                <FormSelect
                  name={`boardOfDirectorsDetails.${index}.permanentVdcOrMunicId`}
                  label={t['kymCoopUnionVDCMunicipality']}
                  placeholder={t['kymCoopUnionSelectVDCMunicipality']}
                  options={localityList.map((d) => ({
                    label: d.name,
                    value: d.id,
                  }))}
                />
                <FormInput
                  type="number"
                  name={`boardOfDirectorsDetails.${index}.permanentWardId`}
                  label={t['kymCoopUnionWardNo']}
                  placeholder={t['kymCoopUnionEnterWardNo']}
                />
                <FormInput
                  type="text"
                  name={`boardOfDirectorsDetails.${index}.permanentLocality`}
                  label={t['kymCoopUnionLocality']}
                  placeholder={t['kymCoopUnionEnterLocality']}
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
                {t['kymCoopUnionTemporaryAddress']}
              </Text>

              <FormSwitch
                control={control}
                name="isPermanentAndTemporaryAddressSame"
                label={t['kymCoopUnionTemporaryAddressPermanent']}
              />

              <InputGroupContainer>
                <FormSelect
                  name={`boardOfDirectorsDetails.${index}.temporaryStateId`}
                  label={t['kymCoopUnionState']}
                  placeholder={t['kymCoopUnionSelectState']}
                  options={province}
                />
                <FormSelect
                  name={`boardOfDirectorsDetails.${index}.temporaryDistrictId`}
                  label={t['kymCoopUnionDistrict']}
                  placeholder={t['kymCoopUnionSelectDistrict']}
                  options={districtTempList.map((d) => ({
                    label: d.name,
                    value: d.id,
                  }))}
                />
                <FormSelect
                  name={`boardOfDirectorsDetails.${index}.temporaryVdcOrMunicId`}
                  label={t['kymCoopUnionVDCMunicipality']}
                  placeholder={t['kymCoopUnionSelectVDCMunicipality']}
                  options={localityTempList.map((d) => ({
                    label: d.name,
                    value: d.id,
                  }))}
                />
                <FormInput
                  type="number"
                  name={`boardOfDirectorsDetails.${index}.temporaryWardId`}
                  label={t['kymCoopUnionWardNo']}
                  placeholder={t['kymCoopUnionEnterWardNo']}
                />
                <FormInput
                  type="text"
                  name={`boardOfDirectorsDetails.${index}.temporaryLocality`}
                  label={t['kymCoopUnionLocality']}
                  placeholder={t['kymCoopUnionEnterLocality']}
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
                name={`boardOfDirectorsDetails.${index}.dateOfMembership`}
                label={t['kymCoopUnionDateOfMembership']}
                placeholder="DD-MM-YYYY"
              />
              <FormInput
                type="text"
                name={`boardOfDirectorsDetails.${index}.highestQualification`}
                label={t['kymCoopUnionHighestQualification']}
                placeholder={t['kymCoopUnionEnterHigestQualification']}
              />
              <FormInput
                type="number"
                name={`boardOfDirectorsDetails.${index}.contactNumber`}
                label={t['kymCoopUnionMobileNo']}
                placeholder={t['kymCoopUnionEnterMobileNo']}
              />
              <FormInput
                type="text"
                name={`boardOfDirectorsDetails.${index}.email`}
                label={t['kymCoopUnionEmail']}
                placeholder={t['kymCoopUnionEnterEmail']}
              />
              <FormInput
                type="string"
                name={`boardOfDirectorsDetails.${index}.citizenshipOrPassportOrLisenceNo`}
                label={t['kymCoopUnionCitizenshipPassportDrivingLicenseNo']}
                placeholder={t['kymCoopUnionEnterNo']}
              />
            </InputGroupContainer>
            <Text fontSize="r1" fontWeight="SemiBold">
              {t['kymCoopUnionTrainingRelatedToCoop']}
            </Text>
            <InputGroupContainer>
              <FormInput
                type="text"
                name={`boardOfDirectorsDetails.${index}.subjectOfTraining`}
                label={t['kymCoopUnionSubjectOfTraining']}
                placeholder={t['kymCoopUnionEnterSubjectOfTraining']}
              />
              <FormInput
                type="date"
                name={`boardOfDirectorsDetails.${index}.dateOfTraining`}
                label={t['kymCoopUnionDateOfTraining']}
                placeholder={t['kymCoopUnionEnterDateOfTraining']}
              />
              <FormInput
                type="number"
                name={`boardOfDirectorsDetails.${index}.trainingOrganization`}
                label={t['kymCoopUnionTrainingOrganization']}
                placeholder={t['kymCoopUnionEnterTrainingOrganization']}
              />
            </InputGroupContainer>
            <Grid templateColumns="repeat(2, 1fr)" rowGap="s32" columnGap="s20">
              <FormFileInput
                size="lg"
                label={t['kymCoopUnionPhotograph']}
                // control={control}
                name={`boardOfDirectorsDetails.${index}.photograph`}
              />
              <FormFileInput
                size="lg"
                label={t['kymCoopUnionPhotographOfIdentityProofDocument']}
                // control={control}
                name={`boardOfDirectorsDetails.${index}.identityDocumentPhoto`}
              />
            </Grid>
          </SectionContainer>
        </DynamicBoxGroupContainer>
      </Collapse>
      {/* </DynamicBoxGroupContainer> */}
    </>
  );
};

export const BoardDirectorInfo = ({ watch, control }) => {
  const {
    fields: directorFields,
    append: directorAppend,
    remove: directorRemove,
  } = useFieldArray({ control, name: 'boardOfDirectorsDetails' });
  const { t } = useTranslation();
  return (
    <GroupContainer id="Family Details" scrollMarginTop={'200px'}>
      <Text fontSize="r1" fontWeight="SemiBold">
        {t['kymCoopUnionBoardOfDirectorDetails']}
      </Text>
      {directorFields.map((item, index) => {
        return (
          <Box
            key={item.id}
            display="flex"
            flexDirection={'column'}
            gap="s16"
            id="Details of Proprietor, Partners, Directors."
            scrollMarginTop={'200px'}
          >
            <AddDirector
              watch={watch}
              index={index}
              control={control}
              removeDirector={() => directorRemove(index)}
            />
          </Box>
        );
      })}
      <Button
        id="directordetailsButton"
        alignSelf="start"
        leftIcon={<Icon size="md" as={AiOutlinePlus} />}
        variant="outline"
        onClick={() => {
          directorAppend({});
        }}
      >
        {t['kymCoopUnionAddDirector']}
      </Button>
    </GroupContainer>
  );
};
