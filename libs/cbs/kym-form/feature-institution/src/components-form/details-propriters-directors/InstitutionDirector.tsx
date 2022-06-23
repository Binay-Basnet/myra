import React, { useMemo, useState } from 'react';
import { Control, useFieldArray } from 'react-hook-form';
import {
  AiFillCloseCircle,
  AiOutlineCaretDown,
  AiOutlineCaretRight,
  AiOutlinePlus,
} from 'react-icons/ai';
import { FaMap } from 'react-icons/fa';
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

const AddDirector = ({ watch, index, control, removeDirector }) => {
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

  // FOR PERMANENT ADDRESS
  const currentProvinceId = watch('permanentStateId');
  const currentDistrictId = watch('permanentDistrictId');

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
  const currentTempProvinceId = watch('temporaryStateId');
  const currentTemptDistrictId = watch('temporaryDistrictId');

  const districtTempList = useMemo(
    () =>
      data?.administration.all.find((d) => d.id === currentProvinceId)
        ?.districts ?? [],
    [currentTempProvinceId]
  );

  const localityTempList = useMemo(
    () =>
      districtList.find((d) => d.id === currentDistrictId)?.municipalities ??
      [],
    [currentTemptDistrictId]
  );

  const isPermanentAndTemporaryAddressSame = watch(
    'isPermanentAndTemporaryAddressSame'
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
                icon={<AiOutlineCaretDown />}
              />
            ) : (
              <IconButton
                size="xs"
                variant={'ghost'}
                aria-label="close"
                icon={<AiOutlineCaretRight />}
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
        <SectionContainer mt="0">
          <AccordianContainer>
            <InputGroupContainer>
              <FormInput
                type="text"
                name={`detailsOfDirectors.${index}.fullName`}
                label={t['kymInsFullName']}
                placeholder={t['kymInsEnterFullName']}
              />
              <FormInput
                type="text"
                name={`detailsOfDirectors.${index}.designation`}
                label={t['kymInsDesignation']}
                placeholder={t['kymInsEnterDesignation']}
              />
            </InputGroupContainer>
          </AccordianContainer>

          <AccordianContainer>
            <Text fontSize="r1" fontWeight="SemiBold">
              {t['kymInsPermanentAddress']}
            </Text>
            {/* <Box
              id="Permanent Address"
              gap="s32"
              display={'flex'}
              flexDirection="column"
            > */}
            <InputGroupContainer>
              <FormSelect
                name={`detailsOfDirectors.${index}.permanentState`}
                label={t['kymInsState']}
                placeholder={t['kymInsSelectState']}
                options={province}
              />
              <FormSelect
                name={`detailsOfDirectors.${index}.permanentDistrict`}
                label={t['kymInsDistrict']}
                placeholder={t['kymInsSelectDistrict']}
                options={districtList.map((d) => ({
                  label: d.name,
                  value: d.id,
                }))}
              />
              <FormSelect
                name={`detailsOfDirectors.${index}.permanentMunicipality`}
                label={t['kymInsVDCMunicipality']}
                placeholder={t['kymInsSelectVDCMunicipality']}
                options={localityList.map((d) => ({
                  label: d.name,
                  value: d.id,
                }))}
              />
              <FormInput
                type="number"
                name={`detailsOfDirectors.${index}.permanentWardNo`}
                label={t['kymInsWardNo']}
                placeholder={t['kymInsEnterWardNo']}
              />
              <FormInput
                type="text"
                name={`detailsOfDirectors.${index}.permanentLocality`}
                label={t['kymInsLocality']}
                placeholder={t['kymInsEnterLocality']}
              />
            </InputGroupContainer>

            <Button alignSelf="start" leftIcon={<Icon size="md" as={FaMap} />}>
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
              {t['kymInsTemporaryAddress']}
            </Text>

            <FormSwitch
              control={control}
              name="isPermanentAndTemporaryAddressSame"
              label={t['kymInsTemporaryAddressPermanent']}
            />

            {/* {!isPermanentAndTemporaryAddressSame && (
              <> */}
            <InputGroupContainer>
              <FormSelect
                name={`detailsOfDirectors.${index}.temporaryState`}
                label={t['kymInsState']}
                placeholder={t['kymInsSelectState']}
                options={province}
              />
              <FormSelect
                name={`detailsOfDirectors.${index}.temporaryDistrict`}
                label={t['kymInsDistrict']}
                placeholder={t['kymInsSelectDistrict']}
                options={districtTempList.map((d) => ({
                  label: d.name,
                  value: d.id,
                }))}
              />
              <FormSelect
                name={`detailsOfDirectors.${index}.temporaryMunicipality`}
                label={t['kymInsVDCMunicipality']}
                placeholder={t['kymInsSelectVDCMunicipality']}
                options={localityTempList.map((d) => ({
                  label: d.name,
                  value: d.id,
                }))}
              />
              <FormInput
                type="number"
                name={`detailsOfDirectors.${index}.temporaryWardNo`}
                label={t['kymInsWardNo']}
                placeholder={t['kymInsEnterWardNo']}
              />
              <FormInput
                type="text"
                name={`detailsOfDirectors.${index}.temporaryLocality`}
                label={t['kymInsLocality']}
                placeholder={t['kymInsEnterLocality']}
              />
            </InputGroupContainer>
            <Button
              mt="-16px"
              alignSelf="start"
              leftIcon={<Icon size="md" as={FaMap} />}
            >
              {t['pinOnMap']}
            </Button>
            {/* </>
            )} */}
          </Box>
          <InputGroupContainer>
            <FormInput
              type="date"
              name={`detailsOfDirectors.${index}.dateOfMembership`}
              label={t['kymInsDateOfMembership']}
              placeholder="DD-MM-YYYY"
            />
            <FormInput
              type="text"
              name={`detailsOfDirectors.${index}.highestQualification`}
              label={t['kymInsHighestQualification']}
              placeholder={t['kymInsEnterHigestQualification']}
            />
            <FormInput
              type="number"
              name={`detailsOfDirectors.${index}.mobileNo`}
              label={t['kymInsMobileNo']}
              placeholder={t['kymInsEnterMobileNo']}
            />
            <FormInput
              type="text"
              name={`detailsOfDirectors.${index}.emailAddress`}
              label={t['kymInsEmail']}
              placeholder={t['kymInsEnterEmail']}
            />
            <FormInput
              type="string"
              name={`detailsOfDirectors.${index}.documentNo`}
              label={t['kymInsCitizenshipPassportDrivingLicenseNo']}
              placeholder={t['kymInsEnterNo']}
            />
          </InputGroupContainer>
          {/* <Text fontSize="r1" fontWeight="SemiBold">
            Training related to Co-operatives
          </Text>
          <InputGroupContainer>
            <FormInput
              type="text"
              name={`detailsOfDirectors.${index}.subjectOfTraining`}
              label="Subject of Training"
              placeholder="Enter Subject of Training"
            />
            <FormInput
              type="date"
              name={`detailsOfDirectors.${index}.dateOfTraining`}
              label="Date of training"
              placeholder="Enter date of Training"
            />
            <FormInput
              type="number"
              name={`detailsOfDirectors.${index}.trainingOrganization`}
              label="Training Organization"
              placeholder="Enter Training Organization"
            />
          </InputGroupContainer> */}
          <Grid templateColumns="repeat(2, 1fr)" rowGap="s32" columnGap="s20">
            <FormFileInput
              size="lg"
              label={t['kymInsPhotograph']}
              // control={control}
              name={`detailsOfDirectors.${index}.photograph`}
            />
            <FormFileInput
              size="lg"
              label={t['kymInsPhotographOfIdentityProofDocument']}
              // control={control}
              name={`detailsOfDirectors.${index}.documentPhotograph`}
            />
          </Grid>
        </SectionContainer>
      </Collapse>
      {/* </DynamicBoxGroupContainer> */}
    </>
  );
};

export const BoardDirectorInfo = ({ watch, control }) => {
  const { t } = useTranslation();
  const {
    fields: directorFields,
    append: directorAppend,
    remove: directorRemove,
  } = useFieldArray({ control, name: 'detailsOfDirectors' });
  return (
    <GroupContainer
      id="Details of Proprietor, Partners, Directors."
      scrollMarginTop={'200px'}
    >
      <Text fontSize="r1" fontWeight="SemiBold">
        {t['kymInsDetailsofProprietorPartnersDirectors']}
      </Text>
      {directorFields.map((item, index) => {
        return (
          <Box key={item.id} display="flex" flexDirection={'column'} gap="s16">
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
        id="addDirectorButton"
        alignSelf="start"
        leftIcon={<Icon size="md" as={AiOutlinePlus} />}
        variant="outline"
        onClick={() => {
          directorAppend({});
        }}
      >
        {t['kymInsAddDirector']}
      </Button>
    </GroupContainer>
  );
};
