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

export const RegisteredDetailsInstitution = () => {
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

  const currentProvinceId = watch('registeredProvinceId');
  const currentDistrictId = watch('registeredDistrictId');

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
    <GroupContainer id="kymInsRegisteredDetails" scrollMarginTop={'200px'}>
      <Text
        fontSize="r1"
        fontWeight="semibold"
        color="neutralColorLight.Gray-80"
      >
        {t['kymInsRegisteredDetails']}
      </Text>
      <InputGroupContainer>
        <FormInput
          type="number"
          name="registeredNumber"
          label={t['kymInsRegisteredNumber']}
          placeholder={t['kymInsEnterRegisteredNumber']}
        />
        <GridItem colSpan={2}>
          <FormInput
            type="text"
            name="issuingOffice"
            label={t['kymInsIssuingOffice']}
            placeholder={t['kymInsEnterIssuingOffice']}
          />
        </GridItem>
        <FormSelect
          name="registeredProvinceId"
          label={t['kymIndProvince']}
          placeholder={t['kymIndSelectProvince']}
          options={province}
        />
        <FormSelect
          name="registeredDistrictId"
          label={t['kymIndDistrict']}
          placeholder={t['kymIndSelectDistrict']}
          options={districtList.map((d) => ({
            label: d.name,
            value: d.id,
          }))}
        />
        <FormSelect
          name="registeredLocalityId"
          label={t['kymIndLocalGovernment']}
          placeholder={t['kymIndSelectLocalGovernment']}
          options={localityList.map((d) => ({
            label: d.name,
            value: d.id,
          }))}
        />
        <FormInput
          type="number"
          name="registeredWardId"
          label={t['kymIndWardNo']}
          placeholder={t['kymIndEnterWardNo']}
        />
        <FormInput
          type="text"
          name="registeredTole"
          label={t['kymIndLocality']}
          placeholder={t['kymIndEnterLocality']}
        />
        <FormInput
          type="text"
          name="registeredHouseNo"
          label={t['kymIndHouseNo']}
          placeholder={t['kymIndEnterHouseNo']}
        />
      </InputGroupContainer>

      <Box mt="-16px">
        <FormMap name="registeredInstitutionLocation" />
      </Box>
    </GroupContainer>
  );
};
