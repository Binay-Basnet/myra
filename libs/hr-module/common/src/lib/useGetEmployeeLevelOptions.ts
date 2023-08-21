import { useGetEmployeeLevelListQuery } from '@coop/cbs/data-access';
import { getPaginationQuery } from '@coop/shared/utils';

export const useGetEployeeLevelOptions = () => {
  const { data: employeeData } = useGetEmployeeLevelListQuery({
    pagination: {
      ...getPaginationQuery(),
      first: -1,
      order: {
        arrange: 'ASC',
        column: 'ID',
      },
    },
  });
  const employeeLevelOptions =
    employeeData?.settings?.general?.HCM?.employee?.employee?.listEmployeeLevel?.edges?.map(
      (item) => ({
        label: item?.node?.name as string,
        value: item?.node?.id as string,
      })
    );
  return { employeeLevelOptions };
};

export default useGetEployeeLevelOptions;
