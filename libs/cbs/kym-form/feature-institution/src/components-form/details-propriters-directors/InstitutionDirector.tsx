import React, { useMemo, useState } from 'react';
import { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { FormProvider, useForm } from 'react-hook-form';
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { FaMap } from 'react-icons/fa';
import { GrRotateRight } from 'react-icons/gr';
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { CloseIcon } from '@chakra-ui/icons';
import debounce from 'lodash/debounce';

import {
  GroupContainer,
  InputGroupContainer,
  SectionContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { useAllAdministrationQuery } from '@coop/shared/data-access';
import { KymInsInput } from '@coop/shared/data-access';
import {
  useGetKymFormStatusInstitutionQuery,
  useSetInstitutionDataMutation,
} from '@coop/shared/data-access';
import {
  FormFileInput,
  FormInput,
  FormMap,
  FormSelect,
  FormSwitch,
} from '@coop/shared/form';
import {
  Box,
  Button,
  Collapse,
  Grid,
  Icon,
  IconButton,
  Text,
} from '@coop/shared/ui';
import { GridItem } from '@coop/shared/ui';
import { getKymSectionInstitution, useTranslation } from '@coop/shared/utils';

const AddDirector = ({ watch, index, removeDirector }) => {
  const { t } = useTranslation();
  const { data } = useAllAdministrationQuery();

  const { getValues, reset } = useFormContext();

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
  const currentProvinceId = watch(`detailsOfDirectors.${index}.permanentState`);
  const currentDistrictId = watch(
    `detailsOfDirectors.${index}.permanentDistrict`
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
    `detailsOfDirectors.${index}.temporaryState`
  );
  const currentTemptDistrictId = watch(
    `detailsOfDirectors.${index}.temporaryDistrict`
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

  const isPermanentAndTemporaryAddressSame = watch(
    `detailsOfDirectors.${index}.isPermanentAndTemporaryAddressSame`
  );

  const resetDirectorForm = () => {
    const values = getValues();

    values['detailsOfDirectors'][index] = {};

    reset({ detailsOfDirectors: values['detailsOfDirectors'] });
  };

  const isAffiliated = watch('isAffiliated');

  return (
    <>
      <Box display="flex" alignItems="center">
        <Box
          flex={1}
          px={'s16'}
          h="60px"
          bg="gray.200"
          display="flex"
          justifyContent={'space-between'}
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
                icon={<Icon as={IoChevronUpOutline} />}
              />
            ) : (
              <IconButton
                size="xs"
                variant={'ghost'}
                aria-label="close"
                icon={<Icon as={IoChevronDownOutline} />}
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
        <SectionContainer
          pt="s16"
          mt="0"
          border={'1px solid'}
          borderColor="border.layout"
          borderRadius={'4px'}
          gap="s32"
          px="s20"
          pb="s20"
        >
          {/* <AccordianContainer> */}
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
            <FormInput
              type="text"
              name={`detailsOfDirectors.${index}.permanentHouseNo`}
              label={t['kymInsHouseNo']}
              placeholder={t['kymInsEnterHouseNo']}
            />
          </InputGroupContainer>

          <Box>
            <FormMap
              name={`boardOfDirectorsDetails.${index}.permanentLocation`}
            />
          </Box>

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
              id="isPermanentAndTemporaryAddressSame"
              name={`detailsOfDirectors.${index}.isPermanentAndTemporaryAddressSame`}
              label={t['kymInsTemporaryAddressPermanent']}
            />

            {!isPermanentAndTemporaryAddressSame && (
              <>
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
                  <FormInput
                    type="text"
                    name={`detailsOfDirectors.${index}.temporaryHouseNo`}
                    label={t['kymInsHouseNo']}
                    placeholder={t['kymInsEnterHouseNo']}
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

          <Box>
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
              <FormInput
                type="string"
                name={`detailsOfDirectors.${index}.panNo`}
                label={t['kymInsPanNo']}
                placeholder={t['kymInsPanEnterNo']}
              />
            </InputGroupContainer>
          </Box>
          {/* <Text fontSize="r1" fontWeight="SemiBold">
            Training related to Co-operatives
          </Text>
          <InputGroupContainer>
            <FormInput
              type="text"
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
          <Box display="flex" flexDirection="column" gap="s16">
            <FormSwitch
              name="isAffiliated"
              label={t['kymInsIsaffiliatedwithotherfirms']}
            />
            {isAffiliated && (
              <Box>
                <Grid templateColumns={'repeat(2, 1fr)'} gap="s20">
                  <FormInput
                    type="text"
                    bg="white"
                    name={`detailsOfDirectorsWithAffiliation.${index}.nameOfDirector`}
                    label={t['kymInsNameofDirector']}
                    placeholder={t['kymInsEnterNameofDirector']}
                  />
                  <FormInput
                    type="text"
                    bg="white"
                    name={`detailsOfDirectorsWithAffiliation.${index}.nameOfInstitution`}
                    label={t['kymInsNameofInstitution']}
                    placeholder={t['kymInsEnterNameofInstitution']}
                  />
                </Grid>
                <InputGroupContainer mt="s16">
                  <FormInput
                    type="text"
                    bg="white"
                    name={`detailsOfDirectorsWithAffiliation.${index}.addressOfInstitution`}
                    label={t['kymInsAddressofInstitution']}
                    placeholder={t['kymInsEnterAddressofInstitution']}
                  />
                  <FormInput
                    type="text"
                    bg="white"
                    name={`detailsOfDirectorsWithAffiliation.${index}.designation`}
                    label={t['kymInsDesignation']}
                    placeholder={t['kymInsEnterDesignation']}
                  />
                  <FormInput
                    type="number"
                    textAlign={'right'}
                    bg="white"
                    name={`detailsOfDirectorsWithAffiliation.${index}.yearlyIncome`}
                    label={t['kymInsYearlyIncome']}
                    placeholder="0.00"
                  />
                </InputGroupContainer>
              </Box>
            )}
          </Box>
        </SectionContainer>

        <Box
          display="flex"
          justifyContent="space-between"
          border="1px solid"
          borderColor="border.layout"
          alignItems={'center'}
          h="60px"
          px="s20"
        >
          <Button
            variant="ghost"
            leftIcon={<GrRotateRight />}
            onClick={resetDirectorForm}
          >
            {t['kymInsReset']}
          </Button>
          <Button
            variant="outline"
            shade="danger"
            leftIcon={<AiOutlineDelete height="11px" />}
            onClick={removeDirector}
          >
            {t['kymInsDelete']}
          </Button>
        </Box>

        {/* </AccordianContainer> */}
      </Collapse>
      {/* </DynamicBoxGroupContainer> */}
    </>
  );
};

interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const BoardDirectorInfo = (props: IProps) => {
  const { t } = useTranslation();
  const methods = useForm<KymInsInput>({
    defaultValues: {},
  });
  const { setSection } = props;

  const router = useRouter();

  const { control, handleSubmit, getValues, watch, setError } = methods;
  const { mutate } = useSetInstitutionDataMutation({
    onSuccess: (res) => {
      setError('institutionName', {
        type: 'custom',
        message:
          res?.members?.institution?.add?.error?.error?.['institutionName'][0],
      });
    },
    onError: () => {
      setError('institutionName', {
        type: 'custom',
        message: 'it is what it is',
      });
    },
  });
  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        // console.log(editValues);
        // if (editValues && data) {
        mutate({ id: router.query['id'] as string, data });
        //   refetch();
        // }
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, router.isReady]);

  const {
    fields: directorFields,
    append: directorAppend,
    remove: directorRemove,
  } = useFieldArray({ control, name: 'detailsOfDirectors' });
  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymSectionInstitution(e.target.id);
          setSection(kymSection);
        }}
      >
        <GroupContainer
          gap={'s16'}
          id="kymInsDetailsofProprietorPartnersDirectors"
          scrollMarginTop={'200px'}
        >
          <Text fontSize="r1" fontWeight="SemiBold">
            {t['kymInsDetailsofProprietorPartnersDirectors']}
          </Text>
          {directorFields.map((item, index) => {
            return (
              <Box
                key={item.id}
                display="flex"
                flexDirection={'column'}
                // gap="s16"
                // border="1px solid"
                // borderColor="border.layout"
              >
                <AddDirector
                  watch={watch}
                  index={index}
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
      </form>
    </FormProvider>
  );
};
