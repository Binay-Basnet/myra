import React, { useMemo, useState } from 'react';
import { Control, useFieldArray } from 'react-hook-form';
import { AiOutlinePlus } from 'react-icons/ai';
import { FaMap } from 'react-icons/fa';
import { CloseIcon } from '@chakra-ui/icons';
import {
  DynamicBoxContainer,
  DynamicBoxGroupContainer,
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import {
  FormFileInput,
  FormInput,
  FormSelect,
  FormSwitch,
} from '@coop/myra/components';
import {
  KymIndMemberInput,
  useAllAdministrationQuery,
} from '@coop/shared/data-access';
import { Box, Button, Grid, GridItem, Icon, Text } from '@coop/shared/ui';

const AddDirector = ({ watch, index }) => {
  const { data } = useAllAdministrationQuery();
  const [temporaryAddress, setTemporaryAddress] = useState(false);

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
  return (
    <DynamicBoxGroupContainer>
      <InputGroupContainer>
        <FormInput
          type="text"
          name={`boardOfDirectorsDetails.${index}.fullName`}
          label="Full Name"
          placeholder="Enter Full Name"
        />
        <FormInput
          type="text"
          name={`boardOfDirectorsDetails.${index}.designation`}
          label="Designation"
          placeholder="Enter Designation"
        />
      </InputGroupContainer>
      <Text fontSize="r1" fontWeight="SemiBold">
        Permanent Address
      </Text>
      <Box
        id="Permanent Address"
        gap="s32"
        display={'flex'}
        flexDirection="column"
      >
        <InputGroupContainer>
          <FormSelect
            name={`boardOfDirectorsDetails.${index}.permanentStateId`}
            label="State"
            placeholder="Select State"
            options={province}
          />
          <FormSelect
            name={`boardOfDirectorsDetails.${index}.permanentDistrictId`}
            label="District"
            placeholder="Select District"
            options={districtList.map((d) => ({
              label: d.name,
              value: d.id,
            }))}
          />
          <FormSelect
            name={`boardOfDirectorsDetails.${index}.permanentVdcOrMunicId`}
            label="VDC / Municipality"
            placeholder="Select VDC / Municipality"
            options={localityList.map((d) => ({
              label: d.name,
              value: d.id,
            }))}
          />
          <FormInput
            type="number"
            name={`boardOfDirectorsDetails.${index}.permanentWardId`}
            label="Ward No"
            placeholder="Enter Ward No"
          />
          <FormInput
            type="text"
            name={`boardOfDirectorsDetails.${index}.permanentLocality`}
            label="Locality"
            placeholder="Enter Locality"
          />
        </InputGroupContainer>

        <Button
          alignSelf="start"
          mt="-16px"
          leftIcon={<Icon size="md" as={FaMap} />}
        >
          Pin on Map
        </Button>
      </Box>
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
          name="isPermanentAndTemporaryAddressSame"
          label="Temporary Address same as permanent"
        />

        <InputGroupContainer>
          <FormSelect
            name={`boardOfDirectorsDetails.${index}.temporaryStateId`}
            label="State"
            placeholder="Select State"
            options={province}
          />
          <FormSelect
            name={`boardOfDirectorsDetails.${index}.temporaryDistrictId`}
            label="District"
            placeholder="Select District"
            options={districtTempList.map((d) => ({
              label: d.name,
              value: d.id,
            }))}
          />
          <FormSelect
            name={`boardOfDirectorsDetails.${index}.temporaryVdcOrMunicId`}
            label="VDC / Muncipality"
            placeholder="Select VDC / Muncipality"
            options={localityTempList.map((d) => ({
              label: d.name,
              value: d.id,
            }))}
          />
          <FormInput
            type="number"
            name={`boardOfDirectorsDetails.${index}.temporaryWardId`}
            label="Ward No"
            placeholder="Enter Ward No"
          />
          <FormInput
            type="text"
            name={`boardOfDirectorsDetails.${index}.temporaryLocality`}
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
          name={`boardOfDirectorsDetails.${index}.dateOfMembership`}
          label="Date of membership"
          placeholder="DD-MM-YYYY"
        />
        <FormInput
          type="text"
          name={`boardOfDirectorsDetails.${index}.highestQualification`}
          label="Highest Qualification"
          placeholder="Enter higest qualification"
        />
        <FormInput
          type="number"
          name={`boardOfDirectorsDetails.${index}.contactNumber`}
          label="Mobile No"
          placeholder="Enter Mobile No"
        />
        <FormInput
          type="number"
          name={`boardOfDirectorsDetails.${index}.email`}
          label="Email"
          placeholder="Enter Email"
        />
        <FormInput
          type="number"
          name={`boardOfDirectorsDetails.${index}.citizenshipOrPassportOrLisenceNo`}
          label="Citizenship/Passport/Driving License No."
          placeholder="Enter No"
        />
      </InputGroupContainer>
      <Text fontSize="r1" fontWeight="SemiBold">
        Training related to Co-operatives
      </Text>
      <InputGroupContainer>
        <FormInput
          type="number"
          name={`boardOfDirectorsDetails.${index}.subjectOfTraining`}
          label="Subject of Training"
          placeholder="Enter Subject of Training"
        />
        <FormInput
          type="date"
          name={`boardOfDirectorsDetails.${index}.dateOfTraining`}
          label="Date of training"
          placeholder="Enter date of Training"
        />
        <FormInput
          type="number"
          name={`boardOfDirectorsDetails.${index}.trainingOrganization`}
          label="Training Organization"
          placeholder="Enter Training Organization"
        />
      </InputGroupContainer>
      <Grid templateColumns="repeat(2, 1fr)" rowGap="s32" columnGap="s20">
        <FormFileInput
          size="md"
          label="Photograph"
          // control={control}
          name={`boardOfDirectorsDetails.${index}.photograph`}
        />
        <FormFileInput
          size="md"
          label="Photograph of identity proof document"
          // control={control}
          name={`boardOfDirectorsDetails.${index}.identityDocumentPhoto`}
        />
      </Grid>
    </DynamicBoxGroupContainer>
  );
};

export const BoardDirectorInfo = ({ watch, control }) => {
  const {
    fields: directorFields,
    append: directorAppend,
    remove: directorRemove,
  } = useFieldArray({ control, name: 'boardOfDirectorsDetails' });
  return (
    <GroupContainer id="Family Details" scrollMarginTop={'200px'}>
      <Text fontSize="r1" fontWeight="SemiBold">
        Board of director details
      </Text>
      {directorFields.map((item, index) => {
        return (
          <Box key={item.id}>
            <AddDirector watch={watch} index={index} />
          </Box>
        );
      })}
      <Button
        alignSelf="start"
        leftIcon={<Icon size="md" as={AiOutlinePlus} />}
        variant="outline"
        onClick={() => {
          directorAppend({});
        }}
      >
        Add Director
      </Button>
    </GroupContainer>
  );
};
