import { useAllAdministrationQuery } from '@coop/cbs/data-access';

interface IOptions {
  label: string;
  value: string;
}
export const useAdminsitration = () => {
  const { status, data } = useAllAdministrationQuery();

  if (status === 'loading') return null;

  if (data) {
    const provinceOptions = data.administration.all.map(({ id, name }) => ({
      label: name,
      value: id,
    }));

    const allProvinces = data.administration.all;

    const districtsOptions = allProvinces.reduce(
      (obj, curr) => ({
        ...obj,
        [curr.id]: curr.districts.map(({ id, name }) => ({
          label: name,
          value: id,
        })),
      }),
      {} as { [key: string]: Array<IOptions> }
    );

    return { provinces: provinceOptions, districts: districtsOptions };
  }
  return null;
};
