import React, { useMemo } from 'react';
import { useEffect } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AiOutlineDelete } from 'react-icons/ai';
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { CloseIcon } from '@chakra-ui/icons';
import debounce from 'lodash/debounce';

import {
  KymCoopDirectorDetailsFormInput,
  useAllAdministrationQuery,
  useGetCoOperativeDirectorEditDataQuery,
  useSetCooPdirectorDataMutation,
} from '@coop/cbs/data-access';
import {
  DynamicBoxGroupContainer,
  InputGroupContainer,
  SectionContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormInput, FormMap, FormSelect, FormSwitch } from '@coop/shared/form';
import { Box, Button, Collapse, Icon, IconButton, Text } from '@coop/shared/ui';
import { getKymCoopSection, useTranslation } from '@coop/shared/utils';

import { Bottomdirectorcoop } from './boardDirectorDocuments';

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

  const { watch, reset } = methods;

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
          citizenshipNo: directorDetails?.citizenshipNo,
          panNo: directorDetails?.panNo,
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
  const currentLocalityId = watch('permanentAddress.localGovernmentId');

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
  const wardList = useMemo(
    () => localityList.find((d) => d.id === currentLocalityId)?.wards ?? [],
    [currentLocalityId]
  );
  // FOR TEMPORARY ADDRESS
  const currentTempProvinceId = watch(`temporaryAddress.provinceId`);
  const currentTemptDistrictId = watch(`temporaryAddress.districtId`);
  const currentTempLocalityId = watch('temporaryAddress.localGovernmentId');

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
  const wardTempList = useMemo(
    () =>
      localityTempList.find((d) => d.id === currentTempLocalityId)?.wards ?? [],
    [currentTempLocalityId]
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
          <SectionContainer>
            <FormProvider {...methods}>
              <form
                onFocus={(e) => {
                  const kymSection = getKymCoopSection(e.target.id);
                  setSection(kymSection);
                }}
              >
                <Box display={'flex'} flexDirection="column" gap="s48">
                  <InputGroupContainer>
                    <FormInput
                      id="boardDirectorCoop"
                      type="text"
                      name={`nameEn`}
                      label={t['kymCoopFullName']}
                      placeholder={t['kymCoopEnterFullName']}
                    />
                    <FormInput
                      id="boardDirectorCoop"
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
                      id="boardDirectorCoop"
                      name={`permanentAddress.provinceId`}
                      label={t['kymCoopState']}
                      placeholder={t['kymCoopSelectState']}
                      options={province}
                    />
                    <FormSelect
                      id="boardDirectorCoop"
                      name={`permanentAddress.districtId`}
                      label={t['kymCoopDistrict']}
                      placeholder={t['kymCoopSelectDistrict']}
                      options={districtList.map((d) => ({
                        label: d.name,
                        value: d.id,
                      }))}
                    />
                    <FormSelect
                      id="boardDirectorCoop"
                      name={`permanentAddress.localGovernmentId`}
                      label={t['kymCoopLocalGovernment']}
                      placeholder={t['kymCoopSelectLocal']}
                      options={localityList.map((d) => ({
                        label: d.name,
                        value: d.id,
                      }))}
                    />
                    <FormSelect
                      id="boardDirectorCoop"
                      name={`permanentAddress.wardNo`}
                      label={t['kymCoopWardNo']}
                      placeholder={t['kymCoopEnterWardNo']}
                      options={wardList?.map((d) => ({
                        label: d,
                        value: d,
                      }))}
                    />
                    <FormInput
                      id="boardDirectorCoop"
                      type="text"
                      name={`permanentAddress.locality`}
                      label={t['kymCoopLocality']}
                      placeholder={t['kymCoopEnterLocality']}
                    />
                  </InputGroupContainer>

                  <Box>
                    <FormMap
                      name={`permanentAddress.coordinates`}
                      id="boardDirectorCoop"
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
                            id="boardDirectorCoop"
                            name={`temporaryAddress.provinceId`}
                            label={t['kymCoopState']}
                            placeholder={t['kymCoopSelectState']}
                            options={province}
                          />
                          <FormSelect
                            id="boardDirectorCoop"
                            name={`temporaryAddress.districtId`}
                            label={t['kymCoopDistrict']}
                            placeholder={t['kymCoopSelectDistrict']}
                            options={districtTempList.map((d) => ({
                              label: d.name,
                              value: d.id,
                            }))}
                          />
                          <FormSelect
                            id="boardDirectorCoop"
                            name={`temporaryAddress.localGovernmentId`}
                            label={t['kymCoopLocalGovernment']}
                            placeholder={t['kymCoopSelectLocal']}
                            options={localityTempList.map((d) => ({
                              label: d.name,
                              value: d.id,
                            }))}
                          />
                          <FormSelect
                            id="boardDirectorCoop"
                            name={`temporaryAddress.wardNo`}
                            label={t['kymCoopWardNo']}
                            placeholder={t['kymCoopEnterWardNo']}
                            options={wardTempList.map((d) => ({
                              label: d,
                              value: d,
                            }))}
                          />
                          <FormInput
                            id="boardDirectorCoop"
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
                      id="boardDirectorCoop"
                      type="date"
                      name={`dateOfMembership`}
                      label={t['kymCoopDateOfMembership']}
                      placeholder="DD-MM-YYYY"
                    />
                    <FormInput
                      id="boardDirectorCoop"
                      type="text"
                      name={`highestQualification`}
                      label={t['kymCoopHighestQualification']}
                      placeholder={t['kymCoopEnterHigestQualification']}
                    />
                    <FormInput
                      id="boardDirectorCoop"
                      type="number"
                      name={`contactNumber`}
                      label={t['kymCoopMobileNo']}
                      placeholder={t['kymCoopEnterMobileNo']}
                    />
                    <FormInput
                      id="boardDirectorCoop"
                      type="text"
                      name={`email`}
                      label={t['kymCoopEmail']}
                      placeholder={t['kymCoopEnterEmail']}
                    />
                    <FormInput
                      id="boardDirectorCoop"
                      type="string"
                      name={`citizenshipNo`}
                      label={t['kymCoopCitizenshipPassportDrivingLicenseNo']}
                      placeholder={t['kymCoopEnterNo']}
                    />
                    <FormInput
                      id="boardDirectorCoop"
                      type="string"
                      name={`panNo`}
                      label={t['kymCoopPanOrVatNo']}
                      placeholder={t['kymCoopEnterPanOrVat']}
                    />
                  </InputGroupContainer>
                </Box>
              </form>
            </FormProvider>

            <Bottomdirectorcoop
              directorId={directorId}
              setKymCurrentSection={setSection}
            />

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
