import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { KymCooperativeFormInput, useAllAdministrationQuery } from '@coop/cbs/data-access';
import { FormInput, FormMap, FormSelect } from '@coop/shared/form';
import { FormSection, GridItem } from '@coop/shared/ui';
import { getKymCoopSection, useTranslation } from '@coop/shared/utils';

import { useCooperative } from '../../hooks/useCooperative';

interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const KymCoopOpAddress = (props: IProps) => {
  const { t } = useTranslation();

  const { setSection } = props;
  const methods = useForm<KymCooperativeFormInput>({
    defaultValues: {},
  });
  const { watch } = methods;
  useCooperative({ methods });
  const { data } = useAllAdministrationQuery();

  const province = useMemo(
    () =>
      data?.administration?.all?.map((d) => ({
        label: d.name,
        value: d.id,
      })) ?? [],
    [data?.administration?.all]
  );

  // FOR PERMANENT ADDRESS
  const currentProvinceId = watch('operatingAddress.provinceId');
  const currentDistrictId = watch('operatingAddress.districtId');
  const currentLocalityId = watch('operatingAddress.localGovernmentId');

  const districtList = useMemo(
    () => data?.administration.all.find((d) => d.id === currentProvinceId)?.districts ?? [],
    [currentProvinceId]
  );

  const muncipalityList = useMemo(
    () => districtList.find((d) => d.id === currentDistrictId)?.municipalities ?? [],
    [currentDistrictId]
  );
  const wardList = useMemo(
    () => muncipalityList.find((d) => d.id === currentLocalityId)?.wards ?? [],
    [currentLocalityId]
  );
  return (
    <FormProvider {...methods}>
      <form
        onFocus={(e) => {
          const kymSection = getKymCoopSection(e.target.id);
          setSection(kymSection);
        }}
      >
        <FormSection id="kymCoopAccOperatingAddress" header="kymCoopOperatingAddress">
          <FormSelect
            name="operatingAddress.provinceId"
            label={t['kymCoopProvince']}
            options={province}
            id="operatingAddressCOOP"
          />
          <FormSelect
            id="operatingAddressCOOP"
            name="operatingAddress.districtId"
            label={t['kymCoopDistrict']}
            options={districtList.map((d) => ({
              label: d.name,
              value: d.id,
            }))}
          />
          <FormSelect
            id="operatingAddressCOOP"
            name="operatingAddress.localGovernmentId"
            label={t['kymCoopVDCLocalGov']}
            options={muncipalityList.map((d) => ({
              label: d.name,
              value: d.id,
            }))}
          />

          <FormSelect
            id="operatingAddressCOOP"
            name="operatingAddress.wardNo"
            label={t['kymCoopWardNo']}
            options={wardList?.map((d) => ({
              label: d,
              value: d,
            }))}
          />
          <FormInput
            id="operatingAddressCOOP"
            type="text"
            name="operatingAddress.locality"
            label={t['kymCoopLocality']}
          />
          <FormInput
            id="operatingAddressCOOP"
            type="text"
            name="operatingAddress.houseNo"
            label={t['kymCoopRepresentativeHouseNo']}
          />

          <GridItem colSpan={2}>
            <FormMap name="operatingAddress.coordinates" id="operatingAddressCOOP" />
          </GridItem>
        </FormSection>
      </form>
    </FormProvider>
  );
};
