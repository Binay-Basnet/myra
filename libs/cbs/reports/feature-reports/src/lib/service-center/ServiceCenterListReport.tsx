import { useState } from 'react';

import { Box, GridItem } from '@myra-ui';

import {
  LocalizedDateFilter,
  ServiceCenter,
  useGetAllDistrictsQuery,
  useGetAllLocalGovernmentQuery,
  useGetAllProvinceQuery,
  useGetBranchReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { localizedDate } from '@coop/cbs/utils';
import { FormCheckbox, FormSelect } from '@coop/shared/form';

type Filter = {
  filter: {
    districtId?: { label: string; value: number }[];
    isExtensionCounter?: boolean;
    localGovernmentId?: { label: string; value: number }[];
    provinceId?: { label: string; value: number }[];
  };
  period: LocalizedDateFilter;
};

export const ServiceCenterListReport = () => {
  const [filters, setFilters] = useState<Filter | null>(null);

  const provinceIDs =
    filters?.filter?.provinceId && filters?.filter?.provinceId?.length !== 0
      ? filters?.filter?.provinceId?.map((province) => province.value)
      : null;

  const districtIDs =
    filters?.filter?.districtId && filters?.filter?.districtId?.length !== 0
      ? filters?.filter?.districtId?.map((district) => district.value)
      : null;

  const localGovernmentIds =
    filters?.filter?.localGovernmentId && filters?.filter?.localGovernmentId?.length !== 0
      ? filters?.filter?.localGovernmentId?.map((local) => local.value)
      : null;

  const { data: serviceCenterReportData, isFetching } = useGetBranchReportQuery(
    {
      data: {
        period: filters?.period as LocalizedDateFilter,
        filter: {
          ...filters?.filter,
          provinceId: provinceIDs,
          districtId: districtIDs,
          localGovernmentId: localGovernmentIds,
        },
      },
    },
    { enabled: !!filters }
  );
  const serviceCenterReport =
    serviceCenterReportData?.report?.branchReport?.branchReport?.data ?? [];

  const { data: provinceData } = useGetAllProvinceQuery();
  const { data: districtsData } = useGetAllDistrictsQuery();
  const { data: localGovernmentData } = useGetAllLocalGovernmentQuery();

  return (
    <Report
      defaultFilters={null}
      data={serviceCenterReport as ServiceCenter[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.SERVICE_CENTER_LIST_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Service Center Reports', link: '/reports/cbs/service-center' },
            {
              label: 'Service Center List Report',
              link: '/reports/cbs/service-center/list-report/new',
            },
          ]}
        />
        <Report.Inputs>
          <GridItem colSpan={3}>
            <ReportDateRange label="Service Center Established Date" />
          </GridItem>
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />
          <Report.Table<ServiceCenter & { index: number }>
            columns={[
              {
                id: '1',
                header: '',
                columns: [
                  {
                    header: 'S.No.',
                    accessorKey: 'index',
                    meta: {
                      width: '60px',
                    },
                  },
                  {
                    header: 'Service Center Name',
                    accessorFn: (row) => row?.name,
                  },
                  {
                    header: 'Service Center Code',
                    accessorFn: (row) => row?.serviceCenterCode,
                  },
                  {
                    header: 'Service Center Contact No.',
                    accessorFn: (row) => row?.contactNumber,
                  },
                  {
                    header: 'Email Address',
                    accessorFn: (row) => row?.email,
                  },
                ],
              },

              {
                header: 'Service Center Address',
                columns: [
                  {
                    header: 'Province',
                    accessorFn: (row) => row?.address?.state?.local,
                  },
                  {
                    header: 'District',
                    accessorFn: (row) => row?.address?.district?.local,
                  },
                  {
                    header: 'Local Government',
                    accessorFn: (row) => row?.address?.localGovernment?.local,
                  },
                  {
                    header: 'Ward',
                    accessorFn: (row) => row?.address?.wardNo,
                  },
                  {
                    header: 'Locality',
                    accessorFn: (row) => row?.address?.locality?.local,
                  },
                ],
              },
              {
                id: '2',
                header: '',
                columns: [
                  {
                    header: 'Contact Person Name',
                    accessorKey: 'managerName',
                  },
                  {
                    header: 'Contact Person Phone',
                    accessorKey: 'managerContact',
                  },
                  {
                    header: 'Is Extension Counter',
                    accessorKey: 'isExtensionCounter',
                    cell: (props) => (
                      <Box textTransform="capitalize">
                        {props?.row?.original?.isExtensionCounter === true ? 'Yes' : 'No'}
                      </Box>
                    ),
                  },
                  {
                    header: 'Service Center Opening Date',
                    accessorFn: (row) => localizedDate(row?.estDate),
                  },
                  {
                    header: 'Service Center Status',
                    accessorKey: 'branchStatus',
                    cell: (props) => (
                      <Box textTransform="capitalize">
                        {' '}
                        {props?.row?.original?.branchStatus === true ? 'Active' : 'InActive'}
                      </Box>
                    ),
                  },
                  {
                    header: 'Remarks',
                    accessorKey: 'remarks',
                  },
                ],
              },
            ]}
          />
        </Report.Content>
        <Report.Filters>
          <Report.Filter title="Address">
            <Box display="flex" flexDir="column" gap="s16">
              <FormSelect
                name="filter.provinceId"
                label="Province"
                isMulti
                options={provinceData?.administration?.provinces.map((province) => ({
                  label: province.name,
                  value: province.id,
                }))}
              />
              <FormSelect
                name="filter.districtId"
                label="District"
                isMulti
                options={districtsData?.administration?.districts.map((district) => ({
                  label: district.name,
                  value: district.id,
                }))}
              />
              <FormSelect
                name="filter.localGovernmentId"
                label="Local Government"
                isMulti
                options={localGovernmentData?.administration?.municipalities.map(
                  (localGovernment) => ({
                    label: localGovernment.name,
                    value: localGovernment.id,
                  })
                )}
              />
            </Box>
          </Report.Filter>
          <Report.Filter title="Is Extension Counter">
            <FormCheckbox label="Extension Counter" name="filter.isExtensionCounter" />
          </Report.Filter>
        </Report.Filters>
      </Report.Body>
    </Report>
  );
};
