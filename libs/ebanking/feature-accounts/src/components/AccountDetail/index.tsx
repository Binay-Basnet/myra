import { Box, Text } from '@coop/shared/ui';

interface AccountDetailProps {
  title: string;
  value: string | number;
}

export const AccountDetail = ({ title, value }: AccountDetailProps) => {
  return (
    <Box>
      <Text color="gray.700" fontSize="s3" fontWeight="600" mb="s4">
        {title}
      </Text>
      <Text color="gray.800" fontSize="r1">
        {value}
      </Text>
    </Box>
  );
};
