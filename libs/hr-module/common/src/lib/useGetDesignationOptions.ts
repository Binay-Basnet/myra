import { useGetDesignationListQuery } from '@coop/cbs/data-access';
import { getPaginationQuery } from '@coop/shared/utils';

export const useGetDesignationOptions = () => {
  const { data: designationData } = useGetDesignationListQuery({
    pagination: {
      ...getPaginationQuery(),
      first: -1,
      order: {
        arrange: 'ASC',
        column: 'ID',
      },
    },
  });
  const designationOptions =
    designationData?.settings?.general?.HCM?.employee?.employee?.listDesignation?.edges?.map(
      (item) => ({
        label: item?.node?.name as string,
        value: item?.node?.id as string,
      })
    );
  return { designationOptions };
};

export default useGetDesignationOptions;
