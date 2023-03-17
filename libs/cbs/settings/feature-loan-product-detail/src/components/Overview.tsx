import { useRouter } from 'next/router';

import { Box, Button, Grid, GridItem, Text } from '@myra-ui';

import { ROUTES } from '@coop/cbs/utils';

type NumbersType = {
  noOfAccounts: number | null | undefined;
  noOfInactiveMembers: number | null | undefined;
};
export const Overview = ({ noOfAccounts, noOfInactiveMembers }: NumbersType) => {
  const router = useRouter();
  return (
    <Box display="flex" flexDirection="column" gap="s20" w="100%">
      <Text fontWeight="SemiBold" fontSize="r3" color="gray.800" lineHeight="150%">
        Overview
      </Text>
      <Grid templateColumns="repeat(3,1fr)" gap="s16">
        <GridItem p="s16" bg="gray.0">
          <Text fontWeight="Medium" fontSize="s2" color="gray.500" lineHeight="125%">
            No. of Active Accounts
          </Text>
          <Text fontWeight="SemiBold" fontSize="r3" color="gray.800" lineHeight="150%">
            {noOfAccounts}
          </Text>
          <Button
            variant="link"
            size="md"
            p="0"
            onClick={() =>
              router.push({
                pathname: ROUTES?.SETTINGS_GENERAL_LP_DETAILS,
                query: {
                  tab: 'active accounts',
                  id: router.query['id'],
                },
              })
            }
          >
            {' '}
            View
          </Button>
        </GridItem>
        <GridItem p="s16" bg="gray.0">
          <Text fontWeight="Medium" fontSize="s2" color="gray.500" lineHeight="125%">
            No. of Inactive Members
          </Text>
          <Text fontWeight="SemiBold" fontSize="r3" color="gray.800" lineHeight="150%">
            {noOfInactiveMembers}
          </Text>
          <Button
            variant="link"
            size="md"
            p="0"
            onClick={() =>
              router.push({
                pathname: ROUTES?.SETTINGS_GENERAL_LP_DETAILS,
                query: {
                  tab: 'inactive accounts',
                  id: router.query['id'],
                },
              })
            }
          >
            {' '}
            View
          </Button>
        </GridItem>
      </Grid>
    </Box>
  );
};
