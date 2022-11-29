import { useState } from 'react';
import { Box, GridItem } from '@myra-ui';

import {
  FormFieldSearchTerm,
  MemberAgeRange,
  PeriodInput,
  ShareTransactionReport,
  useGetAllDistrictsQuery,
  useGetAllLocalGovernmentQuery,
  useGetAllProvinceQuery,
  useGetIndividualKymOptionsQuery,
  useGetShareTransactionReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import {
  FormAmountFilter,
  FormBranchSelect,
  FormCheckboxGroup,
  FormSelect,
} from '@coop/shared/form';

type Filter = {
  branchId: string;
  period: PeriodInput;
  filter: {
    gender?: { label: string; value: string }[];
    eductaion?: { label: string; value: string }[];
    occupation?: { label: string; value: string }[];
    districtId?: { label: string; value: number }[];
    localGovernmentId?: { label: string; value: number }[];
    provinceId?: { label: string; value: number }[];
    ageRange?: MemberAgeRange;
  };
};
export const ShareTransactionsReport = () => {
  const [filters, setFilters] = useState<Filter | null>(null);

  const occupationIds =
    filters?.filter?.occupation && filters?.filter?.occupation?.length !== 0
      ? filters?.filter?.occupation?.map((occ) => occ.value)
      : null;
  const educationIds =
    filters?.filter?.eductaion && filters?.filter?.eductaion?.length !== 0
      ? filters?.filter?.eductaion?.map((edu) => edu.value)
      : null;

  const genderIds =
    filters?.filter?.gender && filters?.filter?.gender?.length !== 0
      ? filters?.filter?.gender?.map((gen) => gen.value)
      : null;
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

  const { data, isFetching } = useGetShareTransactionReportQuery(
    {
      data: {
        branchId: filters?.branchId as string,
        period: filters?.period as PeriodInput,
        filter: {
          ...filters?.filter,
          provinceId: provinceIDs,
          districtId: districtIDs,
          localGovernmentId: localGovernmentIds,
          gender: genderIds,
          education: educationIds,
          occupation: occupationIds,
        },
      },
    },
    { enabled: !!filters }
  );

  const shareData = data?.report?.shareTransactionReport?.data;
  const footerData = data?.report?.shareTransactionReport?.footer;

  const { data: provinceData } = useGetAllProvinceQuery();
  const { data: districtsData } = useGetAllDistrictsQuery();
  const { data: localGovernmentData } = useGetAllLocalGovernmentQuery();
  const { data: genderFields } = useGetIndividualKymOptionsQuery({
    searchTerm: FormFieldSearchTerm.Gender,
  });
  const { data: educationFields } = useGetIndividualKymOptionsQuery({
    searchTerm: FormFieldSearchTerm.EducationQualification,
  });
  const { data: occupationData } = useGetIndividualKymOptionsQuery({
    searchTerm: FormFieldSearchTerm.Occupation,
  });

  const genderOptions =
    genderFields?.form?.options?.predefined?.data?.map((g) => ({
      label: String(g?.name?.local),
      value: g?.id as string,
    })) || [];
  const educationOptions =
    educationFields?.form?.options?.predefined?.data?.map((g) => ({
      label: String(g?.name?.local),
      value: g?.id as string,
    })) || [];
  const occupationOptions =
    occupationData?.form?.options?.predefined?.data?.map((g) => ({
      label: String(g?.name?.local),
      value: g?.id as string,
    })) || [];

  return (
    <Report
      defaultFilters={{}}
      data={shareData as ShareTransactionReport[]}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.SHARE_TRANSACTION_REPORT}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: 'Share Reports', link: '/reports/cbs/share' },
            { label: 'Share Reports', link: '/reports/cbs/share/transaction/new' },
          ]}
        />
        <Report.Inputs defaultFilters={null} setFilters={setFilters}>
          <GridItem colSpan={3}>
            <FormBranchSelect name="branchId" label="Branch" />
          </GridItem>
          <GridItem colSpan={1}>
            <ReportDateRange label="Share Transaction Date Period" />
          </GridItem>
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization statementDate={filters?.period?.periodType} />
          <Report.Table<ShareTransactionReport>
            showFooter
            columns={[
              {
                id: '1',
                header: '',
                columns: [
                  {
                    header: 'Share Transaction Date',
                    footer: () => <Box textAlign="right">Total Balance</Box>,
                    accessorKey: 'transactionDate',
                    meta: {
                      width: '60px',
                      Footer: {
                        colspan: 3,
                      },
                    },
                  },
                  {
                    header: 'Member ID',
                    accessorKey: 'memberId',
                    meta: {
                      Footer: {
                        display: 'none',
                      },
                    },
                  },
                  {
                    header: 'Name',
                    accessorKey: 'name',
                    meta: {
                      width: '100%',
                      Footer: {
                        display: 'none',
                      },
                    },
                  },
                ],
              },

              {
                header: 'Share Account',
                columns: [
                  {
                    header: 'Share Return Amount Dr.',
                    footer: () => footerData?.totatDr,
                    accessorKey: 'shareReturnDr',
                    meta: {
                      isNumeric: true,
                    },
                  },
                  {
                    header: 'Share Issue Amount Cr.',
                    accessorKey: 'shareIssueCr',
                    footer: () => footerData?.totalCr,
                    meta: {
                      isNumeric: true,
                    },
                  },
                  {
                    header: 'Balance',
                    accessorKey: 'balance',
                    footer: () => footerData?.totalBalance,

                    meta: {
                      isNumeric: true,
                    },
                  },
                ],
              },
            ]}
          />
        </Report.Content>
        <Report.Filters>
          <Report.Filter title="Gender">
            <FormCheckboxGroup name="filter.gender" list={genderOptions} orientation="column" />
          </Report.Filter>
          <Report.Filter title="Education">
            <FormCheckboxGroup
              name="filter.education"
              list={educationOptions}
              orientation="column"
            />
          </Report.Filter>
          <Report.Filter title="Occupation Wise">
            <FormSelect name="filter.occupation" isMulti options={occupationOptions} />
          </Report.Filter>
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
          <Report.Filter title="Age Range">
            <FormAmountFilter name="filter.ageRange" />
          </Report.Filter>
        </Report.Filters>
      </Report.Body>
    </Report>
  );
};
