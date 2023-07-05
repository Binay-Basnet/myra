import { useGetJobApplicationListQuery } from '@coop/cbs/data-access';
import { getPaginationQuery } from '@coop/shared/utils';

export const useGetJobApplicantOptions = () => {
  const { data: jobApplicationData } = useGetJobApplicationListQuery({
    pagination: {
      ...getPaginationQuery(),
      first: -1,
      order: {
        arrange: 'ASC',
        column: 'ID',
      },
    },
  });
  const jobApplicationOptions =
    jobApplicationData?.hr?.recruitment?.recruitmentJobApplication?.listJobApplication?.edges?.map(
      (item) => ({
        label: item?.node?.name as string,
        value: item?.node?.id as string,
      })
    );
  return { jobApplicationOptions };
};

export default useGetJobApplicantOptions;
