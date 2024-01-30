import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

import { Box, GridItem, Text, toast } from '@myra-ui';

import {
  Address,
  LocalizedDateFilter,
  MemberIndividualData,
  MemberOtherData,
  MemberRegistrationReportData,
  MemberType,
  useGetMemberRegistrationReportForExportQuery,
  useGetMemberRegistrationReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { ReportDateRange } from '@coop/cbs/reports/components';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import { formatAddress, localizedDate, RouteToDetailsPage } from '@coop/cbs/utils';
import { FormBranchSelect, FormCheckboxGroup } from '@coop/shared/form';
import { amountConverter, useTranslation } from '@coop/shared/utils';

type Filter = Omit<MemberRegistrationReportData, 'branchId'> & {
  branchId: {
    label: string;
    value: string;
  }[];
  filter?: {
    gender?: string[];
    memberType?: MemberType[];
    institutionType?: string;
    occupation?: string[];
  };
  period: LocalizedDateFilter;
};

export const MemberRegisterReport = () => {
  const { t } = useTranslation();

  const [filters, setFilters] = useState<Filter | null>(null);

  const branchIds =
    filters?.branchId && filters?.branchId.length !== 0
      ? filters?.branchId?.map((b) => b.value)
      : null;
  const memberTypes =
    filters?.filter?.memberType && filters?.filter?.memberType.length !== 0
      ? filters?.filter?.memberType?.map((m) => m)
      : null;

  const { data: memberRegistrationReportData, isFetching } = useGetMemberRegistrationReportQuery(
    {
      data: {
        period: filters?.period as LocalizedDateFilter,
        branchId: branchIds,
        filter: {
          ...filters?.filter,
          memberType: memberTypes,
        },
      },
    },
    { enabled: !!filters }
  );

  const individualReport = memberRegistrationReportData?.report?.memberReport
    ?.memberRegistrationReport?.data?.individual as MemberIndividualData[];
  const otherReport = memberRegistrationReportData?.report?.memberReport?.memberRegistrationReport
    ?.data?.other as MemberOtherData[];

  return (
    <Report
      defaultFilters={{}}
      data={individualReport ?? otherReport}
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.MEMBER_REGISTER_REPORT}
    >
      <Report.Header>
        <ReportHeaderWatch />
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
            <ReportDateRange label={t['reportsMemberRegisterReportMemberRegdDatePeriod']} />
          </GridItem>
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />
          <Box display="flex" flexDir="column" gap="s32">
            {individualReport && individualReport?.length !== 0 ? (
              <Box pt="s16">
                <Text px="s16" fontSize="r2" color="gray.800" fontWeight={500}>
                  {t['reportsMemberRegisterReportIndividual']}
                </Text>
                <Report.Table<MemberIndividualData & { index: number }>
                  data={individualReport?.map((r, index) => ({ ...r, index: index + 1 }))}
                  columns={[
                    {
                      header: t['reportsMemberRegisterReportIndMemberID'],
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
                      header: t['reportsMemberRegisterReportIndMemberName'],
                      accessorFn: (row) => row?.name,
                    },
                    {
                      header: t['reportsMemberRegisterReportIndAddress'],
                      accessorKey: 'address',
                      cell: (props) => formatAddress(props.getValue() as Address),
                    },

                    {
                      header: t['reportsMemberRegisterReportIndDOB'],
                      accessorFn: (row) => localizedDate(row?.dob),
                      meta: {
                        skipExcelFormatting: true,
                      },
                    },
                    {
                      header: t['reportsMemberRegisterReportIndGrandFatherName'],
                      accessorFn: (row) => row?.grandFatherName,
                    },

                    {
                      header: t['reportsMemberRegisterReportIndFatherName'],
                      accessorFn: (row) => row?.fatherName,
                    },

                    {
                      header: t['reportsMemberRegisterReportIndProfession'],
                      accessorKey: 'profession',
                    },
                    {
                      header: t['reportsMemberRegisterReportIndShareInformation'],
                      columns: [
                        {
                          header: t['reportsMemberRegisterReportIndPerShareKitta'],
                          accessorFn: (row) => row?.shareInfo?.perShareAmount,
                          cell: (props) => amountConverter(props.getValue() as string),
                        },
                        {
                          header: t['reportsMemberRegisterReportIndSharePurchaseKitta'],
                          accessorFn: (row) => row?.shareInfo?.kitta,
                        },
                        {
                          header: t['reportsMemberRegisterReportIndTotalAmount'],
                          accessorFn: (row) => row?.shareInfo?.amount,
                          cell: (props) => amountConverter(props.getValue() as string),
                        },
                      ],
                    },
                    {
                      header: t['reportsMemberRegisterReportIndFingerprint'],
                      accessorKey: 'fingerPrint',
                      cell: (props) => (props?.getValue() ? 'Yes' : 'No'),
                    },

                    {
                      header: t['reportsMemberRegisterReportIndPhoto'],
                      accessorKey: 'photo',
                      cell: (props) => (props?.getValue() ? 'Yes' : 'No'),
                    },

                    {
                      header: t['reportsMemberRegisterReportIndContactNumber'],
                      accessorKey: 'contactNo',
                      meta: {
                        skipExcelFormatting: true,
                      },
                    },
                    {
                      header: t['reportsMemberRegisterReportIndEmail'],
                      accessorKey: 'email',
                    },
                    {
                      header: t['reportsMemberRegisterReportIndVatPanNo'],
                      accessorKey: 'panVatNo',
                      meta: {
                        skipExcelFormatting: true,
                      },
                    },
                    {
                      header: t['reportsMemberRegisterReportIndOther'],
                      accessorKey: 'other',
                    },
                    {
                      header: t['reportsMemberRegisterReportIndMembershipDate'],
                      accessorFn: (row) => localizedDate(row?.activeDate),
                      meta: {
                        skipExcelFormatting: true,
                      },
                    },
                  ]}
                  tableTitle={t['reportsMemberRegisterReportIndTableTitle']}
                />
              </Box>
            ) : null}

            {otherReport && otherReport?.length !== 0 ? (
              <Box pt="s16">
                <Text px="s16" fontSize="r2" color="gray.800" fontWeight={500}>
                  {t['reportsMemberRegisterReportInstCoopCoopUnion']}
                </Text>
                <Report.Table<MemberOtherData & { index: number }>
                  data={otherReport?.map((r, index) => ({ ...r, index: index + 1 }))}
                  columns={[
                    {
                      header: t['reportsMemberRegisterReportInstCoopCoopUnionMemberID'],
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
                      header: t['reportsMemberRegisterReportInstCoopCoopUnionMemberName'],
                      accessorFn: (row) => row?.name,
                    },
                    {
                      header: t['reportsMemberRegisterReportInstCoopCoopUnionAddress'],
                      accessorKey: 'address',
                      cell: (props) => formatAddress(props.getValue() as Address),
                    },

                    {
                      header: t['reportsMemberRegisterReportInstCoopCoopUnionDOE'],
                      accessorFn: (row) => localizedDate(row?.doe),
                    },
                    {
                      header: t['reportsMemberRegisterReportInstCoopCoopUnionTypeOfInstitution'],
                      accessorKey: 'typeOfInstitution',
                      cell: (props) => (
                        <Box textTransform="capitalize">
                          {' '}
                          {props?.row?.original?.typeOfInstitution
                            ?.toLowerCase()
                            ?.replace(/_/g, ' ')}
                        </Box>
                      ),
                    },

                    {
                      header: t['reportsMemberRegisterReportInstCoopCoopUnionWorkingArea'],
                      accessorKey: 'workingArea',
                    },

                    {
                      header: t['reportsMemberRegisterReportInstCoopCoopUnionTotalMember'],
                      accessorKey: 'totalMember',
                    },

                    {
                      header: t['reportsMemberRegisterReportInstCoopCoopUnionBalanceSheet'],
                      accessorKey: 'balanceSheet',
                      cell: (props) => amountConverter(props.getValue() as string),
                    },
                    {
                      header: t['reportsMemberRegisterReportInstCoopCoopUnionShareInformation'],
                      columns: [
                        {
                          header: t['reportsMemberRegisterReportInstCoopCoopUnionPerShareKitta'],
                          accessorFn: (row) => row?.shareInfo?.perShareAmount,
                          cell: (props) => amountConverter(props.getValue() as string),
                        },
                        {
                          header:
                            t['reportsMemberRegisterReportInstCoopCoopUnionSharePurchaseKitta'],
                          accessorFn: (row) => row?.shareInfo?.kitta,
                        },
                        {
                          header: t['reportsMemberRegisterReportInstCoopCoopUnionTotalAmount'],
                          accessorFn: (row) => row?.shareInfo?.amount,
                        },
                      ],
                    },
                    {
                      header: t['reportsMemberRegisterReportInstCoopCoopUnionAuthorizedPersonName'],
                      accessorKey: 'authPersonName',
                    },
                    {
                      header: t['reportsMemberRegisterReportInstCoopCoopUnionPost'],
                      accessorKey: 'post',
                    },
                    {
                      header: t['reportsMemberRegisterReportInstCoopCoopUnionStamp'],
                      accessorKey: 'stamp',
                      cell: (props) => (props?.getValue() ? 'Yes' : 'No'),
                    },

                    {
                      header: t['reportsMemberRegisterReportInstCoopCoopUnionContactNumber'],
                      accessorKey: 'contactNo',
                    },
                    {
                      header: t['reportsMemberRegisterReportInstCoopCoopUnionEmail'],
                      accessorKey: 'email',
                    },
                    {
                      header: t['reportsMemberRegisterReportInstCoopCoopUnionVatPanNo'],
                      accessorKey: 'panVatNo',
                    },
                    {
                      header: t['reportsMemberRegisterReportInstCoopCoopUnionOther'],
                      accessorKey: 'other',
                    },
                    {
                      header: t['reportsMemberRegisterReportInstCoopCoopUnionMembershipDate'],
                      accessorFn: (row) => localizedDate(row?.activeDate),
                      meta: {
                        skipExcelFormatting: true,
                      },
                    },
                  ]}
                  tableTitle={t['reportsMemberRegisterReportInstCoopCoopUnionTableTitle']}
                />
              </Box>
            ) : null}
          </Box>
        </Report.Content>
        <Report.Filters>
          <Report.Filter title={t['reportsMemberRegisterReportFilterMemberType']}>
            <FormCheckboxGroup
              name="filter.memberType"
              orientation="column"
              list={[
                {
                  label: t['reportsMemberRegisterReportFilterMemberTypeAll'],
                  value: MemberType.All,
                },
                {
                  label: t['reportsMemberRegisterReportFilterMemberTypeIndividual'],
                  value: MemberType.Individual,
                },
                {
                  label: t['reportsMemberRegisterReportFilterMemberTypeInstitution'],
                  value: MemberType.Institution,
                },
                {
                  label: t['reportsMemberRegisterReportFilterMemberTypeCooperative'],
                  value: MemberType.Cooperative,
                },
                {
                  label: t['reportsMemberRegisterReportFilterMemberTypeCooperativeUnion'],
                  value: MemberType.CooperativeUnion,
                },
              ]}
            />
          </Report.Filter>
        </Report.Filters>
      </Report.Body>
    </Report>
  );
};

