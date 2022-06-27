import React, { useMemo } from 'react';
import { FaMap } from 'react-icons/fa';
import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { useAllAdministrationQuery } from '@coop/shared/data-access';
import { FormInput, FormSelect } from '@coop/shared/form';
import { Text, Button, Icon } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const KymCoopRegdAddress = ({ watch }: any) => {
  const { t } = useTranslation();
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
  const currentProvinceId = watch('regdProvinceId');
  const currentDistrictId = watch('regdDistrictId');

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

  return (
    <GroupContainer id="kymCoopAccRegisteredAddress" scrollMarginTop={'200px'}>
      <Text
        fontSize="r1"
        fontWeight="semibold"
        color="neutralColorLight.Gray-80"
      >
        {t['kymCoopRegisteredAddress']}
      </Text>
      <InputGroupContainer>
        <FormSelect
          name="regdProvinceId"
          label={t['kymCoopProvince']}
          placeholder={t['kymCoopSelectState']}
          options={province}
        />
        <FormSelect
          name="regdDistrictId"
          label={t['kymCoopDistrict']}
          placeholder={t['kymCoopSelectDistrict']}
          options={districtList.map((d) => ({
            label: d.name,
            value: d.id,
          }))}
        />
        <FormSelect
          name="regdMunicipalityId"
          label={t['kymCoopMunicipality']}
          placeholder={t['kymCoopSelectMunicipality']}
          options={muncipalityList.map((d) => ({
            label: d.name,
            value: d.id,
          }))}
        />

        <FormInput
          type="text"
          name="regdWardId"
          label={t['kymCoopWardNo']}
          placeholder={t['kymCoopEnterWardNo']}
        />
        <FormInput
          type="text"
          name="regdLocality"
          label={t['kymCoopLocality']}
          placeholder={t['kymCoopEnterLocality']}
        />
      </InputGroupContainer>
      <Button
        alignSelf="start"
        mt="-16px"
        leftIcon={<Icon size="md" as={FaMap} />}
      >
        {t['pinOnMap']}
      </Button>
    </GroupContainer>
  );
};
