import { useEffect, useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { useAllAdministrationQuery } from '@coop/shared/data-access';
import { FormInput, FormMap, FormSelect } from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const BranchOfficeAddress = () => {
  const { t } = useTranslation();

  const { data } = useAllAdministrationQuery();

  const { watch, reset, getValues, setValue } = useFormContext();

  const province = useMemo(() => {
    return (
      data?.administration?.all?.map((d) => ({
        label: d.name,
        value: d.id,
      })) ?? []
    );
  }, [data?.administration?.all]);

  // FOR PERMANENT ADDRESS
  const currentProvinceId = watch('branchOfficeProvinceId');
  const currentDistrictId = watch('branchOfficeDistrictId');

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

  useEffect(() => {
    // reset('branchOfficeDistrictId');

    // reset('branchOfficeLocalityId');

    console.log({ currentProvinceId });

    if (currentProvinceId) {
      // reset({
      //   ...getValues(),
      //   branchOfficeDistrictId: '',
      //   branchOfficeLocalityId: '',
      // });

      setValue('branchOfficeDistrictId', '');
      setValue('branchOfficeLocalityId', '');
    }
  }, [currentProvinceId]);

  useEffect(() => {
    console.log({ currentDistrictId });
    if (currentDistrictId) {
      reset({ ...getValues(), branchOfficeLocalityId: '' });
    }
  }, [currentDistrictId]);

  return (
    <GroupContainer id="Branch Office Address" scrollMarginTop={'200px'}>
      <Text
        fontSize="r1"
        fontWeight="semibold"
        color="neutralColorLight.Gray-80"
      >
        {t['kymInsbranchOfficeAddress']}
      </Text>
      <Box
        id="branch Office Address"
        gap="s16"
        display={'flex'}
        flexDirection="column"
      >
        <InputGroupContainer>
          <FormSelect
            name="branchOfficeProvinceId"
            label={t['kymIndProvince']}
            placeholder={t['kymIndSelectProvince']}
            options={province}
          />
          <FormSelect
            name="branchOfficeDistrictId"
            label={t['kymIndDistrict']}
            placeholder={t['kymIndSelectDistrict']}
            options={districtList.map((d) => ({
              label: d.name,
              value: d.id,
            }))}
          />
          <FormSelect
            name="branchOfficeLocalityId"
            label={t['kymIndLocalGovernment']}
            placeholder={t['kymIndSelectLocalGovernment']}
            options={localityList.map((d) => ({
              label: d.name,
              value: d.id,
            }))}
          />
          <FormInput
            type="number"
            name="branchOfficeWardId"
            label={t['kymIndWardNo']}
            placeholder={t['kymIndEnterWardNo']}
          />
          <FormInput
            type="text"
            name="branchOfficeTole"
            label={t['kymIndLocality']}
            placeholder={t['kymIndEnterLocality']}
          />
          <FormInput
            type="text"
            name="branchOfficeHouseNo"
            label={t['kymIndHouseNo']}
            placeholder={t['kymIndEnterHouseNo']}
          />
        </InputGroupContainer>

        <Box>
          <FormMap name="branchOfficeLocation" />
        </Box>
      </Box>
    </GroupContainer>
  );
};
