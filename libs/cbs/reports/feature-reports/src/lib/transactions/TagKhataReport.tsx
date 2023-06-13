import { useState } from 'react';

import { GridItem } from '@myra-ui/components';

import {
  LocalizedDateFilter,
  useGetTagKhataReportQuery,
  useGetTagListForReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { FormBranchSelect, FormSelect } from '@coop/shared/form';

type ReportFilter = {
  branchId: { label: string; value: string }[];
  period: LocalizedDateFilter;
  tagId: { label: string; value: string }[];
};

export type Ledger = {
  closingBalance?: string;
  crAmount?: string;
  drAmount?: string;
  id?: string;
  name?: string;
  netBalance?: string;
  openingBalance?: string;
};

export const TagKhataReport = () => {
  const [filters, setFilters] = useState<ReportFilter | null>(null);

  const branchIDs =
    filters?.branchId && filters?.branchId.length !== 0
      ? filters?.branchId?.map((t) => t.value)
      : [];
  const tagId =
    filters?.tagId && filters?.tagId.length !== 0 ? filters?.tagId?.map((t) => t.value) : [];

  const { data: tagOptions } = useGetTagListForReportQuery();

  const { data, isFetching } = useGetTagKhataReportQuery(
    {
      data: {
        period: {
          from: filters?.period?.from,
          to: filters?.period?.to,
        } as LocalizedDateFilter,
        branchId: branchIDs,
        tagId,
      },
    },
    { enabled: !!filters }
  );

  const report = data?.report?.transactionReport?.financial?.tagKhataReport?.data?.map((d) => ({
    ...d,
    ledgers:
      d?.ledgers?.map((ledger) => ({
        closingBalance: ledger?.closingBalance,
        crAmount: ledger?.crAmount,
        drAmount: ledger?.drAmount,

        netBalance: ledger?.netBalance,
        openingBalance: ledger?.openingBalance,
        tagName: ledger?.ledgerName,
        tagId: ledger?.ledgerId,
        ledgers: [],
      })) || [],
  }));

  return (
    <Report
      data={report || []}
      isLoading={isFetching}
      report={ReportEnum.TRANSACTION_TAG_KHATA_REPORT}
      filters={filters}
      defaultFilters={null}
      setFilters={setFilters}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            {
              label: 'Transaction Reports',
              link: '/reports/cbs/transactions',
            },
            {
              label: 'Tag Khata Report',
              link: '/reports/cbs/transactions/tag-khata/new',
            },
          ]}
        />

        <Report.Inputs>
          <GridItem colSpan={2}>
            <FormBranchSelect isMulti name="branchId" label="Service Center" />
          </GridItem>
          <GridItem colSpan={1}>
            <FormSelect
              options={tagOptions?.settings?.chartsOfAccount?.tag?.list?.edges?.map((tag) => ({
                label: tag?.node?.name as string,
                value: tag?.node?.id as string,
              }))}
              isMulti
              name="tagId"
              label="Select Tag"
            />
          </GridItem>
          <GridItem colSpan={1}>
            <ReportDateRange />
          </GridItem>
        </Report.Inputs>
      </Report.Header>
      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />

          <Report.Table
            showFooter
            data={report}
            getSubRows={(row) => row?.ledgers}
            columns={[
              { header: 'Tag', accessorFn: (row) => row.tagName },
              {
                header: 'Opening Balance',
                accessorFn: (row) => row.openingBalance,
              },
              {
                header: 'Amount (Dr)',
                accessorFn: (row) => row.drAmount,
              },
              {
                header: 'Amount (Cr)',
                accessorFn: (row) => row.crAmount,
              },
              {
                header: 'Net Balance',
                accessorFn: (row) => row.netBalance,
              },
              {
                header: 'Closing Balance',
                accessorFn: (row) => row.closingBalance,
              },
            ]}
            tableTitle="Payments (Dr.)"
          />
        </Report.Content>
      </Report.Body>
    </Report>
  );
};
