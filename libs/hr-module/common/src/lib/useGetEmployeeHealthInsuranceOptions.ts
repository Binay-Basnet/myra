import { useGetEmployeeHealthInsuranceListQuery } from '@coop/cbs/data-access';
import { getPaginationQuery } from '@coop/shared/utils';

export const useGetEmployeeHealthInsuranceOptions = () => {
  const { data } = useGetEmployeeHealthInsuranceListQuery({
    pagination: {
      ...getPaginationQuery(),
      first: -1,
      order: {
        arrange: 'ASC',
        column: 'ID',
      },
    },
  });
  const employeeHealthInsuranceOptions =
    data?.settings?.general?.HCM?.employee?.employee?.listEmployeeHealthInsurance?.edges?.map(
      (item) => ({
        label: item?.node?.healthInsuranceProvider as string,
        value: item?.node?.id as string,
      })
    );
  return { employeeHealthInsuranceOptions };
};

export default useGetEmployeeHealthInsuranceOptions;
