import { FormInput, FormSwitchTab } from '@coop/shared/form';
import { Box, GridItem, Text } from '@coop/shared/ui';

export const ValuationMethods = () => (
  <GridItem
    colSpan={4}
    p="s16"
    display="flex"
    alignItems="center"
    justifyContent="space-between"
    border="1px"
    borderColor="border.layout"
    borderRadius="br2"
  >
    <FormSwitchTab
      name="valuationMethod"
      label="Valuation Method"
      options={[
        { label: 'FMV', value: 'FMV' },
        { label: 'DV', value: 'DV' },
      ]}
    />
    <Box>
      <FormInput
        name="validationPercent"
        label="Validation Percentage"
        rightElement={
          <Text fontWeight="Medium" noOfLines={1} fontSize="r1" color="primary.500">
            %
          </Text>
        }
      />
    </Box>
  </GridItem>
);
