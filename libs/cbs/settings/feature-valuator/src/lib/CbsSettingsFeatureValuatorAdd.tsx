import React, { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useAllAdministrationQuery } from '@coop/cbs/data-access';
import { ContainerWithDivider, InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import {
  FormEmailInput,
  FormFileInput,
  FormInput,
  FormMap,
  FormPhoneNumber,
  FormSelect,
} from '@coop/shared/form';
import {
  Box,
  Container,
  FormFooter,
  FormHeader,
  Grid,
  GridItem,
  Text,
  TextFields,
} from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export function CbsSettingsFeatureValuatorAdd() {
  const { t } = useTranslation();

  const methods = useForm({});

  const { watch } = methods;

  const { data } = useAllAdministrationQuery();

  //   const { mutate } = useSetBranchDataMutation({
  //     onSuccess: (res) => {
  //       if (res?.settings?.general?.branch?.add?.record?.id) {
  //         setBranchId(res?.settings?.general?.branch?.add?.record?.id);
  //       }
  //     },
  //     // onError: () => {},
  //   });

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
  const currentLocalGovernmentId = watch('localGovernmentId');

  const districtList = useMemo(
    () => data?.administration.all.find((d) => d.id === currentProvinceId)?.districts ?? [],
    [currentProvinceId, data]
  );

  const localityList = useMemo(
    () => districtList.find((d) => d.id === currentDistrictId)?.municipalities ?? [],
    [currentDistrictId, districtList]
  );

  const wardList = useMemo(
    () => localityList.find((d) => d.id === currentLocalGovernmentId)?.wards ?? [],
    [currentLocalGovernmentId, localityList]
  );

  return (
    <>
      <Container height="fit-content" minW="container.xl">
        <FormProvider {...methods}>
          <form
          //    onChange={debounce(() => {
          //     mutate({
          //          id: branchId,
          //          data: getValues(),
          //        });
          //      }, 500)}
          >
            <Box position="sticky" top="110px" bg="gray.100" width="100%" zIndex="10">
              <FormHeader title={t['settingsGeneralValuatorFormNewValuator']} />
            </Box>

            <Box bg="white" pb="100px">
              <Box px="s20" py="s24">
                <ContainerWithDivider>
                  <Box display={'flex'} flexDirection="column" gap="s16">
                    <TextFields variant="tableHeader" color="gray.700">
                      {t['settingsGeneralValuatorFormValuatorSetup']}
                    </TextFields>
                    <InputGroupContainer>
                      <GridItem colSpan={2}>
                        <FormInput
                          name="valuatorName"
                          label={t['settingsGeneralValuatorFormValuatorName']}
                          __placeholder={t['settingsGeneralValuatorFormValuatorName']}
                        />
                      </GridItem>

                      <FormSelect
                        name="valuatorType"
                        label={t['settingsGeneralValuatorFormValuatorType']}
                        __placeholder={t['settingsGeneralValuatorFormSelectValuatorType']}
                      />

                      <FormInput
                        type="text"
                        name="valuatorId"
                        label={t['settingsGeneralValuatorFormValuatorID']}
                        __placeholder={t['settingsGeneralValuatorFormID']}
                      />

                      <FormSelect
                        name="academicQualification"
                        label={t['settingsGeneralValuatorFormAcademicQualification']}
                        __placeholder={t['settingsGeneralValuatorFormAcademicQualification']}
                      />

                      <FormInput
                        type="text"
                        name="valuationLicenseNo"
                        label={t['settingsGeneralValuatorFormValuationLicenseNo']}
                        __placeholder={t['settingsGeneralValuatorFormValuationLicenseNo']}
                      />

                      <FormInput
                        type="date"
                        name="renewalDate"
                        label={t['settingsGeneralValuatorFormValuatorLatestRenewalDate']}
                      />

                      <FormInput
                        type="date"
                        name="contractDate"
                        label={t['settingsGeneralValuatorFormValuatorSaccosContractDate']}
                      />

                      <FormInput
                        name="insurancePremium"
                        type="number"
                        label={t['settingsGeneralValuatorFormInsurancePremiumPercent']}
                        textAlign={'right'}
                        __placeholder="0.00"
                        rightElement={
                          <Text fontWeight="Medium" fontSize="r1" color="primary.500">
                            %
                          </Text>
                        }
                      />
                    </InputGroupContainer>
                  </Box>

                  <Box display={'flex'} flexDirection="column" gap="s16">
                    <TextFields variant="tableHeader" color="gray.700">
                      {t['settingsGeneralValuatorFormContactDetails']}
                    </TextFields>

                    <InputGroupContainer>
                      <FormPhoneNumber
                        name="mobileNo"
                        label={t['settingsGeneralValuatorFormMobileNo']}
                        __placeholder={t['settingsGeneralValuatorFormMobileNo']}
                      />

                      <FormPhoneNumber
                        name="phoneNo"
                        label={t['settingsGeneralValuatorFormPhoneNo']}
                        __placeholder={t['settingsGeneralValuatorFormPhoneNo']}
                      />

                      <FormEmailInput
                        name="email"
                        label={t['settingsGeneralValuatorFormEmail']}
                        __placeholder={t['settingsGeneralValuatorFormEmail']}
                      />
                    </InputGroupContainer>
                  </Box>

                  <Box display={'flex'} flexDirection="column" gap="s16">
                    <TextFields variant="tableHeader" color="gray.700">
                      {t['settingsGeneralValuatorFormAddress']}
                    </TextFields>
                    <Box gap="s16" display={'flex'} flexDirection="column">
                      <InputGroupContainer>
                        <FormSelect
                          name="provinceId"
                          label={t['settingsGeneralValuatorFormProvince']}
                          __placeholder={t['settingsGeneralValuatorFormSelectProvince']}
                          options={province}
                        />
                        <FormSelect
                          name="districtId"
                          label={t['settingsGeneralValuatorFormDistrict']}
                          __placeholder={t['settingsGeneralValuatorFormSelectDistrict']}
                          options={districtList.map((d) => ({
                            label: d.name,
                            value: d.id,
                          }))}
                        />
                        <FormSelect
                          name="localGovernmentId"
                          label={t['settingsGeneralValuatorFormLocalGoverment']}
                          __placeholder={t['settingsGeneralValuatorFormSelectLocalGoverment']}
                          options={localityList.map((d) => ({
                            label: d.name,
                            value: d.id,
                          }))}
                        />

                        <FormSelect
                          name="wardNo"
                          label={t['settingsGeneralValuatorFormWardNo']}
                          __placeholder={t['settingsGeneralValuatorFormEnterWardNo']}
                          options={wardList.map((d) => ({
                            label: d,
                            value: d,
                          }))}
                        />
                        <FormInput
                          type="text"
                          name="locality"
                          label={t['settingsGeneralValuatorFormLocality']}
                          __placeholder={t['settingsGeneralValuatorFormEnterLocality']}
                        />
                        <FormInput
                          type="text"
                          name="houseNo"
                          label={t['settingsGeneralValuatorFormHouseNo']}
                          __placeholder={t['settingsGeneralValuatorFormEnterHouseNo']}
                        />
                      </InputGroupContainer>

                      <Box>
                        <FormMap name="location" />
                      </Box>
                    </Box>
                  </Box>

                  <Box display="flex" flexDirection="column" gap="s16">
                    {/* <Text fontSize="r1" fontWeight="SemiBold">
                        {t['kynIndDOCUMENTDECLARATION']}
                      </Text> */}

                    <TextFields variant="tableHeader" color="gray.700">
                      {t['settingsGeneralValuatorFormDocumentsDeclaration']}
                    </TextFields>

                    <Grid templateColumns="repeat(2, 1fr)" rowGap="s32" columnGap="s20">
                      <FormFileInput
                        size="lg"
                        label={t['settingsGeneralValuatorFormDocumentDeclarationLabel']}
                        name="documents"
                      />
                    </Grid>
                  </Box>
                </ContainerWithDivider>
              </Box>
            </Box>
          </form>
        </FormProvider>
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
              mainButtonLabel={'Save'}
            />
          </Container>
        </Box>
      </Box>
      {/* </Box> */}
    </>
  );
}

export default CbsSettingsFeatureValuatorAdd;
