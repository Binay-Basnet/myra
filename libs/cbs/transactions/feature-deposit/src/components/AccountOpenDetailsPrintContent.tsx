import React from 'react';
import dayjs from 'dayjs';

import { Avatar, Box, Divider, Text } from '@myra-ui';

import { AccountSuccessCardData, useAppSelector } from '@coop/cbs/data-access';
import { formatAddress } from '@coop/cbs/utils';
import { amountConverter, amountToWordsConverter } from '@coop/shared/utils';

const AccountOpenDetailsPrint = (props: { accountOpenDetails: AccountSuccessCardData }) => {
  const { accountOpenDetails } = props;

  const accountOpenInfo = [
    { key: 'Account Id', value: accountOpenDetails?.accountId || '-' },
    { key: 'Account Name', value: accountOpenDetails?.accountName || '-' },
    { key: 'Account Type', value: accountOpenDetails?.accountType || '-' },
    { key: 'Account Open Date', value: accountOpenDetails?.accOpenedDate?.local || '-' },
    { key: 'Linked Account', value: accountOpenDetails?.linkedAccountName || '-' },
    {
      key: 'Initial Deposit Amount',
      value: amountConverter(accountOpenDetails?.initialDepositAmount) || '-',
    },
    { key: 'Charges', value: amountConverter(accountOpenDetails?.charges) || '-' },
    { key: 'Payment Mode', value: accountOpenDetails?.paymentMode || '-' },
  ];

  const user = useAppSelector((state) => state.auth.user);

  return (
    <>
      <Box w="100%">
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

      <Box w="100%" bg="highlight.500" display="flex" flexDir="column" py="s8" px="s16">
        <Box
          borderBottom="1px"
          borderBottomColor="border.layout"
          display="flex"
          flexDir="column"
          gap="s2"
          py="s8"
        >
          {accountOpenInfo?.map((item) => (
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <Box color="gray.600" fontSize="s2" fontWeight="500">
                {item?.key}
              </Box>
              <Box color="gray.700" fontSize="s3" fontWeight="600" textTransform="capitalize">
                {item?.value}
              </Box>
            </Box>
          ))}
        </Box>
        <Box display="flex" py="s4" justifyContent="space-between">
          <Box />

          <Box display="flex" flexDir="column" gap="0" alignItems="end" justifyContent="end">
            <Text fontSize="s3" color="gray.600" fontWeight="500" lineHeight="125%">
              Txn Amount
            </Text>
            <Text fontSize="r2" color="primary.500" fontWeight="500" lineHeight="125%">
              Rs.{' '}
              {amountConverter(
                Number(accountOpenDetails?.initialDepositAmount) +
                  Number(accountOpenDetails?.charges)
              )}
            </Text>
            <Text fontSize="r2" color="primary.500" fontWeight="500" lineHeight="125%">
              {amountToWordsConverter(
                Number(accountOpenDetails?.initialDepositAmount) +
                  Number(accountOpenDetails?.charges)
              )}
            </Text>
          </Box>
        </Box>
      </Box>

      <Box
        // position="fixed"
        w="100%"
        bottom="100px"
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
            {`Prepared By [${user?.firstName?.en}]`}
          </Text>
        </Box>
        <Box display="flex" flexDir="column" alignItems="center" gap="s12">
          <Divider borderTop="1px dotted black" />
          <Text fontSize="s2" color="gray.800" fontWeight="500">
            Checked By
          </Text>
        </Box>
        <Box display="flex" flexDir="column" alignItems="center" gap="s12">
          <Divider borderTop="1px dotted black" />
          <Text fontSize="s2" color="gray.800" fontWeight="500">
            Approved By
          </Text>
        </Box>
      </Box>
    </>
  );
};

export const AccountOpenDetailsPrintContent = React.forwardRef<
  any,
  { accountOpenDetails: AccountSuccessCardData }
>((props, ref) => {
  const { accountOpenDetails } = props;

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
      <AccountOpenDetailsPrint accountOpenDetails={accountOpenDetails} />
      <Divider borderTop="1px dotted black" />
      <AccountOpenDetailsPrint accountOpenDetails={accountOpenDetails} />
    </Box>
  );
});

export default AccountOpenDetailsPrintContent;
