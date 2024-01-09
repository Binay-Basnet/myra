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
          <Text fontSize="r1" color="gray.700">
            Name of member:
          </Text>
          <Text fontSize="r1" fontWeight="500" color="gray.700">
            {member?.name?.local === '' ? '-' : member?.name?.local}
          </Text>
        </Grid>
        {member?.address && (
          <Grid templateColumns="repeat(2, 1fr)">
            <Text fontSize="r1" color="gray.700">
              Address:
            </Text>
            <Text fontSize="r1" fontWeight="500" color="gray.700">
              {formatAddress(member?.address)}
            </Text>
          </Grid>
        )}
        {account?.approvedAmount && (
          <Grid templateColumns="repeat(2, 1fr)">
            <Text fontSize="r1" color="gray.700">
              Approved Amount:
            </Text>
            <Text fontSize="r1" fontWeight="500" color="gray.700">
              {amountConverter(account?.approvedAmount ?? 0)}
            </Text>
          </Grid>
        )}
        {account?.issuedDate && (
          <Grid templateColumns="repeat(2, 1fr)">
            <Text fontSize="r1" color="gray.700">
              Loan Issued Date:
            </Text>
            <Text fontSize="r1" fontWeight="500" color="gray.700">
              {localizedDate(account?.issuedDate)}
            </Text>
          </Grid>
        )}
        {member?.code && (
          <Grid templateColumns="repeat(2, 1fr)">
            <Text fontSize="r1" color="gray.700">
              Membership No:
            </Text>
            <Text fontSize="r1" fontWeight="500" color="gray.700">
              {member?.code}
            </Text>
          </Grid>
        )}
        {member?.panVatNo && (
          <Grid templateColumns="repeat(2, 1fr)">
            <Text fontSize="r1" color="gray.700">
              PAN No:
            </Text>
            <Text fontSize="r1" fontWeight="500" color="gray.700">
              {member?.panVatNo}
            </Text>
          </Grid>
        )}
      </Box>
    </Box>

    <Box w="50%">
      <Box w="100%">
        {account?.interestRate && (
          <Grid templateColumns="repeat(2, 1fr)">
            <Text fontSize="r1" color="gray.700">
              Current Interest Rate:
            </Text>
            <Text fontSize="r1" fontWeight="500" color="gray.700">
              {account?.interestRate ?? 0}%
            </Text>
          </Grid>
        )}
        {account?.accountNo && (
          <Grid templateColumns="repeat(2, 1fr)">
            <Text fontSize="r1" color="gray.700">
              Loan Account No:
            </Text>
            <Text fontSize="r1" fontWeight="500" color="gray.700">
              {account?.accountNo}
            </Text>
          </Grid>
        )}
        {account?.accountName && (
          <Grid templateColumns="repeat(2, 1fr)">
            <Text fontSize="r1" color="gray.700">
              Loan Account Name:
            </Text>
            <Text fontSize="r1" fontWeight="500" color="gray.700">
              {account?.accountName}
            </Text>
          </Grid>
        )}
        {account?.productName && (
          <Grid templateColumns="repeat(2, 1fr)">
            <Text fontSize="r1" color="gray.700">
              Loan Product Name:
            </Text>
            <Text fontSize="r1" fontWeight="500" color="gray.700">
              {account?.productName}
            </Text>
          </Grid>
        )}
        {account?.loanType && (
          <Grid templateColumns="repeat(2, 1fr)">
            <Text fontSize="r1" color="gray.700">
              Loan Type:
            </Text>
            <Text fontSize="r1" fontWeight="500" color="gray.700">
              {account?.loanType}
            </Text>
          </Grid>
        )}
        {account?.loanSubtype && (
          <Grid templateColumns="repeat(2, 1fr)">
            <Text fontSize="r1" color="gray.700">
              Loan Subtype:
            </Text>
            <Text fontSize="r1" fontWeight="500" color="gray.700">
              {account?.loanSubtype}
            </Text>
          </Grid>
        )}
        {account?.installment && (
          <Grid templateColumns="repeat(2, 1fr)">
            <Text fontSize="r1" color="gray.700">
              Installment:
            </Text>
            <Text fontSize="r1" fontWeight="500" color="gray.700">
              {account?.installment}
            </Text>
          </Grid>
        )}
        {account?.disbursedAmount && (
          <Grid templateColumns="repeat(2, 1fr)">
            <Text fontSize="r1" color="gray.700">
              Disbursed Amount:
            </Text>
            <Text fontSize="r1" fontWeight="500" color="gray.700">
              {amountConverter(account?.disbursedAmount || 0)}
            </Text>
          </Grid>
        )}
        {account?.charge && (
          <Grid templateColumns="repeat(2, 1fr)">
            <Text fontSize="r1" color="gray.700">
              Service Charge:
            </Text>
            <Text fontSize="r1" fontWeight="500" color="gray.700">
              {amountConverter(account?.charge || 0)}
            </Text>
          </Grid>
        )}
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
              {meta?.memberPan && <Text>Member Pan:</Text>}
              {meta?.branchName && <Text>Branch Name:</Text>}
              {meta?.approvedAmount && <Text>Approved Amount:</Text>}
              {meta?.loanIssuedDate && <Text>Loan Issued Date:</Text>}
              {meta?.memberCode && <Text>Membership No:</Text>}
              {meta?.loanClosedDate && <Text>Loan Closed Date:</Text>}
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
              {meta?.memberPan && <Text noOfLines={1}>{meta?.memberPan}</Text>}
              {meta?.branchName && <Text noOfLines={1}>{meta?.branchName}</Text>}
              {meta?.approvedAmount && (
                <Text noOfLines={1}>{amountConverter(meta?.approvedAmount ?? 0)}</Text>
              )}
              {meta?.loanIssuedDate && (
                <Text noOfLines={1}> {localizedDate(meta?.loanIssuedDate)}</Text>
              )}
              {meta?.memberCode && <Text noOfLines={1}>{meta?.memberCode}</Text>}
              {meta?.loanClosedDate && (
                <Text noOfLines={1}>{localizedDate(meta?.loanClosedDate)}</Text>
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
