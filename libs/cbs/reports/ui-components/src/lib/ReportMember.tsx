import { Box, Grid, GridItem, Text } from '@myra-ui';

import { Member, useAppSelector } from '@coop/cbs/data-access';
import { formatAddress, localizedDate } from '@coop/cbs/utils';

interface ReportMemberProps {
  member: Partial<Member> | undefined | null;
}

export const ReportMember = ({ member }: ReportMemberProps) => {
  const branch = useAppSelector((state) => state?.auth?.user?.branch);

  return (
    <Box px="s16" pt="s16" display="flex" justifyContent="space-between">
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
                  Service Center Name:
                </Text>
              </Box>
            </GridItem>

            <GridItem>
              <Box display="flex" flexDir="column">
                <Text fontSize="r1" color="gray.700" textTransform="capitalize" fontWeight="500">
                  {member?.name?.local === '' ? '-' : member?.name?.local}
                </Text>
                <Text fontSize="r1" color="gray.700" fontWeight="500">
                  {formatAddress(member?.address)}
                </Text>
                <Text fontSize="r1" color="gray.700" fontWeight="500" textTransform="capitalize">
                  {branch?.name}
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
                  {member?.code ?? '-'}
                </Text>
                <Text fontSize="r1" color="gray.700" fontWeight="500">
                  {localizedDate(member?.activeDate)}
                </Text>
              </Box>
            </GridItem>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};
