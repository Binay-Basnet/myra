import { Box, Grid, GridItem, Text } from '@myra-ui';

type NumbersType = {
  noOfAccounts: number | null | undefined;
  noOfMembers: number | null | undefined;
};
export const Overview = ({ noOfAccounts, noOfMembers }: NumbersType) => (
  <Box display="flex" flexDirection="column" gap="s20" w="100%">
    <Text fontWeight="SemiBold" fontSize="r3" color="gray.800" lineHeight="150%">
      Overview
    </Text>
    <Grid templateColumns="repeat(2,1fr)" gap="s16">
      <GridItem p="s16" bg="gray.0">
        <Text fontWeight="Medium" fontSize="s2" color="gray.500" lineHeight="125%">
          No. of Accounts
        </Text>
        <Text fontWeight="SemiBold" fontSize="r3" color="gray.800" lineHeight="150%">
          {noOfAccounts}
        </Text>
      </GridItem>
      <GridItem p="s16" bg="gray.0">
        <Text fontWeight="Medium" fontSize="s2" color="gray.500" lineHeight="125%">
          No. of Members
        </Text>
        <Text fontWeight="SemiBold" fontSize="r3" color="gray.800" lineHeight="150%">
          {noOfMembers}
        </Text>
      </GridItem>
    </Grid>
  </Box>
);
