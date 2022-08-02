import React, { useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { FormProvider, useFieldArray, useForm } from 'react-hook-form';
import { AiOutlineDelete } from 'react-icons/ai';
import { FaMap } from 'react-icons/fa';
import { GrRotateRight } from 'react-icons/gr';
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { CloseIcon } from '@chakra-ui/icons';
import debounce from 'lodash/debounce';

import {
  AccordianContainer,
  DynamicBoxGroupContainer,
  InputGroupContainer,
  SectionContainer,
} from '@coop/cbs/kym-form/ui-containers';
import {
  KymCoopAccountOperatorDetailsFormInput,
  useAllAdministrationQuery,
  useGetCoOperativeAccountOperatorEditDataQuery,
  useSetCoopAccOperatorDataMutation,
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
import { getKymCoopSection, useTranslation } from '@coop/shared/utils';

import { DynamicAddtraining } from './acoountOperatorTraining';
interface IAddDirector {
  removeDirector: (directorId: string) => void;
  setKymCurrentSection: (section?: {
    section: string;
    subSection: string;
  }) => void;
  accountId: string;
  index: number;
}

export const AddOperator = ({
  removeDirector,
  setKymCurrentSection,
  accountId,
  index,
}: IAddDirector) => {
  const { t } = useTranslation();
  const { data } = useAllAdministrationQuery();

  const methods = useForm<KymCoopAccountOperatorDetailsFormInput>();
  const { watch, reset } = methods;

  const router = useRouter();

  const id = String(router?.query?.['id']);
  const { data: editValues } = useGetCoOperativeAccountOperatorEditDataQuery({
    id: id,
  });
  const { mutate } = useSetCoopAccOperatorDataMutation();
  useEffect(() => {
    if (editValues) {
      const editValueData =
        editValues?.members?.cooperative?.listAccountOperators?.data;

      const familyMemberDetail = editValueData?.find(
        (data) => data?.id === accountId
      );

      if (familyMemberDetail) {
        reset({
          nameEn: familyMemberDetail?.fullName,
          designation: familyMemberDetail?.designation,
          permanentAddress: {
            ...familyMemberDetail?.permanentAddress,
            locality: familyMemberDetail?.permanentAddress?.locality?.local,
          },
          isPermanentAndTemporaryAddressSame:
            familyMemberDetail?.isPermanentAndTemporaryAddressSame,
          temporaryAddress: {
            ...familyMemberDetail?.temporaryAddress,
            locality: familyMemberDetail?.temporaryAddress?.locality?.local,
          },
          dateOfMembership: familyMemberDetail?.dateOfMembership,
          highestQualification: familyMemberDetail?.highestQualification,
          contactNumber: familyMemberDetail?.contactNumber,
          email: familyMemberDetail?.email,
          citizenshipNo: familyMemberDetail?.citizenshipOrPassportOrLisenceNo,
          // panNo: familyMemberDetails?.panNo
        });
      }
    }
  }, [editValues]);

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        mutate({ id, accOperatorId: accountId, data: { ...data } });
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, router.isReady]);
  const [isOpen, setIsOpen] = React.useState(true);

  const isPermanentAndTemporaryAddressSame = watch(
    `isPermanentAndTemporaryAddressSame`
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
  const currentProvinceId = watch(`permanentAddress.provinceId`);
  const currentDistrictId = watch(`permanentAddress.districtId`);

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
  const currentTempProvinceId = watch(`temporaryAddress.provinceId`);
  const currentTemptDistrictId = watch(`temporaryAddress.districtId`);

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
          px={'s12'}
          bg="gray.200"
          display="flex"
          justifyContent="space-between"
          h="60px"
          alignItems="center"
          cursor={'pointer'}
          onClick={() => setIsOpen(!isOpen)}
        >
          <Text fontSize="r1">{`Account Operator `}</Text>
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
            id="accountOperatorCloseIcon"
            size="sm"
            variant={'ghost'}
            aria-label="close"
            icon={<CloseIcon />}
            ml="s16"
            onClick={() => {
              removeDirector(accountId);
            }}
          />
        )}
      </Box>

      <Collapse in={isOpen} style={{ marginTop: '0px' }}>
        <DynamicBoxGroupContainer
          p="s20"
          border="1px solid"
          borderColor={'border.layout'}
        >
          <FormProvider {...methods}>
            <form
              onFocus={(e) => {
                const kymSection = getKymCoopSection(e.target.id);
                setKymCurrentSection(kymSection);
              }}
            >
              <SectionContainer>
                <InputGroupContainer>
                  <FormInput
                    type="text"
                    name={`nameEn`}
                    label={t['kymCoopFullName']}
                    placeholder={t['kymCoopEnterFullName']}
                  />
                  <FormInput
                    type="text"
                    name={`designation`}
                    label={t['kymCoopDesignation']}
                    placeholder={t['kymCoopEnterDesignation']}
                  />
                </InputGroupContainer>

                <Text fontSize="r1" fontWeight="SemiBold">
                  {t['kymCoopPermanentAddress']}
                </Text>
                <InputGroupContainer>
                  <FormSelect
                    name={`permanentAddress.`}
                    label={t['kymCoopState']}
                    placeholder={t['kymCoopSelectState']}
                    options={province}
                  />
                  <FormSelect
                    name={`permanentAddress.`}
                    label={t['kymCoopDistrict']}
                    placeholder={t['kymCoopSelectDistrict']}
                    options={districtList.map((d) => ({
                      label: d.name,
                      value: d.id,
                    }))}
                  />
                  <FormSelect
                    name={`permanentAddress.`}
                    label={t['kymCoopLocalGovernment']}
                    placeholder={t['kymCoopSelectLocal']}
                    options={localityList.map((d) => ({
                      label: d.name,
                      value: d.id,
                    }))}
                  />
                  <FormInput
                    type="number"
                    name={`permanentAddress.`}
                    label={t['kymCoopWardNo']}
                    placeholder={t['kymCoopEnterWardNo']}
                  />
                  <FormInput
                    type="text"
                    name={`permanentAddress.`}
                    label={t['kymCoopLocality']}
                    placeholder={t['kymCoopEnterLocality']}
                  />
                  <FormInput
                    type="text"
                    name={`permanentAddress.`}
                    label={t['kymCoopRepresentativeHouseNo']}
                    placeholder={t['kymCoopRepresentativeEnterHouseNo']}
                  />
                </InputGroupContainer>

                <Box>
                  <FormMap name={`permanentAddress.coordinates`} />
                </Box>

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
                    name={`isPermanentAndTemporaryAddressSame`}
                    label={t['kymCoopTemporaryAddressPermanent']}
                  />

                  {!isPermanentAndTemporaryAddressSame && (
                    <>
                      <InputGroupContainer>
                        <FormSelect
                          name={`temporaryAddress.provinceId`}
                          label={t['kymCoopState']}
                          placeholder={t['kymCoopSelectState']}
                          options={province}
                        />
                        <FormSelect
                          name={`temporaryAddress.districtId`}
                          label={t['kymCoopDistrict']}
                          placeholder={t['kymCoopSelectDistrict']}
                          options={districtTempList.map((d) => ({
                            label: d.name,
                            value: d.id,
                          }))}
                        />
                        <FormSelect
                          name={`temporaryAddress.localGovernmentId`}
                          label={t['kymCoopLocalGovernment']}
                          placeholder={t['kymCoopSelectLocal']}
                          options={localityTempList.map((d) => ({
                            label: d.name,
                            value: d.id,
                          }))}
                        />
                        <FormInput
                          type="number"
                          name={`temporaryAddress.wardId`}
                          label={t['kymCoopWardNo']}
                          placeholder={t['kymCoopEnterWardNo']}
                        />
                        <FormInput
                          type="text"
                          name={`temporaryAddress.locality`}
                          label={t['kymCoopLocality']}
                          placeholder={t['kymCoopEnterLocality']}
                        />
                        <FormInput
                          type="text"
                          name={`temporaryAddress.houseNo`}
                          label={t['kymCoopRepresentativeHouseNo']}
                          placeholder={t['kymCoopRepresentativeEnterHouseNo']}
                        />
                      </InputGroupContainer>

                      <Box mt="-16px">
                        <FormMap name={`temporaryAddress.coordinates`} />
                      </Box>
                    </>
                  )}
                </Box>
                <InputGroupContainer>
                  <FormInput
                    type="date"
                    name={`dateOfMembership`}
                    label={t['kymCoopDateOfMembership']}
                    placeholder="DD-MM-YYYY"
                  />
                  <FormInput
                    type="text"
                    name={`highestQualification`}
                    label={t['kymCoopHighestQualification']}
                    placeholder={t['kymCoopEnterHigestQualification']}
                  />
                  <FormInput
                    type="number"
                    name={`contactNumber`}
                    label={t['kymCoopMobileNo']}
                    placeholder={t['kymCoopEnterMobileNo']}
                  />
                  <FormInput
                    type="text"
                    name={`email`}
                    label={t['kymCoopEmail']}
                    placeholder={t['kymCoopEnterEmail']}
                  />
                  <FormInput
                    type="string"
                    name={`citizenshipNo`}
                    label={t['kymCoopCitizenshipPassportDrivingLicenseNo']}
                    placeholder={t['kymCoopEnterNo']}
                  />
                  <FormInput
                    type="string"
                    name={`panNo`}
                    label={t['kymCoopPanOrVatNo']}
                    placeholder={t['kymCoopEnterPanOrVat']}
                  />
                </InputGroupContainer>
                <DynamicAddtraining operatorIndex={index} />
                {/* <Grid templateColumns="repeat(2, 1fr)" rowGap="s32" columnGap="s20">
              <FormFileInput
                size="lg"
                label={t['kymCoopPhotograph']}
                name={`accountOperatorsDetails.photograph`}
              />
              <FormFileInput
                size="lg"
                label={t['kymCoopPhotographOfIdentityProofDocument']}
                name={`accountOperatorsDetails.identityDocumentPhoto`}
              />
              <Box w="124px">
                <FormFileInput
                  size="md"
                  label={t['kymCoopSignature']}
                  name={`boardOfDirectorsDetails.signature`}
                />
              </Box>
            </Grid> */}
              </SectionContainer>
            </form>
          </FormProvider>
        </DynamicBoxGroupContainer>
        <Box
          display="flex"
          justifyContent="flex-end"
          px="s20"
          py="s10"
          alignItems={'center'}
          border="1px solid"
          borderColor="border.layout"
        >
          <Button
            id="accountOperatorCloseButton"
            variant="outline"
            shade="danger"
            leftIcon={<AiOutlineDelete height="11px" />}
            onClick={() => {
              removeDirector(accountId);
            }}
          >
            {t['kymInsDelete']}
          </Button>
        </Box>
      </Collapse>
    </>
  );
};
