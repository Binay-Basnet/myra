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
import { formatTableAddress, localizedDate } from '@coop/cbs/utils';
import { FormBranchSelect, FormRadioGroup } from '@coop/shared/form';

const riskCategory = [
  { label: 'All', value: RiskCategoryFilter.All },
  { label: 'Low Risk', value: RiskCategoryFilter.Low },
  { label: 'Medium Risk', value: RiskCategoryFilter.Medium },
  { label: 'High Risk', value: RiskCategoryFilter.High },
];

export const KYMStatusReport = () => {
  const [filters, setFilters] = useState<KymStatusReportFilter | null>(null);

  const { data, isFetching } = useGetKymStatusReportQuery(
    {
      data: filters as KymStatusReportFilter,
    },
    { enabled: !!filters }
  );
  const mobileBankingReport = data?.report?.memberReport?.kymStatusReport?.data;

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
            { label: 'Members Reports', link: '/reports/cbs/member-report' },
            {
              label: 'KYM Status Report',
              link: '/reports/cbs/members/kym-status/new',
            },
          ]}
        />
        <Report.Inputs>
          <GridItem colSpan={3}>
            <FormBranchSelect name="branchId" label="Service Center" />
          </GridItem>
          <GridItem colSpan={1}>
            <ReportDateRange label="Member Registration Date Period" />
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
                header: 'S.No.',
                accessorKey: 'index',
                meta: {
                  width: '60px',
                },
              },
              {
                header: 'Member ID',
                accessorKey: 'memberId',
              },
              {
                header: 'Member Name',
                accessorFn: (row) => row?.memberName,
                meta: {
                  width: '40%',
                },
              },
              {
                header: 'District',
                accessorFn: (row) => row?.address?.district?.local,
              },
              {
                header: 'Ward No.',
                accessorFn: (row) => row?.address?.wardNo,
              },
              {
                header: 'Address',
                accessorFn: (row) => row?.address,
                cell: (props) => formatTableAddress(props.row.original?.address),
              },
              {
                header: 'Contact',
                accessorFn: (row) => row?.contact,
              },
              {
                header: 'Member Registration Date',
                accessorFn: (row) => localizedDate(row?.regDate),
              },
              {
                header: 'Risk Category',
                accessorFn: (row) =>
                  riskCategory?.find((risk) => risk.value === row?.riskCategory)?.label ?? '-',
              },
              {
                header: 'Last KYM Update',
                accessorFn: (row) => localizedDate(row?.lastKymUpdatedDate),
              },

              {
                header: 'KYM Expire Days',
                accessorFn: (row) => row?.kymExpireDays,
                cell: (props) => (!props.getValue() ? '-' : `${props.getValue()} days`),
              },
              {
                header: 'KYM Status',
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
                Updated Total
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
                Not Updated Total
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
                Total Member
              </Box>
              <Box px="s12" w="20%" display="flex" alignItems="center" justifyContent="end">
                {data?.report?.memberReport?.kymStatusReport?.data?.length ?? 0}
              </Box>
            </Box>
          </Box>
        </Report.Content>
        <Report.Filters>
          <Report.Filter title="Risk Category">
            <FormRadioGroup name="filter.riskCategory" options={riskCategory} direction="column" />
          </Report.Filter>
          <Report.Filter title="Expiry Status">
            <FormRadioGroup
              name="filter.status"
              options={[
                { label: 'All', value: ExpiryStatusFilter.All },
                { label: 'Not Expired', value: ExpiryStatusFilter.NotExpired },
                { label: 'Expired', value: ExpiryStatusFilter.Expired },
              ]}
              direction="column"
            />
          </Report.Filter>
        </Report.Filters>
      </Report.Body>
    </Report>
  );
};
