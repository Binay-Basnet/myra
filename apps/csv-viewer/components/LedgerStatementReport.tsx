import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useQuery } from '@tanstack/react-query';

import { GridItem } from '@myra-ui';

import { GeneralLedgerFilter, GeneralLedgerReportEntry } from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { privateAgent } from '@coop/csv-viewer/data-access';
import { FormSelect } from '@coop/shared/form';
import { getAPIUrl } from '@coop/shared/utils';

const getLedgerReport = async (ledger_id: string) => {
  const response = await privateAgent.get<{
    data;
    total_pages: number;
  }>(`${getAPIUrl()}/report`, {
    params: {
      input: {
        report_type: 'LEDGER_STATEMENT',
        id: ledger_id,
      },
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

const getLedger = async (member_id: string) => {
  const response = await privateAgent.get<{
    data: {
      ledger_name: string;
      ledger_code: string;
    }[];
    total_pages: number;
  }>(`${getAPIUrl()}/ledger`, {
    params: {
      filter: {
        member_id,
      },
    },
  });

  return response?.data;
};

export const LedgerStatementReport = () => {
  const [filters, setFilters] = useState<GeneralLedgerFilter | null>(null);

  const { data, isFetching } = useQuery(
    ['ledger-report', filters],
    async () => getLedgerReport(filters?.ledgerId),
    {}
  );

  const ledgerReport = data?.data;

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
          <Report.Table<{
            cr_amount: number;
            dr_amount: number;
            ledger_code: string;
            ledger_name: string;
            narration: string;
            transaction_id: string;
          }>
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
                header: 'Cr Amount',
                accessorFn: (row) => row?.cr_amount,
                meta: {
                  width: '30px',
                  isNumeric: true,
                },
              },
              {
                header: 'Dr Amount',
                accessorFn: (row) => row?.dr_amount,
                meta: {
                  width: '30px',
                  isNumeric: true,
                },
              },
              {
                header: 'Ledger Code',
                accessorFn: (row) => row?.ledger_code,
                meta: {
                  width: '30px',
                  isNumeric: true,
                },
              },
              {
                header: 'Ledger Name',
                accessorFn: (row) => row?.ledger_name,
                meta: {
                  width: '30px',
                  isNumeric: true,
                },
              },
              {
                header: 'Narration',
                accessorFn: (row) => row?.narration,
                meta: {
                  width: '30px',
                  isNumeric: true,
                },
              },
              {
                header: 'Transaction Id',
                accessorFn: (row) => row?.transaction_id,
                meta: {
                  width: '30px',
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

const LedgerReportInputs = () => {
  const { data: memberData } = useQuery(['members'], async () => getMembers(), {});
  const { watch } = useFormContext();

  const memberIdWatch = watch('member_id');

  const { data: ledgerData } = useQuery(['ledger'], async () => getLedger(memberIdWatch), {
    enabled: !!memberIdWatch,
  });

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
          name="ledgerId"
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
