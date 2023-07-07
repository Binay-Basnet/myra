import { useGetStaffPlanningListQuery } from '@coop/cbs/data-access';
import { getPaginationQuery } from '@coop/shared/utils';

export const useGetStaffPlanningOptions = () => {
  const { data: staffPlanningData } = useGetStaffPlanningListQuery({
    pagination: {
      ...getPaginationQuery(),
      first: -1,
      order: {
        arrange: 'ASC',
        column: 'ID',
      },
    },
  });
  const staffPlanningOptions =
    staffPlanningData?.hr?.recruitment?.recruitment?.listStaffPlanning?.edges?.map((item) => ({
      label: item?.node?.staffPlanTitle as string,
      value: item?.node?.id as string,
    }));
  return { staffPlanningOptions };
};

export default useGetStaffPlanningOptions;
