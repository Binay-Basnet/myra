import { Box, FormSection, GridItem, Text } from '@myra-ui';

export const CashTransferTotalCard = () => (
  //   const methods = useFormContext();

  //   const { watch } = methods;

  <FormSection>
    <GridItem colSpan={3}>
      <Box
        mt="s40"
        border="1px solid"
        borderColor="border.layout"
        borderRadius="br2"
        p="s16"
        gap="s20"
        display="flex"
        flexDirection="column"
      >
        <Box display="flex" justifyContent="space-between">
          <Text fontWeight="Medium" fontSize="r1" color="gray.700" lineHeight="17px">
            Total DR
          </Text>
          <Text fontWeight="Regular" fontSize="r1" color="gray.600" lineHeight="17px">
            2,000
          </Text>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Text fontWeight="Medium" fontSize="r1" color="gray.700" lineHeight="17px">
            Total CR
          </Text>
          <Text fontWeight="Regular" fontSize="r1" color="gray.600" lineHeight="17px">
            2,000
          </Text>
        </Box>

        <Box display="flex" justifyContent="space-between">
          <Text fontWeight="Medium" fontSize="r1" color="gray.700" lineHeight="17px">
            Difference
          </Text>
          <Text fontWeight="Regular" fontSize="r1" color="gray.600" lineHeight="17px">
            2,000
          </Text>
        </Box>
      </Box>
    </GridItem>
  </FormSection>
);
