/* eslint-disable-next-line */
import { Report } from '../../components/Report/useReport';
import {
  AccruedInterestFilter,
  AccrueInterestInfo,
  useGetSavingAccountAccruedInterestReportQuery,
} from '@coop/cbs/data-access';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { InterestStatementInputs } from '@coop/cbs/reports/components';
import { useState } from 'react';
import { formatAddress, localizedDate } from '@coop/cbs/utils';
import { amountConverter } from '@coop/shared/utils';
import { Box, Grid, Text } from '@myra-ui/foundations';
import { GridItem } from '@myra-ui/components';

export const SavingAccountAccruedInterestReport = () => {
  const [filters, setFilters] = useState<AccruedInterestFilter | null>(null);

  const { data, isFetching } = useGetSavingAccountAccruedInterestReportQuery(
    {
      data: filters as AccruedInterestFilter,
    },
    {
      enabled: !!filters,
    }
  );

  const savingAccountAccruedInterestReport =
    data?.report?.depositReport?.savingAccruedInterestReport;
  const meta = savingAccountAccruedInterestReport?.basicInfo;

  return (
    <Report
      defaultFilters={{}}
      data={savingAccountAccruedInterestReport?.data as AccrueInterestInfo[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.SAVING_ACCOUNT_ACCURED_INTEREST_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Saving Reports', link: '/reports/cbs/savings' },
            {
              label: 'Interest Statement',
              link: '/reports/cbs/savings/saving-account-accrued-interest/new',
            },
          ]}
        />
        <Report.Inputs>
          <InterestStatementInputs />
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
                      {meta?.address && <Text>Address:</Text>}
                      {meta?.serviceCentreName && <Text>Service Center Name:</Text>}
                      {meta?.currentInterestRate && <Text>Current Interest Rate:</Text>}
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
                        {meta?.memberId}
                      </Text>
                      {meta?.address && <Text noOfLines={1}>{formatAddress(meta?.address)}</Text>}
                      {meta?.serviceCentreName && (
                        <Text noOfLines={1}>{meta?.serviceCentreName}</Text>
                      )}
                      {meta?.currentInterestRate && (
                        <Text noOfLines={1}>{meta?.currentInterestRate}</Text>
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
                      {meta?.accountId && <Text>Account No.</Text>}
                      {meta?.accountType && <Text>Account Type:</Text>}
                      {meta?.memberCode && <Text>Membership No:</Text>}
                      {meta?.membershipDate && <Text>Membership Date:</Text>}
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
                      {meta?.accountId && <Text noOfLines={1}>{meta?.accountId ?? 0}</Text>}
                      {meta?.accountType && <Text noOfLines={1}>{meta?.accountType}</Text>}
                      {meta?.memberId && <Text noOfLines={1}>{meta?.memberCode}</Text>}
                      {meta?.membershipDate && (
                        <Text noOfLines={1}>{localizedDate(meta?.membershipDate)}</Text>
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

export default SavingAccountAccruedInterestReport;
