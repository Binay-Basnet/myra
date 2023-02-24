import { useState } from 'react';

import { Box, GridItem } from '@myra-ui';

import {
  Address,
  ShareBalanceReportData,
  ShareBalanceReportFilter,
  useGetExceptionShareBalanceReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { formatAddress, localizedDate, RouteToDetailsPage } from '@coop/cbs/utils';
import { FormAmountFilter, FormBranchSelect, FormDatePicker } from '@coop/shared/form';
import { amountConverter } from '@coop/shared/utils';

type ShareBalanceReportFilters = Omit<ShareBalanceReportFilter, 'branchId'> & {
  branchId: {
    label: string;
    value: string;
  }[];
};

export const ExceptionShareBalanceReport = () => {
  const [filters, setFilters] = useState<ShareBalanceReportFilters | null>(null);

  const branchIds =
    filters?.branchId && filters?.branchId.length !== 0
      ? filters?.branchId?.map((t) => t.value)
      : null;

  const { data, isFetching } = useGetExceptionShareBalanceReportQuery(
    {
      data: {
        ...filters,
        period: { from: filters?.period.from, to: filters?.period.from },
        branchId: branchIds,
      } as ShareBalanceReportFilter,
    },
    { enabled: !!filters }
  );

  const shareBalanceData = data?.report?.exceptionReport?.shareBalanceReport?.data;
  const totalShareBalance = data?.report?.exceptionReport?.shareBalanceReport?.totalBalance;

  return (
    <Report
      defaultFilters={{}}
      data={shareBalanceData as ShareBalanceReportData[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.EXCEPTION_SHARE_BALANCE}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Exception Reports', link: '/reports/cbs/exceptions' },
            {
              label: 'Share Balance Exception Report',
              link: '/reports/cbs/exceptions/share-balance/new',
            },
          ]}
        />
        <Report.Inputs>
          <GridItem colSpan={3}>
            <FormBranchSelect isMulti name="branchId" label="Service Center" />
          </GridItem>
          <GridItem colSpan={1}>
            <FormDatePicker name="period.from" label="Date" />
          </GridItem>
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />
          <Report.Table<ShareBalanceReportData>
            hasSNo={false}
            showFooter
            columns={[
              {
                header: 'Share Type',
                accessorKey: 'shareType',
                footer: () => <Box textAlign="right"> Total</Box>,
                meta: {
                  width: '60px',
                  Footer: {
                    colspan: 9,
                  },
                },
              },
              {
                header: 'Share Certification Number',
                accessorKey: 'shareCertificateNo',
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Member ID',
                accessorKey: 'memberCode',
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
                accessorFn: (row) => row?.memberName?.local,
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Member Status',
                accessorKey: 'isInactive',
                accessorFn: (row) => row?.isInactive,
                cell: (props) => (props.getValue() ? 'Inactive' : 'Active'),
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },

              {
                header: 'Service Center',
                accessorFn: (row) => row?.branchName,
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Address',
                accessorKey: 'address',
                cell: (props) => formatAddress(props.getValue() as Address),
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Contact No',
                accessorKey: 'contactNo',
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Membership Date',
                accessorKey: 'membershipDate',
                accessorFn: (row) => localizedDate(row?.membershipDate),
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'No. of Kitta',
                accessorKey: 'noOfKitta',
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: 'Balance',
                footer: () => amountConverter(totalShareBalance as string),
                accessorKey: 'balance',
                cell: (props) => amountConverter(props.getValue() as string),
              },
            ]}
          />
        </Report.Content>
        <Report.Filters>
          <Report.Filter title="Balance Range">
            <FormAmountFilter name="filter.balanceRange" />
          </Report.Filter>
        </Report.Filters>
      </Report.Body>
    </Report>
  );
};
