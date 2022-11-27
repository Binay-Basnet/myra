import React, { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AiOutlineDelete } from 'react-icons/ai';
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { CloseIcon } from '@chakra-ui/icons';
import debounce from 'lodash/debounce';

import {
  KymCoopDirectorDetailsFormInput,
  RootState,
  useAllAdministrationQuery,
  useAppSelector,
  useGetCoOperativeDirectorEditDataQuery,
  useSetCooPdirectorDataMutation,
} from '@coop/cbs/data-access';
import { DynamicBoxGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormDatePicker, FormInput, FormMap, FormSelect, FormSwitch } from '@coop/shared/form';
import { Box, Button, Collapse, FormSection, GridItem, Icon, IconButton, Text } from '@myra-ui';
import { getKymCoopSection, useTranslation } from '@coop/shared/utils';

import { Bottomdirectorcoop } from './boardDirectorDocuments';

interface ICOOPDirector {
  removeDirector: (sisterId: string) => void;
  setSection: (section?: { section: string; subSection: string }) => void;
  directorId: string;
}

export const AddDirector = ({ directorId, removeDirector, setSection }: ICOOPDirector) => {
  const { t } = useTranslation();
  const methods = useForm<KymCoopDirectorDetailsFormInput>();

  const { watch, reset } = methods;

  const router = useRouter();

  const id = String(router?.query?.['id']);

  const { mutate } = useSetCooPdirectorDataMutation();

  const { data: editValues, refetch } = useGetCoOperativeDirectorEditDataQuery({
    id,
  });

  useEffect(() => {
    if (editValues) {
      const editValueData = editValues?.members?.cooperative?.listDirectors?.data;

      const directorDetails = editValueData?.find((data) => data?.id === directorId);

      if (directorDetails) {
        reset({
          nameEn: directorDetails?.fullName,

          designation: directorDetails?.designation,
          permanentAddress: {
            ...directorDetails?.permanentAddress,
            locality: directorDetails?.permanentAddress?.locality?.local,
          },
          isPermanentAndTemporaryAddressSame: directorDetails?.isPermanentAndTemporaryAddressSame,
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

  // refetch data when calendar preference is updated
  const preference = useAppSelector((state: RootState) => state?.auth?.preference);

  useEffect(() => {
    refetch();
  }, [preference?.date]);

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

  const isPermanentAndTemporaryAddressSame = watch(`isPermanentAndTemporaryAddressSame`);

  const province = useMemo(
    () =>
      data?.administration?.all?.map((d) => ({
        label: d.name,
        value: d.id,
      })) ?? [],
    [data?.administration?.all]
  );

  // FOR PERMANENT ADDRESS
  const currentProvinceId = watch(`permanentAddress.provinceId`);
  const currentDistrictId = watch(`permanentAddress.districtId`);
  const currentLocalityId = watch('permanentAddress.localGovernmentId');

  const districtList = useMemo(
    () => data?.administration.all.find((d) => d.id === currentProvinceId)?.districts ?? [],
    [currentProvinceId]
  );

  const localityList = useMemo(
    () => districtList.find((d) => d.id === currentDistrictId)?.municipalities ?? [],
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
    () => data?.administration.all.find((d) => d.id === currentTempProvinceId)?.districts ?? [],
    [currentTempProvinceId]
  );

  const localityTempList = useMemo(
    () => districtTempList.find((d) => d.id === currentTemptDistrictId)?.municipalities ?? [],
    [currentTemptDistrictId]
  );
  const wardTempList = useMemo(
    () => localityTempList.find((d) => d.id === currentTempLocalityId)?.wards ?? [],
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
          cursor="pointer"
          onClick={() => setIsOpen(!isOpen)}
          h="60px"
        >
          <Text fontSize="r1">{`Director `}</Text>
          <Box>
            {isOpen ? (
              <IconButton
                size="xs"
                variant="ghost"
                aria-label="close"
                icon={<Icon as={IoChevronUpOutline} />}
              />
            ) : (
              <IconButton
                size="xs"
                variant="ghost"
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
            variant="ghost"
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
      <Collapse
        in={isOpen}
        style={{
          marginTop: '0px',
          border: '1px solid',
          borderColor: '#E0E5EB',
        }}
      >
        <DynamicBoxGroupContainer>
          <FormProvider {...methods}>
            <form
              onFocus={(e) => {
                const kymSection = getKymCoopSection(e.target.id);
                setSection(kymSection);
              }}
            >
              <Box display="flex" flexDirection="column" gap="s48">
                <FormSection>
                  <FormInput
                    id="boardDirectorCoop"
                    type="text"
                    name="nameEn"
                    label={t['kymCoopFullName']}
                  />
                  <FormInput
                    id="boardDirectorCoop"
                    type="text"
                    name="designation"
                    label={t['kymCoopDesignation']}
                  />
                </FormSection>

                <FormSection header="kymCoopPermanentAddress">
                  <FormSelect
                    id="boardDirectorCoop"
                    name="permanentAddress.provinceId"
                    label={t['kymCoopState']}
                    options={province}
                  />
                  <FormSelect
                    id="boardDirectorCoop"
                    name="permanentAddress.districtId"
                    label={t['kymCoopDistrict']}
                    options={districtList.map((d) => ({
                      label: d.name,
                      value: d.id,
                    }))}
                  />
                  <FormSelect
                    id="boardDirectorCoop"
                    name="permanentAddress.localGovernmentId"
                    label={t['kymCoopLocalGovernment']}
                    options={localityList.map((d) => ({
                      label: d.name,
                      value: d.id,
                    }))}
                  />
                  <FormSelect
                    id="boardDirectorCoop"
                    name="permanentAddress.wardNo"
                    label={t['kymCoopWardNo']}
                    options={wardList?.map((d) => ({
                      label: d,
                      value: d,
                    }))}
                  />
                  <FormInput
                    id="boardDirectorCoop"
                    type="text"
                    name="permanentAddress.locality"
                    label={t['kymCoopLocality']}
                  />

                  <GridItem colSpan={2}>
                    <FormMap name="permanentAddress.coordinates" id="boardDirectorCoop" />
                  </GridItem>
                </FormSection>

                <FormSection header="kymCoopTemporaryAddress">
                  <GridItem colSpan={3}>
                    <FormSwitch
                      id="boardOfDirectorsDetails"
                      name="isPermanentAndTemporaryAddressSame"
                      label={t['kymCoopTemporaryAddressPermanent']}
                    />
                  </GridItem>
                  {!isPermanentAndTemporaryAddressSame && (
                    <>
                      <FormSelect
                        id="boardDirectorCoop"
                        name="temporaryAddress.provinceId"
                        label={t['kymCoopState']}
                        options={province}
                      />
                      <FormSelect
                        id="boardDirectorCoop"
                        name="temporaryAddress.districtId"
                        label={t['kymCoopDistrict']}
                        options={districtTempList.map((d) => ({
                          label: d.name,
                          value: d.id,
                        }))}
                      />
                      <FormSelect
                        id="boardDirectorCoop"
                        name="temporaryAddress.localGovernmentId"
                        label={t['kymCoopLocalGovernment']}
                        options={localityTempList.map((d) => ({
                          label: d.name,
                          value: d.id,
                        }))}
                      />
                      <FormSelect
                        id="boardDirectorCoop"
                        name="temporaryAddress.wardNo"
                        label={t['kymCoopWardNo']}
                        options={wardTempList.map((d) => ({
                          label: d,
                          value: d,
                        }))}
                      />
                      <FormInput
                        id="boardDirectorCoop"
                        type="text"
                        name="temporaryAddress.locality"
                        label={t['kymCoopLocality']}
                      />

                      <GridItem colSpan={2}>
                        <FormMap name="temporaryAddress.coordinates" />
                      </GridItem>
                    </>
                  )}
                </FormSection>

                <FormSection>
                  <FormDatePicker
                    id="boardDirectorCoop"
                    type="date"
                    name="dateOfMembership"
                    label={t['kymCoopDateOfMembership']}
                  />
                  <FormInput
                    id="boardDirectorCoop"
                    type="text"
                    name="highestQualification"
                    label={t['kymCoopHighestQualification']}
                  />
                  <FormInput
                    id="boardDirectorCoop"
                    type="number"
                    name="contactNumber"
                    label={t['kymCoopMobileNo']}
                  />
                  <FormInput
                    id="boardDirectorCoop"
                    type="text"
                    name="email"
                    label={t['kymCoopEmail']}
                  />
                  <FormInput
                    id="boardDirectorCoop"
                    type="string"
                    name="citizenshipNo"
                    label={t['kymCoopCitizenshipPassportDrivingLicenseNo']}
                  />
                  <FormInput
                    id="boardDirectorCoop"
                    type="string"
                    name="panNo"
                    label={t['kymCoopPanOrVatNo']}
                  />
                </FormSection>
              </Box>
            </form>
          </FormProvider>

          <Bottomdirectorcoop directorId={directorId} setKymCurrentSection={setSection} />

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
        </DynamicBoxGroupContainer>
        <Box display="flex" justifyContent="flex-end" py="s10" px="s20">
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
