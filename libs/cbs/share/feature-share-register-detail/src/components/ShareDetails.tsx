import { DetailCardContent, DetailsCard } from '@myra-ui';

import { RedirectButton, ROUTES } from '@coop/cbs/utils';

type ShareDetailProps = {
  shareDetails:
    | {
        id: string | null | undefined;
        date: string | null | undefined;
        type: string | null | undefined;
        fromTo:
          | {
              start?: number | null | undefined;
              end?: number | null | undefined;
            }
          | null
          | undefined;
        noOfShare: number | null | undefined;
        amount: string | null | undefined;
        total: string | null | undefined;
        status: string | null | undefined;
      }
    | null
    | undefined;
};

export const ShareDetails = ({ shareDetails }: ShareDetailProps) => (
  <DetailsCard title="Share Details" hasThreeRows>
    <DetailCardContent
      title="ID"
      children={
        <RedirectButton
          link={`${ROUTES.CBS_TRANS_ALL_TRANSACTIONS_DETAILS}?id=${shareDetails?.id}`}
          label={shareDetails?.id as string}
        />
      }
    />
    <DetailCardContent title="Date" subtitle={shareDetails?.date} />
    <DetailCardContent title="Type" subtitle={shareDetails?.type} />
    <DetailCardContent
      title="From - To"
      subtitle={`${shareDetails?.fromTo?.start}-${shareDetails?.fromTo?.end}`}
    />
    <DetailCardContent title="No of Share" subtitle={shareDetails?.noOfShare} />
    <DetailCardContent title="Share Amount" subtitle={shareDetails?.amount} />
    <DetailCardContent title="Total" subtitle={shareDetails?.total} />
    <DetailCardContent title="Status" subtitle={shareDetails?.status} />
  </DetailsCard>
);
