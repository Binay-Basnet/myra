import { Alert, Box, Button, Text } from '@myra-ui';

export const AlertEnable = () => (
  <Alert status="warning" hideCloseIcon>
    <Box display="flex" justifyContent="space-between">
      <Text fontWeight="Medium" color="gray.800" fontSize="r1" lineHeight="18px">
        This product is disabled.
      </Text>
      <Button>Enable this product</Button>
    </Box>
  </Alert>
);
