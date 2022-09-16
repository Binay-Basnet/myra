import { Alert, Box, GridItem, Text } from '@coop/shared/ui';

export const ValuationRange = () => (
  <GridItem colSpan={4}>
    <Alert status="info" title="Range" hideCloseIcon>
      <Box pt="s8" as="ul">
        <li>
          <Text fontWeight="400" fontSize="r1">
            FMV: <b>7-12%</b> and DV <b>7 - 12%</b>
          </Text>
        </li>
      </Box>
    </Alert>
  </GridItem>
);
