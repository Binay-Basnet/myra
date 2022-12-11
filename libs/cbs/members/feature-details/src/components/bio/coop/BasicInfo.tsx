import { DetailCardContent, DetailsCard } from '@myra-ui';

export const MemberCOOPBasicInfo = () => (
  // const router = useRouter();
  // const memberDetails = useGetMemberDetailsOverviewQuery({
  //   id: router.query['id'] as string,
  // });

  // const memberBasicInfo =
  //   memberDetails?.data?.members?.memberOverview?.data?.overview?.basicInformation;
  <DetailsCard title="Basic Information " bg="white" hasThreeRows>
    <DetailCardContent title="Name of Institution" subtitle="" />
    <DetailCardContent title="Registration No" subtitle="" />
    <DetailCardContent title="Registration Office" subtitle="" />
    <DetailCardContent title="Registration Date" subtitle="" />
  </DetailsCard>
);
