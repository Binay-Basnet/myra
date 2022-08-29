import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import { useAllAdministrationQuery } from '@coop/cbs/data-access';
import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { FormInput, FormMap, FormSelect } from '@coop/shared/form';
import { Box } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const AddressOrganization = () => {
  const { t } = useTranslation();

  const { watch } = useFormContext();

  const { data } = useAllAdministrationQuery();

  const province = useMemo(() => {
    return (
      data?.administration?.all?.map((d) => ({
        label: d.name,
        value: d.id,
      })) ?? []
    );
  }, [data?.administration?.all]);

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

  return (
    <Box
      id="Permanent Address"
      gap="s32"
      display={'flex'}
      flexDirection="column"
    >
      <InputGroupContainer>
        <FormSelect
          name="provinceId"
          label={t['kymIndProvince']}
          __placeholder={t['kymIndSelectProvince']}
          options={province}
        />
        <FormSelect
          name="districtId"
          label={t['kymIndDistrict']}
          __placeholder={t['kymIndSelectDistrict']}
          options={districtList.map((d) => ({
            label: d.name,
            value: d.id,
          }))}
        />
        <FormSelect
          name="localGovernmentId"
          label={t['kymIndLocalGovernment']}
          __placeholder={t['kymIndSelectLocalGovernment']}
          options={localityList.map((d) => ({
            label: d.name,
            value: d.id,
          }))}
        />
        <FormSelect
          name="wardNo"
          label={t['kymIndWardNo']}
          __placeholder={t['kymIndEnterWardNo']}
          options={wardList.map((d) => ({
            label: d,
            value: d,
          }))}
        />
        <FormInput
          type="text"
          name="locality"
          label={t['kymIndLocality']}
          __placeholder={t['kymIndEnterLocality']}
        />
        {/* <FormInput
          type="text"
          name="permanentHouseNo"
          label={t['kymIndHouseNo']}
          __placeholder={t['kymIndEnterHouseNo']}
        /> */}
      </InputGroupContainer>

      <Box mt="-16px">
        <FormMap name="location" />
      </Box>
    </Box>
  );
};
