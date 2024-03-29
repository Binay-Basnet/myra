import { useState } from 'react';

import { Box, GridItem } from '@myra-ui';

import {
  FormFieldSearchTerm,
  LocalizedDateFilter,
  MemberAgeRange,
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
import { localizedDate, localizedText, RouteToDetailsPage } from '@coop/cbs/utils';
import {
  FormAmountFilter,
  FormBranchSelect,
  FormCheckboxGroup,
  FormSelect,
} from '@coop/shared/form';
import { amountConverter, useTranslation } from '@coop/shared/utils';

type Filter = {
  branchId: {
    label: string;
    value: string;
  }[];
  period: LocalizedDateFilter;
  filter: {
    gender?: string[];
    education?: string[];
    occupation?: { label: string; value: string }[];
    districtId?: { label: string; value: number }[];
    localGovernmentId?: { label: string; value: number }[];
    provinceId?: { label: string; value: number }[];
    ageRange?: MemberAgeRange;
  };
};
export const ShareTransactionsReport = () => {
  const { t } = useTranslation();

  const [filters, setFilters] = useState<Filter | null>(null);

  const branchIds =
    filters?.branchId && filters?.branchId.length !== 0
      ? filters?.branchId?.map((b) => b.value)
      : null;

  const occupationIds =
    filters?.filter?.occupation && filters?.filter?.occupation?.length !== 0
      ? filters?.filter?.occupation?.map((occ) => occ.value)
      : null;
  const educationIds = filters?.filter?.education ?? null;

  const genderIds = filters?.filter?.gender ?? null;

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
        branchId: branchIds,
        period: filters?.period as LocalizedDateFilter,
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

  const shareData = data?.report?.shareReport?.shareTransactionReport?.data;
  const footerData = data?.report?.shareReport?.shareTransactionReport?.footer;
  const totalShare = data?.report?.shareReport?.shareTransactionReport?.totalShareIssued;
  const averageSharePerMember =
    data?.report?.shareReport?.shareTransactionReport?.avgSharePerMember;

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

  const genderOptions = genderFields?.form?.options?.predefined?.data?.map((g) => ({
    label: localizedText(g?.name) as string,
    value: g?.id as string,
  }));

  const educationOptions = educationFields?.form?.options?.predefined?.data?.map((g) => ({
    label: localizedText(g?.name) as string,
    value: g?.id as string,
  }));
  const occupationOptions =
    occupationData?.form?.options?.predefined?.data?.map((g) => ({
      label: localizedText(g?.name) as string,
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
            { label: t['reportsSidebarShareReports'], link: '/cbs/reports/cbs-reports/share' },
            {
              label: t['reportsShareTransactionReport'],
              link: '/cbs/reports/cbs-reports/share/transaction/new',
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
            <ReportDateRange label={t['reportsShareTransactionReportShareTransactionDatePeriod']} />
          </GridItem>
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />
          <Report.Table<ShareTransactionReport>
            showFooter
            columns={[
              {
                id: '1',
                header: '',
                columns: [
                  {
                    header: t['reportsShareTransactionReportShareTransactionDate'],
                    footer: () => (
                      <Box textAlign="right">
                        {t['reportsShareTransactionReportShareTotalBalance']}
                      </Box>
                    ),
                    accessorKey: 'transactionDate',
                    accessorFn: (row) => localizedDate(row?.transactionDate),
                    meta: {
                      width: '60px',
                      Footer: {
                        colspan: 4,
                      },
                      skipExcelFormatting: true,
                    },
                  },
                  {
                    header: t['reportsShareTransactionReportMemberID'],
                    accessorKey: 'memberCode',
                    cell: (props) => (
                      <RouteToDetailsPage
                        id={props?.row?.original?.memberId as string}
                        type="member"
                        label={props?.row?.original?.memberCode as string}
                      />
                    ),
                    meta: {
                      Footer: {
                        display: 'none',
                      },
                      skipExcelFormatting: true,
                    },
                  },
                  {
                    header: t['reportsShareTransactionReportName'],
                    accessorKey: 'name',
                    meta: {
                      width: '100%',
                      Footer: {
                        display: 'none',
                      },
                    },
                  },
                  {
                    header: t['serviceCenter'],
                    accessorKey: 'branchName',
                    meta: {
                      Footer: {
                        display: 'none',
                      },
                    },
                  },
                ],
              },

              {
                header: t['reportsShareTransactionReportShareAccount'],
                columns: [
                  {
                    header: t['reportsShareTransactionReportShareReturnAmountDr'],
                    footer: () => amountConverter(footerData?.totalDr as string),
                    accessorKey: 'shareReturnDr',
                    cell: (props) => amountConverter(props.getValue() as string),
                    meta: {
                      isNumeric: true,
                    },
                  },
                  {
                    header: t['reportsShareTransactionReportShareReturnAmountCr'],
                    accessorKey: 'shareIssueCr',
                    footer: () => amountConverter(footerData?.totalCr as string),
                    cell: (props) => amountConverter(props.getValue() as string),
                    meta: {
                      isNumeric: true,
                    },
                  },
                  // {
                  //   header: 'Balance',
                  //   accessorKey: 'balance',
                  //   cell: (props) => amountConverter(props.getValue() as string),
                  //   footer: () => amountConverter(footerData?.totalBalance as string),

                  //   meta: {
                  //     isNumeric: true,
                  //   },
                  // },
                ],
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
            borderColor="border.layout"
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
                {t['reportsShareTransactionReportTotalShareIssued']}
              </Box>
              <Box px="s12" w="20%" display="flex" alignItems="center" justifyContent="end">
                {totalShare}
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
                {t['reportsShareTransactionReportAverageSharePerMember']}{' '}
              </Box>
              <Box px="s12" w="20%" display="flex" alignItems="center" justifyContent="end">
                {averageSharePerMember}{' '}
              </Box>
            </Box>
          </Box>
        </Report.Content>
        <Report.Filters>
          <Report.Filter title={t['reportsShareTransactionReportGender']}>
            <FormCheckboxGroup name="filter.gender" list={genderOptions} orientation="column" />
          </Report.Filter>
          <Report.Filter title={t['reportsShareTransactionReportEducation']}>
            <FormCheckboxGroup
              name="filter.education"
              list={educationOptions}
              orientation="column"
            />
          </Report.Filter>
          <Report.Filter title={t['reportsShareTransactionReportOccupationWise']}>
            <FormSelect name="filter.occupation" isMulti options={occupationOptions} />
          </Report.Filter>
          <Report.Filter title={t['reportsShareTransactionReportAddress']}>
            <Box display="flex" flexDir="column" gap="s16">
              <FormSelect
                name="filter.provinceId"
                label={t['province']}
                isMulti
                options={provinceData?.administration?.provinces.map((province) => ({
                  label: province.name,
                  value: province.id,
                }))}
              />
              <FormSelect
                name="filter.districtId"
                label={t['district']}
                isMulti
                options={districtsData?.administration?.districts.map((district) => ({
                  label: district.name,
                  value: district.id,
                }))}
              />
              <FormSelect
                name="filter.localGovernmentId"
                label={t['localGoverment']}
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
          <Report.Filter title={t['reportsShareTransactionReportAgeRange']}>
            <FormAmountFilter placeholder="Age" name="filter.ageRange" />
          </Report.Filter>
        </Report.Filters>
      </Report.Body>
    </Report>
  );
};
