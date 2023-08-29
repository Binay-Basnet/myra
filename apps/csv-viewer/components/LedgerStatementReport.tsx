import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import { Box, GridItem, Text } from '@myra-ui';

import { GeneralLedgerFilter, GeneralLedgerReportEntry } from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { localizedDate, RouteToDetailsPage } from '@coop/cbs/utils';
import { privateAgent } from '@coop/csv-viewer/data-access';
import { FormSelect } from '@coop/shared/form';
import { amountConverter, getAPIUrl } from '@coop/shared/utils';

const getLedgerReport = async (filters: GeneralLedgerFilter) => {
  const response = await privateAgent.get<{
    report: {
      otherReport: {
        generalLedgerReport: {
          data: unknown;
          ledgerName: unknown;
          summary: { openingBalance: unknown; closingBalance: unknown };
        };
      };
    };
    total_pages: number;
  }>(`${getAPIUrl()}/report`, {
    params: {
      report_type: 'LEDGER_STATEMENT',
      ...filters,
    },
  });

  return response?.data;
};

const getMembers = async () => {
  const response = await privateAgent.get<{
    data: {
      member_name: string;
      member_code: string;
    }[];
    total_pages: number;
  }>(`${getAPIUrl()}/member`, {});

  return response?.data;
};

const getLedger = async () => {
  const response = await privateAgent.get<{
    data: {
      ledger_name: string;
      ledger_code: string;
    }[];
    total_pages: number;
  }>(`${getAPIUrl()}/ledger`, {});

  return response?.data;
};

export const LedgerStatementReport = () => {
  const [filters, setFilters] = useState<GeneralLedgerFilter | null>(null);

  const { data, isFetching } = useQuery(
    ['ledger-report', filters],
    async () => getLedgerReport(filters),
    {}
  );

  const ledgerReport = data?.report?.otherReport?.generalLedgerReport?.data;
  const ledgerName = data?.report?.otherReport?.generalLedgerReport?.ledgerName;
  const openingBalance = data?.report?.otherReport?.generalLedgerReport?.summary?.openingBalance;
  const closingBalance = data?.report?.otherReport?.generalLedgerReport?.summary?.closingBalance;

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
            { label: 'Other Reports', link: '/reports/cbs/others' },
            {
              label: 'Ledger Report',
              link: '/reports/cbs/others/ledger/new',
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
        </Report.Content>
      </Report.Body>
    </Report>
  );
};

const LedgerReportInputs = () => {
  const { data: memberData } = useQuery(['members'], async () => getMembers(), {});

  const { data: ledgerData } = useQuery(['ledger'], async () => getLedger(), {});

  return (
    <Report.Inputs hideDate>
      <GridItem colSpan={2}>
        <FormSelect
          label="Select members"
          name="member_id"
          options={memberData?.data?.map((item) => ({
            label: item?.member_name,
            value: item?.member_code,
          }))}
        />
      </GridItem>

      <GridItem colSpan={2}>
        <FormSelect
          label="Select Ledger"
          name="ledger_id"
          options={ledgerData?.data?.map((item) => ({
            label: item?.ledger_name,
            value: item?.ledger_code,
          }))}
        />
      </GridItem>
    </Report.Inputs>
  );
};

export default LedgerStatementReport;
