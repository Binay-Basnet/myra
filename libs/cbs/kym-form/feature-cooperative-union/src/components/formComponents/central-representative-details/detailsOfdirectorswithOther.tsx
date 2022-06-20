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
  FormFileInput,
  FormInput,
  FormRadioGroup,
  FormSelect,
  FormSwitch,
} from '@coop/shared/form';
import {
  KymIndMemberInput,
  useAllAdministrationQuery,
} from '@coop/shared/data-access';
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

export const AddRepresentative = ({ watch, control }) => {
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
  const direcctorArray = directorList.map((a) => a?.fullName);

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
                    label="Full Name"
                    placeholder="Enter Full Name"
                  />
                  <FormInput
                    type="text"
                    name={`centralRepresentativeDetails.designation`}
                    label="Designation"
                    placeholder="Enter Designation"
                  />
                </InputGroupContainer>
              </AccordianContainer>

              <AccordianContainer>
                <Text fontSize="r1" fontWeight="SemiBold">
                  Permanent Address
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
                    label="State"
                    placeholder="Select State"
                    options={province}
                  />
                  <FormSelect
                    name={`centralRepresentativeDetails.permanentDistrictId`}
                    label="District"
                    placeholder="Select District"
                    options={districtList.map((d) => ({
                      label: d.name,
                      value: d.id,
                    }))}
                  />
                  <FormSelect
                    name={`centralRepresentativeDetails.permanentVdcOrMunicId`}
                    label="VDC / Municipality"
                    placeholder="Select VDC / Municipality"
                    options={localityList.map((d) => ({
                      label: d.name,
                      value: d.id,
                    }))}
                  />
                  <FormInput
                    type="number"
                    name={`centralRepresentativeDetails.permanentWardId`}
                    label="Ward No"
                    placeholder="Enter Ward No"
                  />
                  <FormInput
                    type="text"
                    name={`centralRepresentativeDetails.permanentLocality`}
                    label="Locality"
                    placeholder="Enter Locality"
                  />
                </InputGroupContainer>

                <Button
                  alignSelf="start"
                  leftIcon={<Icon size="md" as={FaMap} />}
                >
                  Pin on Map
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
                  Temporary Address
                </Text>

                <FormSwitch
                  control={control}
                  name="isPermanentAndTemporaryAddressSame"
                  label="Temporary Address same as permanent"
                />

                <InputGroupContainer>
                  <FormSelect
                    name={`centralRepresentativeDetails.temporaryStateId`}
                    label="State"
                    placeholder="Select State"
                    options={province}
                  />
                  <FormSelect
                    name={`centralRepresentativeDetails.temporaryDistrictId`}
                    label="District"
                    placeholder="Select District"
                    options={districtTempList.map((d) => ({
                      label: d.name,
                      value: d.id,
                    }))}
                  />
                  <FormSelect
                    name={`centralRepresentativeDetails.temporaryVdcOrMunicId`}
                    label="VDC / Muncipality"
                    placeholder="Select VDC / Muncipality"
                    options={localityTempList.map((d) => ({
                      label: d.name,
                      value: d.id,
                    }))}
                  />
                  <FormInput
                    type="number"
                    name={`centralRepresentativeDetails.temporaryWardId`}
                    label="Ward No"
                    placeholder="Enter Ward No"
                  />
                  <FormInput
                    type="text"
                    name={`centralRepresentativeDetails.temporaryLocality`}
                    label="Locality"
                    placeholder="Enter Locality"
                  />
                </InputGroupContainer>
                <Button
                  mt="-16px"
                  alignSelf="start"
                  leftIcon={<Icon size="md" as={FaMap} />}
                >
                  Pin on Map
                </Button>
              </Box>
              <InputGroupContainer>
                <FormInput
                  type="date"
                  name={`centralRepresentativeDetails.dateOfMembership`}
                  label="Date of membership"
                  placeholder="DD-MM-YYYY"
                />
                <FormInput
                  type="text"
                  name={`centralRepresentativeDetails.highestQualification`}
                  label="Highest Qualification"
                  placeholder="Enter higest qualification"
                />
                <FormInput
                  type="number"
                  name={`centralRepresentativeDetails.contactNumber`}
                  label="Mobile No"
                  placeholder="Enter Mobile No"
                />
                <FormInput
                  type="text"
                  name={`centralRepresentativeDetails.email`}
                  label="Email"
                  placeholder="Enter Email"
                />
                <FormInput
                  type="string"
                  name={`centralRepresentativeDetails.citizenshipOrPassportOrLisenceNo`}
                  label="Citizenship/Passport/Driving License No."
                  placeholder="Enter No"
                />
              </InputGroupContainer>
              <Text fontSize="r1" fontWeight="SemiBold">
                Training related to Co-operatives
              </Text>
              <InputGroupContainer>
                <FormInput
                  type="text"
                  name={`centralRepresentativeDetails.subjectOfTraining`}
                  label="Subject of Training"
                  placeholder="Enter Subject of Training"
                />
                <FormInput
                  type="date"
                  name={`centralRepresentativeDetails.dateOfTraining`}
                  label="Date of training"
                  placeholder="Enter date of Training"
                />
                <FormInput
                  type="number"
                  name={`centralRepresentativeDetails.trainingOrganization`}
                  label="Training Organization"
                  placeholder="Enter Training Organization"
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
                    label="Photograph"
                    // control={control}
                    name={`centralRepresentativeDetails.photograph`}
                  />
                </Box>
                <Box display={'flex'} flexDirection="column" gap={'s8'}>
                  <Text fontSize={'s3'} fontWeight="500">
                    Photograph of identity proof document
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
                    label="Specimen Signature"
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
