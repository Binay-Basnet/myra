import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import {
  BranchCategory,
  useAllAdministrationQuery,
  useGetBranchEditDataQuery,
  useGetCoaListQuery,
  useSetBranchDataMutation,
} from '@coop/cbs/data-access';
import {
  ContainerWithDivider,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import {
  FormInput,
  FormMap,
  FormSelect,
  FormSwitchTab,
} from '@coop/shared/form';
import {
  Box,
  Container,
  FormFooter,
  FormHeader,
  GridItem,
  Text,
  TextFields,
} from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export function CbsSettingsFeatureServiceCenterNew() {
  const router = useRouter();

  const { t } = useTranslation();

  const methods = useForm({});

  const { getValues, watch, reset } = methods;

  const id = String(router?.query?.['id']);

  const abbsStatus = watch('abbsStatus');

  const { data } = useAllAdministrationQuery();

  const { mutate } = useSetBranchDataMutation();

  const province = useMemo(() => {
    return (
      data?.administration?.all?.map((d) => ({
        label: d.name,
        value: d.id,
      })) ?? []
    );
  }, [data?.administration?.all]);

  // FOR PERMANENT ADDRESS
  const currentProvinceId = watch('provinceId');
  const currentDistrictId = watch('districtId');
  const currentLocalityId = watch('localGovernmentId');

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

  const booleanList = [
    { label: t['settingsBranchStatusActive'], value: true },
    { label: t['settingsBranchStatusInactive'], value: false },
  ];

  const { data: coa } = useGetCoaListQuery({
    filter: {
      active: true,
    },
  });

  const coaData = coa?.settings?.general?.chartsOfAccount?.accounts?.data;

  const coaList = coaData?.map((item) => {
    return {
      label: item?.name?.en as string,
      value: item?.id as string,
    };
  });

  const branchCategories = [
    {
      label: t['settingsBranchCategoriesHead'],
      value: BranchCategory.HeadOffice,
    },
    {
      label: t['settingsBranchCategoriesBranch'],
      value: BranchCategory.BranchOffice,
    },
    {
      label: t['settingsBranchCategoriesRegional'],
      value: BranchCategory.RegionalOffice,
    },
    {
      label: t['settingsBranchCategoriesService'],
      value: BranchCategory.ServiceCenter,
    },
    {
      label: t['settingsBranchCategoriesContact'],
      value: BranchCategory.ContactOffice,
    },
  ];

  const submitForm = () => {
    const values = getValues();

    const updatedValues = {
      ...values,
    };
    mutate(
      {
        id,
        data: updatedValues,
      },
      { onSuccess: () => router.push('/settings/general/branches') }
    );
  };

  const { data: editValues, refetch } = useGetBranchEditDataQuery({
    id,
  });

  useEffect(() => {
    if (editValues) {
      const editValueData =
        editValues?.settings?.general?.branch?.formState?.data;
      if (editValueData) {
        reset({
          ...editValueData,
        });
      }
    }
  }, [editValues, id]);

  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [refetch]);

  return (
    <>
      <Container height="fit-content" minW="container.xl">
        <Box
          position="sticky"
          top="110px"
          bg="gray.100"
          width="100%"
          zIndex="10"
        >
          <FormHeader title={t['serviceCenterAdd']} />
        </Box>

        <Box bg="white" pb="100px">
          <FormProvider {...methods}>
            <form>
              <Box px="s20" py="s24">
                <Box>
                  <ContainerWithDivider>
                    <Box>
                      <InputGroupContainer>
                        <GridItem colSpan={2}>
                          <FormInput
                            name="name"
                            label={t['serviceCenterFormName']}
                            placeholder={t['serviceCenterEnterName']}
                          />
                        </GridItem>
                        <FormInput
                          name={'branchCode'}
                          label={t['serviceCenterCode']}
                          placeholder={t['serviceCenterCodeEnter']}
                        />
                      </InputGroupContainer>

                      <InputGroupContainer mt="s16">
                        <FormInput
                          type="text"
                          name="managerName"
                          label={t['serviceCenterManager']}
                          placeholder={t['serviceCenterEnterManager']}
                        />
                        <FormSelect
                          label={t['serviceCenterCategory']}
                          placeholder={t['serviceCenterCategoryEnter']}
                          name="category"
                          options={branchCategories}
                        />
                        <FormInput
                          type="date"
                          label={t['settingsBranchEstablishedDate']}
                          placeholder={t['branchEnterEstablishedDate']}
                          name="estDate"
                        />
                      </InputGroupContainer>
                    </Box>

                    <Box>
                      <TextFields
                        variant="tableHeader"
                        color="gray.700"
                        mb="s16"
                      >
                        {t['serviceCenterAddress']}
                      </TextFields>
                      <Box gap="s16" display={'flex'} flexDirection="column">
                        <InputGroupContainer>
                          <FormSelect
                            name="provinceId"
                            label={t['kymIndProvince']}
                            placeholder={t['kymIndSelectProvince']}
                            options={province}
                          />
                          <FormSelect
                            name="districtId"
                            label={t['kymIndDistrict']}
                            placeholder={t['kymIndSelectDistrict']}
                            options={districtList.map((d) => ({
                              label: d.name,
                              value: d.id,
                            }))}
                          />
                          <FormSelect
                            name="localGovernmentId"
                            label={t['kymIndLocalGovernment']}
                            placeholder={t['kymIndSelectLocalGovernment']}
                            options={localityList.map((d) => ({
                              label: d.name,
                              value: d.id,
                            }))}
                          />
                          <FormSelect
                            name="wardNo"
                            label={t['kymIndWardNo']}
                            placeholder={t['kymIndEnterWardNo']}
                            options={wardList.map((d) => ({
                              label: d,
                              value: d,
                            }))}
                          />
                          <FormInput
                            type="text"
                            name="locality"
                            label={t['kymIndLocality']}
                            placeholder={t['kymIndEnterLocality']}
                          />
                        </InputGroupContainer>

                        <Box>
                          <FormMap name="location" />
                        </Box>
                      </Box>
                    </Box>

                    <Box>
                      <InputGroupContainer>
                        <FormInput
                          name="phoneNumber"
                          label={t['settingsBranchPhoneNumber']}
                          placeholder={
                            t['settingsBranchPhoneNumberPlaceholder']
                          }
                        />
                        <FormInput
                          name="email"
                          label={t['settingsBranchEmail']}
                          placeholder={t['settingsBranchEmailPlaceholder']}
                        />
                      </InputGroupContainer>
                    </Box>

                    <Box display="flex" flexDirection="column" gap="s16">
                      <TextFields variant="tableHeader" color="gray.700">
                        {t['settingsBranchABBSTransaction']}
                      </TextFields>

                      <FormSwitchTab
                        label={t['settingsBranchStatus']}
                        options={booleanList}
                        name="abbsStatus"
                      />

                      {abbsStatus && (
                        <Box
                          p="s16"
                          border="1px solid"
                          borderColor="border.layout"
                        >
                          <InputGroupContainer>
                            <FormSelect
                              label={t['settingsBranchRecievableAccount']}
                              placeholder={
                                t['settingsBranchRecievableAccountPlaceholder']
                              }
                              name="receivableAccountId"
                              options={coaList}
                            />
                            <FormSelect
                              label={t['settingsBranchPayableAccount']}
                              placeholder={
                                t['settingsBranchPayableAccountPlaceholder']
                              }
                              name="payableAccountId"
                              options={coaList}
                            />
                          </InputGroupContainer>
                        </Box>
                      )}
                    </Box>

                    <Box>
                      <InputGroupContainer>
                        <FormSelect
                          label={t['settinsBranchPLTransfer']}
                          placeholder={t['settingsBranchPLTransderLabel']}
                          name="plTransferId"
                          options={coaList}
                        />
                        <FormSelect
                          label={t['settinsBranchTDSTransfer']}
                          placeholder={t['settingsBranchTDSTransderLabel']}
                          name="tdsTransaferId"
                          options={coaList}
                        />
                      </InputGroupContainer>
                    </Box>

                    <Box display="flex" justifyContent="space-between">
                      <Box display="flex" flexDirection="column">
                        <Text fontSize="s3" fontWeight="500" color="gray.700">
                          {t['serviceCenterStatus']}
                        </Text>
                        <Text fontSize="s3" fontWeight="400" color="gray.700">
                          {t['settingsBranchStatusReversible']}
                        </Text>
                      </Box>
                      <FormSwitchTab
                        options={booleanList}
                        name="branchStatus"
                      />
                    </Box>
                  </ContainerWithDivider>
                </Box>
              </Box>
            </form>
          </FormProvider>
        </Box>
      </Container>

      <Box position="relative" margin="0px auto">
        <Box bottom="0" position="fixed" width="100%" bg="gray.100" zIndex={10}>
          <Container minW="container.xl" height="fit-content">
            <FormFooter
              status={
                <Box display="flex" gap="s8">
                  <Text
                    color="neutralColorLight.Gray-60"
                    fontWeight="Regular"
                    as="i"
                    fontSize="r1"
                  >
                    Press Save Account to save form
                  </Text>
                </Box>
              }
              draftButton={null}
              mainButtonLabel={t['settingsBranchSave']}
              mainButtonHandler={submitForm}
            />
          </Container>
        </Box>
      </Box>
      {/* </Box> */}
    </>
  );
}

export default CbsSettingsFeatureServiceCenterNew;
