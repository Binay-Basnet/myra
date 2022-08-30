import React, { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { CloseIcon } from '@chakra-ui/icons';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';
import omit from 'lodash/omit';

import {
  CooperativeUnionPersonnelSection,
  CoopUnionPersonnelDetails,
  CoopUnionPersonnelInput,
  useAllAdministrationQuery,
  useDeletePersonnelDetailsMutation,
  useGetBoardOfDirectorsDetailsListQuery,
  useGetNewIdMutation,
  useSetPersonnelDetailsMutation,
} from '@coop/cbs/data-access';
import { KYMDocumentField } from '@coop/cbs/kym-form/formElements';
import {
  DynamicBoxGroupContainer,
  InputGroupContainer,
  SectionContainer,
} from '@coop/cbs/kym-form/ui-containers';
import {
  FormEmailInput,
  FormInput,
  FormMap,
  FormSelect,
  FormSwitch,
} from '@coop/shared/form';
import {
  Box,
  Button,
  Collapse,
  FormSection,
  Grid,
  GridItem,
  Icon,
  IconButton,
  Text,
} from '@coop/shared/ui';
import {
  getKymSectionCoOperativeUnion,
  isDeepEmpty,
  useTranslation,
} from '@coop/shared/utils';

import { BoardOfDirectorRelatedTraining } from './TrainingRelatedToCooperatives';

interface IAddDirectorProps {
  removeDirector: (directorId: string) => void;
  index: number;
  directorId: string;
  setSection: (section?: { section: string; subSection: string }) => void;
  directorDetail: CoopUnionPersonnelDetails | null | undefined;
  refetch: () => void;
}

const AddDirector = ({
  removeDirector,
  index,
  directorId,
  setSection,
  directorDetail,
  refetch,
}: IAddDirectorProps) => {
  const { t } = useTranslation();

  const router = useRouter();

  const id = String(router?.query?.['id']);

  const { data } = useAllAdministrationQuery();

  const methods = useForm<CoopUnionPersonnelInput>();

  const { reset, watch, control } = methods;

  const { mutateAsync } = useSetPersonnelDetailsMutation({
    onSuccess: () => refetch(),
  });

  useEffect(() => {
    if (directorDetail) {
      reset({
        ...omit(directorDetail, ['id', 'cooperativeUnionId']),
        permanentAddress: {
          ...directorDetail?.permanentAddress,
          locality: directorDetail?.permanentAddress?.locality?.local,
        },
        temporaryAddress: {
          ...directorDetail?.temporaryAddress,
          locality: directorDetail?.temporaryAddress?.locality?.local,
        },
      });
    }
  }, [directorDetail]);

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        const editData = {
          ...omit(directorDetail, ['id', 'cooperativeUnionId']),
          permanentAddress: {
            ...directorDetail?.permanentAddress,
            locality: directorDetail?.permanentAddress?.locality?.local,
          },
          temporaryAddress: {
            ...directorDetail?.temporaryAddress,
            locality: directorDetail?.temporaryAddress?.locality?.local,
          },
        };
        if (id && data && !isDeepEmpty(data) && !isEqual(editData, data)) {
          mutateAsync({
            id,
            personnelId: directorId,
            sectionType: CooperativeUnionPersonnelSection.Directors,
            data,
          }).then(() => refetch());
        }
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, router.isReady, directorDetail]);

  const isPermanentAndTemporaryAddressSame = watch(
    `isPermanentAndTemporaryAddressSame`
  );

  const [isOpen, setIsOpen] = React.useState(true);

  // FOR PERMANENT ADDRESS
  const currentProvinceId = watch(`permanentAddress.provinceId`);
  const currentDistrictId = watch(`permanentAddress.districtId`);
  const currentLocalGovernmentId = watch('permanentAddress.localGovernmentId');

  // FOR TEMPORARY ADDRESS
  const currentTempProvinceId = watch(`temporaryAddress.provinceId`);
  const currentTemptDistrictId = watch(`temporaryAddress.districtId`);
  const currentTempLocalGovernmentId = watch(
    'temporaryAddress.localGovernmentId'
  );

  const province = useMemo(() => {
    return (
      data?.administration?.all?.map((d) => ({
        label: d.name,
        value: d.id,
      })) ?? []
    );
  }, [data?.administration?.all]);

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
    () =>
      localityList.find((d) => d.id === currentLocalGovernmentId)?.wards ?? [],
    [currentLocalGovernmentId]
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

  const wardTempList = useMemo(
    () =>
      localityTempList.find((d) => d.id === currentTempLocalGovernmentId)
        ?.wards ?? [],
    [currentTempLocalGovernmentId]
  );

  return (
    <>
      <Box display="flex" alignItems="center">
        <Box
          flex={1}
          px={'s12'}
          py={3}
          bg="gray.200"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          cursor={'pointer'}
          onClick={() => setIsOpen(!isOpen)}
          h="60px"
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
            onClick={() => removeDirector(directorId)}
          />
        )}
      </Box>

      {/* <DynamicBoxGroupContainer> */}
      <Collapse in={isOpen} style={{ marginTop: '0px' }}>
        <DynamicBoxGroupContainer
          border="1px solid"
          p="s20"
          borderColor="border.layout"
        >
          <SectionContainer>
            <FormProvider {...methods}>
              <form
                onFocus={(e) => {
                  const kymSection = getKymSectionCoOperativeUnion(e.target.id);

                  setSection(kymSection);
                }}
              >
                <Box display="flex" flexDirection="column" gap="s32">
                  <Box display="flex" flexDirection="column" gap="s16">
                    <InputGroupContainer>
                      <FormInput
                        type="text"
                        name={`fullName`}
                        id="boardOfDirectors.fullName"
                        label={t['kymCoopUnionFullName']}
                        __placeholder={t['kymCoopUnionEnterFullName']}
                      />
                      <FormInput
                        type="text"
                        name={`designationEn`}
                        id="boardOfDirectors.designationEn"
                        label={t['kymCoopUnionDesignation']}
                        __placeholder={t['kymCoopUnionEnterDesignation']}
                      />
                    </InputGroupContainer>

                    <Text fontSize="r1" fontWeight="SemiBold">
                      {t['kymCoopUnionPermanentAddress']}
                    </Text>

                    <InputGroupContainer>
                      <FormSelect
                        name={`permanentAddress.provinceId`}
                        id="boardOfDirectors.permanentAddress.provinceId"
                        label={t['kymCoopUnionState']}
                        __placeholder={t['kymCoopUnionSelectState']}
                        options={province}
                      />
                      <FormSelect
                        name={`permanentAddress.districtId`}
                        id="boardOfDirectors.permanentAddress.districtId"
                        label={t['kymCoopUnionDistrict']}
                        __placeholder={t['kymCoopUnionSelectDistrict']}
                        options={districtList.map((d) => ({
                          label: d.name,
                          value: d.id,
                        }))}
                      />
                      <FormSelect
                        name={`permanentAddress.localGovernmentId`}
                        id="boardOfDirectors.permanentAddress.localGovernmentId"
                        label={t['kymCoopUnionVDCMunicipality']}
                        __placeholder={t['kymCoopUnionSelectVDCMunicipality']}
                        options={localityList.map((d) => ({
                          label: d.name,
                          value: d.id,
                        }))}
                      />
                      <FormSelect
                        name={`permanentAddress.wardNo`}
                        id="boardOfDirectors.permanentAddress.wardNo"
                        label={t['kymCoopUnionWardNo']}
                        __placeholder={t['kymCoopUnionEnterWardNo']}
                        options={wardList?.map((d) => ({ label: d, value: d }))}
                      />
                      <FormInput
                        type="text"
                        name={`permanentAddress.locality`}
                        id="boardOfDirectors.permanentAddress.locality"
                        label={t['kymCoopUnionLocality']}
                        __placeholder={t['kymCoopUnionEnterLocality']}
                      />
                      <FormInput
                        type="text"
                        name={`permanentAddress.houseNo`}
                        id="boardOfDirectors.permanentAddress.houseNo"
                        label={t['kymIndHouseNo']}
                        __placeholder={t['kymIndEnterHouseNo']}
                      />
                      <GridItem colSpan={2} mt="s16">
                        <FormMap
                          name={`permanentAddress.coordinates`}
                          id="boardOfDirectors.permanentAddress.coordinates"
                        />
                      </GridItem>
                    </InputGroupContainer>
                  </Box>

                  <Box display="flex" flexDirection="column" gap="s16">
                    <Box
                      id="Temporary Address"
                      gap="s16"
                      display={'flex'}
                      flexDirection="column"
                      scrollMarginTop={'200px'}
                    >
                      <Text fontSize="r1" fontWeight="SemiBold">
                        {t['kymCoopUnionTemporaryAddress']}
                      </Text>

                      <FormSwitch
                        control={control}
                        id="boardOfDirectors.isPermanentAndTemporaryAddressSame"
                        name={`isPermanentAndTemporaryAddressSame`}
                        label={t['kymCoopUnionTemporaryAddressPermanent']}
                      />
                      {!isPermanentAndTemporaryAddressSame && (
                        <>
                          <InputGroupContainer>
                            <FormSelect
                              name={`temporaryAddress.provinceId`}
                              id="boardOfDirectors.temporaryAddress.provinceId"
                              label={t['kymCoopUnionState']}
                              __placeholder={t['kymCoopUnionSelectState']}
                              options={province}
                            />
                            <FormSelect
                              name={`temporaryAddress.districtId`}
                              id="boardOfDirectors.temporaryAddress.districtId"
                              label={t['kymCoopUnionDistrict']}
                              __placeholder={t['kymCoopUnionSelectDistrict']}
                              options={districtTempList.map((d) => ({
                                label: d.name,
                                value: d.id,
                              }))}
                            />
                            <FormSelect
                              name={`temporaryAddress.localGovernmentId`}
                              id="boardOfDirectors.temporaryAddress.localGovernmentId"
                              label={t['kymCoopUnionVDCMunicipality']}
                              __placeholder={
                                t['kymCoopUnionSelectVDCMunicipality']
                              }
                              options={localityTempList.map((d) => ({
                                label: d.name,
                                value: d.id,
                              }))}
                            />
                            <FormSelect
                              name={`temporaryAddress.wardNo`}
                              id="boardOfDirectors.temporaryAddress.wardNo"
                              label={t['kymCoopUnionWardNo']}
                              __placeholder={t['kymCoopUnionEnterWardNo']}
                              options={wardTempList?.map((d) => ({
                                label: d,
                                value: d,
                              }))}
                            />
                            <FormInput
                              type="text"
                              name={`temporaryAddress.locality`}
                              id="boardOfDirectors.temporaryAddress.locality"
                              label={t['kymCoopUnionLocality']}
                              __placeholder={t['kymCoopUnionEnterLocality']}
                            />
                            <FormInput
                              type="text"
                              name={`temporaryAddress.houseNo`}
                              id="boardOfDirectors.temporaryAddress.houseNo"
                              label={t['kymIndHouseNo']}
                              __placeholder={t['kymIndEnterHouseNo']}
                            />
                          </InputGroupContainer>

                          <Box>
                            <FormMap
                              name={`temporaryAddress.coordinates`}
                              id="boardOfDirectors.temporaryAddress.coordinates"
                            />
                          </Box>
                        </>
                      )}
                    </Box>
                    <InputGroupContainer>
                      <FormInput
                        type="date"
                        name={`dateOfMembership`}
                        id="boardOfDirectors.dateOfMembership"
                        label={t['kymCoopUnionDateOfMembership']}
                        __placeholder="DD-MM-YYYY"
                      />
                      <FormInput
                        type="text"
                        name={`highestQualification`}
                        id="boardOfDirectors.highestQualification"
                        label={t['kymCoopUnionHighestQualification']}
                        __placeholder={
                          t['kymCoopUnionEnterHigestQualification']
                        }
                      />
                      <FormInput
                        type="number"
                        name={`mobileNumber`}
                        id="boardOfDirectors.mobileNumber"
                        label={t['kymCoopUnionMobileNo']}
                        __placeholder={t['kymCoopUnionEnterMobileNo']}
                      />
                      <FormEmailInput
                        type="text"
                        name={`email`}
                        id="boardOfDirectors.email"
                        label={t['kymCoopUnionEmail']}
                        __placeholder={t['kymCoopUnionEnterEmail']}
                      />
                      <FormInput
                        type="string"
                        name={`citizenshipNo`}
                        id="boardOfDirectors.citizenshipNo"
                        label={
                          t['kymCoopUnionCitizenshipPassportDrivingLicenseNo']
                        }
                        __placeholder={t['kymCoopUnionEnterNo']}
                      />
                      <FormInput
                        type="string"
                        name={`panNo`}
                        id="boardOfDirectors.panNo"
                        label={t['kymCoopUnionPANNo']}
                        __placeholder={t['kymCoopUnionPANNo__placeholder']}
                      />
                    </InputGroupContainer>
                  </Box>
                  <BoardOfDirectorRelatedTraining />
                </Box>
              </form>
            </FormProvider>

            <Grid
              templateColumns="repeat(2, 1fr)"
              mt="s32"
              rowGap="s32"
              columnGap="s20"
            >
              <KYMDocumentField
                mutationId={directorId}
                label={t['kymCoopUnionPhotograph']}
                name={`photograph`}
                setKymCurrentSection={setSection}
                getKymSection={getKymSectionCoOperativeUnion}
              />
              <KYMDocumentField
                mutationId={directorId}
                label={t['kymCoopUnionPhotographOfIdentityProofDocument']}
                name={`identityDocumentPhoto`}
                setKymCurrentSection={setSection}
                getKymSection={getKymSectionCoOperativeUnion}
              />
            </Grid>
          </SectionContainer>
        </DynamicBoxGroupContainer>

        <Box
          display="flex"
          justifyContent="flex-end"
          border="1px solid"
          borderColor="border.layout"
          alignItems={'center'}
          h="60px"
          px="s20"
        >
          {/* <Button
            variant="ghost"
            leftIcon={<GrRotateRight />}
            onClick={resetDirectorForm}
          >
            {t['kymInsReset']}
          </Button> */}
          <Button
            variant="outline"
            shade="danger"
            leftIcon={<AiOutlineDelete height="11px" />}
            onClick={() => removeDirector(directorId)}
          >
            {t['kymInsDelete']}
          </Button>
        </Box>
      </Collapse>
      {/* </DynamicBoxGroupContainer> */}
    </>
  );
};