const ReportHeaderWatch = () => {
  const { t } = useTranslation();

  const [triggerExport, setTriggerExport] = useState(false);
  const [isExportPDF, setIsExportPDF] = useState(false);
  const [isExportExcel, setIsExportExcel] = useState(false);
  const methods = useFormContext();

  const values = methods?.getValues();

  const branchIds =
    values?.['branchId'] && values?.['branchId'].length !== 0
      ? values?.['branchId']?.map((b) => b.value)
      : null;

  useGetMemberRegistrationReportForExportQuery(
    {
      data: {
        period: values?.['period'] as LocalizedDateFilter,
        branchId: branchIds,
        filter: {
          isExportPDF,
          isExportExcel,
        },
      },
    },
    {
      enabled: triggerExport,
      staleTime: 0,
      onSettled: () => setTriggerExport(false),
      onSuccess: (res) => {
        setTriggerExport(false);
        toast({
          id: 'export',
          type: 'success',
          message: res?.report?.memberReport?.memberRegistrationReport?.success?.message as string,
        });
      },
    }
  );

  return (
    <Report.PageHeader
      paths={[
        { label: t['reportsSidebarMemberReports'], link: '/cbs/reports/cbs-reports/members' },
        {
          label: t['reportsMemberRegisterReport'],
          link: '/cbs/reports/cbs-reports/members/register/new',
        },
      ]}
      canExport
      onExportPDF={() => {
        setTriggerExport(true);
        setIsExportPDF(true);
        setIsExportExcel(false);
      }}
      onExportCSV={() => {
        setTriggerExport(true);
        setIsExportPDF(false);
        setIsExportExcel(true);
      }}
    />
  );
};
