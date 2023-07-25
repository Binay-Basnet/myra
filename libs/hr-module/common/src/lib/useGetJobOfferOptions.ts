import { useGetJobOfferListQuery } from '@coop/cbs/data-access';
import { getPaginationQuery } from '@coop/shared/utils';

export const useGetJobOfferOptions = () => {
  const { data: jobOfferData } = useGetJobOfferListQuery({
    pagination: {
      ...getPaginationQuery(),
      first: -1,
      order: {
        arrange: 'ASC',
        column: 'ID',
      },
    },
  });
  const jobOfferOptions =
    jobOfferData?.hr?.recruitment?.recruitmentJobOffer?.listJobOffer?.edges?.map((item) => ({
      label: item?.node?.name as string,
      value: item?.node?.id as string,
    }));
  return { jobOfferOptions };
};

export default useGetJobOfferOptions;
