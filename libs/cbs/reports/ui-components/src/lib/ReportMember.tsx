import { Box, Grid, GridItem, Text } from '@coop/shared/ui';

export const ReportMember = () => {
  return (
    <Box p="s32" display="flex" justifyContent="space-between">
      <Box w="50%">
        <Box w="70%">
          <Grid templateColumns="repeat(2, 1fr)">
            <GridItem>
              <Box display="flex" flexDir="column">
                <Text fontSize="r1" color="gray.700">
                  Name of member:
                </Text>
                <Text fontSize="r1" color="gray.700">
                  Address:
                </Text>
                <Text fontSize="r1" color="gray.700">
                  Branch Name:
                </Text>
              </Box>
            </GridItem>

            <GridItem>
              <Box display="flex" flexDir="column">
                <Text fontSize="r1" color="gray.700" fontWeight="500">
                  Binita Acharya
                </Text>
                <Text fontSize="r1" color="gray.700" fontWeight="500">
                  Koteshwor, Kathmandu, Nepal
                </Text>
                <Text fontSize="r1" color="gray.700" fontWeight="500">
                  Koteshwor Branch, Kathmandu
                </Text>
              </Box>
            </GridItem>
          </Grid>
        </Box>
      </Box>

      <Box w="50%">
        <Box w="70%">
          <Grid templateColumns="repeat(2, 1fr)">
            <GridItem>
              <Box display="flex" flexDir="column">
                <Text fontSize="r1" color="gray.700">
                  Membership No:
                </Text>
                <Text fontSize="r1" color="gray.700">
                  Membership Date:
                </Text>
              </Box>
            </GridItem>

            <GridItem>
              <Box display="flex" flexDir="column">
                <Text fontSize="r1" color="gray.700" fontWeight="500">
                  2727
                </Text>
                <Text fontSize="r1" color="gray.700" fontWeight="500">
                  2079/04/01
                </Text>
              </Box>
            </GridItem>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};
