import { Member } from '@coop/cbs/data-access';
import { formatAddress } from '@coop/cbs/utils';
import { Box, Grid, GridItem, Text } from '@coop/shared/ui';

interface ReportMemberProps {
  member: Partial<Member>;
}

export const ReportMember = ({ member }: ReportMemberProps) => {
  return (
    <Box p="s32" display="flex" justifyContent="space-between">
      <Box w="50%">
        <Box w="70%">
          <Grid templateColumns="repeat(2, 1fr)">
            <GridItem>
              <Box display="flex" flexDir="column">
                <Text fontSize="r1" color="gray.700">
                  Name of member:
                </Text>
                <Text fontSize="r1" color="gray.700">
                  Address:
                </Text>
                <Text fontSize="r1" color="gray.700">
                  Branch Name:
                </Text>
              </Box>
            </GridItem>

            <GridItem>
              <Box display="flex" flexDir="column">
                <Text fontSize="r1" color="gray.700" fontWeight="500">
                  {member?.name?.local === '' ? '-' : member?.name?.local}
                </Text>
                <Text fontSize="r1" color="gray.700" fontWeight="500">
                  {formatAddress(member?.address)}
                </Text>
                <Text fontSize="r1" color="gray.700" fontWeight="500">
                  Koteshwor Branch, Kathmandu
                </Text>
              </Box>
            </GridItem>
          </Grid>
        </Box>
      </Box>

      <Box w="50%">
        <Box w="70%">
          <Grid templateColumns="repeat(2, 1fr)">
            <GridItem>
              <Box display="flex" flexDir="column">
                <Text fontSize="r1" color="gray.700">
                  Membership No:
                </Text>
                <Text fontSize="r1" color="gray.700">
                  Membership Date:
                </Text>
              </Box>
            </GridItem>

            <GridItem>
              <Box display="flex" flexDir="column">
                <Text fontSize="r1" color="gray.700" fontWeight="500">
                  2727
                </Text>
                <Text fontSize="r1" color="gray.700" fontWeight="500">
                  {member?.dateJoined}
                </Text>
              </Box>
            </GridItem>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};
