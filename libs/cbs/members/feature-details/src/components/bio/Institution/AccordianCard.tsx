import { Box, DetailCardContent, Grid, Text } from '@myra-ui';

interface IAccordianDetailsCOmponentCard {
  mainDetails?: {
    contactNo?: string;
    email?: string;
    pan?: string;
  };
  permanentAddress?: {
    province?: string;
    district?: string;
    localGovernment?: string;
    wardNo?: string;
    locality?: string;
    houseNo?: string;
  };
  temporaryAddress?: {
    province?: string;
    district?: string;
    localGovernment?: string;
    wardNo?: string;
    locality?: string;
    houseNo?: string;
  };
}

export const AccordianMemberDetailsCardComponent = ({
  mainDetails,
  permanentAddress,
  temporaryAddress,
}: IAccordianDetailsCOmponentCard) => (
  // const router = useRouter();
  // const memberDetails = useGetMemberDetailsOverviewQuery({
  //   id: router.query['id'] as string,
  // });

  // const memberBasicInfo =
  //   memberDetails?.data?.members?.memberOverview?.data?.overview?.basicInformation;
  <Box display="flex" flexDirection="column" p="s16" bg="white" borderRadius="br2">
    <Box display="flex" flexDirection="column" gap="s16">
      <Text fontWeight="400" fontSize="r2">
        Main Details
      </Text>
      <Grid p="s16" templateColumns="repeat(3,1fr)" gap="s16">
        <DetailCardContent title="Contact Number" subtitle={mainDetails?.contactNo} />
        <DetailCardContent title="Email" subtitle={permanentAddress?.district} />
        <DetailCardContent title="Pan" subtitle={permanentAddress?.localGovernment} />
      </Grid>
    </Box>
    <Box display="flex" flexDirection="column" gap="s16">
      <Text fontWeight="400" fontSize="r2">
        Permanent Address
      </Text>
      <Grid p="s16" templateColumns="repeat(3,1fr)" gap="s16">
        <DetailCardContent title="Province" subtitle={permanentAddress?.province} />
        <DetailCardContent title="District" subtitle={permanentAddress?.district} />
        <DetailCardContent title="Local Government" subtitle={permanentAddress?.localGovernment} />
        <DetailCardContent title="Ward No" subtitle={permanentAddress?.wardNo} />
        <DetailCardContent title="Locality" subtitle={permanentAddress?.locality} />
        <DetailCardContent title="House No" subtitle={permanentAddress?.houseNo} />
      </Grid>
    </Box>
    <Box display="flex" flexDirection="column" gap="s16">
      <Text fontWeight="400" fontSize="r2">
        Temporary Address
      </Text>
      <Grid p="s16" templateColumns="repeat(3,1fr)" gap="s16">
        <DetailCardContent title="Province" subtitle={temporaryAddress?.province} />
        <DetailCardContent title="District" subtitle={temporaryAddress?.district} />
        <DetailCardContent title="Local Government" subtitle={temporaryAddress?.localGovernment} />
        <DetailCardContent title="Ward No" subtitle={temporaryAddress?.wardNo} />
        <DetailCardContent title="Locality" subtitle={temporaryAddress?.locality} />
        <DetailCardContent title="House No" subtitle={temporaryAddress?.houseNo} />
      </Grid>
    </Box>
  </Box>
);