interface IBoardDirectorInfoProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}
export const BoardDirectorInfo = ({ setSection }: IBoardDirectorInfoProps) => {
  // const {
  //   fields: directorFields,
  //   append: directorAppend,
  //   remove: directorRemove,
  // } = useFieldArray({ control, name: 'boardOfDirectorsDetails' });
  const { t } = useTranslation();

  const router = useRouter();

  const id = router?.query?.['id'];

  const [directorIds, setDirectorIds] = useState<string[]>([]);

  const { data: bodEditValues, refetch } =
    useGetBoardOfDirectorsDetailsListQuery(
      {
        id: String(id),
      },
      { enabled: !!id }
    );

  useEffect(() => {
    if (bodEditValues) {
      const editValueData =
        bodEditValues?.members?.cooperativeUnion?.formState?.formData
          ?.boardOfDirectorsDetails?.data?.personnelDetails;

      setDirectorIds(
        editValueData?.reduce(
          (prevVal, curVal) => (curVal?.id ? [...prevVal, curVal.id] : prevVal),
          [] as string[]
        ) ?? []
      );
    }
  }, [bodEditValues]);

  // useEffect(() => {
  //   refetch();
  // }, []);

  const { mutate: newIdMutate } = useGetNewIdMutation({
    onSuccess: (res) => {
      setDirectorIds([...directorIds, res.newId]);
    },
  });

  const { mutate: deleteMutation } = useDeletePersonnelDetailsMutation({
    onSuccess: (res) => {
      const deletedId = String(
        res?.members?.cooperativeUnion?.deletePersonnel?.recordId
      );

      const tempDirectorIds = [...directorIds];

      tempDirectorIds.splice(tempDirectorIds.indexOf(deletedId), 1);

      setDirectorIds([...tempDirectorIds]);
    },
  });

  const addDirector = () => {
    newIdMutate({});
  };

  const removeDirector = (directorId: string) => {
    deleteMutation({ personnelId: directorId });
  };

  return (
    <FormSection
      id="kymCoopUnionAccDetailsofProprietor"
      header="kymCoopUnionBoardOfDirectorDetails"
    >
      <GridItem colSpan={3}>
        <Grid gap="s16">
          {directorIds.map((directorId, index) => {
            return (
              <Box
                key={directorId}
                display="flex"
                flexDirection={'column'}
                id="Details of Proprietor, Partners, Directors."
                scrollMarginTop={'200px'}
              >
                <AddDirector
                  index={index}
                  directorId={directorId}
                  removeDirector={removeDirector}
                  setSection={setSection}
                  directorDetail={bodEditValues?.members?.cooperativeUnion?.formState?.formData?.boardOfDirectorsDetails?.data?.personnelDetails?.find(
                    (bod) => bod?.id === directorId
                  )}
                  refetch={refetch}
                />
              </Box>
            );
          })}
          <GridItem colSpan={1}>
            <Button
              id="boardOfDirectors.directordetailsButton"
              alignSelf="start"
              leftIcon={<Icon size="md" as={AiOutlinePlus} />}
              variant="outline"
              onClick={addDirector}
            >
              {t['kymCoopUnionAddDirector']}
            </Button>
          </GridItem>
        </Grid>
      </GridItem>
    </FormSection>
  );
};
