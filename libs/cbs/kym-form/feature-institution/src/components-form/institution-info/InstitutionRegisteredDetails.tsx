import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { KymInsInput, useAllAdministrationQuery } from '@coop/cbs/data-access';
import { FormInput, FormMap, FormSelect } from '@coop/shared/form';
import { FormSection, GridItem } from '@coop/shared/ui';
import { getKymSectionInstitution, useTranslation } from '@coop/shared/utils';

import { useInstitution } from '../hooks/useInstitution';

interface IProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}
export const RegisteredDetailsInstitution = (props: IProps) => {
  const { t } = useTranslation();

  const methods = useForm<KymInsInput>();
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

  const currentProvinceId = watch('registeredAddress.provinceId');
  const currentDistrictId = watch('registeredAddress.districtId');
  const currentLocalityId = watch('registeredAddress.localGovernmentId');

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
          id="kymInsRegisteredDetails"
          header="kymInsRegisteredDetails"
        >
          {' '}
          <FormInput
            id="registeredDetailsInstitution"
            type="number"
            name="registeredNumber"
            label={t['kymInsRegisteredNumber']}
            __placeholder={t['kymInsEnterRegisteredNumber']}
          />
          <GridItem colSpan={2}>
            <FormInput
              id="registeredDetailsInstitution"
              type="text"
              name="issuingOffice"
              label={t['kymInsIssuingOffice']}
              __placeholder={t['kymInsEnterIssuingOffice']}
            />
          </GridItem>
          <FormSelect
            name="registeredAddress.provinceId"
            id="registeredDetailsInstitution"
            label={t['kymIndProvince']}
            __placeholder={t['kymIndSelectProvince']}
            options={province}
          />
          <FormSelect
            name="registeredAddress.districtId"
            id="registeredDetailsInstitution"
            label={t['kymIndDistrict']}
            __placeholder={t['kymIndSelectDistrict']}
            options={districtList.map((d) => ({
              label: d.name,
              value: d.id,
            }))}
          />
          <FormSelect
            id="registeredDetailsInstitution"
            name="registeredAddress.localGovernmentId"
            label={t['kymIndLocalGovernment']}
            __placeholder={t['kymIndSelectLocalGovernment']}
            options={localityList.map((d) => ({
              label: d.name,
              value: d.id,
            }))}
          />
          <FormSelect
            id="registeredDetailsInstitution"
            name="registeredAddress.wardNo"
            label={t['kymIndWardNo']}
            __placeholder={t['kymIndEnterWardNo']}
            options={wardList?.map((d) => ({
              label: d,
              value: d,
            }))}
          />
          <FormInput
            id="registeredDetailsInstitution"
            type="text"
            name="registeredAddress.locality"
            label={t['kymIndLocality']}
            __placeholder={t['kymIndEnterLocality']}
          />
          <FormInput
            id="registeredDetailsInstitution"
            type="text"
            name="registeredAddress.houseNo"
            label={t['kymIndHouseNo']}
            __placeholder={t['kymIndEnterHouseNo']}
          />
          <GridItem colSpan={2}>
            <FormMap
              id="registeredDetailsInstitution"
              name="registeredAddress.coordinates"
            />
          </GridItem>
        </FormSection>
      </form>
    </FormProvider>
  );
};
