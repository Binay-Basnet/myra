import { IoCopyOutline, IoQrCodeOutline } from 'react-icons/io5';

import { Avatar, Box, Icon, Text } from '@myra-ui';

export const LoanInfo = () => (
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
              Industrial Loan Account
            </Text>

            <Icon size="md" as={IoQrCodeOutline} />
          </Box>

          <Box display="flex" gap="s10">
            <Text fontSize="s3" fontWeight="Regular" color="gray.500" lineHeight="145%">
              00123019238240012
            </Text>
            <Icon size="sm" as={IoCopyOutline} />
          </Box>
          <Text fontSize="s3" fontWeight="Regular" color="gray.700" lineHeight="145%">
            Udhyog tatha Bewasaaya Karja
          </Text>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Text fontSize="s3" fontWeight="Medium" color="gray.500" lineHeight="140%">
            Business Loan
          </Text>

          <Text fontSize="r2" fontWeight="Medium" color="gray.800" lineHeight="140%">
            8,42,000.00
          </Text>
        </Box>
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
        2078-09-04
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
      <Avatar src="https://bit.ly/sage-adebayo" size="sm" />
      <Text fontSize="r1" fontWeight="Medium" color="primary.500" lineHeight="150%">
        Ram Kumar Pandey
      </Text>
    </Box>
  </Box>
);
