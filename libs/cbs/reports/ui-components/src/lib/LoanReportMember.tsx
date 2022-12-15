import dayjs from 'dayjs';

import { LoanAccReportDetails, Member, useAppSelector } from '@coop/cbs/data-access';
import { formatAddress, localizedDate } from '@coop/cbs/utils';
import { Box, Grid, GridItem, Text } from '@myra-ui';
import { amountConverter } from '@coop/shared/utils';

interface ReportMemberProps {
  member: Partial<Member> | undefined | null;
  account: LoanAccReportDetails;
}

export const LoanReportMember = ({ member, account }: ReportMemberProps) => {
  const profile = useAppSelector((state) => state.auth.user);
  return (
    <Box p="s32" display="flex" justifyContent="space-between">
      <Box w="50%">
        <Box w="70%">
          <Grid templateColumns="repeat(2, 1fr)">
            <GridItem>
              <Box display="flex" flexDir="column" fontSize="r1" color="gray.700">
                <Text>Name of member:</Text>
                <Text>Address:</Text>
                <Text>Branch Name:</Text>
                <Text>Approved Amount:</Text>
                <Text>Loan Issued Date:</Text>
                <Text>Membership No:</Text>
              </Box>
            </GridItem>

            <GridItem>
              <Box display="flex" flexDir="column" fontSize="r1" fontWeight="500" color="gray.700">
                <Text textTransform="capitalize">
                  {member?.name?.local === '' ? '-' : member?.name?.local}
                </Text>
                <Text>{formatAddress(member?.address)}</Text>
                <Text>{profile?.branch?.name}</Text>
                <Text>{amountConverter(account?.approvedAmount ?? 0)}</Text>
                <Text> {localizedDate(account?.issuedDate)}</Text>
                <Text>2955</Text>
              </Box>
            </GridItem>
          </Grid>
        </Box>
      </Box>

      <Box w="50%">
        <Box w="70%">
          <Grid templateColumns="repeat(2, 1fr)">
            <GridItem>
              <Box display="flex" flexDir="column" fontSize="r1" color="gray.700">
                <Text>Current Interest Rate:</Text>
                <Text>Loan Account No:</Text>
                <Text>Loan Type:</Text>
                <Text>Loan Subtype:</Text>
                <Text>Installment:</Text>
                <Text>Loan Processing Charge:</Text>
              </Box>
            </GridItem>

            <GridItem>
              <Box display="flex" flexDir="column" fontSize="r1" color="gray.700" fontWeight="500">
                <Text>{account?.interestRate ?? 0}%</Text>
                <Text>{account?.accountNo}</Text>
                <Text>{account?.loanType}</Text>
                <Text>{account?.loanSubtype}</Text>
                <Text>{account?.installment}</Text>
                <Text>0</Text>
              </Box>
            </GridItem>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};
