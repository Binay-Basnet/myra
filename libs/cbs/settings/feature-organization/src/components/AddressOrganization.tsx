import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import { InputGroupContainer } from '@coop/cbs/kym-form/ui-containers';
import { useAllAdministrationQuery } from '@coop/shared/data-access';
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
        {/* <FormInput
          type="text"
          name="permanentHouseNo"
          label={t['kymIndHouseNo']}
          placeholder={t['kymIndEnterHouseNo']}
        /> */}
      </InputGroupContainer>

      <Box mt="-16px">
        <FormMap name="location" />
      </Box>
    </Box>
  );
};
