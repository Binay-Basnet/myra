import { useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import {
  CoopUnionInstitutionInformationInput,
  useAllAdministrationQuery,
} from '@coop/cbs/data-access';
import { FormInput, FormMap, FormSelect } from '@coop/shared/form';
import { FormSection, GridItem } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';
import { getKymSectionCoOperativeUnion } from '@coop/shared/utils';

import { useCooperativeUnionInstitution } from '../../../hooks';

interface IRegisteredDetailsProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const RegisteredDetails = ({ setSection }: IRegisteredDetailsProps) => {
  const { t } = useTranslation();

  const { data } = useAllAdministrationQuery();

  const methods = useForm<CoopUnionInstitutionInformationInput>();

  const { watch } = methods;

  const { sectionStatus } = useCooperativeUnionInstitution({ methods });
  const sectionErrors = sectionStatus?.errors?.[0]?.errors;

  const province = useMemo(() => {
    return (
      data?.administration?.all?.map((d) => ({
        label: d.name,
        value: d.id,
      })) ?? []
    );
  }, [data?.administration?.all]);

  const currentProvinceId = watch('regdAddress.provinceId');
  const currentDistrictId = watch('regdAddress.districtId');
  const localGovernmentId = watch('regdAddress.localGovernmentId');

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
        <FormSection
          id="kymCoopUnionAccRegisteredDetails"
          header="kymCoopUnionRegisteredDetails"
        >
          <FormInput
            type="number"
            name="regdNo"
            label={t['kymCoopUnionRegisteredNumber']}
            __placeholder={t['kymCoopUnionEnterRegisteredNumber']}
            errorText={sectionErrors?.['regdNo'] && sectionErrors['regdNo'][0]}
          />
          <GridItem colSpan={2}>
            <FormInput
              type="text"
              name="issuingOffice"
              label={t['kymCoopUnionIssuingOffice']}
              __placeholder={t['kymCoopUnionEnterIssuingOffice']}
              errorText={
                sectionErrors?.['issuingOffice'] &&
                sectionErrors['issuingOffice'][0]
              }
            />
          </GridItem>
          <FormSelect
            name="regdAddress.provinceId"
            label={t['kymIndProvince']}
            __placeholder={t['kymIndSelectProvince']}
            options={province}
          />
          <FormSelect
            name="regdAddress.districtId"
            label={t['kymIndDistrict']}
            __placeholder={t['kymIndSelectDistrict']}
            options={districtList.map((d) => ({
              label: d.name,
              value: d.id,
            }))}
          />
          <FormSelect
            name="regdAddress.localGovernmentId"
            label={t['kymIndLocalGovernment']}
            __placeholder={t['kymIndSelectLocalGovernment']}
            options={localityList.map((d) => ({
              label: d.name,
              value: d.id,
            }))}
          />
          <FormSelect
            name="regdAddress.wardNo"
            label={t['kymIndWardNo']}
            __placeholder={t['kymIndEnterWardNo']}
            options={wardList?.map((d) => ({
              label: d,
              value: d,
            }))}
          />
          <FormInput
            type="text"
            name="regdAddress.locality"
            label={t['kymIndLocality']}
            __placeholder={t['kymIndEnterLocality']}
          />
          <GridItem colSpan={2}>
            <FormMap name={`regdAddress.coordinates`} />
          </GridItem>
        </FormSection>
      </form>
    </FormProvider>
  );
};
