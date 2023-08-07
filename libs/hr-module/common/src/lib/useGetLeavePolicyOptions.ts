import { useGetEmployeeLeavePolicyListQuery } from '@coop/cbs/data-access';
import { getPaginationQuery } from '@coop/shared/utils';

export const useGetLeavePolicyOptions = () => {
  const { data: leavePolicyData } = useGetEmployeeLeavePolicyListQuery({
    pagination: {
      ...getPaginationQuery(),
      first: -1,
      order: {
        arrange: 'ASC',
        column: 'ID',
      },
    },
  });
  const leavePolicyOptions =
    leavePolicyData?.settings?.general?.HCM?.employee?.leavePolicy?.listLeavePolicy?.edges?.map(
      (item) => ({
        label: item?.node?.name as string,
        value: item?.node?.id as string,
      })
    );
  return { leavePolicyOptions };
};

export default useGetLeavePolicyOptions;
