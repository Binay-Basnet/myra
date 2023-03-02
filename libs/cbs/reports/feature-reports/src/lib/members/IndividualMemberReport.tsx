import { useState } from 'react';
import Link from 'next/link';
import { Image } from '@chakra-ui/react';

import { Box, Button, GridItem, Text } from '@myra-ui';

import {
  MemberClosedAccounts,
  MemberLoanDetail,
  MemberRecentTransactions,
  MemberSavingDetail,
  MemberShareDetail,
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
import { amountConverter, quantityConverter } from '@coop/shared/utils';

const riskCategory = {
  [RiskCategoryFilter.All]: 'All',
  [RiskCategoryFilter.Low]: 'Low Risk',
  [RiskCategoryFilter.Medium]: 'Medium Risk',
  [RiskCategoryFilter.High]: 'High Risk',
};

export const IndividualMemberReport = () => {
  const [filters, setFilters] = useState<{ memberId: string } | null>(null);

  const { data, isFetching } = useGetIndividualMemberReportQuery(
    {
      memberId: filters?.memberId as string,
    },
    { enabled: !!filters }
  );
  const individualMemberReportData = data?.report?.memberReport?.individualMemberReport?.data;
  const individualMemberReportHeader = individualMemberReportData?.header;

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
            { label: 'Members Reports', link: '/reports/cbs/members' },
            {
              label: 'Individual Member Profile Report',
              link: '/reports/cbs/members/individual-member-report/new',
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
                <Text>Member Name:</Text>
                <Text>Membership No:</Text>
                <Text>Address:</Text>
                <Text>Contact:</Text>
                <Text>Pan No:</Text>
                <Text>Membership Date:</Text>
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
                <Text>Share Certificate No:</Text>
                <Text>Total Share Count:</Text>
                <Text>KYM Risk Category:</Text>
                <Text>KYM Status:</Text>
                <Text>KYM Expiry Date:</Text>
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
                Share details
              </Text>
              <Report.Table<MemberShareDetail & { index: number }>
                data={
                  individualMemberReportData?.shareDetail as MemberShareDetail & { index: number }[]
                }
                showFooter
                columns={[
                  {
                    header: 'S.No.',
                    accessorKey: 'index',
                    footer: () => 'Total',
                    meta: {
                      width: '60px',
                      isNumeric: true,
                      Footer: {
                        colspan: 2,
                      },
                    },
                  },
                  {
                    header: 'Share Kitta(From - To)',
                    accessorKey: 'shareKitta',
                    meta: {
                      Footer: {
                        display: 'none',
                      },
                      width: '80%',
                    },
                  },
                  {
                    header: 'Share Count',
                    accessorKey: 'count',
                    footer: () =>
                      quantityConverter(individualMemberReportHeader?.totalShareCount || 0),
                    meta: {
                      isNumeric: true,
                    },
                  },
                  {
                    header: 'Share Balance',
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
                Saving Account Details
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
                    header: 'Saving Account No.',
                    accessorKey: 'accountNo',
                    footer: () => 'Total',

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
                    header: 'Saving Account Name',
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
                    header: 'Guarantee Loan No.',
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
                    header: 'Guarantee Balance',
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
                    header: 'Balance',
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
                    header: 'Transaction Count',
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
                Loan Account Details
              </Text>
              <Report.Table<MemberLoanDetail & { index: number }>
                showFooter
                data={
                  individualMemberReportData?.loanDetail as MemberLoanDetail & { index: number }[]
                }
                columns={[
                  {
                    header: 'S.No.',
                    accessorKey: 'index',
                    footer: () => 'Total',
                    meta: {
                      width: '60px',
                      isNumeric: true,
                      Footer: {
                        colspan: 3,
                      },
                    },
                  },
                  {
                    header: 'Loan Account No.',
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
                    header: 'Loan Account Name',
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
                    header: 'Issued Date',
                    accessorFn: (row) => localizedDate(row?.issuedDate),
                  },
                  {
                    header: 'Approved Amount',
                    accessorKey: 'approvedAmount',
                    footer: () =>
                      amountConverter(individualMemberReportData?.totalApprovedAmount || 0),
                    cell: (props) => amountConverter(props.getValue() as string),
                    meta: {
                      width: '15px',
                      isNumeric: true,
                    },
                  },
                  {
                    header: 'Remaining Amount',
                    accessorKey: 'remainingAmount',
                    footer: () =>
                      amountConverter(individualMemberReportData?.totalRemainingAmount || 0),

                    cell: (props) => amountConverter(props.getValue() as string),
                    meta: {
                      width: '15px',
                      isNumeric: true,
                    },
                  },
                  {
                    header: 'Last Payment Date',
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
                Recent Transaction (last 1 month)
              </Text>
              <Report.Table<MemberRecentTransactions & { index: number }>
                showFooter
                data={
                  individualMemberReportData?.recentTransactions as MemberLoanDetail &
                    { index: number }[]
                }
                columns={[
                  {
                    header: 'S.No.',
                    accessorKey: 'index',
                    footer: () => 'Total',
                    meta: {
                      width: '60px',
                      isNumeric: true,
                      Footer: {
                        colspan: 4,
                      },
                    },
                  },
                  {
                    header: 'Transaction ID',
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
                    },
                  },
                  {
                    header: 'Transaction Date',
                    accessorFn: (row) => localizedDate(row?.transactionDate),
                    meta: {
                      Footer: {
                        display: 'none',
                      },
                    },
                  },
                  {
                    header: 'Transaction Type',
                    accessorKey: 'transactionType',
                    meta: {
                      width: '80%',

                      Footer: {
                        display: 'none',
                      },
                    },
                  },
                  {
                    header: 'Transaction Amount',
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
                Closed Accounts{' '}
              </Text>
              <Report.Table<MemberClosedAccounts & { index: number }>
                data={
                  individualMemberReportData?.closedAccountDetail as MemberLoanDetail &
                    { index: number }[]
                }
                columns={[
                  {
                    header: 'S.No.',
                    accessorKey: 'index',
                    footer: () => 'Total',
                    meta: {
                      width: '60px',
                      isNumeric: true,
                      Footer: {
                        colspan: 4,
                      },
                    },
                  },
                  {
                    header: 'Account No',
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
                    header: 'Close Date',
                    accessorFn: (row) => localizedDate(row?.closedDate),
                    meta: {
                      Footer: {
                        display: 'none',
                      },
                    },
                  },
                  {
                    header: 'Account Type',
                    accessorKey: 'accountType',
                    meta: {
                      Footer: {
                        display: 'none',
                      },
                    },
                  },
                  {
                    header: 'Account Name',
                    accessorKey: 'accountName',
                    meta: {
                      width: '80%',
                    },
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
