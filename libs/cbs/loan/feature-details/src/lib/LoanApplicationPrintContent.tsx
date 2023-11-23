import React from 'react';
import { useRouter } from 'next/router';
import dayjs from 'dayjs';

import { Avatar, Box, Divider, Text } from '@myra-ui';

import { useAppSelector } from '@coop/cbs/data-access';
import { formatAddress } from '@coop/cbs/utils';
import { amountConverter } from '@coop/shared/utils';

import { LoanDetails, LoanPaymentScheduleTable } from '../components';
import { useLoanDetails } from '../hooks/useLoanDetails';

export const LoanApplicationPrintContent = React.forwardRef<HTMLInputElement>((_, ref) => {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);

  const { loanPreview } = useLoanDetails();

  if (
    !loanPreview?.idealSchedule?.installments ||
    loanPreview?.idealSchedule?.installments?.length === 0
  ) {
    return null;
  }

  return (
    <Box
      ref={ref}
      display="none"
      sx={{
        '@media print': {
          p: 2,
          display: 'flex',
          flexDir: 'column',
          bg: 'white',
          gap: 5,
        },
        '@page': {
          size: 'auto !important',
          margin: '0.1in',
        },
      }}
    >
      <Box w="100%" mb="s12">
        <Box display="flex" flexDir="column" gap="s12">
          <Box display="flex" justifyContent="space-between" alignItems="flex-start" gap="s8">
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
          </Box>

          <Box display="flex" alignItems="start" justifyContent="space-between">
            <Box display="flex" flexDir="column">
              <Text fontSize="s2" color="gray.700" as="span">
                Branch: {user?.currentBranch?.name}
              </Text>
              <Text fontSize="s2" color="gray.700" as="span">
                Printed Date: {dayjs(new Date()).format('YYYY-MM-DD')}
              </Text>
              <Text fontSize="s2" color="gray.700" as="span">
                Member Name: {loanPreview?.member?.name?.local}
              </Text>
              <Text fontSize="s2" color="gray.700" as="span">
                Member Code: {loanPreview?.member?.code}
              </Text>
              <Text fontSize="s2" color="gray.700" as="span">
                Loan no: {router?.query?.['id']}
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
      <LoanDetails />
      <LoanPaymentScheduleTable
        data={loanPreview?.idealSchedule.installments}
        total={String(amountConverter(loanPreview?.idealSchedule?.total ?? 0))}
        totalInterest={loanPreview?.idealSchedule?.totalInterest ?? 0}
        totalPrincipal={loanPreview?.idealSchedule?.totalPrincipal ?? 0}
      />
    </Box>
  );
});

export default LoanApplicationPrintContent;
