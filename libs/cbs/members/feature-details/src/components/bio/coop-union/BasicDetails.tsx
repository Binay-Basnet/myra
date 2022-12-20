import { DetailCardContent, DetailsCard } from '@myra-ui';

export const MemberCooperativeUnionBasicInfo = () => (
  // const router = useRouter();
  // const memberBioData = useGetMemberOverviewBioDetailsQuery({
  //   id: router.query['id'] as string,
  // const router = useRouter();

  // const bioDataCOOPUnion =
  //   memberBioData?.data?.members?.memberOverview?.data?.bio?.__typename === 'CoopUnionBio'
  //     ? memberBioData?.data?.members?.memberOverview?.data?.bio?.
  //     : null;
  <DetailsCard title="Basic Information " bg="white" hasThreeRows>
    <DetailCardContent title="Name of Institution" subtitle="" />
    <DetailCardContent title="Institution Type" subtitle="" />
    <DetailCardContent title="Nature of Institution" subtitle="" />
    <DetailCardContent title="Registration Details" subtitle="" />
    <DetailCardContent title="VAT/PAN" subtitle="" />
    <DetailCardContent title="Number of Service Center" subtitle="" />
  </DetailsCard>
);
