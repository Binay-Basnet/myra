import { useGetEmployeeLeaveTypeListQuery } from '@coop/cbs/data-access';
import { getPaginationQuery } from '@coop/shared/utils';

export const useGetLeaveTypeOptions = () => {
  const { data: leaveTypeData } = useGetEmployeeLeaveTypeListQuery({
    pagination: {
      ...getPaginationQuery(),
      first: -1,
      order: {
        arrange: 'ASC',
        column: 'ID',
      },
    },
  });
  const leaveTypeOptions =
    leaveTypeData?.settings?.general?.HCM?.employee?.leave?.listLeaveType?.edges?.map((item) => ({
      label: item?.node?.name as string,
      value: item?.node?.id as string,
    }));
  return { leaveTypeOptions };
};

export default useGetLeaveTypeOptions;
