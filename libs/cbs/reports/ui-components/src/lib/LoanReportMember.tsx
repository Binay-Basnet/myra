import { Box, Grid, GridItem, Text } from '@myra-ui';

import {
  ClosedLoanAccountMeta,
  LoanAccReportDetails,
  Member,
  useAppSelector,
} from '@coop/cbs/data-access';
import { formatAddress, localizedDate, localizedText } from '@coop/cbs/utils';
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
        <Box w="90%">
          <Grid templateColumns="repeat(2, 1fr)">
            <GridItem>
              <Box display="flex" flexDir="column" fontSize="r1" color="gray.700">
                <Text>Name of member:</Text>
                <Text>Address:</Text>
                <Text>Branch Name:</Text>
                <Text>Approved Amount:</Text>
                <Text>Loan Issued Date:</Text>
                <Text>Membership No:</Text>
                <Text>Opening Blance:</Text>
              </Box>
            </GridItem>

            <GridItem>
              <Box display="flex" flexDir="column" fontSize="r1" fontWeight="500" color="gray.700">
                <Text noOfLines={1} textTransform="capitalize">
                  {member?.name?.local === '' ? '-' : member?.name?.local}
                </Text>
                <Text noOfLines={1}>{formatAddress(member?.address)}</Text>
                <Text noOfLines={1}>{profile?.currentBranch?.name}</Text>
                <Text noOfLines={1}>{amountConverter(account?.approvedAmount ?? 0)}</Text>
                <Text noOfLines={1}> {localizedDate(account?.issuedDate)}</Text>
                <Text noOfLines={1}>{member?.code}</Text>
                <Text noOfLines={1}>{amountConverter(account?.openingBalance ?? 0)}</Text>
              </Box>
            </GridItem>
          </Grid>
        </Box>
      </Box>

      <Box w="50%">
        <Box w="100%">
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
                <Text noOfLines={1}>{account?.interestRate ?? 0}%</Text>
                <Text noOfLines={1}>{account?.accountNo}</Text>
                <Text noOfLines={1}>{account?.loanType}</Text>
                <Text noOfLines={1}>{account?.loanSubtype}</Text>
                <Text noOfLines={1}>{account?.installment}</Text>
                <Text>0</Text>
              </Box>
            </GridItem>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

interface ClosedLoanAccountMetaProps {
  meta: ClosedLoanAccountMeta;
}

export const ClosedLoanReportMeta = ({ meta }: ClosedLoanAccountMetaProps) => {
  const profile = useAppSelector((state) => state.auth.user);
  return (
    <Box p="s32" display="flex" justifyContent="space-between">
      <Box w="50%">
        <Box w="90%">
          <Grid templateColumns="repeat(2, 1fr)">
            <GridItem>
              <Box display="flex" flexDir="column" fontSize="r1" color="gray.700">
                <Text>Name of member:</Text>
                <Text>Address:</Text>
                <Text>Branch Name:</Text>
                <Text>Approved Amount:</Text>
                <Text>Loan Issued Date:</Text>
                <Text>Membership No:</Text>
                <Text>Loan Closed Date:</Text>
              </Box>
            </GridItem>

            <GridItem>
              <Box display="flex" flexDir="column" fontSize="r1" fontWeight="500" color="gray.700">
                <Text noOfLines={1} textTransform="capitalize">
                  {meta?.memberName}
                </Text>
                <Text noOfLines={1}>{localizedText(meta?.address)}</Text>
                <Text noOfLines={1}>{profile?.currentBranch?.name}</Text>
                <Text noOfLines={1}>{amountConverter(meta.approvedAmount ?? 0)}</Text>
                <Text noOfLines={1}> {localizedDate(meta.loanIssuedDate)}</Text>
                <Text noOfLines={1}>{meta.memberCode}</Text>
                <Text noOfLines={1}>{localizedDate(meta.loanClosedDate)}</Text>
              </Box>
            </GridItem>
          </Grid>
        </Box>
      </Box>

      <Box w="50%">
        <Box w="100%">
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
                <Text noOfLines={1}>{meta?.interestRate ?? 0}%</Text>
                <Text noOfLines={1}>{meta?.loanAccountNo}</Text>
                <Text noOfLines={1}>{meta?.loanType}</Text>
                <Text noOfLines={1}>{meta?.loanSubtype}</Text>
                <Text noOfLines={1}>{meta?.noOfInstallments}</Text>
                <Text noOfLines={1}>{meta?.loanProcessingCharge}</Text>
              </Box>
            </GridItem>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};
