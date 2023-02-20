import { forwardRef } from 'react';
import dayjs from 'dayjs';

import { Avatar, Box, Divider, GlTransactionJornalVoucherPrint, Text } from '@myra-ui';

import { useAppSelector } from '@coop/cbs/data-access';
import { formatAddress } from '@coop/cbs/utils';

interface TransferVoucherPrintProps {
  details: Record<string, React.ReactNode>;
  note?: string;
  glTransactions?:
    | ({
        account: string;
        serviceCenter?: string | null | undefined;
        debit?: string | null | undefined;
        credit?: string | null | undefined;
        ledgerId?: string | null | undefined;
      } | null)[]
    | null
    | undefined;
  glTransactionsTotal?: string;
}

export const TransferVoucherPrint = forwardRef<HTMLInputElement, TransferVoucherPrintProps>(
  ({ details, note, glTransactions, glTransactionsTotal }, ref) => {
    const user = useAppSelector((state) => state.auth.user);

    return (
      <Box
        ref={ref}
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
            size: 'A4 portrait',
            margin: '0.1in',
          },
        }}
      >
        <Box w="100%" mb="s12">
          <Box display="flex" flexDir="column" gap="s12">
            <Box display="flex" alignItems="center" gap="s8">
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

        <Box mt="s12" w="100%" bg="highlight.500" display="flex" flexDir="column" py="s8" px="s16">
          <Box
            // borderBottom={total ? '1px' : 'none'}
            borderBottomColor="border.layout"
            display="flex"
            flexDir="column"
            gap="s10"
            py="s8"
          >
            {Object.entries(details).map((detail) => (
              <Box display="flex" alignItems="center" gap="s4">
                <Box color="gray.600" fontSize="s2" fontWeight="400">
                  {`${detail[0]}:`}
                </Box>
                {typeof detail[1] === 'string' ? (
                  <Box color="gray.700" fontSize="s3" fontWeight="500" textTransform="capitalize">
                    {detail[1]?.toString()?.replace(/_/g, ' ')?.toLowerCase()}
                  </Box>
                ) : (
                  detail[1]
                )}
              </Box>
            ))}
            {note && (
              <Box>
                <Box color="gray.600" fontSize="s2" fontWeight="400">
                  Note
                </Box>
                <Box color="gray.700" fontSize="s3" fontWeight="500" textTransform="capitalize">
                  {note}
                </Box>
              </Box>
            )}
          </Box>

          {glTransactions && (
            <>
              <Text fontSize="s1" fontWeight="600" pt="s10">
                GL Transactions
              </Text>
              <GlTransactionJornalVoucherPrint data={glTransactions} total={glTransactionsTotal} />
            </>
          )}

          {/* {total && (
            <Box display="flex" py="s8" justifyContent="space-between">
              <Box />

              <Box display="flex" flexDir="column" gap="s4" alignItems="end" justifyContent="end">
                <Text fontSize="s3" color="gray.600" fontWeight="500" lineHeight="125%">
                  Total Amount
                </Text>
                <Text fontSize="r2" color="primary.500" fontWeight="500" lineHeight="125%">
                  Rs. {total}
                </Text>
                <Text fontSize="r2" color="primary.500" fontWeight="500" lineHeight="125%">
                  {totalWords}
                </Text>
              </Box>
            </Box>
          )} */}
        </Box>

        <Box display="flex" justifyContent="space-around" mt="s48">
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
  }
);
