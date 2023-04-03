import { Box, Grid, GridItem, Text } from '@myra-ui';

import { ClosedLoanAccountMeta, LoanAccReportDetails, Member } from '@coop/cbs/data-access';
import { formatAddress, localizedDate, localizedText } from '@coop/cbs/utils';
import { amountConverter } from '@coop/shared/utils';

interface ReportMemberProps {
  member: Partial<Member> | undefined | null;
  account: LoanAccReportDetails;
}

export const LoanReportMember = ({ member, account }: ReportMemberProps) => (
  <Box p="s32" display="flex" justifyContent="space-between">
    <Box w="50%">
      <Box w="90%">
        <Grid templateColumns="repeat(2, 1fr)">
          <GridItem>
            <Box display="flex" flexDir="column" fontSize="r1" color="gray.700">
              <Text>Name of member:</Text>
              {member?.address && <Text>Address:</Text>}
              {member?.branch && <Text>Service Center Name:</Text>}
              {account?.approvedAmount && <Text>Approved Amount:</Text>}
              {account?.issuedDate && <Text>Loan Issued Date:</Text>}
              {member?.code && <Text>Membership No:</Text>}
              {account?.openingBalance && <Text>Opening Balance:</Text>}
            </Box>
          </GridItem>

          <GridItem>
            <Box display="flex" flexDir="column" fontSize="r1" fontWeight="500" color="gray.700">
              <Text noOfLines={1} textTransform="capitalize">
                {member?.name?.local === '' ? '-' : member?.name?.local}
              </Text>
              {member?.address && <Text noOfLines={1}>{formatAddress(member?.address)}</Text>}
              {member?.branch && <Text noOfLines={1}>{member?.branch}</Text>}
              <Text noOfLines={1}>{amountConverter(account?.approvedAmount ?? 0)}</Text>
              {account?.issuedDate && (
                <Text noOfLines={1}> {localizedDate(account?.issuedDate)}</Text>
              )}
              {member?.code && <Text noOfLines={1}>{member?.code}</Text>}
              {account?.openingBalance && (
                <Text noOfLines={1}>{amountConverter(account?.openingBalance ?? 0)}</Text>
              )}
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
              {account?.interestRate && <Text>Current Interest Rate:</Text>}
              {account?.accountNo && <Text>Loan Account No:</Text>}
              {account?.loanType && <Text>Loan Type:</Text>}
              {account?.loanSubtype && <Text>Loan Subtype:</Text>}
              {account?.installment && <Text>Installment:</Text>}
              {/* <Text>Loan Processing Charge:</Text> */}
              {account?.disbursedAmount && <Text>Disbursed Amount:</Text>}
            </Box>
          </GridItem>

          <GridItem>
            <Box display="flex" flexDir="column" fontSize="r1" color="gray.700" fontWeight="500">
              {account?.interestRate && <Text noOfLines={1}>{account?.interestRate ?? 0}%</Text>}
              {account?.accountNo && <Text noOfLines={1}>{account?.accountNo}</Text>}
              {account?.loanType && <Text noOfLines={1}>{account?.loanType}</Text>}
              {account?.loanSubtype && <Text noOfLines={1}>{account?.loanSubtype}</Text>}
              {account?.installment && <Text noOfLines={1}>{account?.installment}</Text>}
              {/* <Text>0</Text> */}
              {account?.disbursedAmount && (
                <Text noOfLines={1}>{amountConverter(account?.disbursedAmount || 0)}</Text>
              )}
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  </Box>
);

interface ClosedLoanAccountMetaProps {
  meta: ClosedLoanAccountMeta;
}

export const ClosedLoanReportMeta = ({ meta }: ClosedLoanAccountMetaProps) => (
  <Box p="s32" display="flex" justifyContent="space-between">
    <Box w="50%">
      <Box w="90%">
        <Grid templateColumns="repeat(2, 1fr)">
          <GridItem>
            <Box display="flex" flexDir="column" fontSize="r1" color="gray.700">
              {meta?.memberName && <Text>Name of member:</Text>}
              {meta?.address && <Text>Address:</Text>}
              {meta?.branchName && <Text>Branch Name:</Text>}
              {meta.approvedAmount && <Text>Approved Amount:</Text>}
              {meta.loanIssuedDate && <Text>Loan Issued Date:</Text>}
              {meta.memberCode && <Text>Membership No:</Text>}
              {meta.loanClosedDate && <Text>Loan Closed Date:</Text>}
            </Box>
          </GridItem>

          <GridItem>
            <Box display="flex" flexDir="column" fontSize="r1" fontWeight="500" color="gray.700">
              {meta?.memberName && (
                <Text noOfLines={1} textTransform="capitalize">
                  {meta?.memberName}
                </Text>
              )}
              {meta?.address && <Text noOfLines={1}>{localizedText(meta?.address)}</Text>}
              {meta?.branchName && <Text noOfLines={1}>{meta?.branchName}</Text>}
              {meta.approvedAmount && (
                <Text noOfLines={1}>{amountConverter(meta.approvedAmount ?? 0)}</Text>
              )}
              {meta.loanIssuedDate && (
                <Text noOfLines={1}> {localizedDate(meta.loanIssuedDate)}</Text>
              )}
              {meta.memberCode && <Text noOfLines={1}>{meta.memberCode}</Text>}
              {meta.loanClosedDate && (
                <Text noOfLines={1}>{localizedDate(meta.loanClosedDate)}</Text>
              )}
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
              {meta?.loanAccountNo && <Text>Loan Account No:</Text>}
              {meta?.loanType && <Text>Loan Type:</Text>}
              {meta?.loanSubtype && <Text>Loan Subtype:</Text>}
              {meta?.noOfInstallments && <Text>Installment:</Text>}
              {meta?.loanProcessingCharge && <Text>Loan Processing Charge:</Text>}
            </Box>
          </GridItem>

          <GridItem>
            <Box display="flex" flexDir="column" fontSize="r1" color="gray.700" fontWeight="500">
              <Text noOfLines={1}>{meta?.interestRate ?? 0}%</Text>
              {meta?.loanAccountNo && <Text noOfLines={1}>{meta?.loanAccountNo}</Text>}
              {meta?.loanType && <Text noOfLines={1}>{meta?.loanType}</Text>}
              {meta?.loanSubtype && <Text noOfLines={1}>{meta?.loanSubtype}</Text>}
              {meta?.noOfInstallments && <Text noOfLines={1}>{meta?.noOfInstallments}</Text>}
              {meta?.loanProcessingCharge && (
                <Text noOfLines={1}>{meta?.loanProcessingCharge}</Text>
              )}
            </Box>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  </Box>
);
