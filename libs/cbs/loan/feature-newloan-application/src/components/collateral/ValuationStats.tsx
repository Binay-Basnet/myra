import { GridItem, Text, TextFields } from '@coop/shared/ui';

export const ValuationStats = () => (
  <GridItem
    colSpan={4}
    h="s40"
    display="flex"
    alignItems="center"
    justifyContent="space-between"
    px="s10"
    bg="background.500"
    borderRadius="br2"
  >
    <TextFields variant="formLabel" color="gray.600">
      Collateral Valuation
    </TextFields>

    <Text color="gray.700" fontSize="r1" fontWeight="600">
      1500
    </Text>
  </GridItem>
);
