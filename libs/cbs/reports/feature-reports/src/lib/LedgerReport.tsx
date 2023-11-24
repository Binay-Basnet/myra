import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDeepCompareEffect } from 'react-use';
import { useRouter } from 'next/router';

import { Box, GridItem, Text } from '@myra-ui';

import {
  GeneralLedgerFilter,
  GeneralLedgerReportEntry,
  useGetLedgerReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { localizedDate, RouteToDetailsPage } from '@coop/cbs/utils';
import { FormBranchSelect, FormCOASelect } from '@coop/shared/form';
import { amountConverter, debitCreditConverter } from '@coop/shared/utils';

export const LedgerReport = () => {
  const [filters, setFilters] = useState<GeneralLedgerFilter | null>(null);
  const router = useRouter();

  const isAdjusted = router?.query['isAdjusted'] === 'true';

  const { data, isFetching } = useGetLedgerReportQuery(
    {
      data: {
        ledgerId:
          filters?.ledgerId && typeof filters?.ledgerId === 'object' && 'value' in filters.ledgerId
            ? filters.ledgerId?.['value']
            : filters?.ledgerId,
        period: filters?.period,
        inculdeAdjustment: isAdjusted,
      } as GeneralLedgerFilter,
    },
    { enabled: !!filters }
  );
  const ledgerReport = data?.report?.otherReport?.generalLedgerReport
    ?.data as GeneralLedgerReportEntry[];
  const adjustedReport = data?.report?.otherReport?.generalLedgerReport
    ?.adjustedEntries as GeneralLedgerReportEntry[];
  const ledgerName = data?.report?.otherReport?.generalLedgerReport?.ledgerName;
  const openingBalance = data?.report?.otherReport?.generalLedgerReport?.summary?.openingBalance;
  const closingBalance = data?.report?.otherReport?.generalLedgerReport?.summary?.closingBalance;
  const closingAdjustedBalance =
    data?.report?.otherReport?.generalLedgerReport?.summary?.adjustedClosingBalance;
  const closingDate = filters?.period?.to;
  const settlementsTable = data?.report?.otherReport?.generalLedgerReport?.yearEnd;
  const settlementClosingBalance =
    data?.report?.otherReport?.generalLedgerReport?.summary?.yearEndBalance;

  return (
    <Report
      defaultFilters={null}
      data={ledgerReport as GeneralLedgerReportEntry[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.GENERAL_LEDGER_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Other Reports', link: '/cbs/reports/cbs-reports/others' },
            {
              label: 'Ledger Report',
              link: '/cbs/reports/cbs-reports/others/ledger/new',
            },
          ]}
        />
        <LedgerReportInputs />
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization ledgerName={ledgerName as string} />
          <Box display="flex" flexDirection="row" justifyContent="flex-end" p="s12">
            <Box display="flex" flexDirection="column">
              <Text> Opening Balance: {amountConverter(openingBalance as string)}</Text>
            </Box>
          </Box>
          <Report.Table<GeneralLedgerReportEntry>
            hasSNo={false}
            data={ledgerReport}
            columns={[
              {
                header: 'S.N',
                accessorFn: (__, index) => index + 1,
                meta: {
                  width: '30px',
                  isNumeric: true,
                },
              },
              {
                header: 'Date',
                accessorFn: (row) => localizedDate(row?.date),
                meta: {
                  width: '30px',
                  isNumeric: true,
                  skipExcelFormatting: true,
                },
              },
              {
                header: 'ID ',
                accessorFn: (row) => row?.id,
                cell: (props) => (
                  <RouteToDetailsPage
                    id={props?.row?.original?.id as string}
                    type="transactions"
                    label={props?.row?.original?.id as string}
                  />
                ),
                meta: {
                  width: '3.125rem',
                  skipExcelFormatting: true,
                },
              },
              {
                header: 'Old ID',
                accessorFn: (row) => row?.oldId,
                meta: {
                  width: '3.125rem',
                },
              },
              {
                header: 'Particulars',
                accessorFn: (row) => row?.account,
                cell: (props) => (
                  <Box whiteSpace="pre-line" my="s4" width="200px">
                    {props?.row?.original?.account}{' '}
                  </Box>
                ),
                meta: {
                  width: '200px',
                },
              },
              {
                header: 'Dr.',
                accessorFn: (row) => row?.debit,
                cell: (props) => amountConverter(props.getValue() as string) || '-',
                meta: {
                  width: '30px',
                  isNumeric: true,
                },
              },
              {
                header: 'Cr. ',
                accessorFn: (row) => row?.credit,
                cell: (props) => amountConverter(props.getValue() as string) || '-',

                meta: {
                  width: '30px',
                  isNumeric: true,
                },
              },
              {
                header: 'Balance',
                accessorFn: (row) => row?.balance,
                meta: {
                  width: '30px',
                  isNumeric: true,
                },
              },
            ]}
          />
          <Box display="flex" flexDirection="row" justifyContent="flex-end" p="s12">
            <Box display="flex" flexDirection="column">
              <Text> Closing Balance: {amountConverter(closingBalance as string)}</Text>
            </Box>
          </Box>
          {isAdjusted && (
            <Box display="flex" flexDirection="column" gap="s16" pt="s16">
              <Text px="s32" fontSize="r1" fontWeight="600">
                Adjustment Table
              </Text>
              <Report.Table<GeneralLedgerReportEntry>
                hasSNo={false}
                data={adjustedReport}
                columns={[
                  {
                    header: 'S.N',
                    accessorFn: (__, index) => index + 1,
                    meta: {
                      width: '30px',
                      isNumeric: true,
                    },
                  },
                  {
                    id: 'Closing Date From Fiscal Year',
                    header: 'Date',
                    // accessorFn: (row) => localizedDate(row?.date),
                    cell: () => localizedDate(closingDate),
                    meta: {
                      width: '30px',
                      isNumeric: true,
                      skipExcelFormatting: true,
                    },
                  },
                  {
                    header: 'ID ',
                    accessorFn: (row) => row?.id,
                    cell: (props) => (
                      <RouteToDetailsPage
                        id={props?.row?.original?.id as string}
                        type="transactions"
                        label={props?.row?.original?.id as string}
                      />
                    ),
                    meta: {
                      width: '3.125rem',
                      skipExcelFormatting: true,
                    },
                  },
                  {
                    header: 'Old ID',
                    accessorFn: (row) => row?.oldId,
                    meta: {
                      width: '3.125rem',
                    },
                  },
                  {
                    header: 'Particulars',
                    accessorFn: (row) => row?.account,
                    cell: (props) => (
                      <Box whiteSpace="pre-line" my="s4" width="200px">
                        {props?.row?.original?.account}{' '}
                      </Box>
                    ),
                    meta: {
                      width: '200px',
                    },
                  },
                  {
                    header: 'Dr.',
                    accessorFn: (row) => row?.debit,
                    cell: (props) => amountConverter(props.getValue() as string) || '-',
                    meta: {
                      width: '30px',
                      isNumeric: true,
                    },
                  },
                  {
                    header: 'Cr. ',
                    accessorFn: (row) => row?.credit,
                    cell: (props) => amountConverter(props.getValue() as string) || '-',

                    meta: {
                      width: '30px',
                      isNumeric: true,
                    },
                  },
                  {
                    header: 'Balance',
                    accessorFn: (row) => row?.balance,
                    meta: {
                      width: '30px',
                      isNumeric: true,
                    },
                  },
                ]}
              />
              <Box display="flex" flexDirection="row" justifyContent="flex-end" p="s12">
                <Box display="flex" flexDirection="column">
                  <Text>
                    {' '}
                    Closing Adjusted Balance:{' '}
                    {debitCreditConverter(
                      closingAdjustedBalance?.amount as string,
                      closingAdjustedBalance?.amountType as string
                    )}
                  </Text>
                </Box>
              </Box>
            </Box>
          )}
          {isAdjusted && settlementsTable?.length && (
            <Box display="flex" flexDirection="column" gap="s16" pt="s16">
              <Text px="s32" fontSize="r1" fontWeight="600">
                Settlements
              </Text>
              <Report.Table
                hasSNo={false}
                data={settlementsTable}
                columns={[
                  {
                    header: 'S.N',
                    accessorFn: (__, index) => index + 1,
                    meta: {
                      width: '30px',
                      isNumeric: true,
                    },
                  },
                  {
                    id: 'Closing Date From Fiscal Year',
                    header: 'Date',
                    // accessorFn: (row) => localizedDate(row?.date),
                    cell: () => localizedDate(closingDate),
                    meta: {
                      width: '30px',
                      isNumeric: true,
                      skipExcelFormatting: true,
                    },
                  },
                  {
                    header: 'ID ',
                    accessorFn: (row) => row?.id,
                    cell: (props) => (
                      <RouteToDetailsPage
                        id={props?.row?.original?.id as string}
                        type="transactions"
                        label={props?.row?.original?.id as string}
                      />
                    ),
                    meta: {
                      width: '3.125rem',
                      skipExcelFormatting: true,
                    },
                  },
                  {
                    header: 'Old ID',
                    accessorFn: (row) => row?.oldId,
                    meta: {
                      width: '3.125rem',
                    },
                  },
                  {
                    header: 'Particulars',
                    accessorFn: (row) => row?.account,
                    cell: (props) => (
                      <Box whiteSpace="pre-line" my="s4" width="200px">
                        {props?.row?.original?.account}{' '}
                      </Box>
                    ),
                    meta: {
                      width: '200px',
                    },
                  },
                  {
                    header: 'Dr.',
                    accessorFn: (row) => row?.debit,
                    cell: (props) => amountConverter(props.getValue() as string) || '-',
                    meta: {
                      width: '30px',
                      isNumeric: true,
                    },
                  },
                  {
                    header: 'Cr. ',
                    accessorFn: (row) => row?.credit,
                    cell: (props) => amountConverter(props.getValue() as string) || '-',

                    meta: {
                      width: '30px',
                      isNumeric: true,
                    },
                  },
                  {
                    header: 'Balance',
                    accessorFn: (row) => row?.balance,
                    meta: {
                      width: '30px',
                      isNumeric: true,
                    },
                  },
                ]}
              />
              <Box display="flex" flexDirection="row" justifyContent="flex-end" p="s12">
                <Box display="flex" flexDirection="column">
                  <Text>
                    {' '}
                    Closing Settlemet Balance:{' '}
                    {debitCreditConverter(
                      settlementClosingBalance?.amount as string,
                      settlementClosingBalance?.amountType as string
                    )}
                  </Text>
                </Box>
              </Box>
            </Box>
          )}
        </Report.Content>
      </Report.Body>
    </Report>
  );
};

const LedgerReportInputs = () => {
  const methods = useFormContext();
  const { watch } = useFormContext();
  const router = useRouter();

  const branchId = watch('branchId') as string;
  const { id, dateFrom, dateTo, branch } = router.query;

  const redirectDate =
    dateFrom && dateTo
      ? {
          from: JSON.parse(dateFrom as string),
          to: JSON.parse(dateTo as string),
        }
      : null;

  useDeepCompareEffect(() => {
    if (branch) {
      methods.setValue('branchId', branch);
    }

    if (redirectDate) {
      methods.setValue('period', redirectDate);
    }

    if (id) {
      methods.setValue('ledgerId', JSON.parse(id as string));
    }
  }, [id, redirectDate, branch, branchId]);

  return (
    <Report.Inputs>
      <GridItem colSpan={1}>
        <FormBranchSelect
          showUserBranchesOnly
          name="branchId"
          label="Select Service Center"
          isDisabled={!!branch}
        />
      </GridItem>

      <GridItem colSpan={2}>
        <FormCOASelect branchId={branchId} name="ledgerId" label="Ledger Name" isDisabled={!!id} />
      </GridItem>

      <GridItem colSpan={1}>
        <Box
          pointerEvents={redirectDate ? 'none' : 'auto'}
          cursor={redirectDate ? 'not-allowed' : 'pointer'}
        >
          <ReportDateRange setInitialDate={false} />
        </Box>
      </GridItem>
    </Report.Inputs>
  );
};
