import React, { useMemo } from 'react';
import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { useAllAdministrationQuery } from '@coop/shared/data-access';
import { FormInput, FormSelect } from '@coop/myra/components';
import { Text, Button, Icon } from '@coop/shared/ui';
import { FaMap } from 'react-icons/fa';

export const KymCoopRegdAddress = ({ watch }: any) => {
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
    <GroupContainer id="Registered Address" scrollMarginTop={'200px'}>
      <Text
        fontSize="r1"
        fontWeight="semibold"
        color="neutralColorLight.Gray-80"
      >
        Registered Address
      </Text>
      <InputGroupContainer>
        <FormSelect
          name="regdProvinceId"
          label="Province"
          placeholder="Select State"
          options={province}
        />
        <FormSelect
          name="regdDistrictId"
          label="District"
          placeholder="Select District"
          options={districtList.map((d) => ({
            label: d.name,
            value: d.id,
          }))}
        />
        <FormSelect
          name="regdMunicipalityId"
          label="Muncipality"
          placeholder="Select Municipality"
          options={muncipalityList.map((d) => ({
            label: d.name,
            value: d.id,
          }))}
        />

        <FormInput
          type="text"
          name="regdWardId"
          label="Ward No"
          placeholder="Enter Ward No"
        />
        <FormInput
          type="text"
          name="regdLocality"
          label="Locality"
          placeholder="Enter Locality"
        />
      </InputGroupContainer>
      <Button
        alignSelf="start"
        mt="-16px"
        leftIcon={<Icon size="md" as={FaMap} />}
      >
        Pin on Map
      </Button>
    </GroupContainer>
  );
};
