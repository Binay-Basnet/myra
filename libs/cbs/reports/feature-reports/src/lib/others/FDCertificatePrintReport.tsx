import { useState } from 'react';

import { GridItem } from '@myra-ui';

import {
  CertificatePrintFilter,
  CertificatePrintReport,
  ListType,
  useGetFdCertificatePrintReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { localizedDate, RouteToDetailsPage } from '@coop/cbs/utils';
import { FormSelect } from '@coop/shared/form';

const listOptions = [
  {
    label: 'All',
    value: ListType?.All,
  },
  {
    label: 'Printed',
    value: ListType?.Printed,
  },
  {
    label: 'Not Printed',
    value: ListType?.NotPrinted,
  },
];
export const FDCertificatePrintReport = () => {
  const [filters, setFilters] = useState<CertificatePrintFilter | null>(null);

  const { data, isFetching } = useGetFdCertificatePrintReportQuery(
    {
      data: {
        ...filters,
      } as CertificatePrintFilter,
    },
    { enabled: !!filters }
  );

  const shareData = data?.report?.printReport?.fbCertificateReport?.data;

  return (
    <Report
      defaultFilters={null}
      data={shareData as CertificatePrintReport[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.OTHERS_FD_CERTIFICATE_PRINT_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Others Reports', link: '/reports/cbs/others' },
            {
              label: 'FD-Certificate Report',
              link: '/reports/cbs/others/fd-print/new',
            },
          ]}
        />
        <Report.Inputs hideDate>
          <GridItem colSpan={3}>
            <FormSelect name="list" label="Select List Type" options={listOptions} />
          </GridItem>
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />
          <Report.Table<CertificatePrintReport & { index: number }>
            columns={[
              {
                header: 'S.No.',
                accessorKey: 'index',
              },
              {
                header: 'Member ID',
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
                header: 'Account Number',
                accessorKey: 'accountNumber',
                cell: (props) => (
                  <RouteToDetailsPage
                    id={props?.row?.original?.accountNumber as string}
                    type="savings"
                    label={props?.row?.original?.accountNumber as string}
                  />
                ),
              },
              {
                header: 'Account Name',
                accessorKey: 'accountName',
              },
              {
                header: 'Date',
                columns: [
                  {
                    header: 'Printed Date',
                    accessorKey: 'printedDate',
                    accessorFn: (row) => localizedDate(row?.printedDate),
                  },
                  {
                    header: 'Print Count',
                    accessorKey: 'printCount',
                  },
                ],
              },
              {
                header: 'Service Center',
                columns: [
                  {
                    header: 'Issue Service Center Name',
                    accessorKey: 'issueServiceCenter',
                  },
                  {
                    header: 'Printed Service Center Name',
                    accessorKey: 'printedServiceCenter',
                  },
                ],
              },
            ]}
          />
        </Report.Content>
      </Report.Body>
    </Report>
  );
};
