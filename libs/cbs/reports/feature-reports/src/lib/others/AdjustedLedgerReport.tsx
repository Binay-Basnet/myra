import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useRouter } from 'next/router';

import { Box, Button, GridItem } from '@myra-ui';

import {
  AdjustedLedgerReportData,
  LocalizedDateFilter,
  useGetAdjustedLedgerReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportCustomDateRange } from '@coop/cbs/reports/components';
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
export const AdjustedLedgersReport = () => {
  const [filters, setFilters] = useState<Filter | null>(null);

  const branchIds =
    filters?.branchId && filters?.branchId.length !== 0
      ? filters?.branchId?.map((t) => t.value)
      : null;

  const coaHeads =
    filters?.coaHead && filters?.coaHead.length !== 0 ? filters?.coaHead?.map((t) => t.value) : [];

  const { data, isFetching } = useGetAdjustedLedgerReportQuery(
    {
      data: {
        branchId: branchIds,
        period: filters?.period as LocalizedDateFilter,
        coaHead: coaHeads,
      },
    },
    { enabled: !!filters }
  );

  const adjustedData = data?.report?.transactionReport?.financial?.adjustedLedgerReport?.data;
  const datePeriod = filters?.period;

  return (
    <Report
      defaultFilters={{}}
      data={adjustedData as AdjustedLedgerReportData[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.OTHERS_ADJUSTED_LEDGER_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Other Report', link: '/cbs/reports/cbs-reports/others' },
            {
              label: 'Adjusted Ledger Report',
              link: '/cbs/reports/cbs-reports/others/adjusted-ledger/new',
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
          <Report.Table<AdjustedLedgerReportData>
            showFooter
            columns={[
              {
                header: 'Branch',
                accessorKey: 'branchName',
              },
              {
                header: 'Ledger Id',
                accessorKey: 'ledgerId',
                cell: (props) => (
                  <Button
                    variant="link"
                    color="primary.500"
                    onClick={() =>
                      window.open(
                        `/cbs/reports/cbs-reports/others/ledger/new?id=${props.row?.original?.ledgerId}&branch=${props?.row?.original?.branchId}&dateFromen=${datePeriod?.from?.en}&dateToen=${datePeriod?.to?.en}&dateFromnp=${datePeriod?.from?.np}&dateTonp=${datePeriod?.to?.np}&isAdjusted=true`,

                        '_blank'
                      )
                    }
                  >
                    {props.row.original.ledgerId}
                  </Button>
                ),
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
                header: 'Dr Total Adjusted',
                accessorKey: 'dr',
                cell: (props) => amountConverter(props?.row?.original?.dr || 0),
              },

              {
                header: 'Cr Total Adjusted',
                accessorKey: 'cr',
                cell: (props) => amountConverter(props?.row?.original?.cr || 0),
              },
              {
                header: 'Adjusted Balance',
                accessorKey: 'adjustedBalance',
                cell: (props) =>
                  debitCreditConverter(
                    props?.row?.original?.adjustedBalance?.amount as string,
                    props?.row?.original?.adjustedBalance?.amountType as string
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
  const { id, dateFromen, branch } = router.query;
  const ledgerId = router.query['id'] as string[];
  const redirectDateFromEn = router.query['dateFromen'] as string;
  const redirectDateFromNp = router.query['dateFromnp'] as string;

  const redirectDateToEn = router.query['dateToen'] as string;

  const redirectDateToNp = router.query['dateTonp'] as string;

  const redirectDate = {
    from: {
      en: redirectDateFromEn,
      np: redirectDateFromNp,
    },
    to: {
      en: redirectDateToEn,
      np: redirectDateToNp,
    },
  };
  const redirectBranchesArray = branch
    ? (JSON?.parse(router?.query['branch'] as string) as unknown as string[])
    : null;
  const redirectBranchesIDs = redirectBranchesArray?.map((b) => ({ value: b })) as unknown as {
    label: string;
    value: string;
  }[];
  const ledgerArray = [ledgerId];
  const ledgerIDs = ledgerArray?.map((b) => ({ value: b })) as unknown as {
    label: string;
    value: string;
  }[];

  useEffect(() => {
    if (redirectBranchesArray) {
      methods.setValue('branchId', redirectBranchesIDs);
    }
    if (ledgerId) {
      methods.setValue('coaHead', ledgerIDs);
    }
    if (redirectDate) {
      methods.setValue('period', redirectDate);
    }
  }, [id, dateFromen, branch]);

  return (
    <>
      <GridItem colSpan={2}>
        <FormBranchSelect
          showUserBranchesOnly
          isMulti
          name="branchId"
          label="Service Center"
          isDisabled={!!branch}
        />
      </GridItem>

      <FormLeafCoaHeadSelect name="coaHead" label="COA Head" isMulti isDisabled={!!id} />
      <Box
        pointerEvents={dateFromen ? 'none' : 'auto'}
        cursor={dateFromen ? 'not-allowed' : 'pointer'}
      >
        <ReportCustomDateRange name="period" label="Date" />
      </Box>
    </>
  );
};
