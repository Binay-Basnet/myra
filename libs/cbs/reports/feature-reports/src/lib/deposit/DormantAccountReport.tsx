import { useState } from 'react';

import { GridItem } from '@myra-ui';

import {
  DormantAccountReport,
  DormantAccountReportInput,
  SavingTransactionType,
  useGetDormantAccountReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { localizedDate, localizedText, RouteToDetailsPage } from '@coop/cbs/utils';
import { FormBranchSelect, FormRadioGroup } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

type DormantAccountReportFilters = Omit<DormantAccountReportInput, 'branchId'> & {
  branchId: { label: string; value: string }[];
};

export const DormantAccountsReport = () => {
  const [filters, setFilters] = useState<DormantAccountReportFilters | null>(null);
  const branchIds =
    filters?.branchId && filters?.branchId.length !== 0
      ? filters?.branchId?.map((t) => t.value)
      : null;

  const { data, isFetching } = useGetDormantAccountReportQuery(
    {
      data: { ...filters, branchId: branchIds } as DormantAccountReportInput,
    },
    { enabled: !!filters }
  );

  const dormantAccountReport = data?.report?.depositReport?.dormantAccountReport?.data;
  return (
    <Report
      defaultFilters={null}
      data={dormantAccountReport as DormantAccountReport[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.DORMANT_AC_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Saving Reports', link: '/reports/cbs/savings' },
            {
              label: 'Dormant Account List Report',
              link: '/reports/cbs/savings/dormant-account/new',
            },
          ]}
        />
        <Report.Inputs>
          <GridItem colSpan={3}>
            <FormBranchSelect isMulti name="branchId" label="Select Service Center" />
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
          <Report.Table<DormantAccountReport & { index: number }>
            columns={[
              {
                header: 'S.No',
                accessorKey: 'index',
              },
              {
                header: 'Member ID',
                accessorKey: 'memberID',
                cell: (props) => (
                  <RouteToDetailsPage
                    id={props?.row?.original?.memberID as string}
                    type="member"
                    label={props?.row?.original?.memberCode as string}
                  />
                ),
              },
              {
                header: 'Member Name',
                accessorKey: 'memberName',
                cell: (props) => localizedText(props?.row?.original?.memberName),
              },
              {
                header: 'Service Center Name',
                accessorKey: 'serviceCenter',
              },
              {
                header: 'Membership Registration Date',
                accessorKey: 'memberRegistrationDate',
                cell: (props) => localizedDate(props?.row?.original?.memberRegistrationDate),
              },
              {
                header: 'Mobile No',
                accessorKey: 'mobileNo',
              },
              {
                header: 'Product Name',
                accessorKey: 'productName',
              },
              {
                header: 'Dormant Account No',
                accessorKey: 'accountNo',
                cell: (props) => (
                  <RouteToDetailsPage
                    id={props?.row?.original?.accountNo as string}
                    type="savings"
                    label={props?.row?.original?.accountNo as string}
                  />
                ),
              },
              {
                header: 'Account Open Date',
                accessorKey: 'accountOpenDate',
                cell: (props) => localizedDate(props?.row?.original?.accountOpenDate),
              },
              {
                header: 'Accountt Name',
                accessorKey: 'accountName',
              },
              {
                header: 'Account Balance',
                accessorKey: 'balance',
                cell: (props) => amountConverter(props.getValue() as string),
              },
              {
                header: 'Reason for Account Dornmant',
                accessorKey: 'reason',
              },
              {
                header: 'Reason for Account Dornmant',
                accessorKey: 'remarks',
              },
            ]}
          />
        </Report.Content>
        <Report.Filters>
          <Report.Filter title="Account Type">
            <FormRadioGroup
              name="filter.accountType"
              options={[
                { label: 'All', value: SavingTransactionType.All },
                { label: 'Deposit', value: SavingTransactionType.Deposit },
                { label: 'Withdraw', value: SavingTransactionType.Withdraw },
              ]}
              direction="column"
            />
          </Report.Filter>
        </Report.Filters>
      </Report.Body>
    </Report>
  );
};
