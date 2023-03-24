import { Box, Loader } from '@myra-ui';

export const LoaderOverlay = () => (
  <Box
    position="fixed"
    top={0}
    left={0}
    bottom={0}
    right={0}
    h="100vh"
    w="100vw"
    bg="black"
    opacity={0.25}
    zIndex={9999}
  >
    <Box
      position="absolute"
      top="50%"
      left="50%"
      fontSize="3.125rem"
      color="white"
      transform="translate(-50%, -50%)"
    >
      <Loader />
    </Box>
  </Box>
);
