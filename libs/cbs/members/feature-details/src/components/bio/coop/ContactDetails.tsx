import { DetailCardContent, DetailsCard } from '@myra-ui';

export const ContactDetailsCOOP = () => (
  // const router = useRouter();
  // const memberDetails = useGetMemberDetailsOverviewQuery({
  //   id: router.query['id'] as string,
  // });

  // const memberBasicInfo =
  //   memberDetails?.data?.members?.memberOverview?.data?.overview?.basicInformation;
  <DetailsCard title="Contact Details" bg="white" hasThreeRows>
    <DetailCardContent title="Offfice Mail" subtitle="" />
    <DetailCardContent title="Website Link" subtitle="" />
    <DetailCardContent title="Phone Number" subtitle="" />
  </DetailsCard>
);
