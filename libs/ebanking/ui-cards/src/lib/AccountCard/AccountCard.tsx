import { AiOutlineArrowDown, AiOutlineArrowUp } from 'react-icons/ai';

import { Box, Grid, Icon, TextFields } from '@coop/shared/ui';

export const AccountCard = () => {
  return (
    <Box
      display="flex"
      flexDir="column"
      p="s16"
      bg="primary.500"
      color="white"
      gap="s24"
      borderRadius="br2"
      position="sticky"
      top="92px"
    >
      <TextFields variant="stickyCardHeader">Accounts</TextFields>

      <Grid templateColumns="repeat(2, 1fr)">
        <Box display="flex" gap="s12">
          <Box
            borderRadius="br2"
            bg="primary.100"
            w="s32"
            h="s32"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Icon as={AiOutlineArrowUp} color="primary.500" size="lg" />
          </Box>
          <Box display="flex" flexDir="column">
            <TextFields color="primary.200" variant="tableHeader">
              Total Saving
            </TextFields>
            <TextFields variant="stickyCardHeader">1,64,742</TextFields>
          </Box>
        </Box>
        <Box display="flex" gap="s12">
          <Box
            borderRadius="br2"
            bg="danger.100"
            w="s32"
            h="s32"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Icon as={AiOutlineArrowDown} color="danger.500" size="lg" />
          </Box>
          <Box display="flex" gap="s4" flexDir="column">
            <TextFields color="primary.200" variant="tableHeader">
              Total Loan
            </TextFields>
            <TextFields variant="stickyCardHeader">74,560</TextFields>
          </Box>
        </Box>
      </Grid>
    </Box>
  );
};
