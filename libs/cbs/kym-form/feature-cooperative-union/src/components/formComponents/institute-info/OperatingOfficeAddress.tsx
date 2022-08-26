import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
  CoopUnionInstitutionInformationInput,
  useAllAdministrationQuery,
} from '@coop/cbs/data-access';
import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { FormInput, FormMap, FormSelect } from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';
import { getKymSectionCoOperativeUnion } from '@coop/shared/utils';

import { useCooperativeUnionInstitution } from '../../../hooks';

interface IOperatingOfficeAddressProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const OperatingOfficeAddress = ({
  setSection,
}: IOperatingOfficeAddressProps) => {
  const { t } = useTranslation();

  const { data } = useAllAdministrationQuery();

  const methods = useForm<CoopUnionInstitutionInformationInput>();

  const { watch } = methods;
  useCooperativeUnionInstitution({ methods });

  const province = useMemo(() => {
    return (
      data?.administration?.all?.map((d) => ({
        label: d.name,
        value: d.id,
      })) ?? []
    );
  }, [data?.administration?.all]);

  // FOR PERMANENT ADDRESS
  const currentProvinceId = watch('operatingOfficeAddress.provinceId');
  const currentDistrictId = watch('operatingOfficeAddress.districtId');
  const localGovernmentId = watch('operatingOfficeAddress.localGovernmentId');

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
    () => localityList.find((d) => d.id === localGovernmentId)?.wards ?? [],
    [localGovernmentId]
  );
  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymSectionCoOperativeUnion(e.target.id);

          setSection(kymSection);
        }}
      >
        <GroupContainer id="Operating Office Address" scrollMarginTop={'200px'}>
          <Text
            fontSize="r1"
            fontWeight="semibold"
            color="neutralColorLight.Gray-80"
          >
            {t['kymCoopUnionOperatorOfficeAddress']}
          </Text>
          <Box
            id="Operating Office Address"
            gap="s16"
            display={'flex'}
            flexDirection="column"
          >
            <InputGroupContainer>
              <FormSelect
                name="operatingOfficeAddress.provinceId"
                label={t['kymIndProvince']}
                placeholder={t['kymIndSelectProvince']}
                options={province}
              />
              <FormSelect
                name="operatingOfficeAddress.districtId"
                label={t['kymIndDistrict']}
                placeholder={t['kymIndSelectDistrict']}
                options={districtList.map((d) => ({
                  label: d.name,
                  value: d.id,
                }))}
              />
              <FormSelect
                name="operatingOfficeAddress.localGovernmentId"
                label={t['kymIndLocalGovernment']}
                placeholder={t['kymIndSelectLocalGovernment']}
                options={localityList.map((d) => ({
                  label: d.name,
                  value: d.id,
                }))}
              />
              <FormSelect
                name="operatingOfficeAddress.wardNo"
                label={t['kymIndWardNo']}
                placeholder={t['kymIndEnterWardNo']}
                options={wardList?.map((d) => ({
                  label: d,
                  value: d,
                }))}
              />
              <FormInput
                type="text"
                name="operatingOfficeAddress.locality"
                label={t['kymIndLocality']}
                placeholder={t['kymIndEnterLocality']}
              />
              <FormInput
                type="text"
                name="operatingOfficeAddress.houseNo"
                label={t['kymIndHouseNo']}
                placeholder={t['kymIndEnterHouseNo']}
              />
            </InputGroupContainer>

            <Box>
              <FormMap name="operatingOfficeAddress.coordinates" />
            </Box>
          </Box>
        </GroupContainer>
      </form>
    </FormProvider>
  );
};
