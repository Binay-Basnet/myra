import { FaRegEdit } from 'react-icons/fa';
import { useRouter } from 'next/router';

import { Box, DetailCardContent, Grid, Icon, Text } from '@myra-ui';

import { Organization } from '@coop/cbs/data-access';
import { ROUTES } from '@coop/cbs/utils';

export const OrganizationalProfile = (props: { data?: Organization | null }) => {
  const { data } = props;
  const router = useRouter();
  return (
    <>
      <Text fontSize="r3" fontWeight="medium">
        Organizational Profile
      </Text>
      <Box
        display="flex"
        alignItems="center"
        p="s16"
        bg="white"
        borderRadius={5}
        w="-webkit-fit-content"
        gap={2}
        cursor="pointer"
        onClick={() => router.push(ROUTES?.SETTINGS_GENERAL_ORGANIZATION_EDIT)}
      >
        <Icon as={FaRegEdit} />
        <Text cursor="pointer" fontSize="s3">
          Edit Organization Data
        </Text>
      </Box>
      <Box p="s16" bg="white" borderRadius={5}>
        <Text fontWeight="medium">Basic Details</Text>
        <Grid templateColumns="repeat(3, 1fr)" rowGap="s48" columnGap="80px" py="s8">
          <DetailCardContent title="Name of Organization" subtitle={data?.basicDetails?.name} />
          <DetailCardContent
            title="Type of Organization"
            subtitle={data?.basicDetails?.typeOfOrganization}
          />
        </Grid>
      </Box>
      <Box p="s16" bg="white" borderRadius={5}>
        <Text fontWeight="medium">Contact Details</Text>
        <Grid templateColumns="repeat(3, 1fr)" rowGap="s48" columnGap="80px" py="s8">
          <DetailCardContent title="Email" subtitle={data?.contactDetails?.email} />
          <DetailCardContent title="Phone Number" subtitle={data?.contactDetails?.phoneNumber} />
          <DetailCardContent title="Website" subtitle={data?.contactDetails?.website} />
        </Grid>
      </Box>
      <Box p="s16" bg="white" borderRadius={5}>
        <Text fontWeight="medium">Main Contact Person</Text>
        <Grid templateColumns="repeat(3, 1fr)" rowGap="s48" columnGap="80px" py="s8">
          <DetailCardContent
            title="Contact No"
            subtitle={data?.mainContactPerson?.contactPersonContactNumber}
          />
          <DetailCardContent title="Name" subtitle={data?.mainContactPerson?.contactPersonName} />
          <DetailCardContent title="Title" subtitle={data?.mainContactPerson?.title} />
        </Grid>
      </Box>
      <Box p="s16" bg="white" borderRadius={5}>
        <Text fontWeight="medium">Address Details</Text>
        <Grid templateColumns="repeat(3, 1fr)" rowGap="s48" columnGap="80px" py="s8">
          <DetailCardContent title="Province" subtitle={data?.address?.state?.local} />
          <DetailCardContent title="District" subtitle={data?.address?.district?.local} />
          <DetailCardContent
            title="Local Government"
            subtitle={data?.address?.localGovernment?.local}
          />
          <DetailCardContent title="Ward No" subtitle={data?.address?.wardNo} />
          <DetailCardContent title="Locality" subtitle={data?.address?.locality?.local} />
        </Grid>
      </Box>
      <Box p="s16" bg="white" borderRadius={5}>
        <Text fontWeight="medium">Registered Details</Text>
        <Grid templateColumns="repeat(3, 1fr)" rowGap="s48" columnGap="80px" py="s8">
          <DetailCardContent
            title="Registered Address"
            subtitle={data?.registrationDetails?.regdAddress}
          />
          <DetailCardContent
            title="Registered Number"
            subtitle={data?.registrationDetails?.regdNo}
          />
          <DetailCardContent
            title="Registered Office"
            subtitle={data?.registrationDetails?.regdOffice}
          />
          <DetailCardContent title="Pan or Vat" subtitle={data?.registrationDetails?.panOrVat} />
        </Grid>
      </Box>
    </>
  );
};

export default OrganizationalProfile;
