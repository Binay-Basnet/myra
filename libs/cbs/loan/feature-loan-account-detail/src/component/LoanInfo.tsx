import { IoCopyOutline, IoQrCodeOutline } from 'react-icons/io5';
import { useDisclosure } from '@chakra-ui/react';

import { AccountQRModal, Avatar, Box, Icon, Text, Tooltip } from '@myra-ui';

import { RedirectButton, ROUTES } from '@coop/cbs/utils';
import { copyToClipboard } from '@coop/shared/utils';

import { useLoanAccountDetailHooks } from '../hooks/useLoanAccountDetailHooks';

export const LoanInfo = () => {
  const { generalInfo, memberDetails } = useLoanAccountDetailHooks();
  const { onClose: modalOnClose, isOpen, onToggle } = useDisclosure();
  return (
    <Box>
      <Box
        p="s16"
        display="flex"
        alignItems="start"
        gap="s4"
        borderBottom="1px"
        borderBottomColor="border.layout"
      >
        <Box w="100%" display="flex" gap="s10" flexDirection="column">
          <Box display="flex" flexDirection="column" gap="s4">
            <Box display="flex" justifyContent="space-between">
              <Text fontSize="r1" fontWeight="SemiBold" color="primary.500" lineHeight="150%">
                {generalInfo?.accountName}
              </Text>

              <Icon
                size="md"
                as={IoQrCodeOutline}
                color="gray.500"
                _hover={{ color: 'gray.800' }}
                cursor="pointer"
                onClick={onToggle}
              />
            </Box>

            <Box display="flex" gap="s10">
              <Text fontSize="s3" fontWeight="Regular" color="gray.500" lineHeight="145%">
                {generalInfo?.accountId}
              </Text>
              <Icon
                size="sm"
                as={IoCopyOutline}
                _hover={{ cursor: 'pointer' }}
                onClick={() => copyToClipboard(generalInfo?.accountId ?? '0')}
              />
            </Box>
            <Text fontSize="s3" fontWeight="Regular" color="gray.700" lineHeight="145%">
              {generalInfo?.productName}
            </Text>
          </Box>

          {/* <Box display="flex" justifyContent="space-between">
            <Text fontSize="s3" fontWeight="Medium" color="gray.500" lineHeight="140%">
              Business Loan
            </Text>

            <Text fontSize="r2" fontWeight="Medium" color="gray.800" lineHeight="140%">
              8,42,000.00
            </Text>
          </Box> */}
        </Box>
      </Box>

      <Box
        p="s16"
        display="flex"
        alignItems="start"
        gap="s4"
        borderBottom="1px"
        borderBottomColor="border.layout"
      >
        <Text fontSize="s3" fontWeight="Regular" color="gray.700" lineHeight="140%">
          Disbursed Date:
        </Text>
        <Text fontSize="s3" fontWeight="Medium" color="gray.700" lineHeight="140%">
          {generalInfo?.accountOpenDate?.local}
        </Text>
      </Box>
      <Box
        p="s16"
        display="flex"
        alignItems="center"
        gap="s8"
        borderBottom="1px"
        borderBottomColor="border.layout"
      >
        <Avatar src={memberDetails?.profilePicUrl as string} size="sm" />{' '}
        <Box display="flex" flexDir="column">
          <RedirectButton
            label={<Tooltip title={memberDetails?.memberName?.local as string} />}
            link={`${ROUTES.CBS_MEMBER_DETAILS}?id=${memberDetails?.memberId}`}
          />
          <Text fontSize="r1" fontWeight="400" color="gray.800" wordBreak="break-all">
            {memberDetails?.memberCode}
          </Text>
        </Box>
      </Box>
      <AccountQRModal
        account={{
          name: memberDetails?.memberName?.local ?? 'N/A',
          accountNo: generalInfo?.accountId as string,
          phoneNo: memberDetails?.memberPhoneNo ?? 'N/A',
          accountName: generalInfo?.accountName as string,
        }}
        open={isOpen}
        onClose={modalOnClose}
      />
    </Box>
  );
};
