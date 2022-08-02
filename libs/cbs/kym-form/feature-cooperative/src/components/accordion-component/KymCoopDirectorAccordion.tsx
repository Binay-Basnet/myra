import React, { useMemo } from 'react';
import { useEffect } from 'react';
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
  KymCoopDirectorDetailsFormInput,
  useAllAdministrationQuery,
  useGetCoOperativeDirectorEditDataQuery,
  useSetCooPdirectorDataMutation,
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

interface ICOOPDirector {
  removeDirector: (sisterId: string) => void;
  setSection: (section?: { section: string; subSection: string }) => void;
  directorId: string;
}

export const AddDirector = ({
  directorId,
  removeDirector,
  setSection,
}: ICOOPDirector) => {
  const { t } = useTranslation();
  const methods = useForm<KymCoopDirectorDetailsFormInput>();

  const { control, handleSubmit, getValues, watch, setError, reset } = methods;

  const router = useRouter();

  const id = String(router?.query?.['id']);

  const { mutate } = useSetCooPdirectorDataMutation();

  const { data: editValues } = useGetCoOperativeDirectorEditDataQuery({
    id: id,
  });

  useEffect(() => {
    if (editValues) {
      const editValueData =
        editValues?.members?.cooperative?.listDirectors?.data;

      const directorDetails = editValueData?.find(
        (data) => data?.id === directorId
      );

      if (directorDetails) {
        reset({
          nameEn: directorDetails?.fullName,

          designation: directorDetails?.designation,
          permanentAddress: {
            ...directorDetails?.permanentAddress,
            locality: directorDetails?.permanentAddress?.locality?.local,
          },
          isPermanentAndTemporaryAddressSame:
            directorDetails?.isPermanentAndTemporaryAddressSame,
          temporaryAddress: {
            ...directorDetails?.temporaryAddress,
            locality: directorDetails?.temporaryAddress?.locality?.local,
          },
          dateOfMembership: directorDetails?.dateOfMembership,
          highestQualification: directorDetails?.highestQualification,
          contactNumber: directorDetails?.contactNumber,
          email: directorDetails?.email,
          citizenshipNo: directorDetails?.citizenshipOrPassportOrLisenceNo,
          // panNo: directorDetails?.panNO,
        });
      }
    }
  }, [editValues]);
  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        mutate({
          id,
          dirId: directorId,
          data: { cooperativeId: id, ...data },
        });
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, router.isReady]);

  const { data } = useAllAdministrationQuery();

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
      data?.administration.all.find((d) => d.id === currentTempProvinceId)
        ?.districts ?? [],
    [currentTempProvinceId]
  );

  const localityTempList = useMemo(
    () =>
      districtList.find((d) => d.id === currentTemptDistrictId)
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
          h="60px"
        >
          <Text fontSize="r1">{`Director `}</Text>
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
            id="boardDirectorCloseIcon"
            variant={'ghost'}
            aria-label="close"
            icon={<CloseIcon />}
            ml="s16"
            onClick={() => {
              removeDirector(directorId);
            }}
          />
        )}
      </Box>

      {/* <DynamicBoxGroupContainer> */}
      <Collapse in={isOpen} style={{ marginTop: '0px' }}>
        <DynamicBoxGroupContainer
          border={'1px solid'}
          borderColor="border.layout"
          p="s20"
        >
          {' '}
          <FormProvider {...methods}>
            <form
              onFocus={(e) => {
                const kymSection = getKymCoopSection(e.target.id);
                setSection(kymSection);
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
                    name={`permanentAddress.provinceId`}
                    label={t['kymCoopState']}
                    placeholder={t['kymCoopSelectState']}
                    options={province}
                  />
                  <FormSelect
                    name={`permanentAddress.districtId`}
                    label={t['kymCoopDistrict']}
                    placeholder={t['kymCoopSelectDistrict']}
                    options={districtList.map((d) => ({
                      label: d.name,
                      value: d.id,
                    }))}
                  />
                  <FormSelect
                    name={`permanentAddress.localGovernmentId`}
                    label={t['kymCoopLocalGovernment']}
                    placeholder={t['kymCoopSelectLocal']}
                    options={localityList.map((d) => ({
                      label: d.name,
                      value: d.id,
                    }))}
                  />
                  <FormInput
                    type="number"
                    name={`permanentAddress.wardNo`}
                    label={t['kymCoopWardNo']}
                    placeholder={t['kymCoopEnterWardNo']}
                  />
                  <FormInput
                    type="text"
                    name={`permanentAddress.locality`}
                    label={t['kymCoopLocality']}
                    placeholder={t['kymCoopEnterLocality']}
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
                    id="boardOfDirectorsDetails"
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
                          name={`temporaryAddress.wardNo`}
                          label={t['kymCoopWardNo']}
                          placeholder={t['kymCoopEnterWardNo']}
                        />
                        <FormInput
                          type="text"
                          name={`temporaryAddress.locality`}
                          label={t['kymCoopLocality']}
                          placeholder={t['kymCoopEnterLocality']}
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

                {/* <Grid
                  templateColumns="repeat(2, 1fr)"
                  rowGap="s32"
                  columnGap="s20"
                >
                  <FormFileInput
                    size="lg"
                    label={t['kymCoopPhotograph']}
                    // control={control}
                    name={`photograph`}
                  />
                  <FormFileInput
                    size="lg"
                    label={t['kymCoopPhotographOfIdentityProofDocument']}
                    // control={control}
                    name={`identityDocumentPhoto`}
                  />

                  <Box w="124px">
                    <FormFileInput
                      size="md"
                      label={t['kymCoopSignature']}
                      // control={control}
                      name={`signature`}
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
          py="s10"
          px="s20"
          border="1px solid"
          borderColor="border.layout"
        >
          <Button
            id="kymCOOPdirectorRemoveButton"
            variant="outline"
            shade="danger"
            leftIcon={<AiOutlineDelete height="11px" />}
            onClick={() => {
              removeDirector(directorId);
            }}
          >
            {t['kymInsDelete']}
          </Button>
        </Box>
      </Collapse>
    </>
  );
};
