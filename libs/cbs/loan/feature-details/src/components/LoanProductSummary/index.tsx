import { IoCopyOutline } from 'react-icons/io5';

import { Box, Icon, Text } from '@myra-ui';

import { useLoanDetails } from '../../hooks/useLoanDetails';

export const LoanProductSummary = () => {
  const { loanPreview } = useLoanDetails();

  return (
    <Box
      p="s16"
      borderBottom="1px"
      borderBottomColor="border.layout"
      display="flex"
      flexDir="column"
      gap="s16"
    >
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Box>
          <Text fontSize="r2" fontWeight="600" color="gray.900">
            {loanPreview?.generalInformation?.loanName}
          </Text>
          <Text
            fontSize="s3"
            fontWeight="500"
            color="gray.700"
            display="flex"
            alignItems="center"
            gap="s4"
          >
            <span>{loanPreview?.generalInformation?.productCode}</span>
            <Icon as={IoCopyOutline} />
          </Text>
        </Box>

        <Box fontSize="s3" color="gray.800">
          <Text>Interest</Text>
          <Text fontWeight="500">{loanPreview?.loanDetails?.interestRate}%</Text>
        </Box>
      </Box>

      <Box fontSize="s3" color="gray.800" maxW="80%">
        <Text>Product Type</Text>
        <Text fontWeight="500" textTransform="capitalize">
          {loanPreview?.generalInformation?.loanProduct}
        </Text>
      </Box>
    </Box>
  );
};
