import { useMemo } from 'react';
import { useFormContext } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';

import { axiosAgent } from '@coop/cbs/data-access';
// import { useAllAdministrationQuery } from '@coop/cbs/data-access';
import { getAPIUrl } from '@coop/shared/utils';

interface IUseAddressProps {
  name: string;
}

export type AllAdministrationQuery = {
  id: number;
  name: string;
  districts: {
    id: number;
    name: string;
    municipalities: { id: number; name: string; wards: Array<number> }[];
  }[];
}[];
const schemaPath = getAPIUrl();

const getAdministration = async () => {
  const response = await axiosAgent.get<AllAdministrationQuery>(`${schemaPath}/administration`);

  return response?.data;
};

export const useAddress = ({ name }: IUseAddressProps) => {
  const { watch } = useFormContext();
  const { data } = useQuery(['admination'], getAdministration);

  const provinceList = useMemo(
    () =>
      data?.map((d) => ({
        label: d.name,
        value: d.id,
      })) ?? [],
    [data]
  );

  const currentProvinceId = watch(`${name}.provinceId`);
  const currentDistrictId = watch(`${name}.districtId`);
  const localGovernmentId = watch(`${name}.localGovernmentId`);

  const districtList = useMemo(
    () => data?.find((d) => d.id === currentProvinceId)?.districts ?? [],
    [currentProvinceId, data]
  );

  const localityList = useMemo(
    () => districtList.find((d) => d.id === currentDistrictId)?.municipalities ?? [],
    [currentDistrictId, districtList]
  );

  const wardList = useMemo(
    () => localityList.find((d) => d.id === localGovernmentId)?.wards ?? [],
    [localGovernmentId, localityList]
  );

  return {
    provinceList: [...provinceList],
    districtList,
    localityList,
    wardList,
  };
};
