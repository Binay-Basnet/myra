import { DetailCardContent, DetailsCard } from '@myra-ui';

export const ContactDetailsInstitution = () => (
  // const router = useRouter();
  // const memberDetails = useGetMemberDetailsOverviewQuery({
  //   id: router.query['id'] as string,
  // });

  // const memberBasicInfo =
  //   memberDetails?.data?.members?.memberOverview?.data?.overview?.basicInformation;
  <DetailsCard title="Contact Details" bg="white" hasThreeRows>
    <DetailCardContent title="Phone Number" subtitle="" />
    <DetailCardContent title="Fax" subtitle="" />
    <DetailCardContent title="Email Address" subtitle="" />
    <DetailCardContent title="Website" subtitle="" />
    <DetailCardContent title="Post Box No" subtitle="" />
    <DetailCardContent title="Number of Employees" subtitle="" />
    <DetailCardContent title="AGM Details" subtitle="" />
  </DetailsCard>
);
