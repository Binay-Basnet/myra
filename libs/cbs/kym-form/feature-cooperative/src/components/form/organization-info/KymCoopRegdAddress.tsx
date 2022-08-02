import React, { useMemo } from 'react';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { UseFormReturn } from 'react-hook-form';
import { FaMap } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { identity, pickBy } from 'lodash';
import debounce from 'lodash/debounce';

import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { useAllAdministrationQuery } from '@coop/shared/data-access';
import {
  useGetCoOperativeKymEditDataQuery,
  useSetCooperativeDataMutation,
} from '@coop/shared/data-access';
import { KymCooperativeFormInput } from '@coop/shared/data-access';
import { FormInput, FormMap, FormSelect } from '@coop/shared/form';
import { Box, Button, Icon, Text } from '@coop/shared/ui';
import { getKymCoopSection, useTranslation } from '@coop/shared/utils';

import { useCooperative } from '../../hooks/customCooperative';
interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}
export const KymCoopRegdAddress = (props: IProps) => {
  const { t } = useTranslation();
  const { setSection } = props;
  const methods = useForm<KymCooperativeFormInput>({
    defaultValues: {},
  });
  const { control, handleSubmit, getValues, watch, setError, reset } = methods;
  const router = useRouter();
  const id = String(router?.query?.['id']);

  const { mutate } = useSetCooperativeDataMutation();
  useCooperative({ methods });
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
        console.log(editValues);
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
      console.log(
        pickBy(
          editValues?.members?.cooperative?.formState?.data?.formData ?? {},
          (v) => v !== null
        )
      );
      console.log('pick', pickBy);
      const editValueData =
        editValues?.members?.cooperative?.formState?.data?.formData;

      reset({
        ...pickBy(
          editValues?.members?.cooperative?.formState?.data?.formData ?? {},
          (v) => v !== null
        ),
      });
    }
  }, [editLoading]);

  // useEffect(() => {
  //   if (id) {
  //     refetch();
  //     console.log({ id });
  //   }
  // }, [id]);
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
  const currentProvinceId = watch('registeredAddress.provinceId');
  const currentDistrictId = watch('registeredAddress.districtId');
  const currentLocalityId = watch('registeredAddress.localGovernmentId');

  const districtList = useMemo(
    () =>
      data?.administration.all.find((d) => d.id === currentProvinceId)
        ?.districts ?? [],
    [currentProvinceId]
  );

  const muncipalityList = useMemo(
    () =>
      districtList.find((d) => d.id === currentDistrictId)?.municipalities ??
      [],
    [currentDistrictId]
  );
  const wardList = useMemo(
    () => muncipalityList.find((d) => d.id === currentLocalityId)?.wards ?? [],
    [currentLocalityId]
  );
  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymCoopSection(e.target.id);
          setSection(kymSection);
        }}
      >
        <GroupContainer
          id="kymCoopAccRegisteredAddress"
          scrollMarginTop={'200px'}
        >
          <Text
            fontSize="r1"
            fontWeight="semibold"
            color="neutralColorLight.Gray-80"
          >
            {t['kymCoopRegisteredAddress']}
          </Text>
          <InputGroupContainer>
            <FormSelect
              id="registeredCoopAddress"
              name="registeredAddress.provinceId"
              label={t['kymCoopProvince']}
              placeholder={t['kymCoopSelectState']}
              options={province}
            />
            <FormSelect
              id="registeredCoopAddress"
              name="registeredAddress.districtId"
              label={t['kymCoopDistrict']}
              placeholder={t['kymCoopSelectDistrict']}
              options={districtList.map((d) => ({
                label: d.name,
                value: d.id,
              }))}
            />
            <FormSelect
              id="registeredCoopAddress"
              name="registeredAddress.localGovernmentId"
              label={t['kymCoopMunicipality']}
              placeholder={t['kymCoopSelectMunicipality']}
              options={muncipalityList.map((d) => ({
                label: d.name,
                value: d.id,
              }))}
            />

            <FormSelect
              id="registeredCoopAddress"
              name="registeredAddress.wardNo"
              label={t['kymCoopWardNo']}
              placeholder={t['kymCoopEnterWardNo']}
              options={wardList?.map((d) => ({
                label: d,
                value: d,
              }))}
            />
            <FormInput
              id="registeredCoopAddress"
              type="text"
              name="registeredAddress.locality"
              label={t['kymCoopLocality']}
              placeholder={t['kymCoopEnterLocality']}
            />
            <FormInput
              id="registeredCoopAddress"
              type="text"
              name="registeredAddress.houseNo"
              label={t['kymCoopRepresentativeHouseNo']}
              placeholder={t['kymCoopRepresentativeEnterHouseNo']}
            />
          </InputGroupContainer>

          <Box mt="-16px">
            <FormMap name="registeredAddress.coordinates" />
          </Box>
        </GroupContainer>
      </form>
    </FormProvider>
  );
};
