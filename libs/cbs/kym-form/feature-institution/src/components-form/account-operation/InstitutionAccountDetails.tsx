import React, { useEffect, useMemo } from 'react';
import { useState } from 'react';
import {
  FormProvider,
  useFieldArray,
  useForm,
  useFormContext,
} from 'react-hook-form';
import { AiOutlineDelete, AiOutlinePlus } from 'react-icons/ai';
import { FaMap } from 'react-icons/fa';
import { GrRotateRight } from 'react-icons/gr';
import { IoChevronDownOutline, IoChevronUpOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { CloseIcon } from '@chakra-ui/icons';
import debounce from 'lodash/debounce';

import {
  DynamicBoxGroupContainer,
  GroupContainer,
  InputGroupContainer,
  SectionContainer,
} from '@coop/cbs/kym-form/ui-containers';
import {
  KymInsAccountOperatorInput,
  KymInsInput,
  useAllAdministrationQuery,
  useDeleteAccountOperatorInstitutionMutation,
  useGetInsAccountOperatorEditListQuery,
  useGetNewIdMutation,
  useSetAddAccountOperatorInstitutionMutation,
} from '@coop/shared/data-access';
import {
  FormFileInput,
  FormInput,
  FormMap,
  FormSelect,
  FormSwitch,
} from '@coop/shared/form';
// import { KymIndMemberInput } from '@coop/shared/data-access';
import { Box, Button, Collapse, Icon, IconButton, Text } from '@coop/shared/ui';
import { getKymSectionInstitution, useTranslation } from '@coop/shared/utils';

interface IAddDirector {
  removeDirector: (directorId: string) => void;
  setKymCurrentSection: (section?: {
    section: string;
    subSection: string;
  }) => void;
  accountId: string;
}

const AddAccountDetails = ({
  removeDirector,
  setKymCurrentSection,
  accountId,
}: IAddDirector) => {
  const { t } = useTranslation();
  const methods = useForm();
  const { watch, reset } = methods;

  const router = useRouter();

  const id = String(router?.query?.['id']);
  const { data: editValues } = useGetInsAccountOperatorEditListQuery({
    id: id,
  });
  const { mutate } = useSetAddAccountOperatorInstitutionMutation();
  useEffect(() => {
    if (editValues) {
      const editValueData =
        editValues?.members?.institution?.listAccountOperators?.data;

      const familyMemberDetail = editValueData?.find(
        (data) => data?.id === accountId
      );

      if (familyMemberDetail) {
        reset({
          fullName: familyMemberDetail?.fullName,
          contact: familyMemberDetail?.contact,
          email: familyMemberDetail?.email,
          permanentAddress: {
            ...familyMemberDetail?.permanenetAddress,
            locality: familyMemberDetail?.permanenetAddress?.locality?.local,
          },
          isTemporaryAndPermanentAddressSame:
            familyMemberDetail?.isTemporaryAndPermanentAddressSame,
          temporaryAddress: {
            ...familyMemberDetail?.temporaryAddress,
            locality: familyMemberDetail?.temporaryAddress?.locality?.local,
          },
          designation: familyMemberDetail?.designation,
          panNo: familyMemberDetail?.panNo,
        });
      }
    }
  }, [editValues]);

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        mutate({ id, acc: accountId, data: { ...data } });
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, router.isReady]);
  const { data } = useAllAdministrationQuery();

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
  const currentProvinceId = watch('permanentAddress.provinceId');
  const currentDistrictId = watch('permanentAddress.districtId');
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
  const currentTempProvinceId = watch('temporaryAddress.provinceId');
  const currentTemptDistrictId = watch('temporaryAddress.districtId');
  const currentTemptLocalityId = watch('temporaryAddress.localGovernmentId');

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
  const wardTemptList = useMemo(
    () =>
      localityList.find((d) => d.id === currentTemptLocalityId)?.wards ?? [],
    [currentLocalityId]
  );
  const isPermanentAndTemporaryAddressSame = watch(
    'isTemporaryAndPermanentAddressSame'
  );

  // const resetDirectorForm = () => {
  //   const values = getValues();

  //   values['accountOperatorsDetails'][index] = {};

  //   reset({ accountOperatorsDetails: values['accountOperatorsDetails'] });
  // };

  return (
    <>
      <Box display="flex" alignItems="center">
        <Box
          flex={1}
          px={'s16'}
          h="60px"
          bg="gray.200"
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          cursor={'pointer'}
          onClick={() => setIsOpen(!isOpen)}
        >
          <Text fontSize="r1">{'Account Operator'}</Text>
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
            onClick={() => {
              removeDirector(accountId);
            }}
          />
        )}
      </Box>

      <Collapse in={isOpen} style={{ marginTop: '0px' }}>
        <FormProvider {...methods}>
          <form
            onFocus={(e) => {
              const kymSection = getKymSectionInstitution(e.target.id);
              setKymCurrentSection(kymSection);
            }}
          >
            <SectionContainer
              mt="0"
              pt="s16"
              border={'1px solid'}
              borderColor="border.layout"
              borderRadius={'4px'}
              gap="s32"
              px="s20"
              pb="s20"
            >
              <InputGroupContainer>
                <FormInput
                  type="text"
                  name={'name'}
                  label={t['kymInsFullName']}
                  placeholder={t['kymInsEnterFullName']}
                />
                <FormInput
                  type="text"
                  name={'contact'}
                  label={t['kymInsContactNo']}
                  placeholder={t['kymInsContactNoPlaceholder']}
                />
                <FormInput
                  type="text"
                  name={'email'}
                  label={t['kymInsEmail']}
                  placeholder={t['kymInsEnterEmailAddress']}
                />
              </InputGroupContainer>

              <Text fontSize="r1" fontWeight="SemiBold">
                {t['kymInsPermanentAddress']}
              </Text>
              <InputGroupContainer>
                <FormSelect
                  name={'permanentAddress.provinceId'}
                  label={t['kymInsState']}
                  placeholder={t['kymInsSelectState']}
                  options={province}
                />
                <FormSelect
                  name={'permanentAddress.districtId'}
                  label={t['kymInsDistrict']}
                  placeholder={t['kymInsSelectDistrict']}
                  options={districtList.map((d) => ({
                    label: d.name,
                    value: d.id,
                  }))}
                />
                <FormSelect
                  name={'permanentAddress.localGovernmentId'}
                  label={t['kymInsVDCMunicipality']}
                  placeholder={t['kymInsSelectVDCMunicipality']}
                  options={localityList.map((d) => ({
                    label: d.name,
                    value: d.id,
                  }))}
                />
                <FormSelect
                  name={'permanentAddress.wardNo'}
                  label={t['kymInsWardNo']}
                  placeholder={t['kymInsEnterWardNo']}
                  options={wardList?.map((d) => ({
                    label: d,
                    value: d,
                  }))}
                />
                <FormInput
                  type="text"
                  name={'permanentAddress.locality'}
                  label={t['kymInsLocality']}
                  placeholder={t['kymInsEnterLocality']}
                />
                <FormInput
                  type="text"
                  name={'permanentAddress.houseNo'}
                  label={t['kymInsHouseNo']}
                  placeholder={t['kymInsEnterHouseNo']}
                />
              </InputGroupContainer>

              <Box>
                <FormMap name={'permanentAddress.coordinates'} />
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
                  name={'isTemporaryAndPermanentAddressSame'}
                  label={t['kymInsTemporaryAddressPermanent']}
                />

                {!isPermanentAndTemporaryAddressSame && (
                  <>
                    <InputGroupContainer>
                      <FormSelect
                        name={'temporaryAddress.provinceId'}
                        label={t['kymInsState']}
                        placeholder={t['kymInsSelectState']}
                        options={province}
                      />
                      <FormSelect
                        name={'temporaryAddress.districtId'}
                        label={t['kymInsDistrict']}
                        placeholder={t['kymInsSelectDistrict']}
                        options={districtTempList.map((d) => ({
                          label: d.name,
                          value: d.id,
                        }))}
                      />
                      <FormSelect
                        name={'temporaryAddress.localGovernmentId'}
                        label={t['kymInsVDCMunicipality']}
                        placeholder={t['kymInsSelectVDCMunicipality']}
                        options={localityTempList.map((d) => ({
                          label: d.name,
                          value: d.id,
                        }))}
                      />
                      <FormSelect
                        name={'temporaryAddress.wardNo'}
                        label={t['kymInsWardNo']}
                        options={wardTemptList?.map((d) => ({
                          label: d,
                          value: d,
                        }))}
                      />
                      <FormInput
                        type="text"
                        name={'temporaryAddress.locality'}
                        label={t['kymInsLocality']}
                        placeholder={t['kymInsEnterLocality']}
                      />
                      <FormInput
                        type="text"
                        name={'temporaryAddress.houseNo'}
                        label={t['kymInsHouseNo']}
                        placeholder={t['kymInsEnterHouseNo']}
                      />
                    </InputGroupContainer>
                    <FormMap name={'temporaryAddress.coordinates'} />
                  </>
                )}
              </Box>

              <Box>
                <InputGroupContainer>
                  <FormSelect
                    name={'designation'}
                    label={t['kymInsDesignation']}
                    placeholder={t['kymInsSelectposition']}
                    options={[
                      { value: 'precident', label: 'President' },
                      { value: 'viceprecident', label: 'Vice-President' },
                      { value: 'secretary', label: 'Secretary' },
                      { value: 'treasurer', label: 'Treasurer' },
                    ]}
                  />
                  <FormInput
                    name="panNo"
                    placeholder={t['kymInsPanNoPlaceholder']}
                    label={t['kymInsPanNo']}
                  />
                  {/* <Box display="flex" flexDirection={'column'} gap="s4">
                <Text fontSize={'s3'} fontWeight="500">
                  {t['kymInsSpecimenSignature']}
                </Text>
                <Box w="124px" display="flex" flexDirection={'column'} gap="s4">
                  <FormFileInput name={"specimenSignature"} />
                </Box>
              </Box> */}
                </InputGroupContainer>
              </Box>
            </SectionContainer>
          </form>
        </FormProvider>
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
            id="accountOperatorReset"
            variant="ghost"
            leftIcon={<GrRotateRight />}
            // onClick={resetDirectorForm}
          >
            {t['kymInsReset']}
          </Button>
          <Button
            id="accountOperatorClose"
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

interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}
export const InstitutionKYMAccountDetail = (props: IProps) => {
  const { t } = useTranslation();
  const methods = useForm<KymInsAccountOperatorInput>({
    defaultValues: {},
  });
  const { setSection } = props;

  const router = useRouter();
  const id = String(router?.query?.['id']);

  const { control, handleSubmit, getValues, watch, setError } = methods;
  const [accOperatorIds, setAccOperatorIds] = useState<string[]>([]);

  const { data: editValues } = useGetInsAccountOperatorEditListQuery(
    {
      id: String(id),
    },
    { enabled: !!id }
  );

  useEffect(() => {
    if (editValues) {
      const editValueData =
        editValues?.members?.institution?.listAccountOperators?.data;

      setAccOperatorIds(
        editValueData?.reduce(
          (prevVal, curVal) => (curVal ? [...prevVal, curVal.id] : prevVal),
          [] as string[]
        ) ?? []
      );
    }
  }, [editValues]);
  const { mutate: newIdMutate } = useGetNewIdMutation({
    onSuccess: (res) => {
      setAccOperatorIds([...accOperatorIds, res.newId]);
    },
  });
  const { mutate: deleteMutate } = useDeleteAccountOperatorInstitutionMutation({
    onSuccess: (res) => {
      const deletedId = String(
        res?.members?.institution?.accountOperator?.Delete?.recordId
      );

      const tempAccountOperatorIds = [...accOperatorIds];

      tempAccountOperatorIds.splice(
        tempAccountOperatorIds.indexOf(deletedId),
        1
      );

      setAccOperatorIds([...tempAccountOperatorIds]);
    },
  });
  const addAccountOperator = () => {
    newIdMutate({});
  };

  const removeAccountOperator = (accOperatorId: string) => {
    deleteMutate({ insId: id, acc: accOperatorId });
  };
  return (
    <GroupContainer
      gap="s16"
      id="kymInsDetailsofAccountOperators"
      scrollMarginTop="200px"
    >
      <Text fontSize="r1" fontWeight="SemiBold">
        {t['kymInsDetailsofAccountOperators']}
      </Text>

      <div>
        <DynamicBoxGroupContainer>
          {accOperatorIds.map((id) => {
            return (
              <Box key={id} display="flex" flexDirection={'column'}>
                <AddAccountDetails
                  setKymCurrentSection={setSection}
                  removeDirector={removeAccountOperator}
                  accountId={id}
                />
              </Box>
            );
          })}
          <Button
            id="accountOperatorDetailsButton"
            alignSelf="start"
            leftIcon={<Icon size="md" as={AiOutlinePlus} />}
            variant="outline"
            onClick={() => {
              addAccountOperator();
            }}
          >
            {t['kymInsNewOperator']}
          </Button>
        </DynamicBoxGroupContainer>
      </div>
    </GroupContainer>
  );
};
