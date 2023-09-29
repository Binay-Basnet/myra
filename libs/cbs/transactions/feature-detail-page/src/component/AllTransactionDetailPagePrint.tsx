import { MutableRefObject } from 'react';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';

import { Avatar, Box, DetailCardContent, DetailsCard, Divider, Text } from '@myra-ui';

import {
  AllTransactionType,
  useAppSelector,
  useGetAllTransactionsDetailQuery,
} from '@coop/cbs/data-access';
import { formatAddress, localizedDate, RedirectButton, ROUTES } from '@coop/cbs/utils';
import { amountConverter, useTranslation } from '@coop/shared/utils';

import { GlTransaction } from './GlTransaction';
import { Note } from './Note';

const ROUTESOBJTRANS: Partial<Record<AllTransactionType, string>> = {
  [AllTransactionType.Deposit]: ROUTES.CBS_TRANS_DEPOSIT_DETAILS,
  [AllTransactionType.Withdraw]: ROUTES.CBS_TRANS_WITHDRAW_DETAILS,
  [AllTransactionType.Transfer]: ROUTES.CBS_TRANS_ACCOUNT_TRANSFER_DETAILS,
  [AllTransactionType.LoanRepayment]: ROUTES.CBS_TRANS_LOAN_PAYMENT_DETAILS,
  [AllTransactionType.JournalVoucher]: ROUTES.CBS_TRANS_JOURNAL_VOUCHER_DETAILS,
};

const objKeys = Object.keys(ROUTESOBJTRANS);

export const AllTransactionDetailPagePrint = ({
  printRef,
}: {
  printRef: MutableRefObject<HTMLInputElement>;
}) => {
  const user = useAppSelector((state) => state.auth.user);

  const { t } = useTranslation();
  const router = useRouter();

  const { id } = router.query;

  const { data: allTransactionsDetails } = useGetAllTransactionsDetailQuery(
    { id: id as string },
    { staleTime: 0, enabled: !!id && router?.asPath?.includes('/all-transactions/') }
  );
  const allTransactionsData = allTransactionsDetails?.transaction?.viewTransactionDetail?.data;
  const tableData = allTransactionsData?.glTransaction;

  return (
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
          display: 'flex',
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

            {/* {count && (
              <Chips
                variant="solid"
                theme="success"
                size="md"
                type="label"
                label={`Count - ${count}`}
              />
            )} */}
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

      <Box display="flex" flexDir="column" gap="s8">
        <DetailsCard title={t['transDetailTransactionDetails']} hasThreeRows>
          {!objKeys.includes(allTransactionsData?.txnType as string) && (
            <DetailCardContent
              title={t['transDetailTransactionID']}
              subtitle={`#${allTransactionsData?.id}`}
            />
          )}
          {allTransactionsData?.txnType && objKeys.includes(allTransactionsData?.txnType) && (
            <DetailCardContent
              title={t['transDetailTransactionID']}
              subtitle={
                <RedirectButton
                  label={allTransactionsData?.id}
                  link={`${ROUTESOBJTRANS[allTransactionsData?.txnType]}?id=${
                    allTransactionsData?.id
                  }`}
                />
              }
            />
          )}

          <DetailCardContent
            title="Transaction Date"
            subtitle={localizedDate(allTransactionsData?.transactionDate)}
          />
          <DetailCardContent
            title="Transaction Type"
            subtitle={allTransactionsData?.txnType?.replace(/_/g, ' ')}
          />
          <DetailCardContent
            title="Transaction Mode"
            subtitle={allTransactionsData?.transactionMode}
          />
          <DetailCardContent
            title="Transaction Amount"
            subtitle={amountConverter(allTransactionsData?.amount ?? 0)}
          />
          <DetailCardContent title="Transaction Branch" subtitle={allTransactionsData?.branch} />
          <DetailCardContent title="User" subtitle={allTransactionsData?.user} />
          <DetailCardContent title={t['transDetailStatus']} status />
        </DetailsCard>

        {allTransactionsData?.note && <Note note={allTransactionsData?.note} />}

        <GlTransaction
          totalDebit={String(amountConverter(allTransactionsData?.totalDebit ?? 0))}
          totalCredit={String(amountConverter(allTransactionsData?.totalCredit ?? 0))}
          data={tableData ?? []}
        />
      </Box>

      <Box
        // position="fixed"
        w="100%"
        // bottom="100px"
        left={0}
        display="grid"
        gridTemplateColumns="repeat(3, 1fr)"
        gap="s32"
        px="s32"
        pt="s64"
      >
        <Box display="flex" flexDir="column" alignItems="center" gap="s12">
          <Divider borderTop="1px dotted black" />
          <Text fontSize="s2" color="gray.800" fontWeight="500">
            Prepared By
          </Text>
        </Box>
        <Box display="flex" flexDir="column" alignItems="center" gap="s12">
          <Divider borderTop="1px dotted black" />
          <Text fontSize="s2" color="gray.800" fontWeight="500">
            Verified By
          </Text>
        </Box>
        <Box display="flex" flexDir="column" alignItems="center" gap="s12">
          <Divider borderTop="1px dotted black" />
          <Text fontSize="s2" color="gray.800" fontWeight="500">
            Approved By
          </Text>
        </Box>
      </Box>
    </Box>
  );
};
