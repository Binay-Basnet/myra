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

interface IBranchOfficeAddressProps {
  setSection: (section?: { section: string; subSection: string }) => void;
}

export const BranchOfficeAddress = ({
  setSection,
}: IBranchOfficeAddressProps) => {
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
  const currentProvinceId = watch('branchOfficeAddress.provinceId');
  const currentDistrictId = watch('branchOfficeAddress.districtId');
  const localGovernmentId = watch('branchOfficeAddress.localGovernmentId');

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
          id="Branch Office Address"
          header="serviceCenterOfficeAddress"
        >
          {' '}
          <FormSelect
            name="branchOfficeAddress.provinceId"
            label={t['kymIndProvince']}
            __placeholder={t['kymIndSelectProvince']}
            options={province}
          />
          <FormSelect
            name="branchOfficeAddress.districtId"
            label={t['kymIndDistrict']}
            __placeholder={t['kymIndSelectDistrict']}
            options={districtList.map((d) => ({
              label: d.name,
              value: d.id,
            }))}
          />
          <FormSelect
            name="branchOfficeAddress.localGovernmentId"
            label={t['kymIndLocalGovernment']}
            __placeholder={t['kymIndSelectLocalGovernment']}
            options={localityList.map((d) => ({
              label: d.name,
              value: d.id,
            }))}
          />
          <FormSelect
            name="branchOfficeAddress.wardNo"
            label={t['kymIndWardNo']}
            __placeholder={t['kymIndEnterWardNo']}
            options={wardList?.map((d) => ({
              label: d,
              value: d,
            }))}
          />
          <FormInput
            type="text"
            name="branchOfficeAddress.locality"
            label={t['kymIndLocality']}
            __placeholder={t['kymIndEnterLocality']}
          />
          <FormInput
            type="text"
            name="branchOfficeAddress.houseNo"
            label={t['kymIndHouseNo']}
            __placeholder={t['kymIndEnterHouseNo']}
          />
          <GridItem colSpan={2}>
            <FormMap name="branchOfficeAddress.coordinates" />
          </GridItem>
        </FormSection>
      </form>
    </FormProvider>
  );
};
