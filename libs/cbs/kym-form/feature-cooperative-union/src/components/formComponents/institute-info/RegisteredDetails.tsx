import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { useAllAdministrationQuery } from '@coop/shared/data-access';
import { FormInput, FormMap, FormSelect } from '@coop/shared/form';
import { Box, GridItem, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

export const RegisteredDetails = () => {
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

  const currentProvinceId = watch('regdProvinceId');
  const currentDistrictId = watch('regdDistrictId');

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
    <GroupContainer
      id="kymCoopUnionAccRegisteredDetails"
      scrollMarginTop={'200px'}
    >
      <Text
        fontSize="r1"
        fontWeight="semibold"
        color="neutralColorLight.Gray-80"
      >
        {t['kymCoopUnionRegisteredDetails']}
      </Text>
      <InputGroupContainer>
        <FormInput
          type="number"
          name="regdNo"
          label={t['kymCoopUnionRegisteredNumber']}
          placeholder={t['kymCoopUnionEnterRegisteredNumber']}
        />

        <GridItem colSpan={2}>
          <FormInput
            type="text"
            name="issuingOffice"
            label={t['kymCoopUnionIssuingOffice']}
            placeholder={t['kymCoopUnionEnterIssuingOffice']}
          />
        </GridItem>

        <FormSelect
          name="regdProvinceId"
          label={t['kymIndProvince']}
          placeholder={t['kymIndSelectProvince']}
          options={province}
        />
        <FormSelect
          name="regdDistrictId"
          label={t['kymIndDistrict']}
          placeholder={t['kymIndSelectDistrict']}
          options={districtList.map((d) => ({
            label: d.name,
            value: d.id,
          }))}
        />
        <FormSelect
          name="regdLocalityId"
          label={t['kymIndLocalGovernment']}
          placeholder={t['kymIndSelectLocalGovernment']}
          options={localityList.map((d) => ({
            label: d.name,
            value: d.id,
          }))}
        />
        <FormInput
          type="number"
          name="regdWardId"
          label={t['kymIndWardNo']}
          placeholder={t['kymIndEnterWardNo']}
        />
        <FormInput
          type="text"
          name="regdTole"
          label={t['kymIndLocality']}
          placeholder={t['kymIndEnterLocality']}
        />
      </InputGroupContainer>
      <Box mt="-16px">
        <FormMap name={`regdLocation`} />
      </Box>
    </GroupContainer>
  );
};
