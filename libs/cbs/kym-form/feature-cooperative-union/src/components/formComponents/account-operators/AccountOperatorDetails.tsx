import React, { useMemo, useState } from 'react';
import { Control, useFieldArray } from 'react-hook-form';
import { useFormContext } from 'react-hook-form';
import {
  AiFillCloseCircle,
  AiOutlineCaretDown,
  AiOutlineCaretRight,
  AiOutlinePlus,
} from 'react-icons/ai';
import { AiOutlineDelete } from 'react-icons/ai';
import { FaMap } from 'react-icons/fa';
import { GrRotateRight } from 'react-icons/gr';
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
  FormMap,
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

import { AccountOperatorTraining } from './accountOperatorTraining';
const AddDirector = ({ watch, index, control, removeAccount }) => {
  const { t } = useTranslation();
  const { data } = useAllAdministrationQuery();
  const { getValues, reset } = useFormContext();

  const [temporaryAddress, setTemporaryAddress] = useState(false);
  const [isOpen, setIsOpen] = React.useState(true);

  const isPermanentAndTemporaryAddressSame = watch(
    `accountOperatorsDetails.${index}.isPermanentAndTemporaryAddressSame`
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

  // FOR TEMPORARY ADDRESS
  const currentTempProvinceId = watch(
    `accountOperatorsDetails.${index}.temporaryStateId`
  );
  const currentTemptDistrictId = watch(
    `accountOperatorsDetails.${index}.temporaryDistrictId`
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
  const resetDirectorForm = () => {
    const values = getValues();

    values['accountOperatorsDetails'][index] = {};

    reset({
      accountOperatorsDetails: values['accountOperatorsDetails'],
    });
  };
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
          h="60px"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Text fontSize="r1">{`Account Operator ${index + 1}`}</Text>
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
            onClick={removeAccount}
          />
        )}
      </Box>

      {/* <DynamicBoxGroupContainer> */}
      <Collapse in={isOpen} style={{ marginTop: '0px' }}>
        <DynamicBoxGroupContainer
          p="s20"
          border={'1px solid'}
          borderColor="border.layout"
          borderRadius={'4px'}
        >
          <SectionContainer>
            <InputGroupContainer>
              <FormInput
                type="text"
                name={`accountOperatorsDetails.${index}.fullName`}
                label={t['kymCoopUnionOpFullName']}
                placeholder={t['kymCoopUnionOpEnterFullName']}
              />
              <FormInput
                type="text"
                name={`accountOperatorsDetails.${index}.designation`}
                label={t['kymCoopUnionOpDesignation']}
                placeholder={t['kymCoopUnionOpEnterDesignation']}
              />
            </InputGroupContainer>

            <Text fontSize="r1" fontWeight="SemiBold">
              {t['kymCoopUnionOpPermanentAddress']}
            </Text>
            {/* <Box
              id="Permanent Address"
              gap="s32"
              display={'flex'}
              flexDirection="column"
            > */}
            <InputGroupContainer>
              <FormSelect
                name={`accountOperatorsDetails.${index}.permanentStateId`}
                label={t['kymCoopUnionOpState']}
                placeholder={t['kymCoopUnionOpSelectState']}
                options={province}
              />
              <FormSelect
                name={`accountOperatorsDetails.${index}.permanentDistrictId`}
                label={t['kymCoopUnionOpDistrict']}
                placeholder={t['kymCoopUnionOpSelectDistrict']}
                options={districtList.map((d) => ({
                  label: d.name,
                  value: d.id,
                }))}
              />
              <FormSelect
                name={`accountOperatorsDetails.${index}.permanentVdcOrMunicId`}
                label={t['kymCoopUnionOpVDCMunicipality']}
                placeholder={t['kymCoopUnionOpSelectVDCMunicipality']}
                options={localityList.map((d) => ({
                  label: d.name,
                  value: d.id,
                }))}
              />
              <FormInput
                type="number"
                name={`accountOperatorsDetails.${index}.permanentWardId`}
                label={t['kymCoopUnionOpWardNo']}
                placeholder={t['kymCoopUnionOpEnterWardNo']}
              />
              <FormInput
                type="text"
                name={`accountOperatorsDetails.${index}.permanentLocality`}
                label={t['kymCoopUnionOpLocality']}
                placeholder={t['kymCoopUnionOpEnterLocality']}
              />
              <FormInput
                type="text"
                name={`accountOperatorsDetails.${index}.permanentHouseNo`}
                label={t['kymIndHouseNo']}
                placeholder={t['kymIndEnterHouseNo']}
              />
            </InputGroupContainer>

            <Box>
              <FormMap
                name={`accountOperatorsDetails.${index}.permanentLocation`}
              />
            </Box>
            {/* </Box> */}

            <Box
              id="Temporary Address"
              gap="s32"
              display={'flex'}
              flexDirection="column"
              scrollMarginTop={'200px'}
            >
              <Text fontSize="r1" fontWeight="SemiBold">
                {t['kymCoopUnionOpTemporaryAddress']}
              </Text>

              <FormSwitch
                control={control}
                id="accountOperatorsDetails"
                name={`accountOperatorsDetails.${index}.isPermanentAndTemporaryAddressSame`}
                label={t['kymCoopUnionOpTemporaryAddressPermanent']}
              />

              {!isPermanentAndTemporaryAddressSame && (
                <>
                  <InputGroupContainer>
                    <FormSelect
                      name={`accountOperatorsDetails.${index}.temporaryStateId`}
                      label={t['kymCoopUnionOpState']}
                      placeholder={t['kymCoopUnionOpSelectState']}
                      options={province}
                    />
                    <FormSelect
                      name={`accountOperatorsDetails.${index}.temporaryDistrictId`}
                      label={t['kymCoopUnionOpDistrict']}
                      placeholder={t['kymCoopUnionOpSelectDistrict']}
                      options={districtTempList.map((d) => ({
                        label: d.name,
                        value: d.id,
                      }))}
                    />
                    <FormSelect
                      name={`accountOperatorsDetails.${index}.temporaryVdcOrMunicId`}
                      label={t['kymCoopUnionOpVDCMunicipality']}
                      placeholder={t['kymCoopUnionOpSelectVDCMunicipality']}
                      options={localityTempList.map((d) => ({
                        label: d.name,
                        value: d.id,
                      }))}
                    />
                    <FormInput
                      type="number"
                      name={`accountOperatorsDetails.${index}.temporaryWardId`}
                      label={t['kymCoopUnionOpWardNo']}
                      placeholder={t['kymCoopUnionOpEnterWardNo']}
                    />
                    <FormInput
                      type="text"
                      name={`accountOperatorsDetails.${index}.temporaryLocality`}
                      label={t['kymCoopUnionOpLocality']}
                      placeholder={t['kymCoopUnionOpEnterLocality']}
                    />
                    <FormInput
                      type="text"
                      name={`accountOperatorsDetails.${index}.temporaryHouseNo`}
                      label={t['kymIndHouseNo']}
                      placeholder={t['kymIndEnterHouseNo']}
                    />
                  </InputGroupContainer>

                  <Box mt="-16px">
                    <FormMap
                      name={`accountOperatorsDetails.${index}.temporaryLocation`}
                    />
                  </Box>
                </>
              )}
            </Box>
            <InputGroupContainer>
              <FormInput
                type="date"
                name={`accountOperatorsDetails.${index}.dateOfMembership`}
                label={t['kymCoopUnionOpDateOfMembership']}
                placeholder="DD-MM-YYYY"
              />
              <FormInput
                type="text"
                name={`accountOperatorsDetails.${index}.highestQualification`}
                label={t['kymCoopUnionOpHighestQualification']}
                placeholder={t['kymCoopUnionOpEnterHighestQualification']}
              />
              <FormInput
                type="number"
                name={`accountOperatorsDetails.${index}.contactNumber`}
                label={t['kymCoopUnionOpMobileNo']}
                placeholder={t['kymCoopUnionOpEnterMobileNo']}
              />
              <FormInput
                type="text"
                name={`accountOperatorsDetails.${index}.email`}
                label={t['kymCoopUnionOpEmail']}
                placeholder={t['kymCoopUnionOpEnterEmail']}
              />
              <FormInput
                type="string"
                name={`accountOperatorsDetails.${index}.citizenshipOrPassportOrLisenceNo`}
                label={t['kymCoopUnionOpCitizenshipPassportDrivingLicenseNo']}
                placeholder={t['kymCoopUnionOpEnterCitizenshipNo']}
              />
            </InputGroupContainer>
            {/* <Text fontSize="r1" fontWeight="SemiBold">
              {t['kymCoopUnionOpTrainingRelatedToCoop']}
            </Text>
            <InputGroupContainer>
              <FormInput
                type="text"
                name={`accountOperatorsDetails.${index}.subjectOfTraining`}
                label={t['kymCoopUnionOpSubjectofTraining']}
                placeholder={t['kymCoopUnionOpEnterSubjectofTraining']}
              />
              <FormInput
                type="date"
                name={`accountOperatorsDetails.${index}.dateOfTraining`}
                label={t['kymCoopUnionOpDateofTraining']}
                placeholder={t['kymCoopUnionOpEnterDateofTraining']}
              />
              <FormInput
                type="number"
                name={`accountOperatorsDetails.${index}.trainingOrganization`}
                label={t['kymCoopUnionOpTrainingOrganization']}
                placeholder={t['kymCoopUnionOpEnterTrainingOrganization']}
              />
            </InputGroupContainer> */}

            <AccountOperatorTraining bodIndex={index} />
            <Grid templateColumns="repeat(2, 1fr)" rowGap="s32" columnGap="s20">
              <FormFileInput
                size="lg"
                label={t['kymCoopUnionOpPhotograph']}
                // control={control}
                name={`accountOperatorsDetails.${index}.photograph`}
              />
              <FormFileInput
                size="lg"
                label={t['kymCoopUnionOpPhotographOfIdentityProofDocument']}
                // control={control}
                name={`accountOperatorsDetails.${index}.identityDocumentPhoto`}
              />
            </Grid>
            <InputGroupContainer>
              <Box w="124px">
                <FormFileInput
                  name={`accountOperatorsDetails.${index}.signature`}
                  label={t['kymCoopUnionOpSpecimenSignature']}
                />
              </Box>
            </InputGroupContainer>
          </SectionContainer>
        </DynamicBoxGroupContainer>
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
            onClick={removeAccount}
          >
            {t['kymInsDelete']}
          </Button>
        </Box>
      </Collapse>
      {/* </DynamicBoxGroupContainer> */}
    </>
  );
};

export const AccountOperatorInfo = ({ watch, control }) => {
  const { t } = useTranslation();
  const {
    fields: accountFields,
    append: accountAppend,
    remove: accountRemove,
  } = useFieldArray({ control, name: 'accountOperatorsDetails' });
  return (
    <GroupContainer
      id="kymCoopUnionAccDetailsofAccountOperators"
      scrollMarginTop={'200px'}
    >
      <Text fontSize="r1" fontWeight="SemiBold">
        {t['kymCoopUnionDetailsOfAccountOperators']}
      </Text>
      {accountFields.map((item, index) => {
        return (
          <Box
            key={item.id}
            display="flex"
            flexDirection={'column'}
            id="Details of Account Operators"
            scrollMarginTop={'200px'}
          >
            <AddDirector
              watch={watch}
              index={index}
              control={control}
              removeAccount={() => accountRemove(index)}
            />
          </Box>
        );
      })}
      <Button
        id="accountOperatorButton"
        alignSelf="start"
        leftIcon={<Icon size="md" as={AiOutlinePlus} />}
        variant="outline"
        onClick={() => {
          accountAppend({});
        }}
      >
        {t['kymCoopUnionAddOperator']}
      </Button>
    </GroupContainer>
  );
};
