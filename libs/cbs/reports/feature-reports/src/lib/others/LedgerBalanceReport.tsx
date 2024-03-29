import { useMemo, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useDeepCompareEffect } from 'react-use';
import { useRouter } from 'next/router';

import { Button, GridItem } from '@myra-ui';

import {
  LedgerBalanceReportData,
  LocalizedDateFilter,
  useGetLedgerBalanceReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { FormBranchSelect, FormLeafCoaHeadSelect } from '@coop/shared/form';
import { amountConverter, debitCreditConverter } from '@coop/shared/utils';

type Filter = {
  branchId: {
    label: string;
    value: string;
  }[];
  period: LocalizedDateFilter;
  coaHead: {
    label: string;
    value: string;
  }[];
};
export const LedgerBalanceReport = () => {
  const [filters, setFilters] = useState<Filter | null>(null);

  const branchIds =
    filters?.branchId && filters?.branchId.length !== 0
      ? filters?.branchId?.map((t) => t.value)
      : null;

  const coaHeads =
    filters?.coaHead && filters?.coaHead.length !== 0 ? filters?.coaHead?.map((t) => t.value) : [];

  const datePeriod = filters?.period;

  const { data, isFetching } = useGetLedgerBalanceReportQuery(
    {
      data: {
        branchId: branchIds,
        period: filters?.period as LocalizedDateFilter,
        coaHead: coaHeads,
      },
    },
    { enabled: !!filters }
  );

  const adjustedData = data?.report?.transactionReport?.financial?.ledgerBalanceReport?.data;

  return (
    <Report
      defaultFilters={{}}
      data={adjustedData as LedgerBalanceReportData[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.OTHERS_LEDGER_BALANCE_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Other Report', link: '/cbs/reports/cbs-reports/others' },
            {
              label: 'Ledger Balance Report',
              link: '/cbs/reports/cbs-reports/others/ledger-balance/new',
            },
          ]}
        />
        <Report.Inputs hideDate>
          <AdjustedLedgerInputs />
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />
          <Report.Table<LedgerBalanceReportData>
            showFooter
            columns={[
              {
                header: 'Branch',
                accessorKey: 'branchName',
              },
              {
                header: 'Ledger Id',
                accessorKey: 'ledgerName',
                cell: (props) => (
                  <Button
                    variant="link"
                    color="primary.500"
                    padding={0}
                    onClick={() =>
                      window.open(
                        `/cbs/reports/cbs-reports/others/ledger/new?id=${JSON.stringify({
                          label: props?.row?.original?.ledgerName,
                          value: props?.row?.original?.ledgerId,
                        })}&branch=${props?.row?.original?.branchId}&dateFrom=${JSON.stringify(
                          datePeriod?.from
                        )}&dateTo=${JSON.stringify(datePeriod?.to)}&isAdjusted=true`,
                        '_blank'
                      )
                    }
                  >
                    {props?.row?.original?.ledgerName}
                  </Button>
                ),
              },
              {
                header: 'Opening Balance',
                accessorKey: 'openingBalance',
                cell: (props) =>
                  debitCreditConverter(
                    props?.row?.original?.openingBalance?.amount as string,
                    props?.row?.original?.openingBalance?.amountType as string
                  ),
              },
              {
                header: 'Dr ',
                accessorKey: 'dr',
                cell: (props) => amountConverter(props?.row?.original?.dr || 0),
              },

              {
                header: 'Cr ',
                accessorKey: 'cr',
                cell: (props) => amountConverter(props?.row?.original?.cr || 0),
              },
              {
                header: 'Dr Total Adjusted',
                accessorKey: 'adjustedDr',
                cell: (props) => amountConverter(props?.row?.original?.adjustedDr || 0),
              },

              {
                header: 'Cr Total Adjusted',
                accessorKey: 'adjustedCr',
                cell: (props) => amountConverter(props?.row?.original?.adjustedCr || 0),
              },
              {
                header: 'Balance',
                accessorKey: 'balance',
                cell: (props) =>
                  debitCreditConverter(
                    props?.row?.original?.balance?.amount as string,
                    props?.row?.original?.balance?.amountType as string
                  ),
              },
              {
                header: 'Settled Balance',
                accessorKey: 'settledBalance',
                cell: (props) =>
                  debitCreditConverter(
                    props?.row?.original?.settledBalance?.amount as string,
                    props?.row?.original?.settledBalance?.amountType as string
                  ),
              },
            ]}
          />
        </Report.Content>
      </Report.Body>
    </Report>
  );
};

const AdjustedLedgerInputs = () => {
  const router = useRouter();
  const methods = useFormContext();
  const { branch, coaHead, dateFrom, dateTo } = router.query;

  const redirectDate =
    dateFrom && dateTo
      ? {
          from: JSON.parse(dateFrom as string),
          to: JSON.parse(dateTo as string),
        }
      : null;

  const redirectCoaHeads = coaHead ? JSON?.parse(router?.query['coaHead'] as string) : null;

  const redirectBranchesArray = branch
    ? (JSON?.parse(branch as string) as unknown as string[])
    : null;

  const redirectBranchesIDs = useMemo(
    () =>
      redirectBranchesArray?.map((b) => ({ value: b })) as unknown as {
        label: string;
        value: string;
      }[],
    [redirectBranchesArray]
  );

  useDeepCompareEffect(() => {
    if (redirectBranchesIDs?.length) {
      methods.setValue('branchId', redirectBranchesIDs);
    }
    if (redirectCoaHeads) {
      methods.setValue('coaHead', [redirectCoaHeads]);
    }
    if (redirectDate) {
      methods.setValue('period', redirectDate);
    }
  }, [redirectCoaHeads, redirectDate, redirectBranchesIDs]);

  return (
    <>
      <GridItem colSpan={2}>
        <FormBranchSelect
          showUserBranchesOnly
          isMulti
          name="branchId"
          label="Service Center"
          // isDisabled={!!branch}
        />
      </GridItem>

      <FormLeafCoaHeadSelect
        name="coaHead"
        label="COA Head"
        isMulti
        // isDisabled={!!redirectCoaHeads}
      />

      {/* <Box pointerEvents={dateFrom ? 'none' : 'auto'} cursor={dateFrom ? 'not-allowed' : 'pointer'}> */}
      <ReportDateRange name="period" label="Date" />
      {/* </Box> */}
    </>
  );
};
