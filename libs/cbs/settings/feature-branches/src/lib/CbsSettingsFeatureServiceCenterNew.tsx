import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import {
  BranchCategory,
  BranchInput,
  RootState,
  useAllAdministrationQuery,
  useAppSelector,
  useGetBranchEditDataQuery,
  useGetCoaListQuery,
  useSetBranchDataMutation,
} from '@coop/cbs/data-access';
import { ContainerWithDivider, InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormDatePicker, FormInput, FormMap, FormSelect, FormSwitchTab } from '@coop/shared/form';
import {
  asyncToast,
  Box,
  Container,
  FormFooter,
  FormHeader,
  GridItem,
  Text,
  TextFields,
} from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const CbsSettingsFeatureServiceCenterNew = () => {
  const router = useRouter();

  const { t } = useTranslation();

  const methods = useForm<BranchInput>({});

  const { getValues, watch, reset, resetField } = methods;

  const id = String(router?.query?.['id']);

  const abbsStatus = watch('abbsStatus');

  const { data } = useAllAdministrationQuery();

  const { mutateAsync: setBranchData } = useSetBranchDataMutation();

  const province = useMemo(
    () =>
      data?.administration?.all?.map((d) => ({
        label: d.name,
        value: d.id,
      })) ?? [],
    [data?.administration?.all]
  );

  // FOR PERMANENT ADDRESS
  const currentProvinceId = watch('provinceId');
  const currentDistrictId = watch('districtId');
  const currentLocalityId = watch('localGovernmentId');

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

  const coaList = coaData?.map((item) => ({
    label: item?.name?.en as string,
    value: item?.id as string,
  }));

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
    {
      label: t['settingsBranchExtensionCounter'],
      value: BranchCategory.ExtensionCounter,
    },
  ];

  const submitForm = () => {
    asyncToast({
      id: 'settings-save-service-center',
      msgs: { loading: 'Saving service center', success: 'Service center saved' },
      promise: setBranchData({
        id,
        data: getValues(),
      }),
      onSuccess: () => router.push('/settings/general/service-center'),
      onError: (error) => {
        if (error.__typename === 'ValidationError') {
          Object.keys(error.validationErrorMsg).map((key) =>
            methods.setError(key as keyof BranchInput, {
              message: error.validationErrorMsg[key][0] as string,
            })
          );
        }
      },
    });
  };

  const { data: editValues, refetch } = useGetBranchEditDataQuery({
    id,
  });

  useEffect(() => {
    if (editValues) {
      const editValueData = editValues?.settings?.general?.branch?.formState?.data;
      if (editValueData) {
        reset({
          ...(editValueData as BranchInput),
        });
      }
    }
  }, [editValues, id]);

  // refetch data when calendar preference is updated
  const preference = useAppSelector((state: RootState) => state?.auth?.preference);

  useEffect(() => {
    if (router.asPath.includes('edit')) {
      refetch();
    }

    if (router.asPath.includes('add')) {
      resetField('estDate');
    }
  }, [preference?.date, router?.asPath]);

  useEffect(() => {
    if (id) {
      refetch();
    }
  }, [refetch]);

  return (
    <>
      <Container height="fit-content" minW="container.xl">
        <Box position="sticky" top="110px" bg="gray.100" width="100%" zIndex="10">
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
                          <FormInput name="name" label={t['serviceCenterFormName']} />
                        </GridItem>
                        <FormInput name="branchCode" label={t['serviceCenterCode']} />
                      </InputGroupContainer>

                      <InputGroupContainer mt="s16">
                        <FormInput
                          type="text"
                          name="managerName"
                          label={t['serviceCenterManager']}
                        />
                        <FormSelect
                          label={t['serviceCenterCategory']}
                          name="category"
                          options={branchCategories}
                        />
                        <FormDatePicker label={t['settingsBranchEstablishedDate']} name="estDate" />
                      </InputGroupContainer>

                      <InputGroupContainer mt="s16">
                        <FormInput
                          type="text"
                          name="serviceCenterPhone"
                          label={t['serviceCenterServiceCenterContactNumber']}
                        />
                      </InputGroupContainer>
                    </Box>

                    <Box>
                      <TextFields variant="tableHeader" color="gray.700" mb="s16">
                        {t['serviceCenterAddress']}
                      </TextFields>
                      <Box gap="s16" display="flex" flexDirection="column">
                        <InputGroupContainer>
                          <FormSelect
                            name="provinceId"
                            label={t['kymIndProvince']}
                            options={province}
                          />
                          <FormSelect
                            name="districtId"
                            label={t['kymIndDistrict']}
                            options={districtList.map((d) => ({
                              label: d.name,
                              value: d.id,
                            }))}
                          />
                          <FormSelect
                            name="localGovernmentId"
                            label={t['kymIndLocalGovernment']}
                            options={localityList.map((d) => ({
                              label: d.name,
                              value: d.id,
                            }))}
                          />
                          <FormSelect
                            name="wardNo"
                            label={t['kymIndWardNo']}
                            options={wardList.map((d) => ({
                              label: d,
                              value: d,
                            }))}
                          />
                          <FormInput type="text" name="locality" label={t['kymIndLocality']} />
                        </InputGroupContainer>

                        <Box>
                          <FormMap name="location" />
                        </Box>
                      </Box>
                    </Box>

                    <Box display="flex" flexDirection="column" gap="s20">
                      <TextFields variant="tableHeader" color="gray.700">
                        {t['serviceCenterManager']}
                      </TextFields>
                      <InputGroupContainer>
                        <FormInput name="phoneNumber" label={t['settingsBranchPhoneNumber']} />
                        <FormInput name="email" label={t['settingsBranchEmail']} />
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
                        <Box p="s16" border="1px solid" borderColor="border.layout">
                          <InputGroupContainer>
                            <FormSelect
                              label={t['settingsBranchRecievableAccount']}
                              name="receivableAccountId"
                              options={coaList}
                            />
                            <FormSelect
                              label={t['settingsBranchPayableAccount']}
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
                          name="plTransferId"
                          options={coaList}
                        />
                        <FormSelect
                          label={t['settinsBranchTDSTransfer']}
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
                      <FormSwitchTab options={booleanList} name="branchStatus" />
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
                  <Text color="neutralColorLight.Gray-60" fontWeight="Regular" as="i" fontSize="r1">
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
};

export default CbsSettingsFeatureServiceCenterNew;
