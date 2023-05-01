import { Box, Grid, GridItem, Text } from '@myra-ui';

import { Organization } from '@coop/cbs/data-access';
import { formatAddress } from '@coop/cbs/utils';

interface ReportOrganizationalProfile {
  organization: Partial<Organization> | undefined | null;
}

export const OrganizationProfileData = ({ organization }: ReportOrganizationalProfile) => (
  <Box p="s32" display="flex" justifyContent="space-between">
    <Box w="50%">
      <Box w="90%">
        <Grid templateColumns="repeat(2, 1fr)">
          <GridItem>
            <Box display="flex" flexDir="column" fontSize="r1" color="gray.700">
              {organization?.address && <Text>Address:</Text>}
              {organization?.registrationDetails?.regdNo && <Text>Regd No:</Text>}
              {organization?.basicDetails?.typeOfOrganization && <Text>Type of Organization:</Text>}
              {organization?.registrationDetails?.regdAddress && <Text>Registered Address:</Text>}
              {organization?.contactDetails?.phoneNumber && <Text>Contact :</Text>}
              {organization?.contactDetails?.email && <Text>Email:</Text>}
              {organization?.contactDetails?.website && <Text>Website:</Text>}
            </Box>
          </GridItem>

          <GridItem>
            <Box display="flex" flexDir="column" fontSize="r1" color="gray.700">
              {organization?.address && <Text>{formatAddress(organization?.address)}</Text>}
              {organization?.registrationDetails?.regdNo && (
                <Text>{organization?.registrationDetails?.regdNo}</Text>
              )}
              {organization?.basicDetails?.typeOfOrganization && (
                <Text>{organization?.basicDetails?.typeOfOrganization}</Text>
              )}
              {organization?.registrationDetails?.regdAddress && (
                <Text>{organization?.registrationDetails?.regdAddress}</Text>
              )}

              {organization?.contactDetails?.phoneNumber && (
                <Text>{organization?.contactDetails?.phoneNumber}</Text>
              )}
              {organization?.contactDetails?.email && (
                <Text>{organization?.contactDetails?.email}</Text>
              )}
              {organization?.contactDetails?.website && (
                <Text>{organization?.contactDetails?.website}</Text>
              )}
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </Box>
    {/* 
    <Box w="50%">
      <Box w="100%">
        <Grid templateColumns="repeat(2, 1fr)">
          <GridItem>
            <Box display="flex" flexDir="column" fontSize="r1" color="gray.700">
              {organization?.address && <Text>Address:</Text>}
              {organization?.registrationDetails?.regdNo && <Text>Regd No:</Text>}
              {organization?.basicDetails?.typeOfOrganization && <Text>Type of Organization:</Text>}
              {organization?.contactDetails?.phoneNumber && <Text>Contact :</Text>}
              {organization?.contactDetails?.email && <Text>Email:</Text>}
            </Box>
          </GridItem>

          <GridItem>
            <Box display="flex" flexDir="column" fontSize="r1" color="gray.700">
              {organization?.address && <Text>{formatAddress(organization?.address)}</Text>}
              {organization?.registrationDetails?.regdNo && (
                <Text>{organization?.registrationDetails?.regdNo}</Text>
              )}
              {organization?.basicDetails?.typeOfOrganization && (
                <Text>{organization?.basicDetails?.typeOfOrganization}</Text>
              )}
              {organization?.contactDetails?.phoneNumber && (
                <Text>{organization?.contactDetails?.phoneNumber}</Text>
              )}
              {organization?.contactDetails?.email && (
                <Text>{organization?.contactDetails?.email}</Text>
              )}
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </Box> */}
  </Box>
);
