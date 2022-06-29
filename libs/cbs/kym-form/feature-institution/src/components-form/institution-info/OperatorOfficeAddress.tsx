import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { useAllAdministrationQuery } from '@coop/shared/data-access';
import { FormInput, FormMap, FormSelect } from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const OperatorOfficeAddress = () => {
  const { t } = useTranslation();

  const { data } = useAllAdministrationQuery();

  const { watch } = useFormContext();

  const province = useMemo(() => {
    return (
      data?.administration?.all?.map((d) => ({
        label: d.name,
        value: d.id,
      })) ?? []
    );
  }, [data?.administration?.all]);

  // FOR PERMANENT ADDRESS
  const currentProvinceId = watch('operatorOfficeProvinceId');
  const currentDistrictId = watch('operatorOfficeDistrictId');

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
    <GroupContainer id="kymInsOperatorOfficeAddress" scrollMarginTop={'200px'}>
      <Text
        fontSize="r1"
        fontWeight="semibold"
        color="neutralColorLight.Gray-80"
      >
        {t['kymInsOperatorOfficeAddress']}
      </Text>
      <Box gap="s16" display={'flex'} flexDirection="column">
        <InputGroupContainer>
          <FormSelect
            name="operatorOfficeProvinceId"
            label={t['kymIndProvince']}
            placeholder={t['kymIndSelectProvince']}
            options={province}
          />
          <FormSelect
            name="operatorOfficeDistrictId"
            label={t['kymIndDistrict']}
            placeholder={t['kymIndSelectDistrict']}
            options={districtList.map((d) => ({
              label: d.name,
              value: d.id,
            }))}
          />
          <FormSelect
            name="operatorOfficeLocalityId"
            label={t['kymIndLocalGovernment']}
            placeholder={t['kymIndSelectLocalGovernment']}
            options={localityList.map((d) => ({
              label: d.name,
              value: d.id,
            }))}
          />
          <FormInput
            type="number"
            name="operatorOfficeWardId"
            label={t['kymIndWardNo']}
            placeholder={t['kymIndEnterWardNo']}
          />
          <FormInput
            type="text"
            name="operatorOfficeTole"
            label={t['kymIndLocality']}
            placeholder={t['kymIndEnterLocality']}
          />
          <FormInput
            type="text"
            name="operatorOfficeHouseNo"
            label={t['kymIndHouseNo']}
            placeholder={t['kymIndEnterHouseNo']}
          />
        </InputGroupContainer>

        <Box>
          <FormMap name="operatorOfficeLocation" />
        </Box>
      </Box>
    </GroupContainer>
  );
};
