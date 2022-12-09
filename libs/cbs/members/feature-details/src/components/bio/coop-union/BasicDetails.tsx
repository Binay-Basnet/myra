import { DetailCardContent, DetailsCard } from '@myra-ui';

export const MemberCooperativeUnionBasicInfo = () => (
  // const router = useRouter();
  // const memberDetails = useGetMemberDetailsOverviewQuery({
  //   id: router.query['id'] as string,
  // });

  // const memberBasicInfo =
  //   memberDetails?.data?.members?.memberOverview?.data?.overview?.basicInformation;
  <DetailsCard title="Basic Information " bg="white" hasThreeRows>
    <DetailCardContent title="Name of Institution" subtitle="" />
    <DetailCardContent title="Institution Type" subtitle="" />
    <DetailCardContent title="Nature of Institution" subtitle="" />
    <DetailCardContent title="Registration Details" subtitle="" />
    <DetailCardContent title="VAT/PAN" subtitle="" />
    <DetailCardContent title="Number of Service Center" subtitle="" />
  </DetailsCard>
);
