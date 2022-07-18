import { useMemo, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { IoCloseOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';
import debounce from 'lodash/debounce';

import {
  ContainerWithDivider,
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import {
  useAllAdministrationQuery,
  useSetBranchDataMutation,
} from '@coop/shared/data-access';
import {
  FormEmailInput,
  FormFileInput,
  FormInput,
  FormMap,
  FormPhoneNumber,
  FormSelect,
  FormSwitchTab,
} from '@coop/shared/form';
import {
  Box,
  Container,
  FormFooter,
  Grid,
  GridItem,
  Icon,
  IconButton,
  Text,
  TextFields,
} from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface CbsSettingsFeatureValuatorAddProps {}

export function CbsSettingsFeatureValuatorAdd(
  props: CbsSettingsFeatureValuatorAddProps
) {
  const router = useRouter();

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

  return (
    <>
      <Container height="fit-content" minW="container.xl">
        <Box
          position="sticky"
          top="110px"
          bg="gray.100"
          width="100%"
          zIndex="10"
          height="50px"
          display="flex"
          justifyContent="space-between"
          alignItems={'center'}
          px="5"
          background="white"
          borderBottom="1px solid #E6E6E6"
        >
          <Text fontSize="r2" fontWeight="SemiBold">
            {'New Valuator'}
          </Text>
          <IconButton
            variant={'ghost'}
            aria-label="close"
            icon={<Icon as={IoCloseOutline} size="md" />}
            onClick={() => router.back()}
          />
        </Box>

        <Box bg="white" pb="100px">
          <FormProvider {...methods}>
            <form
            //   onChange={debounce(() => {
            //     mutate({
            //       id: branchId,
            //       data: getValues(),
            //     });
            //   }, 500)}
            >
              <Box px="s20" py="s24">
                <ContainerWithDivider>
                  <Box display={'flex'} flexDirection="column" gap="s16">
                    <TextFields variant="tableHeader" color="gray.700">
                      {'Valuator Setup'}
                    </TextFields>

                    <InputGroupContainer>
                      <GridItem colSpan={2}>
                        <FormInput
                          name="valuatorName"
                          label={'Valuator Name'}
                          placeholder={'Valuator Name'}
                        />
                      </GridItem>

                      <FormSelect
                        name="valuatorType"
                        label={'Valuator Type'}
                        placeholder={'Select Valuator Type'}
                      />

                      <FormInput
                        type="text"
                        name="valuatorId"
                        label={'Valuator ID'}
                        placeholder={'ID'}
                      />

                      <FormSelect
                        name="academicQualification"
                        label={'Academic Qualification'}
                        placeholder={'Academic Qualification'}
                      />

                      <FormInput
                        type="text"
                        name="valuationLicenseNo"
                        label={'Valuation License No'}
                        placeholder={'Valuation License No'}
                      />

                      <FormInput
                        type="date"
                        name="valuatorLatestRenewalDate"
                        label={'Valuator Latest Renewal Date'}
                      />

                      <FormInput
                        type="date"
                        name="valuatorSaccosContractDate"
                        label={'Valuator - SACCOS Contract Date'}
                      />

                      <FormInput
                        name="insurancePremiumPercent"
                        type="number"
                        label="Insurance Premium Percent"
                        textAlign={'right'}
                        placeholder="0.00"
                        rightElement={
                          <Text
                            fontWeight="Medium"
                            fontSize="r1"
                            color="primary.500"
                          >
                            %
                          </Text>
                        }
                      />
                    </InputGroupContainer>
                  </Box>

                  <Box display={'flex'} flexDirection="column" gap="s16">
                    <TextFields variant="tableHeader" color="gray.700">
                      {'Contact Details'}
                    </TextFields>

                    <InputGroupContainer>
                      <FormPhoneNumber
                        name="mobileNo"
                        label={'Mobile No'}
                        placeholder={'Mobile No'}
                      />

                      <FormPhoneNumber
                        name="phoneNo"
                        label={'Phone No'}
                        placeholder={'Phone No'}
                      />

                      <FormEmailInput
                        name="email"
                        label={'Email'}
                        placeholder={'Email'}
                      />
                    </InputGroupContainer>
                  </Box>

                  <Box display={'flex'} flexDirection="column" gap="s16">
                    <TextFields variant="tableHeader" color="gray.700">
                      {'Address'}
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
                        <FormInput
                          type="text"
                          name="houseNo"
                          label={'House No'}
                          placeholder={'House No'}
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
                      {'Documents Declaration'}
                    </TextFields>

                    <Grid
                      templateColumns="repeat(2, 1fr)"
                      rowGap="s32"
                      columnGap="s20"
                    >
                      <FormFileInput
                        size="lg"
                        label={'Valuator - SACCOS Contract Documents Upload '}
                        name="documents"
                      />
                    </Grid>
                  </Box>
                </ContainerWithDivider>
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
              mainButtonLabel={'Save'}
              mainButtonHandler={() => console.log('save')}
            />
          </Container>
        </Box>
      </Box>
      {/* </Box> */}
    </>
  );
}

export default CbsSettingsFeatureValuatorAdd;
