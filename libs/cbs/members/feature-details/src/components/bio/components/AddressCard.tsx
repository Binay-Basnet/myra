import { DetailCardContent } from '@myra-ui';

interface IAddressDetailsCOmponentCard {
  province: string;
  district: string;
  localGovernmemnt: string;
  wardNo: string;
  locality: string;
  houseNo: string;
}

export const AddressDetailsComponent = ({
  district,
  houseNo,
  localGovernmemnt,
  locality,
  province,
  wardNo,
}: IAddressDetailsCOmponentCard) => (
  // const router = useRouter();
  // const memberDetails = useGetMemberDetailsOverviewQuery({
  //   id: router.query['id'] as string,
  // });

  // const memberBasicInfo =
  //   memberDetails?.data?.members?.memberOverview?.data?.overview?.basicInformation;
  <>
    {province && <DetailCardContent title="Province" subtitle={province} />}
    {district && <DetailCardContent title="District" subtitle={district} />}
    {localGovernmemnt && <DetailCardContent title="Local Government" subtitle={localGovernmemnt} />}
    {wardNo && <DetailCardContent title="Ward No" subtitle={wardNo} />}
    {locality && <DetailCardContent title="Locality" subtitle={locality} />}
    {houseNo && <DetailCardContent title="House No" subtitle={houseNo} />}
  </>
);
