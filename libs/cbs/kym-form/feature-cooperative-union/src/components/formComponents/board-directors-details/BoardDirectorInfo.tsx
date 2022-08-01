import React, { useEffect, useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { GrRotateRight } from 'react-icons/gr';
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { CloseIcon } from '@chakra-ui/icons';
import debounce from 'lodash/debounce';
import omit from 'lodash/omit';

import { KYMDocumentField } from '@coop/cbs/kym-form/formElements';
import {
  DynamicBoxGroupContainer,
  GroupContainer,
  InputGroupContainer,
  SectionContainer,
} from '@coop/cbs/kym-form/ui-containers';
import {
  CooperativeUnionPersonnelSection,
  CoopUnionPersonnelDetails,
  CoopUnionPersonnelInput,
  KymAddress,
  useAllAdministrationQuery,
  useDeletePersonnelDetailsMutation,
  useGetBoardOfDirectorsDetailsListQuery,
  useGetNewIdMutation,
  useSetPersonnelDetailsMutation,
} from '@coop/shared/data-access';
import {
  FormEmailInput,
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
}

const AddDirector = ({
  removeDirector,
  index,
  directorId,
  setSection,
  directorDetail,
}: IAddDirectorProps) => {
  const { t } = useTranslation();

  const router = useRouter();

  const id = String(router?.query?.['id']);

  const { data } = useAllAdministrationQuery();

  const methods = useForm<CoopUnionPersonnelInput>();

  const { getValues, reset, watch, control } = methods;

  const { mutate } = useSetPersonnelDetailsMutation();

  useEffect(() => {
    if (directorDetail) {
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
    }
  }, [directorDetail]);

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        if (id && data && !isDeepEmpty(data)) {
          mutate({
            id,
            personnelId: directorId,
            sectionType: CooperativeUnionPersonnelSection.Directors,
            data: { id, ...data },
          });
          // refetch();
        }
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, router.isReady]);

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

  const resetDirectorForm = () => {
    const values = getValues();

    // values['boardOfDirectorsDetails'][index] = {};

    // reset({
    //   boardOfDirectorsDetails: values['boardOfDirectorsDetails'],
    // });
  };

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
                <SectionContainer>
                  <InputGroupContainer>
                    <FormInput
                      type="text"
                      name={`fullName`}
                      label={t['kymCoopUnionFullName']}
                      placeholder={t['kymCoopUnionEnterFullName']}
                    />
                    <FormInput
                      type="text"
                      name={`designationEn`}
                      label={t['kymCoopUnionDesignation']}
                      placeholder={t['kymCoopUnionEnterDesignation']}
                    />
                  </InputGroupContainer>

                  <Text fontSize="r1" fontWeight="SemiBold">
                    {t['kymCoopUnionPermanentAddress']}
                  </Text>
                  {/* <Box
              id="Permanent Address"
              gap="s32"
              display={'flex'}
              flexDirection="column"
            > */}
                  <InputGroupContainer>
                    <FormSelect
                      name={`permanentAddress.provinceId`}
                      label={t['kymCoopUnionState']}
                      placeholder={t['kymCoopUnionSelectState']}
                      options={province}
                    />
                    <FormSelect
                      name={`permanentAddress.districtId`}
                      label={t['kymCoopUnionDistrict']}
                      placeholder={t['kymCoopUnionSelectDistrict']}
                      options={districtList.map((d) => ({
                        label: d.name,
                        value: d.id,
                      }))}
                    />
                    <FormSelect
                      name={`permanentAddress.localGovernmentId`}
                      label={t['kymCoopUnionVDCMunicipality']}
                      placeholder={t['kymCoopUnionSelectVDCMunicipality']}
                      options={localityList.map((d) => ({
                        label: d.name,
                        value: d.id,
                      }))}
                    />
                    <FormSelect
                      name={`permanentAddress.wardNo`}
                      label={t['kymCoopUnionWardNo']}
                      placeholder={t['kymCoopUnionEnterWardNo']}
                      options={wardList?.map((d) => ({ label: d, value: d }))}
                    />
                    <FormInput
                      type="text"
                      name={`permanentAddress.locality`}
                      label={t['kymCoopUnionLocality']}
                      placeholder={t['kymCoopUnionEnterLocality']}
                    />
                    <FormInput
                      type="text"
                      name={`permanentAddress.houseNo`}
                      label={t['kymIndHouseNo']}
                      placeholder={t['kymIndEnterHouseNo']}
                    />
                  </InputGroupContainer>

                  <Box mt="-32px">
                    <FormMap name={`permanentAddress.coordinates`} />
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
                      {t['kymCoopUnionTemporaryAddress']}
                    </Text>

                    <FormSwitch
                      control={control}
                      id="boardOfDirectorsDetails"
                      name={`isPermanentAndTemporaryAddressSame`}
                      label={t['kymCoopUnionTemporaryAddressPermanent']}
                    />
                    {!isPermanentAndTemporaryAddressSame && (
                      <>
                        <InputGroupContainer>
                          <FormSelect
                            name={`temporaryAddress.provinceId`}
                            label={t['kymCoopUnionState']}
                            placeholder={t['kymCoopUnionSelectState']}
                            options={province}
                          />
                          <FormSelect
                            name={`temporaryAddress.districtId`}
                            label={t['kymCoopUnionDistrict']}
                            placeholder={t['kymCoopUnionSelectDistrict']}
                            options={districtTempList.map((d) => ({
                              label: d.name,
                              value: d.id,
                            }))}
                          />
                          <FormSelect
                            name={`temporaryAddress.localGovernmentId`}
                            label={t['kymCoopUnionVDCMunicipality']}
                            placeholder={t['kymCoopUnionSelectVDCMunicipality']}
                            options={localityTempList.map((d) => ({
                              label: d.name,
                              value: d.id,
                            }))}
                          />
                          <FormSelect
                            name={`temporaryAddress.wardNo`}
                            label={t['kymCoopUnionWardNo']}
                            placeholder={t['kymCoopUnionEnterWardNo']}
                            options={wardTempList?.map((d) => ({
                              label: d,
                              value: d,
                            }))}
                          />
                          <FormInput
                            type="text"
                            name={`temporaryAddress.locality`}
                            label={t['kymCoopUnionLocality']}
                            placeholder={t['kymCoopUnionEnterLocality']}
                          />
                          <FormInput
                            type="text"
                            name={`temporaryAddress.houseNo`}
                            label={t['kymIndHouseNo']}
                            placeholder={t['kymIndEnterHouseNo']}
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
                      label={t['kymCoopUnionDateOfMembership']}
                      placeholder="DD-MM-YYYY"
                    />
                    <FormInput
                      type="text"
                      name={`highestQualification`}
                      label={t['kymCoopUnionHighestQualification']}
                      placeholder={t['kymCoopUnionEnterHigestQualification']}
                    />
                    <FormInput
                      type="number"
                      name={`mobileNumber`}
                      label={t['kymCoopUnionMobileNo']}
                      placeholder={t['kymCoopUnionEnterMobileNo']}
                    />
                    <FormEmailInput
                      type="text"
                      name={`email`}
                      label={t['kymCoopUnionEmail']}
                      placeholder={t['kymCoopUnionEnterEmail']}
                    />
                    <FormInput
                      type="string"
                      name={`citizenshipNo`}
                      label={
                        t['kymCoopUnionCitizenshipPassportDrivingLicenseNo']
                      }
                      placeholder={t['kymCoopUnionEnterNo']}
                    />
                    <FormInput
                      type="string"
                      name={`panNo`}
                      label={'PAN No'}
                      placeholder={'Enter PAN No'}
                    />
                  </InputGroupContainer>

                  <BoardOfDirectorRelatedTraining bodIndex={index} />
                </SectionContainer>
              </form>
            </FormProvider>

            <Grid templateColumns="repeat(2, 1fr)" rowGap="s32" columnGap="s20">
              <KYMDocumentField
                label={t['kymCoopUnionPhotograph']}
                // control={control}
                name={`photograph`}
                setKymCurrentSection={setSection}
              />
              <KYMDocumentField
                label={t['kymCoopUnionPhotographOfIdentityProofDocument']}
                // control={control}
                name={`identityDocumentPhoto`}
                setKymCurrentSection={setSection}
              />
            </Grid>
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

  const { data: bodEditValues } = useGetBoardOfDirectorsDetailsListQuery(
    {
      id: String(id),
    },
    { enabled: !!id }
  );

  useEffect(() => {
    if (bodEditValues) {
      const editValueData =
        bodEditValues?.members?.cooperativeUnion?.formState?.data?.formData
          ?.boardOfDirectorsDetails?.personnelDetails;

      setDirectorIds(
        editValueData?.reduce(
          (prevVal, curVal) => (curVal ? [...prevVal, curVal.id] : prevVal),
          [] as string[]
        ) ?? []
      );
    }
  }, [bodEditValues]);

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
    <GroupContainer
      id="kymCoopUnionAccDetailsofProprietor"
      scrollMarginTop={'200px'}
    >
      <Text fontSize="r1" fontWeight="SemiBold">
        {t['kymCoopUnionBoardOfDirectorDetails']}
      </Text>
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
              directorDetail={bodEditValues?.members?.cooperativeUnion?.formState?.data?.formData?.boardOfDirectorsDetails?.personnelDetails?.find(
                (bod) => bod?.id === directorId
              )}
            />
          </Box>
        );
      })}
      <Button
        id="directordetailsButton"
        alignSelf="start"
        leftIcon={<Icon size="md" as={AiOutlinePlus} />}
        variant="outline"
        onClick={addDirector}
      >
        {t['kymCoopUnionAddDirector']}
      </Button>
    </GroupContainer>
  );
};
