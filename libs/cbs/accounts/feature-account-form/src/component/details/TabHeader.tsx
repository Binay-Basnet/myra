import { Box, Text } from '@coop/shared/ui';

interface ITabHeaderProps {
  heading: string;
  headerButton?: React.ReactNode;
}

export const TabHeader = ({ heading, headerButton }: ITabHeaderProps) => (
  <Box display="flex" justifyContent="space-between">
    <Text fontSize="r3" fontWeight="600" color="gray.800">
      {heading}
    </Text>

    {headerButton}
  </Box>
);
