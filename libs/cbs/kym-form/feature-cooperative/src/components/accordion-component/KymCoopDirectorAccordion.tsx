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

export const AddDirector = ({ watch, index, control, removeDirector }) => {
  const { t } = useTranslation();
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
  const currentProvinceId = watch(
    `accountOperatorsDetails.${index}.permanentStateId`
  );
  const currentDistrictId = watch(
    `accountOperatorsDetails.${index}.permanentDistrictId`
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
    `accountOperatorsDetails.${index}.temporaryStateId`
  );
  const currentTemptDistrictId = watch(
    `accountOperatorsDetails.${index}.temporaryDistrictId`
  );

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
                  label={t['kymCoopFullName']}
                  placeholder={t['kymCoopEnterFullName']}
                />
                <FormInput
                  type="text"
                  name={`boardOfDirectorsDetails.${index}.designation`}
                  label={t['kymCoopDesignation']}
                  placeholder={t['kymCoopEnterDesignation']}
                />
              </InputGroupContainer>
            </AccordianContainer>

            <AccordianContainer>
              <Text fontSize="r1" fontWeight="SemiBold">
                {t['kymCoopPermanentAddress']}
              </Text>
              <InputGroupContainer>
                <FormSelect
                  name={`boardOfDirectorsDetails.${index}.permanentStateId`}
                  label={t['kymCoopState']}
                  placeholder={t['kymCoopSelectState']}
                  options={province}
                />
                <FormSelect
                  name={`boardOfDirectorsDetails.${index}.permanentDistrictId`}
                  label={t['kymCoopDistrict']}
                  placeholder={t['kymCoopSelectDistrict']}
                  options={districtList.map((d) => ({
                    label: d.name,
                    value: d.id,
                  }))}
                />
                <FormSelect
                  name={`boardOfDirectorsDetails.${index}.permanentLocalityId`}
                  label={t['kymCoopVDCMunicipality']}
                  placeholder={t['kymCoopSelectVDCMunicipality']}
                  options={localityList.map((d) => ({
                    label: d.name,
                    value: d.id,
                  }))}
                />
                <FormInput
                  type="number"
                  name={`boardOfDirectorsDetails.${index}.permanentWardId`}
                  label={t['kymCoopWardNo']}
                  placeholder={t['kymCoopEnterWardNo']}
                />
                <FormInput
                  type="text"
                  name={`boardOfDirectorsDetails.${index}.permanentTole`}
                  label={t['kymCoopLocality']}
                  placeholder={t['kymCoopEnterLocality']}
                />
              </InputGroupContainer>

              <Button
                alignSelf="start"
                leftIcon={<Icon size="md" as={FaMap} />}
              >
                {t['pinOnMap']}
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
                {t['kymCoopTemporaryAddress']}
              </Text>

              <FormSwitch
                control={control}
                name="isPermanentAndTemporaryAddressSame"
                label={t['kymCoopTemporaryAddressPermanent']}
              />

              {!isPermanentAndTemporaryAddressSame && (
                <>
                  <InputGroupContainer>
                    <FormSelect
                      name={`boardOfDirectorsDetails.${index}.temporaryStateId`}
                      label={t['kymCoopState']}
                      placeholder={t['kymCoopSelectState']}
                      options={province}
                    />
                    <FormSelect
                      name={`boardOfDirectorsDetails.${index}.temporaryDistrictId`}
                      label={t['kymCoopDistrict']}
                      placeholder={t['kymCoopSelectDistrict']}
                      options={districtTempList.map((d) => ({
                        label: d.name,
                        value: d.id,
                      }))}
                    />
                    <FormSelect
                      name={`boardOfDirectorsDetails.${index}.temporaryLocalityId`}
                      label={t['kymCoopVDCMunicipality']}
                      placeholder={t['kymCoopSelectVDCMunicipality']}
                      options={localityTempList.map((d) => ({
                        label: d.name,
                        value: d.id,
                      }))}
                    />
                    <FormInput
                      type="number"
                      name={`boardOfDirectorsDetails.${index}.temporaryWardId`}
                      label={t['kymCoopWardNo']}
                      placeholder={t['kymCoopEnterWardNo']}
                    />
                    <FormInput
                      type="text"
                      name={`boardOfDirectorsDetails.${index}.temporaryTole`}
                      label={t['kymCoopLocality']}
                      placeholder={t['kymCoopEnterLocality']}
                    />
                  </InputGroupContainer>
                  <Button
                    mt="-16px"
                    alignSelf="start"
                    leftIcon={<Icon size="md" as={FaMap} />}
                  >
                    {t['pinOnMap']}
                  </Button>
                </>
              )}
            </Box>
            <InputGroupContainer>
              <FormInput
                type="date"
                name={`boardOfDirectorsDetails.${index}.dateOfMembership`}
                label={t['kymCoopDateOfMembership']}
                placeholder="DD-MM-YYYY"
              />
              <FormInput
                type="text"
                name={`boardOfDirectorsDetails.${index}.highestQualification`}
                label={t['kymCoopHighestQualification']}
                placeholder={t['kymCoopEnterHigestQualification']}
              />
              <FormInput
                type="number"
                name={`boardOfDirectorsDetails.${index}.contactNumber`}
                label={t['kymCoopMobileNo']}
                placeholder={t['kymCoopEnterMobileNo']}
              />
              <FormInput
                type="text"
                name={`boardOfDirectorsDetails.${index}.email`}
                label={t['kymCoopEmail']}
                placeholder={t['kymCoopEnterEmail']}
              />
              <FormInput
                type="string"
                name={`boardOfDirectorsDetails.${index}.citizenshipOrPassportOrLisenceNo`}
                label={t['kymCoopCitizenshipPassportDrivingLicenseNo']}
                placeholder={t['kymCoopEnterNo']}
              />
            </InputGroupContainer>

            <Grid templateColumns="repeat(2, 1fr)" rowGap="s32" columnGap="s20">
              <FormFileInput
                size="lg"
                label={t['kymCoopPhotograph']}
                // control={control}
                name={`boardOfDirectorsDetails.${index}.photograph`}
              />
              <FormFileInput
                size="lg"
                label={t['kymCoopPhotographOfIdentityProofDocument']}
                // control={control}
                name={`boardOfDirectorsDetails.${index}.identityDocumentPhoto`}
              />

              <Box w="124px">
                <FormFileInput
                  size="md"
                  label={t['kymCoopSignature']}
                  // control={control}
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
