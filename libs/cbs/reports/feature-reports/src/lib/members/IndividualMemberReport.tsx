import { useState } from 'react';
import Link from 'next/link';
import { Image } from '@chakra-ui/react';

import { Box, Button, GridItem, Text } from '@myra-ui';

import {
  MemberClosedAccounts,
  MemberKymStatus,
  MemberLoanDetail,
  MemberRecentTransactions,
  MemberSavingDetail,
  MemberShareDetail,
  MemberWithDrawSlipIssueStatus,
  RiskCategoryFilter,
  useGetIndividualMemberReportQuery,
} from '@coop/cbs/data-access';
import { Report } from '@coop/cbs/reports';
import { Report as ReportEnum } from '@coop/cbs/reports/list';
import {
  formatAddress,
  localizedDate,
  localizedText,
  ROUTES,
  RouteToDetailsPage,
} from '@coop/cbs/utils';
import { FormMemberSelect } from '@coop/shared/form';
import { amountConverter, quantityConverter, useTranslation } from '@coop/shared/utils';

const riskCategory = {
  [RiskCategoryFilter.All]: 'All',
  [RiskCategoryFilter.Low]: 'Low Risk',
  [RiskCategoryFilter.Medium]: 'Medium Risk',
  [RiskCategoryFilter.High]: 'High Risk',
};

