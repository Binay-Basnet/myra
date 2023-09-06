import { useMemo, useState } from 'react';

import { GridItem, Text } from '@myra-ui';

import {
  AccountLockStatusInput,
  AccountLockStatusResultData,
  useGetAccountLockStatusReportQuery,
  useGetDepositProductSettingsListQuery,
  useGetSettingsUserListDataQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { localizedDate, RouteToDetailsPage } from '@coop/cbs/utils';
import { FormBranchSelect, FormSelect } from '@coop/shared/form';

type AccountClosingReportFilters = Omit<AccountLockStatusInput, 'branchId' | 'accountType'> & {
  branchId: {
    label: string;
    value: string;
  }[];
  accountType: {
    label: string;
    value: string;
  }[];
};

export const AccountLockStatusReport = () => {
  const [filters, setFilters] = useState<AccountClosingReportFilters | null>(null);

  const branchIds =
    filters?.branchId && filters?.branchId.length !== 0
      ? filters?.branchId?.map((t) => t.value)
      : null;

  const accountTypesID =
    filters?.accountType && filters?.accountType.length !== 0
      ? filters?.accountType?.map((t) => t.value)
      : null;

  const { data, isFetching } = useGetAccountLockStatusReportQuery(
    {
      data: {
        ...filters,
        branchId: branchIds,
        accountType: accountTypesID,
      } as AccountLockStatusInput,
    },
    { enabled: !!filters }
  );

  const accountLockingReport = data?.report?.depositReport?.accountLockStatusReport?.data;

  const { data: depositProduxt } = useGetDepositProductSettingsListQuery({
    paginate: {
      after: '',
      first: -1,
    },
  });
  const rowData = useMemo(
    () => depositProduxt?.settings?.general?.depositProduct?.list?.edges ?? [],
    [depositProduxt]
  );
  const productOptions = rowData?.map((item) => ({
    label: item?.node?.productName as string,
    value: item?.node?.id as string,
  }));
  const { data: userListData } = useGetSettingsUserListDataQuery({
    // filter: { role: [Roles.Agent] },
    paginate: { after: '', first: -1 },
  });
  const userList = userListData?.settings?.myraUser?.list?.edges;
  return (
    <Report
      defaultFilters={{}}
      data={accountLockingReport as AccountLockStatusResultData[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.ACCOUNT_LOCKED_STATUS_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Saving Reports', link: '/reports/cbs/savings' },
            {
              label: 'Account Locked Status Report',
              link: '/reports/cbs/savings/locked-status/new',
            },
          ]}
        />
        <Report.Inputs>
          <GridItem colSpan={2}>
            <FormBranchSelect
              showUserBranchesOnly
              isMulti
              name="branchId"
              label="Select Service Center"
            />
          </GridItem>
          <FormSelect name="accountType" label="Product Name" isMulti options={productOptions} />
          <GridItem colSpan={1}>
            <ReportDateRange />{' '}
          </GridItem>
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />
          <Report.Table<AccountLockStatusResultData>
            hasSNo={false}
            columns={[
              {
                header: 'Service Center Code-Name',
                accessorKey: 'branchName',
                cell: (props) => (
                  <Text>{`${props?.row?.original?.branchCode}- ${props?.row?.original?.branchName}`}</Text>
                ),
              },
              {
                header: 'Member Id',
                accessorKey: 'memberId',
                cell: (props) => (
                  <RouteToDetailsPage
                    id={props?.row?.original?.memberId as string}
                    type="member"
                    label={props?.row?.original?.memberCode as string}
                  />
                ),
              },
              {
                header: 'Member Name',
                accessorKey: 'memberName',
              },
              {
                header: 'Mobile Number',
                accessorKey: 'mobileNumber',
              },
              {
                header: 'Account Number',
                accessorKey: 'accountId',
                cell: (props) => (
                  <RouteToDetailsPage
                    id={props?.row?.original?.accountId as string}
                    type="account-close"
                    label={props?.row?.original?.accountId as string}
                  />
                ),
              },
              {
                header: 'Account Lock From Date',
                accessorFn: (row) => localizedDate(row?.accountLockDateFrom),
                meta: {
                  skipExcelFormatting: true,
                },
              },
              {
                header: 'Account Locked To Date',
                accessorFn: (row) => localizedDate(row?.accountLockDateTo),
                meta: {
                  skipExcelFormatting: true,
                },
              },

              {
                header: 'Reason For Locking',
                accessorKey: 'reasonForLock',
              },
              {
                header: 'Remarks',
                accessorKey: 'remarks',
              },
            ]}
          />
        </Report.Content>
        <Report.Filters>
          <Report.Filter title="User Select">
            <FormSelect
              label="Locked By User"
              options={userList?.map((user) => ({
                label: user.node?.name as string,
                value: user.node?.id as string,
              }))}
              name="filter.userId"
            />
          </Report.Filter>
        </Report.Filters>
      </Report.Body>
    </Report>
  );
};
