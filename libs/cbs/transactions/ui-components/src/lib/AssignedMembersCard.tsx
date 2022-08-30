import { Box, Button, Grid, Text } from '@coop/shared/ui';

export const AssignedMembersCard = () => {
  return (
    <Grid
      p="s16"
      bg="white"
      borderRadius="br2"
      templateColumns="repeat(3, 1fr)"
      columnGap="s20"
    >
      <Box
        display="flex"
        flexDirection="column"
        gap="s4"
        alignItems="flex-start"
      >
        <Text fontSize="s3" fontWeight={500} color="neutralColorLight.Gray-80">
          Total Assigned Members
        </Text>
        <Text fontSize="l1" fontWeight={500} color="neutralColorLight.Gray-60">
          1000
        </Text>

        <Button variant="link">View All Members</Button>
      </Box>
      <Box
        display="flex"
        flexDirection="column"
        gap="s4"
        alignItems="flex-start"
      >
        <Text fontSize="s3" fontWeight={500} color="neutralColorLight.Gray-80">
          Today's Member List
        </Text>
        <Text fontSize="l1" fontWeight={500} color="neutralColorLight.Gray-60">
          0
        </Text>

        <Button variant="link" disabled>
          View Members
        </Button>
      </Box>
    </Grid>
  );
};
