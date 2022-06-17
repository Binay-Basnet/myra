import React, { useMemo } from 'react';
import { FaMap } from 'react-icons/fa';
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';
import { CloseIcon } from '@chakra-ui/icons';
import {
  AccordianContainer,
  DynamicBoxGroupContainer,
  InputGroupContainer,
  SectionContainer,
} from '@coop/cbs/kym-form/ui-containers';
import {
  FormFileInput,
  FormInput,
  FormSelect,
  FormSwitch,
} from '@coop/myra/components';
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

export const AddOperator = ({ watch, index, control, removeAccount }) => {
  const { data } = useAllAdministrationQuery();

  const [isOpen, setIsOpen] = React.useState(true);

  const isPermanentAndTemporaryAddressSame = watch(
    'isPermanentAndTemporaryAddressSame'
  );

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
          <Text fontSize="r1">{`Account Operator ${index + 1}`}</Text>
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
            onClick={removeAccount}
          />
        )}
      </Box>

      <Collapse in={isOpen} style={{ marginTop: '0px' }}>
        <DynamicBoxGroupContainer>
          <SectionContainer>
            <AccordianContainer>
              <InputGroupContainer>
                <FormInput
                  type="text"
                  name={`accountOperatorsDetails.${index}.fullName`}
                  label="Full Name"
                  placeholder="Enter Full Name"
                />
                <FormInput
                  type="text"
                  name={`accountOperatorsDetails.${index}.designation`}
                  label="Designation"
                  placeholder="Enter Designation"
                />
              </InputGroupContainer>
            </AccordianContainer>

            <AccordianContainer>
              <Text fontSize="r1" fontWeight="SemiBold">
                Permanent Address
              </Text>
              <InputGroupContainer>
                <FormSelect
                  name={`accountOperatorsDetails.${index}.permanentStateId`}
                  label="State"
                  placeholder="Select State"
                  options={province}
                />
                <FormSelect
                  name={`accountOperatorsDetails.${index}.permanentDistrictId`}
                  label="District"
                  placeholder="Select District"
                  options={districtList.map((d) => ({
                    label: d.name,
                    value: d.id,
                  }))}
                />
                <FormSelect
                  name={`accountOperatorsDetails.${index}.permanentLocalityId`}
                  label="VDC / Municipality"
                  placeholder="Select VDC / Municipality"
                  options={localityList.map((d) => ({
                    label: d.name,
                    value: d.id,
                  }))}
                />
                <FormInput
                  type="number"
                  name={`accountOperatorsDetails.${index}.permanentWardId`}
                  label="Ward No"
                  placeholder="Enter Ward No"
                />
                <FormInput
                  type="text"
                  name={`accountOperatorsDetails.${index}.permanentTole`}
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

              {isPermanentAndTemporaryAddressSame && (
                <>
                  <InputGroupContainer>
                    <FormSelect
                      name={`accountOperatorsDetails.${index}.temporaryStateId`}
                      label="State"
                      placeholder="Select State"
                      options={province}
                    />
                    <FormSelect
                      name={`accountOperatorsDetails.${index}.temporaryDistrictId`}
                      label="District"
                      placeholder="Select District"
                      options={districtTempList.map((d) => ({
                        label: d.name,
                        value: d.id,
                      }))}
                    />
                    <FormSelect
                      name={`accountOperatorsDetails.${index}.temporaryLocalityId`}
                      label="VDC / Muncipality"
                      placeholder="Select VDC / Muncipality"
                      options={localityTempList.map((d) => ({
                        label: d.name,
                        value: d.id,
                      }))}
                    />
                    <FormInput
                      type="number"
                      name={`accountOperatorsDetails.${index}.temporaryWardId`}
                      label="Ward No"
                      placeholder="Enter Ward No"
                    />
                    <FormInput
                      type="text"
                      name={`accountOperatorsDetails.${index}.temporaryTole`}
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
                </>
              )}
            </Box>
            <InputGroupContainer>
              <FormInput
                type="date"
                name={`accountOperatorsDetails.${index}.dateOfMembership`}
                label="Date of membership"
                placeholder="DD-MM-YYYY"
              />
              <FormInput
                type="text"
                name={`accountOperatorsDetails.${index}.highestQualification`}
                label="Highest Qualification"
                placeholder="Enter higest qualification"
              />
              <FormInput
                type="number"
                name={`accountOperatorsDetails.${index}.contactNumber`}
                label="Mobile No"
                placeholder="Enter Mobile No"
              />
              <FormInput
                type="text"
                name={`accountOperatorsDetails.${index}.email`}
                label="Email"
                placeholder="Enter Email"
              />
              <FormInput
                type="string"
                name={`accountOperatorsDetails.${index}.citizenshipOrPassportOrLisenceNo`}
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
                name={`accountOperatorsDetails.${index}.subjectOfTraining`}
                label="Subject of Training"
                placeholder="Enter Subject of Training"
              />
              <FormInput
                type="date"
                name={`accountOperatorsDetails.${index}.dateOfTraining`}
                label="Date of training"
                placeholder="Enter date of Training"
              />
              <FormInput
                type="number"
                name={`accountOperatorsDetails.${index}.trainingOrganization`}
                label="Training Organization"
                placeholder="Enter Training Organization"
              />
            </InputGroupContainer>
            <Grid templateColumns="repeat(2, 1fr)" rowGap="s32" columnGap="s20">
              <FormFileInput
                size="lg"
                label="Photograph"
                name={`accountOperatorsDetails.${index}.photograph`}
              />
              <FormFileInput
                size="lg"
                label="Photograph of identity proof document"
                name={`accountOperatorsDetails.${index}.identityDocumentPhoto`}
              />
              <Box w="124px">
                <FormFileInput
                  size="md"
                  label="Signature"
                  name={`boardOfDirectorsDetails.${index}.signature`}
                />
              </Box>
            </Grid>
          </SectionContainer>
        </DynamicBoxGroupContainer>
      </Collapse>
    </>
  );
};
