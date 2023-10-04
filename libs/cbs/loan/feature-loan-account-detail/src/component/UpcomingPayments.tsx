import { useMemo, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { useRouter } from 'next/router';
import { useDisclosure } from '@chakra-ui/react';
import dayjs from 'dayjs';

import { Avatar, Box, Button, DetailsCard, Divider, Modal, Text } from '@myra-ui';
import { Column, Table } from '@myra-ui/table';

import { LoanInstallment, useAppSelector, useGetLoanPreviewQuery } from '@coop/cbs/data-access';
import { exportVisibleTableToExcel, formatAddress, localizedDate } from '@coop/cbs/utils';
import { amountConverter } from '@coop/shared/utils';

import { useLoanAccountDetailHooks } from '../hooks/useLoanAccountDetailHooks';

export const UpcomingPayments = () => {
  const router = useRouter();

  const { id } = router.query;

  const tableRef = useRef<HTMLTableElement>(null);

  const printRef = useRef<HTMLInputElement | null>(null);

  const user = useAppSelector((state) => state.auth.user);

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const { generalInfo } = useLoanAccountDetailHooks();

  const { isOpen, onClose, onToggle } = useDisclosure();

  const { data: loanPreviewData, isFetching: isLoanPreviewFetching } = useGetLoanPreviewQuery(
    {
      id: id as string,
    },
    {
      enabled: !!id,
    }
  );

  const paymentListWithIndex = useMemo(
    () =>
      loanPreviewData?.loanAccount?.loanPreview?.data?.idealSchedule?.installments
        ?.slice(0, 10)
        ?.map((payment, index) => ({
          index: index + 1,
          ...payment,
        })) ?? [],
    [loanPreviewData]
  );

  const allPaymentListWithIndex = useMemo(
    () =>
      loanPreviewData?.loanAccount?.loanPreview?.data?.idealSchedule?.installments?.map(
        (payment, index) => ({
          index: index + 1,
          ...payment,
        })
      ) ?? [],
    [loanPreviewData]
  );

  const { total, totalPrincipal, totalInterest } = useMemo(
    () => ({
      total: loanPreviewData?.loanAccount?.loanPreview?.data?.idealSchedule?.total,
      totalPrincipal:
        loanPreviewData?.loanAccount?.loanPreview?.data?.idealSchedule?.totalPrincipal,
      totalInterest: loanPreviewData?.loanAccount?.loanPreview?.data?.idealSchedule?.totalInterest,
    }),
    [loanPreviewData]
  );

  const columns = useMemo<Column<LoanInstallment>[]>(
    () => [
      {
        header: 'Ins. No.',
        accessorFn: (row) => row?.installmentNo,
        meta: {
          Footer: {
            display: 'none',
          },
        },
      },

      {
        header: 'Installment Date',
        accessorKey: 'installmentDate',
        cell: (props) => localizedDate(props?.row?.original?.installmentDate),
        footer: 'Total Cost of Loan',
        meta: {
          width: '3.125rem',
          Footer: {
            colspan: 2,
          },
        },
      },

      {
        header: 'Principal',
        accessorKey: 'principal',
        cell: (props) => amountConverter(props?.row?.original?.principal),
        footer: () => amountConverter(totalPrincipal),
        meta: {
          isNumeric: true,
        },
      },
      {
        header: 'Interest',
        accessorKey: 'interest',
        cell: (props) => amountConverter(props?.row?.original?.interest),
        footer: () => amountConverter(totalInterest),
        meta: {
          isNumeric: true,
        },
      },

      {
        header: 'Total',
        accessorKey: 'payment',
        cell: (props) => amountConverter(props?.row?.original?.payment ?? 0),
        footer: () => amountConverter(total) || '-',
        meta: {
          isNumeric: true,
        },
      },
    ],
    [total, totalPrincipal, totalInterest]
  );

  const loanAccountDetails = useMemo(
    () => ({
      'Loan Account Name': generalInfo?.accountName,
      'Loan Account Number': generalInfo?.accountId,
      'Product Name': generalInfo?.productName,
      'Interest Rate': generalInfo?.interestRate ? `${generalInfo.interestRate} %` : 'N/A',
      'Sanctioned Amount': amountConverter(generalInfo?.sanctionedAmount || 0),
      Tenure: generalInfo?.tenure ? `${generalInfo?.tenure} ${generalInfo?.tenureUnit}` : 'N/A',
    }),
    [generalInfo]
  );

  return (
    <>
      <DetailsCard
        title="Loan Repayment Schedule"
        bg="white"
        hasTable
        leftBtn={
          <Button variant="ghost" onClick={onToggle}>
            View Entire Schedule
          </Button>
        }
      >
        <Table
          isDetailPageTable
          isStatic
          showFooter
          data={paymentListWithIndex}
          columns={columns}
          isLoading={isLoanPreviewFetching}
          noDataTitle="upcoming payment"
        />
      </DetailsCard>

      <Modal
        onClose={onClose}
        open={isOpen}
        title="Loan Repayment Schedule"
        scrollBehavior="inside"
        blockScrollOnMount
        width="4xl"
        headerButton={
          <Box display="flex" alignItems="center" gap="s8">
            <Button variant="ghost" onClick={handlePrint}>
              Print
            </Button>
            <Button
              variant="ghost"
              onClick={() =>
                exportVisibleTableToExcel(
                  `${generalInfo?.accountName} - Payment Schedule - `,
                  tableRef
                )
              }
            >
              Export
            </Button>
          </Box>
        }
      >
        <Table
          isDetailPageTable
          isStatic
          showFooter
          data={allPaymentListWithIndex}
          columns={columns}
          isLoading={isLoanPreviewFetching}
          noDataTitle="Loan Repayment Schedule"
          ref={tableRef}
        />
      </Modal>

      <Box
        ref={printRef}
        display="none"
        bg="white"
        p="s32"
        flexDir="column"
        gap="s8"
        position="relative"
        sx={{
          '@media print': {
            display: 'block',
            w: '100%',
            h: '100%',
            overflow: 'visible',
            borderRadius: '0',
          },
          '@page': {
            size: 'auto !important',
            margin: '0.1in',
          },
        }}
      >
        <Box w="100%" mb="s12">
          <Box display="flex" flexDir="column" gap="s12">
            <Box display="flex" alignItems="flex-start" justifyContent="space-between" gap="s8">
              <Box display="flex" alignItems="center" flex={1} gap="s8">
                <Box position="relative">
                  <Avatar
                    w="s48"
                    h="s48"
                    name={user?.organization?.basicDetails?.name as string}
                    src={user?.organization?.basicDetails?.logo as string}
                  />
                </Box>

                <Box display="flex" flexDir="column" gap="s4">
                  <Text fontSize="r2" fontWeight="500" color="gray.800" lineHeight="0.8">
                    {user?.organization?.basicDetails?.name}
                  </Text>
                  <Text fontSize="s2" fontWeight="400" color="gray.700">
                    Contact: {user?.organization?.contactDetails?.phoneNumber} | Email:{' '}
                    {user?.organization?.contactDetails?.email ?? 'N/A'} | Website:{' '}
                    {user?.organization?.contactDetails?.website ?? 'N/A'}
                  </Text>
                </Box>
              </Box>
            </Box>

            <Box display="flex" alignItems="start" justifyContent="space-between">
              <Box display="flex" flexDir="column">
                <Text fontSize="s2" color="gray.700" as="span">
                  Branch: {user?.currentBranch?.name}
                </Text>
                <Text fontSize="s2" color="gray.700" as="span">
                  Printed Date: {dayjs(new Date()).format('YYYY-MM-DD')}
                </Text>
              </Box>

              <Box>
                <Box display="flex" gap="s4">
                  <Text fontSize="s2" color="gray.700">
                    Address:
                  </Text>
                  <Text fontSize="s2" color="gray.700" fontWeight="500" whiteSpace="nowrap">
                    {formatAddress(user?.organization?.address)}
                  </Text>
                </Box>

                <Box display="flex" gap="s4">
                  <Text fontSize="s2" color="gray.700">
                    Regd No:
                  </Text>
                  <Text fontSize="s2" color="gray.700" fontWeight="500">
                    {user?.organization?.registrationDetails?.regdNo ?? 'N/A'}
                  </Text>
                </Box>

                <Box display="flex" gap="s4">
                  <Text fontSize="s2" color="gray.700">
                    Pan:
                  </Text>
                  <Text fontSize="s2" color="gray.700" fontWeight="500">
                    {user?.organization?.registrationDetails?.panOrVat ?? 'N/A'}
                  </Text>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Divider mb={0} borderTop="1px solid" borderTopColor="background.500" />

        <Box display="flex" flexDir="column" gap="s8" mb="s12">
          <Box
            borderBottom={total ? '1px' : 'none'}
            borderBottomColor="border.layout"
            display="flex"
            flexDir="column"
            gap="s10"
            py="s8"
          >
            {Object.entries(loanAccountDetails).map((detail) => (
              <Box display="flex" alignItems="center" justifyContent="space-between">
                <Box color="gray.600" fontSize="s2" fontWeight="500">
                  {detail[0]}
                </Box>
                {typeof detail[1] === 'string' ? (
                  <Box color="gray.700" fontSize="s3" fontWeight="600" textTransform="capitalize">
                    {detail[1]?.toString()?.replace(/_/g, ' ')?.toLowerCase()}
                  </Box>
                ) : (
                  detail[1]
                )}
              </Box>
            ))}
          </Box>
        </Box>

        <Divider mb={0} borderTop="1px solid" borderTopColor="background.500" />

        <Text fontSize="r1" fontWeight="600" mb="s8">
          Loan Payment Schedule
        </Text>

        <Table
          isDetailPageTable
          isStatic
          showFooter
          data={allPaymentListWithIndex}
          columns={columns}
          isLoading={isLoanPreviewFetching}
          noDataTitle="upcoming payment"
        />
      </Box>
    </>
  );
};
