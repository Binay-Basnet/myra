import { useState } from 'react';

import { GridItem } from '@myra-ui';

import {
  CopomisReportData,
  CopomisReportFilter,
  useGetCopomisImportMemberReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { localizedDate, RouteToDetailsPage } from '@coop/cbs/utils';
import { FormBranchSelect } from '@coop/shared/form';

type CopomisFilters = Omit<CopomisReportFilter, 'branchId'> & {
  branchId: { label: string; value: string }[];
};

export const CopomisImportMemberReport = () => {
  const [filters, setFilters] = useState<CopomisFilters | null>(null);

  const branchIds =
    filters?.branchId && filters?.branchId.length !== 0
      ? filters?.branchId?.map((t) => t.value)
      : null;
  const { data: interestTaxReportData, isFetching } = useGetCopomisImportMemberReportQuery(
    {
      data: { ...filters, branchId: branchIds } as CopomisReportFilter,
    },
    { enabled: !!filters }
  );
  const copomisReport = interestTaxReportData?.report?.memberReport?.copomisReport?.data;

  return (
    <Report
      defaultFilters={null}
      data={copomisReport as CopomisReportData[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.COPOMIS_IMPORT_MEMBER_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Other Report', link: '/cbs/reports/cbs-reports/others' },
            {
              label: 'Copomis Import Member Report',
              link: '/cbs/reports/cbs-reports/others/copomis-import-member/new',
            },
          ]}
        />
        <Report.Inputs>
          <GridItem colSpan={3}>
            <FormBranchSelect showUserBranchesOnly isMulti label="Select Branch" name="branchId" />
          </GridItem>
          <GridItem colSpan={1}>
            <ReportDateRange label="Select Period" />
          </GridItem>
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />
          <Report.Table<CopomisReportData>
            columns={[
              {
                header: 'Membership No',
                accessorKey: 'membershipNo',
                cell: (props) => (
                  <RouteToDetailsPage
                    id={props?.row?.original?.memberId as string}
                    type="member"
                    label={props?.row?.original?.membershipNo as string}
                  />
                ),
              },
              {
                header: 'Member Name',
                accessorKey: 'memberNameEn',
              },
              {
                header: 'Member Name (English)',
                accessorKey: 'memberNameEn',
              },
              {
                header: 'Membership Registration Date',
                accessorFn: (row) => localizedDate(row?.memberRegistrationDate),
                cell: (props) => localizedDate(props.row.original.memberRegistrationDate),
                meta: {
                  skipExcelFormatting: true,
                },
              },
              {
                header: 'Gender Record',
                accessorKey: 'genderRecordId',
              },
              {
                header: 'DOB',
                accessorKey: 'dateOfBirth',
                cell: (props) => localizedDate(props.row.original.dateOfBirth),
                meta: {
                  skipExcelFormatting: true,
                },
              },
              {
                header: 'Grandfather Name',
                accessorKey: 'grandfatherName',
              },

              {
                header: 'Father/ Husband Name',
                accessorKey: 'fatherHusbandName',
              },
              {
                header: 'Marital Status',
                accessorKey: 'maritalStatusId',
              },
              {
                header: 'Citizenship No.',
                accessorKey: 'citizenshipNo',
              },
              {
                header: 'Issued Date',
                accessorKey: 'citizenshipIssuedDate',
                cell: (props) => localizedDate(props.row.original.citizenshipIssuedDate),
              },
              {
                header: 'Issued District Id',
                accessorKey: 'citizenshipIssuedDistrictId',
              },
              {
                header: 'Cast Record Id',
                accessorKey: 'castRecordId',
              },
              {
                header: 'Address',
                accessorKey: 'address',
                cell: (props) => props.row.original.address?.np,
              },
              {
                header: 'Share Certificate No.',
                accessorKey: 'shareCertificateNo',
              },
              {
                header: 'Total Share',
                accessorKey: 'totalShare',
              },
            ]}
          />
        </Report.Content>
      </Report.Body>
    </Report>
  );
};
