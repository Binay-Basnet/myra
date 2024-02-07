import { useState } from 'react';

import { Box, GridItem } from '@myra-ui';

import {
  EbankingReportResult,
  ExpiryStatusFilter,
  KymStatusReport,
  KymStatusReportFilter,
  RiskCategoryFilter,
  useGetKymStatusReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { formatTableAddress, localizedDate, RouteToDetailsPage } from '@coop/cbs/utils';
import { FormBranchSelect, FormRadioGroup } from '@coop/shared/form';
import { useTranslation } from '@coop/shared/utils';

type KYMStatusReportFilters = Omit<KymStatusReportFilter, 'branchId'> & {
  branchId: {
    label: string;
    value: string;
  }[];
};

export const KYMStatusReport = () => {
  const { t } = useTranslation();

  const [filters, setFilters] = useState<KYMStatusReportFilters | null>(null);

  const branchIds =
    filters?.branchId && filters?.branchId.length !== 0
      ? filters?.branchId?.map((b) => b.value)
      : null;

  const { data, isFetching } = useGetKymStatusReportQuery(
    {
      data: { ...filters, branchId: branchIds } as KymStatusReportFilter,
    },
    { enabled: !!filters }
  );
  const mobileBankingReport = data?.report?.memberReport?.kymStatusReport?.data;

  const riskCategory = [
    {
      label: t['reportsMemberKYMStatusReportFilterRiskCategoryAll'],
      value: RiskCategoryFilter.All,
    },
    {
      label: t['reportsMemberKYMStatusReportFilterRiskCategoryLowRisk'],
      value: RiskCategoryFilter.Low,
    },
    {
      label: t['reportsMemberKYMStatusReportFilterRiskCategoryMediumRisk'],
      value: RiskCategoryFilter.Medium,
    },
    {
      label: t['reportsMemberKYMStatusReportFilterRiskCategoryHighRisk'],
      value: RiskCategoryFilter.High,
    },
  ];

  return (
    <Report
      defaultFilters={{
        filter: {
          status: ExpiryStatusFilter.All,
          riskCategory: RiskCategoryFilter.All,
        },
      }}
      data={mobileBankingReport as EbankingReportResult[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.KYM_STATUS_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: t['reportsSidebarMemberReports'], link: '/cbs/reports/cbs-reports/members' },
            {
              label: t['reportsKymStatusReport'],
              link: '/cbs/reports/cbs-reports/members/kym-status/new',
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
            <ReportDateRange label={t['reportsMemberKYMStatusReportMemberRegdDatePeriod']} />
          </GridItem>
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />
          <Report.Table<KymStatusReport & { index: number }>
            columns={[
              {
                header: t['sn'],
                accessorKey: 'index',
                meta: {
                  width: '60px',
                },
              },
              {
                header: t['serviceCenter'],
                accessorKey: 'branchName',
              },

              {
                header: t['reportsMemberKYMStatusReportMemberID'],
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
                header: t['reportsMemberKYMStatusReportMemberName'],
                accessorFn: (row) => row?.memberName,
                meta: {
                  width: '40%',
                },
              },
              {
                header: t['reportsMemberKYMStatusReportDistrict'],
                accessorFn: (row) => row?.address?.district?.local,
              },
              {
                header: t['reportsMemberKYMStatusReportWardNo'],
                accessorFn: (row) => row?.address?.wardNo,
              },
              {
                header: t['reportsMemberKYMStatusReportAddress'],
                accessorFn: (row) => row?.address,
                cell: (props) => formatTableAddress(props.row.original?.address),
              },
              {
                header: t['reportsMemberKYMStatusReportContact'],
                accessorFn: (row) => row?.contact,
                meta: {
                  skipExcelFormatting: true,
                },
              },
              {
                header: t['reportsMemberKYMStatusReportMemberRegistrationDate'],
                accessorFn: (row) => localizedDate(row?.regDate),
                meta: {
                  skipExcelFormatting: true,
                },
              },
              {
                header: t['reportsMemberKYMStatusReportRiskCategory'],
                accessorFn: (row) =>
                  riskCategory?.find((risk) => risk.value === row?.riskCategory)?.label ?? '-',
              },
              {
                header: t['reportsMemberKYMStatusReportLastKYMUpdate'],
                accessorFn: (row) => localizedDate(row?.lastKymUpdatedDate),
                meta: {
                  skipExcelFormatting: true,
                },
              },

              {
                header: t['reportsMemberKYMStatusReportKYMExpireDays'],
                accessorFn: (row) => row?.kymExpireDays,
                cell: (props) => (!props.getValue() ? '-' : `${props.getValue()} days`),
              },
              {
                header: t['reportsMemberKYMStatusReportKYMStatus'],
                accessorFn: (row) => row?.kymStatus,
              },
            ]}
          />

          <Box
            display="flex"
            flexDir="column"
            borderRadius="br2"
            border="1px"
            mb="s16"
            mx="s16"
            borderColor="border.element"
          >
            <Box h="40px" display="flex" borderBottom="1px" borderBottomColor="border.element">
              <Box
                display="flex"
                alignItems="center"
                w="80%"
                h="100%"
                px="s12"
                borderRight="1px"
                borderRightColor="border.element"
                fontSize="r1"
                fontWeight={600}
                color="gray.700"
              >
                {t['reportsMemberKYMStatusReportUpdatedTotal']}
              </Box>
              <Box px="s12" w="20%" display="flex" alignItems="center" justifyContent="end">
                {
                  data?.report?.memberReport?.kymStatusReport?.data?.filter(
                    (d) => d?.kymStatus === 'Updated'
                  )?.length
                }
              </Box>
            </Box>
            <Box h="40px" display="flex" borderBottom="1px" borderBottomColor="border.element">
              <Box
                display="flex"
                alignItems="center"
                w="80%"
                h="100%"
                px="s12"
                borderRight="1px"
                borderRightColor="border.element"
                fontSize="r1"
                fontWeight={600}
                color="gray.700"
              >
                {t['reportsMemberKYMStatusReportNotUpdatedTotal']}
              </Box>
              <Box px="s12" w="20%" display="flex" alignItems="center" justifyContent="end">
                {
                  data?.report?.memberReport?.kymStatusReport?.data?.filter(
                    (d) => d?.kymStatus === 'Not Updated'
                  )?.length
                }
              </Box>
            </Box>
            <Box h="40px" display="flex">
              <Box
                display="flex"
                alignItems="center"
                w="80%"
                h="100%"
                px="s12"
                borderRight="1px"
                borderRightColor="border.element"
                fontSize="r1"
                fontWeight={600}
                color="gray.700"
              >
                {t['reportsMemberKYMStatusReportTotalMember']}
              </Box>
              <Box px="s12" w="20%" display="flex" alignItems="center" justifyContent="end">
                {data?.report?.memberReport?.kymStatusReport?.data?.length ?? 0}
              </Box>
            </Box>
          </Box>
        </Report.Content>
        <Report.Filters>
          <Report.Filter title={t['reportsMemberKYMStatusReportFilterRiskCategory']}>
            <FormRadioGroup name="filter.riskCategory" options={riskCategory} direction="column" />
          </Report.Filter>
          <Report.Filter title={t['reportsMemberKYMStatusReportFilterExpiryStatus']}>
            <FormRadioGroup
              name="filter.status"
              options={[
                {
                  label: t['reportsMemberActiveInactiveReportFilterExpiryStatusAll'],
                  value: ExpiryStatusFilter.All,
                },
                {
                  label: t['reportsMemberActiveInactiveReportFilterExpiryStatusNotExpired'],
                  value: ExpiryStatusFilter.NotExpired,
                },
                {
                  label: t['reportsMemberActiveInactiveReportFilterExpiryStatusExpired'],
                  value: ExpiryStatusFilter.Expired,
                },
              ]}
              direction="column"
            />
          </Report.Filter>
        </Report.Filters>
      </Report.Body>
    </Report>
  );
};
