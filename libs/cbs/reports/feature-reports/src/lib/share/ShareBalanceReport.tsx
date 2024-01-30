import { useState } from 'react';

import { Box, GridItem } from '@myra-ui';

import {
  Address,
  FormFieldSearchTerm,
  ShareBalanceReportData,
  ShareBalanceReportFilter,
  useGetIndividualKymOptionsQuery,
  useGetShareBalanceReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { formatAddress, localizedDate, localizedText, RouteToDetailsPage } from '@coop/cbs/utils';
import {
  FormAmountFilter,
  FormBranchSelect,
  FormCBSDatePicker,
  FormCheckboxGroup,
  FormInput,
} from '@coop/shared/form';
import { amountConverter, useTranslation } from '@coop/shared/utils';

type ShareBalanceReportFilters = Omit<ShareBalanceReportFilter, 'branchId'> & {
  branchId: {
    label: string;
    value: string;
  }[];
};

export const ShareBalanceReport = () => {
  const { t } = useTranslation();

  const [filters, setFilters] = useState<ShareBalanceReportFilters | null>(null);

  const branchIds =
    filters?.branchId && filters?.branchId.length !== 0
      ? filters?.branchId?.map((b) => b.value)
      : null;
  const genderIds = filters?.filter?.gender ?? null;

  const { data: genderFields } = useGetIndividualKymOptionsQuery({
    searchTerm: FormFieldSearchTerm.Gender,
  });

  const genderOptions = genderFields?.form?.options?.predefined?.data?.map((g) => ({
    label: localizedText(g?.name) as string,
    value: g?.id as string,
  }));

  const { data, isFetching } = useGetShareBalanceReportQuery(
    {
      data: {
        filter: {
          ...filters?.filter,
          gender: genderIds,
        },
        period: { from: filters?.period.from, to: filters?.period.from },
        branchId: branchIds,
      } as ShareBalanceReportFilter,
    },
    { enabled: !!filters }
  );

  const shareBalanceData = data?.report?.shareReport?.shareBalanceReport?.data;
  const totalShareBalance = data?.report?.shareReport?.shareBalanceReport?.totalBalance;

  return (
    <Report
      defaultFilters={{}}
      data={shareBalanceData as ShareBalanceReportData[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.SHARE_BALANCE_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: t['reportsSidebarShareReports'], link: '/cbs/reports/cbs-reports/share' },
            {
              label: t['reportsShareBalanceReport'],
              link: '/cbs/reports/cbs-reports/share/balance/new',
            },
          ]}
        />
        <Report.Inputs>
          <GridItem colSpan={3}>
            <FormBranchSelect
              showUserBranchesOnly
              isMulti
              name="branchId"
              label={t['serviceCenter']}
            />
          </GridItem>
          <GridItem colSpan={1}>
            <FormCBSDatePicker name="period.from" label="Date" setInitialDate />
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
                header: t['reportsShareBalanceReportShareType'],
                accessorKey: 'shareType',
                footer: () => <Box textAlign="right"> Total</Box>,
                meta: {
                  width: '60px',
                  Footer: {
                    colspan: 8,
                  },
                },
              },
              {
                header: t['reportsShareBalanceReportShareCertificateNumber'],
                accessorKey: 'shareCertificateNo',
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: t['reportsShareBalanceReportMemberID'],
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
                header: t['reportsShareBalanceReportMemberName'],
                accessorFn: (row) => row?.memberName?.local,
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: t['serviceCenter'],
                accessorFn: (row) => row?.branchName,
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: t['reportsShareBalanceReportAddress'],
                accessorKey: 'address',
                cell: (props) => formatAddress(props.getValue() as Address),
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: t['reportsShareBalanceReportContactNo'],
                accessorKey: 'contactNo',
                meta: {
                  Footer: {
                    display: 'none',
                  },
                  skipExcelFormatting: true,
                },
              },
              {
                header: t['reportsShareBalanceReportMembershipDate'],
                accessorKey: 'membershipDate',
                accessorFn: (row) => localizedDate(row?.membershipDate),
                meta: {
                  Footer: {
                    display: 'none',
                  },
                  skipExcelFormatting: true,
                },
              },
              {
                header: t['reportsShareBalanceReportNoOfKitta'],
                accessorKey: 'noOfKitta',
                meta: {
                  Footer: {
                    display: 'none',
                  },
                },
              },
              {
                header: t['reportsShareBalanceReportBalance'],
                footer: () => amountConverter(totalShareBalance as string),
                accessorKey: 'balance',
                cell: (props) => amountConverter(props.getValue() as string),
              },
            ]}
          />
        </Report.Content>
        <Report.Filters>
          <Report.Filter title={t['reportsShareBalanceReportGender']}>
            <FormCheckboxGroup name="filter.gender" list={genderOptions} orientation="column" />
          </Report.Filter>
          <Report.Filter title={t['reportsShareBalanceReportAge']}>
            <FormInput name="filter.age" textAlign="right" color="gray.700" type="number" />
          </Report.Filter>
          <Report.Filter title={t['reportsShareBalanceReportBalanceRange']}>
            <FormAmountFilter name="filter.balanceRange" />
          </Report.Filter>
        </Report.Filters>
      </Report.Body>
    </Report>
  );
};
