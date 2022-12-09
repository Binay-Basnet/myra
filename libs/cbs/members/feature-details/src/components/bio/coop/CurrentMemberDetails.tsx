import { DetailCardContent, DetailsCard } from '@myra-ui';

export const CurrentMemberDetailsCOOP = () => (
  // const router = useRouter();
  // const memberDetails = useGetMemberDetailsOverviewQuery({
  //   id: router.query['id'] as string,
  // });

  // const memberBasicInfo =
  //   memberDetails?.data?.members?.memberOverview?.data?.overview?.basicInformation;
  <DetailsCard title="Contact Details" bg="white" hasThreeRows>
    <DetailCardContent title="No. of Male Members" subtitle="" />
    <DetailCardContent title="No. of Female Members" subtitle="" />
    <DetailCardContent title="No. of Other Members" subtitle="" />
    <DetailCardContent title="Last Audit  Date" subtitle="" />
    <DetailCardContent title="Last AGM Date" subtitle="" />
  </DetailsCard>
);
