import { useGetPayGroupListQuery } from '@coop/cbs/data-access';
import { getPaginationQuery } from '@coop/shared/utils';

export const useGetPayGroupOptions = () => {
  const { data: departmentData } = useGetPayGroupListQuery({
    pagination: {
      ...getPaginationQuery(),
      first: -1,
      order: {
        arrange: 'ASC',
        column: 'ID',
      },
    },
  });
  const payGroupOptions =
    departmentData?.settings?.general?.HCM?.payroll?.paygroup?.listPayGroup?.edges?.map((item) => ({
      label: item?.node?.name as string,
      value: item?.node?.id as string,
    }));
  return { payGroupOptions };
};

export default useGetPayGroupOptions;
