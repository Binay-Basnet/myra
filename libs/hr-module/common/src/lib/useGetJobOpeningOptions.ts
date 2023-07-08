import { useGetJobOpeningListQuery } from '@coop/cbs/data-access';
import { getPaginationQuery } from '@coop/shared/utils';

export const useGetJobOpeningOptions = () => {
  const { data: jobApplicationData } = useGetJobOpeningListQuery({
    pagination: {
      ...getPaginationQuery(),
      first: -1,
      order: {
        arrange: 'ASC',
        column: 'ID',
      },
    },
  });
  const jobOpeningOptions =
    jobApplicationData?.hr?.recruitment?.recruitmentJobOpening?.listJobOpening?.edges?.map(
      (item) => ({
        label: item?.node?.title as string,
        value: item?.node?.id as string,
      })
    );
  return { jobOpeningOptions };
};

export default useGetJobOpeningOptions;
