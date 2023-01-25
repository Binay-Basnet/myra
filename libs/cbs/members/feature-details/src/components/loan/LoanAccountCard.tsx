import { IoCopyOutline, IoQrCode } from 'react-icons/io5';
import { useDisclosure } from '@chakra-ui/react';

import { AccountQRModal, Box, Divider, Icon, IconButton, Text } from '@myra-ui';

import { RedirectButton, ROUTES } from '@coop/cbs/utils';
import { copyToClipboard } from '@coop/shared/utils';

interface IAccountCardProps {
  accountName: string;
  accountNumber: string;
  productName: string;
  productType: string;
  totalBalance: string;
  interestRate: string;
  memberName: string;
  contactNo: string;
}

export const LoanAccountCard = ({
  accountName,
  accountNumber,
  productName,
  productType,
  totalBalance,
  interestRate,
  contactNo,
  memberName,
}: IAccountCardProps) => {
  const { onClose: modalOnClose, isOpen, onToggle } = useDisclosure();

  return (
    <>
      {' '}
      <Box p="s16" border="1px solid" borderRadius="br2" borderColor="border.layout" bg="white">
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" flexDirection="column" gap="s8">
            <Box display="flex" flexDirection="column" gap="s4">
              <Box>
                <RedirectButton
                  label={accountName}
                  link={`${ROUTES.CBS_LOAN_ACCOUNTS_DETAILS}?id=${accountNumber}`}
                />

                <Box display="flex" alignItems="center" gap="s4">
                  <Text fontWeight="400" fontSize="s3">
                    {accountNumber}{' '}
                  </Text>
                  <Icon
                    _hover={{ cursor: 'pointer' }}
                    size="sm"
                    as={IoCopyOutline}
                    onClick={() => copyToClipboard(accountNumber)}
                  />
                </Box>
              </Box>
              <Text fontWeight="400" fontSize="s3" color="gray.500">
                {productName}
              </Text>
            </Box>
            <Text fontWeight="500" fontSize="s3">
              {productType}
            </Text>
          </Box>
          <IconButton
            aria-label="qr-button"
            cursor="pointer"
            as={IoQrCode}
            size="xs"
            colorScheme="gray"
            onClick={onToggle}
          />
        </Box>
        <Divider pt="s8" />
        <Box pt="s8" display="flex" justifyContent="space-between">
          <Text fontWeight="500" fontSize="r2" textAlign="right">
            {totalBalance ?? '0'}
          </Text>
          <Text fontWeight="400" fontSize="s3">
            Interest Rate : {interestRate} %
          </Text>
        </Box>
      </Box>
      <AccountQRModal
        account={{
          name: memberName,
          accountNo: accountNumber,
          phoneNo: contactNo ?? 'N/A',
          accountName: accountName as string,
        }}
        open={isOpen}
        onClose={modalOnClose}
      />
    </>
  );
};
