import { Box, Grid, Text } from '@myra-ui';

interface IBalanceCardProps {
  summary: { title: string; value: string | number }[];
}

export const BalanceCard = ({ summary }: IBalanceCardProps) => (
  <Grid templateColumns="repeat(4,1fr)" gap="s16">
    {summary.map(({ title, value }) => (
      <Box bg="white" px="s16" pt="s20" pb="s12" borderRadius="br2">
        <Text fontSize="s3" fontWeight="500" color="neutralColorLight.Gray-50">
          {title}
        </Text>
        <Text fontSize="r3" fontWeight="600" color="neutralColorLight.Gray-70">
          {value}
        </Text>
      </Box>
    ))}
  </Grid>
);
