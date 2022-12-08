import { IoCopyOutline, IoQrCodeOutline } from 'react-icons/io5';
import { useDisclosure } from '@chakra-ui/react';

import { AccountQRModal, Box, DetailPageMemberCard, DetailPageTabs, Icon, Text } from '@myra-ui';

import { NatureOfDepositProduct, useAccountDetails } from '@coop/cbs/data-access';
import { amountConverter, copyToClipboard } from '@coop/shared/utils';

const accountTypes = {
  [NatureOfDepositProduct.Saving]: 'Saving Account',
  [NatureOfDepositProduct.RecurringSaving]: 'Recurring Saving Account',
  [NatureOfDepositProduct.TermSavingOrFd]: 'Term Saving Account',
  [NatureOfDepositProduct.Current]: 'Current Account',
};

export const AccountDetailsSidebar = () => {
  const { accountDetails } = useAccountDetails();

  const { onClose: modalOnClose, isOpen, onToggle } = useDisclosure();

  return (
    <>
      <Box
        borderBottom="1px"
        borderBottomColor="border.layout"
        display="flex"
        p="s16"
        justifyContent="space-between"
      >
        <Box display="flex" flexDirection="column" gap="s8" width="100%">
          <Box display="flex" flexDirection="column">
            <Box display="flex" justifyContent="space-between">
              <Text fontSize="r1" fontWeight={600} color="primary.500">
                {accountDetails?.accountName}
              </Text>

              <Icon
                as={IoQrCodeOutline}
                color="gray.500"
                _hover={{ color: 'gray.800' }}
                cursor="pointer"
                onClick={onToggle}
              />
            </Box>
            <Box display="flex" alignItems="center" gap="s4">
              <Text fontSize="s3" fontWeight={400} color="neutralColorLight.Gray-50">
                {accountDetails?.accountId}
              </Text>
              <Icon
                _hover={{ cursor: 'pointer' }}
                size="sm"
                as={IoCopyOutline}
                onClick={() => copyToClipboard(accountDetails?.accountId)}
              />
            </Box>
          </Box>
          <Text fontSize="s3" fontWeight={400} color="neutralColorLight.Gray-70">
            {accountDetails?.productName}
          </Text>

          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Text fontSize="s3" fontWeight={400} color="neutralColorLight.Gray-50">
              {accountDetails?.accountType ? accountTypes[accountDetails?.accountType] : ''}
            </Text>

            <Text fontSize="r2" fontWeight={500} color="neutralColorLight.Gray-80">
              {amountConverter(accountDetails?.accountBalance ?? 0)}
            </Text>
          </Box>
        </Box>
      </Box>

      <Box borderBottom="1px" borderBottomColor="border.layout" p="s16" display="flex" gap="s4">
        <Text fontSize="s3" fontWeight={400} color="neutralColorLight.Gray-70">
          Created Date:
        </Text>
        <Text fontSize="s3" fontWeight={500} color="neutralColorLight.Gray-70">
          {accountDetails?.accountOpenDate}
        </Text>
      </Box>

      <Box
        borderBottom="1px"
        borderBottomColor="border.layout"
        display="flex"
        flexDirection="column"
      >
        <DetailPageMemberCard
          name={accountDetails?.member?.name?.local as string}
          profilePicUrl={accountDetails?.member?.profilePicUrl ?? ''}
        />
      </Box>

      <DetailPageTabs
        tabs={[
          'Overview',
          'Transactions',
          'Withdraw Slip',
          // 'ATM',
          // 'Activity',
          // 'Documents',
          // 'Tasks',
        ]}
      />

      <AccountQRModal
        account={{
          name: accountDetails?.member?.name?.local as string,
          accountNo: accountDetails?.accountId as string,
          phoneNo: accountDetails?.member?.contact ?? 'N/A',
          accountName: accountDetails?.accountName as string,
        }}
        open={isOpen}
        onClose={modalOnClose}
      />
    </>
  );
};
