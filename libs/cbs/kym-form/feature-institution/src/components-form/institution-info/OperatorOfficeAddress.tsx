import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { useAllAdministrationQuery } from '@coop/cbs/data-access';
import { KymInsInput } from '@coop/cbs/data-access';
import { FormInput, FormMap, FormSelect } from '@coop/shared/form';
import { FormSection, GridItem } from '@coop/shared/ui';
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
        <FormSection
          id="kymInsoperatingOfficeAddress"
          header="kymInsOperatorOfficeAddress"
        >
          <FormSelect
            name={`operatingOfficeAddress.provinceId`}
            label={t['kymIndProvince']}
            __placeholder={t['kymIndSelectProvince']}
            options={province}
          />
          <FormSelect
            name={`operatingOfficeAddress.districtId`}
            label={t['kymIndDistrict']}
            __placeholder={t['kymIndSelectDistrict']}
            options={districtList.map((d) => ({
              label: d.name,
              value: d.id,
            }))}
          />
          <FormSelect
            name="operatingOfficeAddress.localGovernmentId"
            label={t['kymIndLocalGovernment']}
            __placeholder={t['kymIndSelectLocalGovernment']}
            options={localityList.map((d) => ({
              label: d.name,
              value: d.id,
            }))}
          />
          <FormSelect
            name="operatingOfficeAddress.wardNo"
            label={t['kymIndWardNo']}
            __placeholder={t['kymIndEnterWardNo']}
            options={wardList?.map((d) => ({
              label: d,
              value: d,
            }))}
          />
          <FormInput
            type="text"
            name="operatingOfficeAddress.locality"
            label={t['kymIndLocality']}
            __placeholder={t['kymIndEnterLocality']}
          />
          <FormInput
            type="text"
            name="operatingOfficeAddress.houseNo"
            label={t['kymIndHouseNo']}
            __placeholder={t['kymIndEnterHouseNo']}
          />
          <GridItem colSpan={2}>
            <FormMap name="operatingOfficeAddress.coordinates" />
          </GridItem>
        </FormSection>
      </form>
    </FormProvider>
  );
};
