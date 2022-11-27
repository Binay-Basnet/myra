import { Alert, Box, FormSection, GridItem, Text } from '@myra-ui';

export const ShareDividendFundInfo = () => (
  <FormSection>
    <GridItem colSpan={3}>
      <Alert status="info" title="Share Dividend Fund Info" hideCloseIcon>
        <Box display="flex" flexDirection="column" gap="s4">
          <Box display="flex" gap="s4">
            <Text fontSize="r1" fontWeight={400} color="gray.800">
              Percentage:
            </Text>
            <Text fontSize="r1" fontWeight={400} color="gray.800">
              60%
            </Text>
          </Box>
          <Box display="flex" gap="s4">
            <Text fontSize="r1" fontWeight={400} color="gray.800">
              This Year:
            </Text>
            <Text fontSize="r1" fontWeight={400} color="gray.800">
              33.53
            </Text>
          </Box>
          <Box display="flex" gap="s4">
            <Text fontSize="r1" fontWeight={400} color="gray.800">
              Last Year:
            </Text>
            <Text fontSize="r1" fontWeight={400} color="gray.800">
              16.27
            </Text>
          </Box>
        </Box>
      </Alert>
    </GridItem>
  </FormSection>
);
