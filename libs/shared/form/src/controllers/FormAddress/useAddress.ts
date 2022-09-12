import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';

import { useAllAdministrationQuery } from '@coop/cbs/data-access';

interface IUseAddressProps {
  name: string;
}

export const useAddress = ({ name }: IUseAddressProps) => {
  const { watch } = useFormContext();
  const { data } = useAllAdministrationQuery();

  const provinceList = useMemo(() => {
    return (
      data?.administration?.all?.map((d) => ({
        label: d.name,
        value: d.id,
      })) ?? []
    );
  }, [data?.administration?.all]);

  const currentProvinceId = watch(`${name}.provinceId`);
  const currentDistrictId = watch(`${name}.districtId`);
  const localGovernmentId = watch(`${name}.localGovernmentId`);

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

  return {
    provinceList: [...provinceList, { label: 'Planet 9', value: '9' }],
    districtList,
    localityList,
    wardList,
  };
};
