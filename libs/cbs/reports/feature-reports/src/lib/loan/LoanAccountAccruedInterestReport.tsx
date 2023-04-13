import { useState } from 'react';

import { GridItem } from '@myra-ui/components';
import { Box, Grid, Text } from '@myra-ui/foundations';

import {
  AccruedInterestFilter,
  AccrueInterestInfo,
  useGetLoanAccruedInterestReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { LoanReportInputs } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { formatAddress, localizedDate } from '@coop/cbs/utils';
import { amountConverter } from '@coop/shared/utils';

export const LoanAccountAccruedInterestReport = () => {
  const [filters, setFilters] = useState<AccruedInterestFilter | null>(null);

  const { data, isFetching } = useGetLoanAccruedInterestReportQuery(
    {
      data: filters as AccruedInterestFilter,
    },
    { enabled: !!filters }
  );

  const loanAccountAccruedInterestReport = data?.report?.loanReport?.loanAccruedInterestReport;
  const basicInfo = loanAccountAccruedInterestReport?.basicInfo;

  return (
    <Report
      defaultFilters={null}
      data={loanAccountAccruedInterestReport?.data as AccrueInterestInfo[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.LOAN_ACCOUNT_ACCRUED_INTEREST_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Loan Reports', link: '/reports/cbs/loan' },
            {
              label: 'Loan Account Accrued Interest Report',
              link: '/reports/cbs/loan/loan-account-accrued-interest/new',
            },
          ]}
        />
        <Report.Inputs>
          <LoanReportInputs accountName="accountId" />
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />
          <Box p="s16" display="flex" justifyContent="space-between">
            <Box w="50%">
              <Box w="90%">
                <Grid templateColumns="repeat(2, 1fr)">
                  <GridItem>
                    <Box display="flex" flexDir="column" fontSize="r1" color="gray.700">
                      <Text>Name of member:</Text>
                      {basicInfo?.address && <Text>Address:</Text>}
                      {basicInfo?.serviceCentreName && <Text>Service Center Name:</Text>}
                      {basicInfo?.approvedAmount && <Text>Approved Amount:</Text>}
                      {basicInfo?.loanIssueDate && <Text>Loan Issued Date:</Text>}
                      {basicInfo?.currentInterestRate && <Text>Current Interest Rate:</Text>}
                    </Box>
                  </GridItem>

                  <GridItem>
                    <Box
                      display="flex"
                      flexDir="column"
                      fontSize="r1"
                      fontWeight="500"
                      color="gray.700"
                    >
                      <Text noOfLines={1} textTransform="capitalize">
                        {basicInfo?.memberCode}
                      </Text>
                      {basicInfo?.address && (
                        <Text noOfLines={1}>{formatAddress(basicInfo?.address)}</Text>
                      )}
                      {basicInfo?.serviceCentreName && (
                        <Text noOfLines={1}>{basicInfo?.serviceCentreName}</Text>
                      )}
                      <Text noOfLines={1}>{amountConverter(basicInfo?.approvedAmount ?? 0)}</Text>
                      {basicInfo?.loanIssueDate && (
                        <Text noOfLines={1}> {localizedDate(basicInfo?.loanIssueDate)}</Text>
                      )}
                      {basicInfo?.currentInterestRate && (
                        <Text noOfLines={1}>{basicInfo?.currentInterestRate ?? 0}%</Text>
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
                      {basicInfo?.accountId && <Text>Account No:</Text>}
                      {basicInfo?.accountType && <Text>Account Type:</Text>}
                      {basicInfo?.accountSubType && <Text>Account Sub Type:</Text>}
                      {basicInfo?.memberCode && <Text>Membership No:</Text>}
                      {basicInfo?.noOfInstallment && <Text>Installment:</Text>}
                      {basicInfo?.disbursedAmount && <Text>Disbursed Amount:</Text>}
                    </Box>
                  </GridItem>

                  <GridItem>
                    <Box
                      display="flex"
                      flexDir="column"
                      fontSize="r1"
                      color="gray.700"
                      fontWeight="500"
                    >
                      {basicInfo?.accountId && (
                        <Text noOfLines={1}>{basicInfo?.accountId ?? 0}%</Text>
                      )}
                      {basicInfo?.accountType && (
                        <Text noOfLines={1}>{basicInfo?.accountType}</Text>
                      )}
                      {basicInfo?.accountSubType && (
                        <Text noOfLines={1}>{basicInfo?.accountSubType}</Text>
                      )}
                      {basicInfo?.memberCode && <Text noOfLines={1}>{basicInfo?.memberCode}</Text>}
                      {basicInfo?.noOfInstallment && (
                        <Text noOfLines={1}>{basicInfo?.noOfInstallment}</Text>
                      )}
                      {basicInfo?.disbursedAmount && (
                        <Text noOfLines={1}>
                          {amountConverter(basicInfo?.disbursedAmount || 0)}
                        </Text>
                      )}
                    </Box>
                  </GridItem>
                </Grid>
              </Box>
            </Box>
          </Box>
          <Report.Table<AccrueInterestInfo & { index: number }>
            columns={[
              {
                header: 'S.No.',
                accessorKey: 'index',
                meta: {
                  width: '60px',
                },
              },
              {
                header: 'Date',
                accessorKey: 'date',
                cell: (props) => localizedDate(props.row.original.date),
              },
              {
                header: 'Transaction Id',
                accessorKey: 'transactionId',
              },
              {
                header: 'Balance',
                accessorKey: 'balance',
                cell: (props) => amountConverter(props.getValue() as string),
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Interest Rate',
                accessorKey: 'interestRate',
                meta: {
                  isNumeric: true,
                },
              },
              {
                header: 'Interest Accrued',
                accessorKey: 'interestAccrued',
                cell: (props) => amountConverter(props.getValue() as string),

                meta: {
                  isNumeric: true,
                },
              },
            ]}
          />
        </Report.Content>
      </Report.Body>
    </Report>
  );
};
