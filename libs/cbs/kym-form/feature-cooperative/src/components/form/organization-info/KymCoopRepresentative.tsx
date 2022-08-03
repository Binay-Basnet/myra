import React, { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { GridItem } from '@chakra-ui/react';
import { pickBy } from 'lodash';
import debounce from 'lodash/debounce';

import {
  KymCooperativeFormInput,
  useAllAdministrationQuery,
  useGetCoOperativeKymEditDataQuery,
  useSetCooperativeDataMutation,
} from '@coop/cbs/data-access';
import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import {
  FormEmailInput,
  FormInput,
  FormMap,
  FormPhoneNumber,
  FormSelect,
  FormSwitch,
} from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';
import { getKymCoopSection, useTranslation } from '@coop/shared/utils';

interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}
export const KymCoopRepresentative = (props: IProps) => {
  const { t } = useTranslation();
  const { setSection } = props;
  const methods = useForm<KymCooperativeFormInput>({
    defaultValues: {},
  });
  const { control, handleSubmit, getValues, watch, setError, reset } = methods;
  const router = useRouter();
  const id = String(router?.query?.['id']);

  const { mutate } = useSetCooperativeDataMutation();
  const {
    data: editValues,
    isLoading: editLoading,
    refetch,
  } = useGetCoOperativeKymEditDataQuery(
    {
      id: id,
    },
    { enabled: id !== 'undefined' }
  );

  useEffect(() => {
    const subscription = watch(
      debounce((data) => {
        if (editValues && data) {
          mutate({ id: router.query['id'] as string, data });
          refetch();
        }
      }, 800)
    );

    return () => subscription.unsubscribe();
  }, [watch, router.isReady, editValues]);

  useEffect(() => {
    if (editValues) {
      const editValueData =
        editValues?.members?.cooperative?.formState?.data?.formData;

      reset({
        ...pickBy(
          editValues?.members?.cooperative?.formState?.data?.formData ?? {},
          (v) => v !== null
        ),
        permanentRepresentativeAddress: {
          ...editValueData?.permanentRepresentativeAddress,
          locality:
            editValueData?.permanentRepresentativeAddress?.locality?.local,
        },
        temporaryRepresentativeAddress: {
          ...editValueData?.temporaryRepresentativeAddress,
          locality:
            editValueData?.temporaryRepresentativeAddress?.locality?.local,
        },
      });
    }
  }, [editLoading]);
  // useEffect(() => {
  //   if (id) {
  //     refetch();
  //
  //   }
  // }, [id]);
  const isPermanentAndTemporaryAddressSame = watch(
    'isPermanentAndTemporaryAddressSame'
  );
  const { data } = useAllAdministrationQuery();

  const province = useMemo(() => {
    return (
      data?.administration?.all?.map((d) => ({
        label: d.name,
        value: d.id,
      })) ?? []
    );
  }, [data?.administration?.all]);

  // FOR PERMANENT ADDRESS
  const currentProvinceId = watch('permanentRepresentativeAddress.provinceId');
  const currentDistrictId = watch('permanentRepresentativeAddress.districtId');

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

  // FOR TEMPORARY ADDRESS
  const currentTempProvinceId = watch(
    'temporaryRepresentativeAddress.provinceId'
  );
  const currentTemptDistrictId = watch(
    'temporaryRepresentativeAddress.districtId'
  );

  const districtTempList = useMemo(
    () =>
      data?.administration.all.find((d) => d.id === currentTempProvinceId)
        ?.districts ?? [],
    [currentTempProvinceId]
  );

  const localityTempList = useMemo(
    () =>
      districtList.find((d) => d.id === currentTemptDistrictId)
        ?.municipalities ?? [],
    [currentTemptDistrictId]
  );

  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymCoopSection(e.target.id);
          setSection(kymSection);
        }}
      >
        <GroupContainer id="kymCoopAccRepresentative" scrollMarginTop={'200px'}>
          <Text
            fontSize="r1"
            fontWeight="semibold"
            color="neutralColorLight.Gray-80"
          >
            {t['kymCoopRepresentative']}
          </Text>
          <InputGroupContainer>
            <GridItem colSpan={2}>
              <FormInput
                type="text"
                name="representativeFullName"
                label={t['kymCoopName']}
                placeholder={t['kymCoopEnterName']}
              />
            </GridItem>
            <FormInput
              type="text"
              name="representativeDesignatiton"
              label={t['kymCoopDesignation']}
              placeholder={t['kymCoopEnterDesignation']}
            />
            <FormEmailInput
              name={'representativeEmail'}
              label={t['kymCoopRepresentativeEmail']}
              placeholder={t['kymCoopRepresentativeEnterEmail']}
            />
            <FormPhoneNumber
              name={'representativeContactNumber'}
              label={t['kymCoopRepresentativePhone']}
              placeholder={t['kymCoopRepresentativeEnterPhone']}
            />
            <FormInput
              name="representativePanNo"
              label={t['kymCoopRepresentativePanOrVat']}
              placeholder={t['kymCoopRepresentativeEnterPan']}
            />
          </InputGroupContainer>
        </GroupContainer>
        <GroupContainer>
          <Box
            id="kymAccIndPermanentAddress"
            gap="s32"
            display={'flex'}
            flexDirection="column"
            scrollMarginTop={'200px'}
            pt="s32"
          >
            <Text fontSize="r1" fontWeight="SemiBold">
              {t['kymCoopRepresentativePermanentAddress']}
            </Text>
            <Box
              id="Permanent Address"
              gap="s32"
              display={'flex'}
              flexDirection="column"
            >
              <InputGroupContainer>
                <FormSelect
                  name="permanentRepresentativeAddress.provinceId"
                  label={t['kymCoopRepresentativeProvince']}
                  placeholder={t['kymCoopRepresentativeSelectProvince']}
                  options={province}
                />
                <FormSelect
                  name="permanentRepresentativeAddress.districtId"
                  label={t['kymCoopRepresentativeDistrict']}
                  placeholder={t['kymCoopRepresentativeSelectDistrict']}
                  options={districtList.map((d) => ({
                    label: d.name,
                    value: d.id,
                  }))}
                />
                <FormSelect
                  name="permanentRepresentativeAddress.localGovernmentId"
                  label={t['kymCoopRepresentativeLocalGovernment']}
                  placeholder={t['kymCoopRepresentativeSelectLocalGovernment']}
                  options={localityList.map((d) => ({
                    label: d.name,
                    value: d.id,
                  }))}
                />
                <FormInput
                  type="number"
                  name="permanentRepresentativeAddress.wardNo"
                  label={t['kymCoopRepresentativeWardNo']}
                  placeholder={t['kymCoopRepresentativeEnterWardNo']}
                />
                <FormInput
                  type="text"
                  name="permanentRepresentativeAddress.locality"
                  label={t['kymCoopRepresentativeLocality']}
                  placeholder={t['kymCoopRepresentativeEnterLocality']}
                />
                <FormInput
                  type="text"
                  name="permanentRepresentativeAddress.houseNo"
                  label={t['kymCoopRepresentativeHouseNo']}
                  placeholder={t['kymCoopRepresentativeEnterHouseNo']}
                />
              </InputGroupContainer>

              <Box mt="-16px">
                <FormMap name="permanentRepresentativeAddress.coordinates" />
              </Box>
            </Box>
          </Box>
          <Box
            id="kymAccIndTemporaryAddress"
            gap="s32"
            display={'flex'}
            flexDirection="column"
            scrollMarginTop={'200px'}
          >
            <Text fontSize="r1" fontWeight="SemiBold">
              {t['kymCoopRepresentativeTemporaryAddress']}
            </Text>

            <FormSwitch
              name="isPermanentAndTemporaryAddressSame"
              label={t['kymCoopRepresentativeTemporaryAddressPermanent']}
            />

            {!isPermanentAndTemporaryAddressSame && (
              <>
                <InputGroupContainer>
                  <FormSelect
                    name="temporaryRepresentativeAddress.provinceId"
                    label={t['kymCoopRepresentativeProvince']}
                    placeholder={t['kymCoopRepresentativeSelectProvince']}
                    options={province}
                  />
                  <FormSelect
                    name="temporaryRepresentativeAddress.districtId"
                    label={t['kymCoopRepresentativeDistrict']}
                    placeholder={t['kymCoopRepresentativeSelectDistrict']}
                    options={districtTempList.map((d) => ({
                      label: d.name,
                      value: d.id,
                    }))}
                  />
                  <FormSelect
                    name="temporaryRepresentativeAddress.localGovernmentId"
                    label={t['kymCoopRepresentativeLocalGovernment']}
                    placeholder={
                      t['kymCoopRepresentativeSelectLocalGovernment']
                    }
                    options={localityTempList.map((d) => ({
                      label: d.name,
                      value: d.id,
                    }))}
                  />
                  <FormInput
                    type="number"
                    name="temporaryRepresentativeAddress.wardNo"
                    label={t['kymCoopRepresentativeWardNo']}
                    placeholder={t['kymCoopRepresentativeEnterWardNo']}
                  />
                  <FormInput
                    type="text"
                    name="temporaryRepresentativeAddress.locality"
                    label={t['kymCoopRepresentativeLocality']}
                    placeholder={t['kymCoopRepresentativeEnterLocality']}
                  />
                  <FormInput
                    type="text"
                    name="temporaryRepresentativeAddress.houseNo"
                    label={t['kymCoopRepresentativeHouseNo']}
                    placeholder={t['kymCoopRepresentativeEnterHouseNo']}
                  />
                </InputGroupContainer>

                <Box mt="-16px">
                  <FormMap name="temporaryRepresentativeAddress.coordinates" />
                </Box>
              </>
            )}
          </Box>
        </GroupContainer>
      </form>
    </FormProvider>
  );
};
