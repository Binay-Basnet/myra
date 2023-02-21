import { Box, Grid, GridItem, Text } from '@myra-ui';

import { Member, SavingStatementMeta } from '@coop/cbs/data-access';
import { formatAddress, localizedDate } from '@coop/cbs/utils';

interface ReportMemberProps {
  member: Partial<Member> | undefined | null;
  accountCloseDate?: string;
  savingData?: {
    meta?: SavingStatementMeta;
  };
}

export const ReportMember = ({ member, accountCloseDate, savingData }: ReportMemberProps) => (
  // const branch = useAppSelector((state) => state?.auth?.user?.currentBranch);

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
              {savingData?.meta?.accountNo && (
                <Text fontSize="r1" color="gray.700">
                  Account No:
                </Text>
              )}

              {savingData?.meta?.currentInterestRate && (
                <Text fontSize="r1" color="gray.700">
                  Current Interest Rate:
                </Text>
              )}
              {savingData?.meta?.savingType && (
                <Text fontSize="r1" color="gray.700">
                  Saving Type:
                </Text>
              )}
            </Box>
          </GridItem>

          <GridItem>
            <Box display="flex" flexDir="column">
              <Text
                noOfLines={1}
                fontSize="r1"
                color="gray.700"
                textTransform="capitalize"
                fontWeight="500"
              >
                {member?.name?.local === '' ? '-' : member?.name?.local}
              </Text>
              <Text noOfLines={1} fontSize="r1" color="gray.700" fontWeight="500">
                {formatAddress(member?.address)}
              </Text>
              <Text
                noOfLines={1}
                fontSize="r1"
                color="gray.700"
                fontWeight="500"
                textTransform="capitalize"
              >
                {member?.branch}
              </Text>
              <Text
                noOfLines={1}
                fontSize="r1"
                color="gray.700"
                fontWeight="500"
                textTransform="capitalize"
              >
                {savingData?.meta?.accountNo}
              </Text>
              <Text
                noOfLines={1}
                fontSize="r1"
                color="gray.700"
                fontWeight="500"
                textTransform="capitalize"
              >
                {savingData?.meta?.currentInterestRate}
              </Text>
              <Text
                noOfLines={1}
                fontSize="r1"
                color="gray.700"
                fontWeight="500"
                textTransform="capitalize"
              >
                {savingData?.meta?.savingType}
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
              {accountCloseDate && (
                <Text fontSize="r1" color="gray.700">
                  Account Close Date
                </Text>
              )}
            </Box>
          </GridItem>

          <GridItem>
            <Box display="flex" flexDir="column">
              <Text noOfLines={1} fontSize="r1" color="gray.700" fontWeight="500">
                {member?.code ?? '-'}
              </Text>
              <Text noOfLines={1} fontSize="r1" color="gray.700" fontWeight="500">
                {localizedDate(member?.activeDate)}
              </Text>
              {accountCloseDate && (
                <Text noOfLines={1} fontSize="r1" color="gray.700" fontWeight="500">
                  {accountCloseDate}
                </Text>
              )}
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  </Box>
);
