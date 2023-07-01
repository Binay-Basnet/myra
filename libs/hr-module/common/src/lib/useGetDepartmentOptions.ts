import { useGetDepartmentListQuery } from '@coop/cbs/data-access';
import { getPaginationQuery } from '@coop/shared/utils';

export const useGetDepartmentOptions = () => {
  const { data: departmentData } = useGetDepartmentListQuery({
    pagination: {
      ...getPaginationQuery(),
      first: -1,
      order: {
        arrange: 'ASC',
        column: 'ID',
      },
    },
  });
  const departmentOptions =
    departmentData?.settings?.general?.HCM?.employee?.employee?.listDepartment?.edges?.map(
      (item) => ({
        label: item?.node?.name as string,
        value: item?.node?.id as string,
      })
    );
  return { departmentOptions };
};

export default useGetDepartmentOptions;
