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

export const BranchOfficeAddress = (props: IProps) => {
  const { t } = useTranslation();

  const { data } = useAllAdministrationQuery();

  const methods = useForm<KymInsInput>({
    defaultValues: {},
  });
  const { setSection } = props;

  const { watch } = methods;
  useInstitution({ methods });

  const province = useMemo(() => {
    return (
      data?.administration?.all?.map((d) => ({
        label: d.name,
        value: d.id,
      })) ?? []
    );
  }, [data?.administration?.all]);

  // FOR PERMANENT ADDRESS
  const currentprovinceId = watch(`branchOfficeAddress.provinceId`);
  const currentdistrictId = watch(`branchOfficeAddress.districtId`);
  const currentLocalityId = watch('branchOfficeAddress.localGovernmentId');
  const districtList = useMemo(
    () =>
      data?.administration.all.find((d) => d.id === currentprovinceId)
        ?.districts ?? [],
    [currentprovinceId]
  );

  const localityList = useMemo(
    () =>
      districtList.find((d) => d.id === currentdistrictId)?.municipalities ??
      [],
    [currentdistrictId]
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
          id="kymInsbranchOfficeAddress"
          header="serviceCenterOfficeAddress"
        >
          <FormSelect
            id="branchOfficeAddress"
            name={`branchOfficeAddress.provinceId`}
            label={t['kymIndProvince']}
            __placeholder={t['kymIndSelectProvince']}
            options={province}
          />
          <FormSelect
            id="branchOfficeAddress"
            name={`branchOfficeAddress.districtId`}
            label={t['kymIndDistrict']}
            __placeholder={t['kymIndSelectDistrict']}
            options={districtList.map((d) => ({
              label: d.name,
              value: d.id,
            }))}
          />
          <FormSelect
            id="branchOfficeAddress"
            name="branchOfficeAddress.localGovernmentId"
            label={t['kymIndLocalGovernment']}
            __placeholder={t['kymIndSelectLocalGovernment']}
            options={localityList.map((d) => ({
              label: d.name,
              value: d.id,
            }))}
          />
          <FormSelect
            id="branchOfficeAddress"
            name="branchOfficeAddress.wardNo"
            label={t['kymIndWardNo']}
            options={wardList?.map((d) => ({
              label: d,
              value: d,
            }))}
            __placeholder={t['kymIndEnterWardNo']}
          />
          <FormInput
            id="branchOfficeAddress"
            type="text"
            name="branchOfficeAddress.locality"
            label={t['kymIndLocality']}
            __placeholder={t['kymIndEnterLocality']}
          />
          <FormInput
            id="branchOfficeAddress"
            type="text"
            name="branchOfficeAddress.houseNo"
            label={t['kymIndHouseNo']}
            __placeholder={t['kymIndEnterHouseNo']}
          />
          <GridItem colSpan={2}>
            <FormMap
              name="branchOfficeAddress.coordinates"
              id="branchOfficeAddress"
            />
          </GridItem>
        </FormSection>
      </form>
    </FormProvider>
  );
};