export const IndividualMemberReport = () => {
  const { t } = useTranslation();

  const [filters, setFilters] = useState<{ memberId: string } | null>(null);

  const { data, isFetching } = useGetIndividualMemberReportQuery(
    {
      memberId: filters?.memberId as string,
    },
    { enabled: !!filters }
  );
  const individualMemberReportData = data?.report?.memberReport?.individualMemberReport?.data;
  const individualMemberReportHeader = individualMemberReportData?.header;
  const individualMemberKymtable = [
    {
      id: individualMemberReportData?.kymStatusForMember?.id,
      riskCategory: individualMemberReportData?.kymStatusForMember?.riskCategory,
      lastUpdatedDate: individualMemberReportData?.kymStatusForMember?.lastUpdatedDate,
      ExpiryDays: individualMemberReportData?.kymStatusForMember?.ExpiryDays,
      Status: individualMemberReportData?.kymStatusForMember?.Status,
    },
  ] as MemberKymStatus[];

  return (
    <Report
      defaultFilters={null}
      data={
        (individualMemberReportData?.savingDetail ||
          individualMemberReportData?.loanDetail ||
          individualMemberReportData?.recentTransactions ||
          individualMemberReportData?.closedAccountDetail ||
          individualMemberReportData?.shareDetail) as MemberSavingDetail[]
      }
      filters={filters}
      setFilters={setFilters}
      isLoading={isFetching}
      report={ReportEnum.INDIVIDUAL_MEMBER_PROFILE}
    >
      <Report.Header>
        <Report.PageHeader
          paths={[
            { label: t['reportsSidebarMemberReports'], link: '/cbs/reports/cbs-reports/members' },
            {
              label: t['reportsIndividualMemberProfileReport'],
              link: '/cbs/reports/cbs-reports/members/individual-member-report/new',
            },
          ]}
        />
        <Report.Inputs hideDate>
          <GridItem colSpan={4}>
            <FormMemberSelect name="memberId" />
          </GridItem>
        </Report.Inputs>
      </Report.Header>

      <Report.Body>
        <Report.Content>
          <Report.OrganizationHeader />
          <Report.Organization />

          <Box p="s16" w="100%" gap="s16" display="flex">
            <Image
              flexShrink={0}
              alt={individualMemberReportHeader?.name?.local as string}
              boxSize="150px"
              objectFit="cover"
              src={individualMemberReportHeader?.profilePic as string}
            />
            <Box w="50%" display="flex" gap="s10">
              <Box display="flex" flexDir="column" fontSize="r1" color="gray.700">
                <Text>{t['reportsIndMemberProfileReportMemberName']}:</Text>
                <Text>{t['reportsIndMemberProfileReportMembershipNo']}:</Text>
                <Text>{t['reportsIndMemberProfileReportAddress']}:</Text>
                <Text>{t['reportsIndMemberProfileReportContact']}:</Text>
                <Text>{t['reportsIndMemberProfileReportPanNo']}:</Text>
                <Text>{t['reportsIndMemberProfileReportMembershipDate']}:</Text>
              </Box>

              <Box display="flex" flexDir="column" fontSize="r1" fontWeight="500" color="gray.700">
                <Text noOfLines={1} textTransform="capitalize">
                  {localizedText(individualMemberReportHeader?.name) || '-'}
                </Text>
                <Text noOfLines={1}>{individualMemberReportHeader?.memberCode || '-'}</Text>
                <Text noOfLines={1}>
                  {formatAddress(individualMemberReportHeader?.address) || '-'}
                </Text>
                <Text noOfLines={1}>{individualMemberReportHeader?.contactNo || '-'}</Text>
                <Text noOfLines={1}> {individualMemberReportHeader?.panNo || '-'}</Text>
                <Text noOfLines={1}>
                  {localizedDate(individualMemberReportHeader?.membershipDate) || '-'}
                </Text>
              </Box>
            </Box>
            <Box w="50%" display="flex" gap="s10">
              <Box display="flex" flexDir="column" fontSize="r1" color="gray.700">
                <Text>{t['reportsIndMemberProfileReportShareCertificateNo']}:</Text>
                <Text>{t['reportsIndMemberProfileReportTotalShareCount']}:</Text>
                <Text>{t['reportsIndMemberProfileReportMemberKYMRiskCategory']}:</Text>
                <Text>{t['reportsIndMemberProfileReportMemberKYMStatus']}:</Text>
                <Text>{t['reportsIndMemberProfileReportMemberKYMExpiryDate']}:</Text>
              </Box>

              <Box display="flex" flexDir="column" fontSize="r1" fontWeight="500" color="gray.700">
                <Text noOfLines={1} textTransform="capitalize">
                  {individualMemberReportHeader?.shareCertificateNo || '-'}
                </Text>
                <Text noOfLines={1}>{individualMemberReportHeader?.totalShareCount || '-'}</Text>
                <Text noOfLines={1}>
                  {individualMemberReportHeader?.riskCategory
                    ? riskCategory[individualMemberReportHeader?.riskCategory as RiskCategoryFilter]
                    : '-'}
                </Text>
                <Text noOfLines={1}>{individualMemberReportHeader?.kymStatus || '-'}</Text>
                <Text noOfLines={1}>
                  {' '}
                  {localizedDate(individualMemberReportHeader?.kymExpiryDate) || '-'}
                </Text>
              </Box>
            </Box>
          </Box>
          {individualMemberReportData?.shareDetail && (
            <Box display="flex" py="s8" flexDir="column">
              <Text fontSize="r2" color="gray.800" px="s16" fontWeight={500}>
                {t['reportsIndMemberProfileReportShareDetails']}
              </Text>
              <Report.Table<MemberShareDetail & { index: number }>
                data={
                  individualMemberReportData?.shareDetail as MemberShareDetail & { index: number }[]
                }
                showFooter
                columns={[
                  {
                    header: t['sn'],
                    accessorKey: 'index',
                    footer: () => t['reportsIndMemberProfileReportShareTotal'],
                    meta: {
                      width: '60px',
                      isNumeric: true,
                      Footer: {
                        colspan: 2,
                      },
                    },
                  },
                  {
                    header: t['reportsIndMemberProfileReportShareKittaFromTo'],
                    accessorKey: 'shareKitta',
                    meta: {
                      Footer: {
                        display: 'none',
                      },
                      width: '80%',
                    },
                  },
                  {
                    header: t['reportsIndMemberProfileReportShareCount'],
                    accessorKey: 'count',
                    footer: () =>
                      quantityConverter(individualMemberReportHeader?.totalShareCount || 0),
                    meta: {
                      isNumeric: true,
                    },
                  },
                  {
                    header: t['reportsIndMemberProfileReportShareBalance'],
                    accessorFn: (row) => amountConverter(row?.shareBalance || 0),

                    footer: () =>
                      amountConverter(individualMemberReportData?.totalShareBalance || 0),
                    meta: {
                      isNumeric: true,
                    },
                  },
                ]}
              />
            </Box>
          )}

          {individualMemberReportData?.savingDetail && (
            <Box display="flex" py="s8" flexDir="column">
              <Text fontSize="r2" color="gray.800" px="s16" fontWeight={500}>
                {t['reportsIndMemberProfileReportSavingAccountDetails']}
              </Text>

              <Report.Table<MemberSavingDetail & { index: number }>
                showFooter
                data={
                  individualMemberReportData?.savingDetail as MemberSavingDetail &
                    { index: number }[]
                }
                columns={[
                  // {
                  //   header: 'S.No.',
                  //   accessorKey: 'index',
                  //   footer: () => 'Total',
                  //   meta: {
                  //     width: '60px',
                  //     isNumeric: true,
                  //     Footer: {
                  //       colspan: 3,
                  //     },
                  //   },
                  // },
                  {
                    header: t['reportsIndMemberProfileReportSavingAccountNo'],
                    accessorKey: 'accountNo',
                    footer: () => t['reportsIndMemberProfileReportSavingTotal'],

                    cell: (props) => (
                      <RouteToDetailsPage
                        type="savings"
                        label={props.row.original.accountNo as string}
                        id={props.row.original.accountNo as string}
                      />
                    ),
                    meta: {
                      Footer: {
                        colspan: 2,
                      },
                    },
                  },
                  {
                    header: t['reportsIndMemberProfileReportSavingAccountName'],
                    accessorKey: 'accountName',
                    cell: (props) => (
                      <Box whiteSpace="pre-line" my="s4" width="200px">
                        {props?.row?.original?.accountName}{' '}
                      </Box>
                    ),
                    meta: {
                      width: '200px',
                      Footer: {
                        display: 'none',
                      },
                    },
                  },
                  {
                    header: t['reportsIndMemberProfileReportGuaranteeLoanNo'],
                    accessorKey: 'guaranteeLoanDetail',
                    cell: ({ row }) => (
                      <Box my="s8" display="flex" flexDir="column">
                        {row.original.guaranteeLoanDetail?.map((detail) => (
                          <Box display="flex" alignItems="center" gap="s8">
                            <Link
                              target="_blank"
                              href={`${ROUTES.CBS_LOAN_ACCOUNTS_DETAILS}?id=${detail?.loanAccountNo}&tab=guarantee`}
                            >
                              <Button
                                variant="link"
                                color="primary.500"
                                minW="auto"
                                px={0}
                                fontSize="s3"
                              >
                                {detail?.loanAccountNo}{' '}
                              </Button>
                            </Link>
                            [{amountConverter(detail?.amount || 0)}]{' '}
                          </Box>
                        ))}
                      </Box>
                    ),
                  },
                  {
                    header: t['reportsIndMemberProfileReportGuaranteeBalance'],
                    accessorKey: 'totalGuaranteeAmount',
                    footer: () =>
                      amountConverter(individualMemberReportData?.totalGuaranteeBalance || 0),
                    cell: (props) => amountConverter(props.getValue() as string),
                    meta: {
                      width: '15px',
                      isNumeric: true,
                    },
                  },
                  {
                    header: t['reportsIndMemberProfileReportBalance'],
                    accessorKey: 'balance',
                    footer: () =>
                      amountConverter(individualMemberReportData?.totalSavingBalance || 0),

                    cell: (props) => amountConverter(props.getValue() as string),
                    meta: {
                      width: '15px',
                      isNumeric: true,
                    },
                  },
                  {
                    header: t['reportsIndMemberProfileReportTransactionCount'],
                    accessorKey: 'transactionCount',
                    meta: {
                      width: '15px',
                      isNumeric: true,
                    },
                  },
                ]}
              />
            </Box>
          )}
          {individualMemberReportData?.loanDetail && (
            <Box display="flex" py="s8" flexDir="column">
              <Text fontSize="r2" color="gray.800" px="s16" fontWeight={500}>
                {t['reportsIndMemberProfileReportLoanAccountDetails']}
              </Text>
              <Report.Table<MemberLoanDetail & { index: number }>
                showFooter
                data={
                  individualMemberReportData?.loanDetail as MemberLoanDetail & { index: number }[]
                }
                columns={[
                  {
                    header: t['sn'],
                    accessorKey: 'index',
                    footer: () => t['reportsIndMemberProfileReportLoanTotal'],
                    meta: {
                      width: '60px',
                      isNumeric: true,
                      Footer: {
                        colspan: 3,
                      },
                    },
                  },
                  {
                    header: t['reportsIndMemberProfileReportLoanAccountNo'],
                    accessorKey: 'loanAccountNo',
                    cell: (props) => (
                      <RouteToDetailsPage
                        type="loan"
                        label={props.row.original.loanAccountNo as string}
                        id={props.row.original.loanAccountNo as string}
                      />
                    ),
                    meta: {
                      Footer: {
                        display: 'none',
                      },
                    },
                  },
                  {
                    header: t['reportsIndMemberProfileReportLoanAccountName'],
                    accessorKey: 'loanAccountName',
                    cell: (props) => (
                      <Box whiteSpace="pre-line" my="s4" width="200px">
                        {props?.row?.original?.loanAccountName}{' '}
                      </Box>
                    ),
                    meta: {
                      width: '200px',
                      Footer: {
                        display: 'none',
                      },
                    },
                  },
                  {
                    header: t['reportsIndMemberProfileReportIssuedDate'],
                    accessorFn: (row) => localizedDate(row?.issuedDate),
                  },
                  {
                    header: t['reportsIndMemberProfileReportApprovedAmount'],
                    accessorKey: 'approvedAmount',
                    footer: () =>
                      amountConverter(individualMemberReportData?.totalApprovedAmount || 0),
                    cell: (props) => amountConverter(props.getValue() as string),
                    meta: {
                      width: '15px',
                      isNumeric: true,
                    },
                  },
                  // {
                  //   header: 'Remaining Amount',
                  //   accessorKey: 'remainingAmount',
                  //   footer: () =>
                  //     amountConverter(individualMemberReportData?.totalRemainingAmount || 0),

                  //   cell: (props) => amountConverter(props.getValue() as string),
                  //   meta: {
                  //     width: '15px',
                  //     isNumeric: true,
                  //   },
                  // },
                  {
                    header: t['reportsIndMemberProfileReportLastPaymentDate'],
                    accessorFn: (row) => localizedDate(row?.issuedDate),
                    meta: {
                      width: '15px',
                    },
                  },
                ]}
              />
            </Box>
          )}
          {individualMemberReportData?.recentTransactions && (
            <Box display="flex" py="s8" flexDir="column">
              <Text fontSize="r2" color="gray.800" px="s16" fontWeight={500}>
                {t['reportsIndMemberProfileReportRecentTransactionLastOneMonth']}
              </Text>
              <Report.Table<MemberRecentTransactions & { index: number }>
                showFooter
                data={
                  individualMemberReportData?.recentTransactions as MemberLoanDetail &
                    { index: number }[]
                }
                columns={[
                  {
                    header: t['sn'],
                    accessorKey: 'index',
                    footer: () => t['reportsIndMemberProfileReportTransactionTotal'],
                    meta: {
                      width: '60px',
                      isNumeric: true,
                      Footer: {
                        colspan: 4,
                      },
                    },
                  },
                  {
                    header: t['reportsIndMemberProfileReportTransactionID'],
                    accessorKey: 'transactionId',
                    cell: (props) => (
                      <RouteToDetailsPage
                        type="loan"
                        label={props.row.original.transactionId as string}
                        id={props.row.original.transactionId as string}
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
                    header: t['reportsIndMemberProfileReportTransactionDate'],
                    accessorFn: (row) => localizedDate(row?.transactionDate),
                    meta: {
                      Footer: {
                        display: 'none',
                      },
                      skipExcelFormatting: true,
                    },
                  },
                  {
                    header: t['reportsIndMemberProfileReportTransactionType'],
                    accessorKey: 'transactionType',
                    meta: {
                      width: '80%',

                      Footer: {
                        display: 'none',
                      },
                    },
                  },
                  {
                    header: t['reportsIndMemberProfileReportTransactionAmount'],
                    accessorKey: 'transactionAmount',
                    footer: () =>
                      amountConverter(individualMemberReportData?.totalTransactionAmount || 0),
                    cell: (props) => amountConverter(props.getValue() as string),
                    meta: {
                      isNumeric: true,
                    },
                  },
                ]}
              />
            </Box>
          )}
          {individualMemberReportData?.closedAccountDetail && (
            <Box display="flex" py="s8" flexDir="column">
              <Text fontSize="r2" color="gray.800" px="s16" fontWeight={500}>
                {t['reportsIndMemberProfileReportClosedAccounts']}
              </Text>
              <Report.Table<MemberClosedAccounts & { index: number }>
                data={
                  individualMemberReportData?.closedAccountDetail as MemberLoanDetail &
                    { index: number }[]
                }
                columns={[
                  {
                    header: t['sn'],
                    accessorKey: 'index',
                    footer: () => t['reportsIndMemberProfileReportClosedTotal'],
                    meta: {
                      width: '60px',
                      isNumeric: true,
                      Footer: {
                        colspan: 4,
                      },
                    },
                  },
                  {
                    header: t['reportsIndMemberProfileReportAccountNo'],
                    accessorKey: 'accountNo',
                    meta: {
                      Footer: {
                        display: 'none',
                      },
                    },
                    cell: (props) => (
                      <RouteToDetailsPage
                        type="account-close"
                        label={props.row.original.accountNo as string}
                        id={props.row.original.accountNo as string}
                      />
                    ),
                  },
                  {
                    header: t['reportsIndMemberProfileReportCloseDate'],
                    accessorFn: (row) => localizedDate(row?.closedDate),
                    meta: {
                      Footer: {
                        display: 'none',
                      },
                      skipExcelFormatting: true,
                    },
                  },
                  {
                    header: t['reportsIndMemberProfileReportAccountType'],
                    accessorKey: 'accountType',
                    meta: {
                      Footer: {
                        display: 'none',
                      },
                    },
                  },
                  {
                    header: t['reportsIndMemberProfileReportAccountName'],
                    accessorKey: 'accountName',
                    meta: {
                      width: '80%',
                    },
                  },
                ]}
              />
            </Box>
          )}
          {individualMemberReportData?.withDrawSlipIssueStatus && (
            <Box display="flex" py="s8" flexDir="column">
              <Text fontSize="r2" color="gray.800" px="s16" fontWeight={500}>
                {t['reportsIndMemberProfileReportWithdrawSlipIssueStatus']}
              </Text>
              <Report.Table<MemberWithDrawSlipIssueStatus & { index: number }>
                data={
                  individualMemberReportData?.withDrawSlipIssueStatus as MemberWithDrawSlipIssueStatus &
                    { index: number }[]
                }
                columns={[
                  {
                    header: t['sn'],
                    accessorKey: 'index',

                    meta: {
                      width: '60px',
                      isNumeric: true,
                    },
                  },
                  {
                    header: t['reportsIndMemberProfileReportWithdrawSlipDate'],
                    accessorKey: 'date',

                    accessorFn: (row) => localizedDate(row?.date),
                    meta: {
                      Footer: {
                        display: 'none',
                      },
                      skipExcelFormatting: true,
                    },
                  },

                  {
                    header: t['reportsIndMemberProfileReportWithdrawSlipAccountType'],
                    accessorKey: 'accountType',
                    meta: {
                      Footer: {
                        display: 'none',
                      },
                    },
                  },
                  {
                    header: t['reportsIndMemberProfileReportWithdrawSlipAccountNumber'],
                    accessorKey: 'accNum',
                    cell: (props) => (
                      <RouteToDetailsPage
                        type="account-close"
                        label={props.row.original.accNum as string}
                        id={props.row.original.accNum as string}
                      />
                    ),
                  },
                  {
                    header: t['reportsIndMemberProfileReportWithdrawSlipType'],
                    accessorKey: 'type',
                  },
                ]}
              />
            </Box>
          )}
          {individualMemberReportData?.kymStatusForMember && (
            <Box display="flex" py="s8" flexDir="column">
              <Text fontSize="r2" color="gray.800" px="s16" fontWeight={500}>
                {t['reportsIndMemberProfileReportKYMStatus']}
              </Text>
              <Report.Table<MemberKymStatus>
                data={individualMemberKymtable as MemberKymStatus[]}
                columns={[
                  {
                    header: t['reportsIndMemberProfileReportKYMRiskCategory'],
                    accessorKey: 'riskCategory',
                  },

                  {
                    header: t['reportsIndMemberProfileReportLastUpdatedDate'],
                    accessorKey: 'lastUpdatedDate',

                    accessorFn: (row) => localizedDate(row?.lastUpdatedDate),
                    meta: {
                      Footer: {
                        display: 'none',
                      },
                      skipExcelFormatting: true,
                    },
                  },
                  {
                    header: t['reportsIndMemberProfileReportExpiryDays'],
                    accessorKey: 'ExpiryDays',
                  },
                  {
                    header: t['reportsIndMemberProfileReportKYMStatusStatus'],
                    accessorKey: 'Status',
                  },
                ]}
              />
            </Box>
          )}
        </Report.Content>
      </Report.Body>
    </Report>
  );
};
