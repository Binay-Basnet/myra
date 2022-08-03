import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
  GroupContainer,
  InputGroupContainer,
} from '@coop/cbs/kym-form/ui-containers';
import { useAllAdministrationQuery } from '@coop/shared/data-access';
import { KymInsInput } from '@coop/shared/data-access';
import { FormInput, FormMap, FormSelect } from '@coop/shared/form';
import { Box, Text } from '@coop/shared/ui';
import { getKymSectionInstitution, useTranslation } from '@coop/shared/utils';

import { useInstitution } from '../hooks/useInstitution';

interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}
export const OperatorOfficeAddress = (props: IProps) => {
  const { t } = useTranslation();

  const methods = useForm<KymInsInput>({
    defaultValues: {},
  });
  const { setSection } = props;

  const { watch } = methods;
  // useInstitution({ methods });
  useInstitution({ methods });

  const { data } = useAllAdministrationQuery();

  const province = useMemo(() => {
    return (
      data?.administration?.all?.map((d) => ({
        label: d.name,
        value: d.id,
      })) ?? []
    );
  }, [data?.administration?.all]);

  const currentProvinceId = watch('operatingOfficeAddress.provinceId');
  const currentDistrictId = watch('operatingOfficeAddress.districtId');
  const currentLocalityId = watch('operatingOfficeAddress.localGovernmentId');

  console.log({ currentProvinceId });
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
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymSectionInstitution(e.target.id);
          setSection(kymSection);
        }}
      >
        <GroupContainer
          id="kymInsoperatingOfficeAddress"
          scrollMarginTop={'200px'}
        >
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
                name={`operatingOfficeAddress.provinceId`}
                label={t['kymIndProvince']}
                placeholder={t['kymIndSelectProvince']}
                options={province}
              />
              <FormSelect
                name={`operatingOfficeAddress.districtId`}
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
