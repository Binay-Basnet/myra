import { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { IoCloseOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';

import {
  BranchCategory,
  useAllAdministrationQuery,
  useGetBranchEditDataQuery,
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
  GridItem,
  Icon,
  IconButton,
  Text,
  TextFields,
} from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface CbsSettingsFeatureBranchesNewProps {}

export function CbsSettingsFeatureBranchesNew(
  props: CbsSettingsFeatureBranchesNewProps
) {
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

  const booleanList = [
    { label: t['settingsBranchStatusActive'], value: true },
    { label: t['settingsBranchStatusInactive'], value: false },
  ];

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
      managerId: '123456789',
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
          <Box
            height="60px"
            display="flex"
            justifyContent="space-between"
            alignItems={'center'}
            px="5"
            background="white"
            borderBottom="1px solid #E6E6E6"
          >
            <Text fontSize="r2" fontWeight="SemiBold">
              {t['settingsBranchAdd']}
            </Text>
            <IconButton
              variant={'ghost'}
              aria-label="close"
              icon={<Icon as={IoCloseOutline} w="s20" h="s20" />}
              onClick={() => router.back()}
            />
          </Box>
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
                            label={t['settingsBranchName']}
                            placeholder={t['settingsBranchNameLabel']}
                          />
                        </GridItem>
                        <FormInput
                          name={'branchCode'}
                          label={t['settingsBranchBranchCode']}
                          placeholder={t['settingsBranchBranchCodePlaceholder']}
                        />
                      </InputGroupContainer>

                      <InputGroupContainer mt="s16">
                        <FormInput
                          label={t['settingsBranchManagerName']}
                          placeholder={t['settingsBranchManagerName']}
                          name="managerId"
                        />
                        <FormSelect
                          label={t['settingsBranchCategory']}
                          placeholder={t['settingsBranchCategory']}
                          name="category"
                          options={branchCategories}
                        />
                        <FormInput
                          type="date"
                          label={t['settingsBranchEstablishedDate']}
                          placeholder="Enter Established Date"
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
                        {t['settingsBranchAddressLabel']}
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
                          <FormInput
                            type="number"
                            name="wardNo"
                            label={t['kymIndWardNo']}
                            placeholder={t['kymIndEnterWardNo']}
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
                              options={[]}
                            />
                            <FormSelect
                              label={t['settingsBranchPayableAccount']}
                              placeholder={
                                t['settingsBranchPayableAccountPlaceholder']
                              }
                              name="payableAccountId"
                              options={[]}
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
                          options={[]}
                        />
                        <FormSelect
                          label={t['settinsBranchTDSTransfer']}
                          placeholder={t['settingsBranchTDSTransderLabel']}
                          name="tdsTransaferId"
                          options={[]}
                        />
                      </InputGroupContainer>
                    </Box>

                    <Box display="flex" justifyContent="space-between">
                      <Box display="flex" flexDirection="column">
                        <Text fontSize="s3" fontWeight="500" color="gray.700">
                          {t['settingsBranchStatusLabel']}
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
                  <Text as="i" fontSize="r1">
                    {t['formDetails']}
                  </Text>
                  <Text as="i" fontSize="r1">
                    09:41 AM
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

export default CbsSettingsFeatureBranchesNew;
