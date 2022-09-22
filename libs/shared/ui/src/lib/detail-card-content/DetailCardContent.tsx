import { Box, Text } from '@coop/shared/ui';
/* eslint-disable-next-line */
export interface DetailCardContentProps {
  title?: string;
  subtitle?: string;
}

export const DetailCardContent = ({ title, subtitle }: DetailCardContentProps) => (
  <Box display="flex" flexDirection="column" gap="s4">
    <Text fontWeight="500" fontSize="s3">
      {title}
    </Text>
    <Text fontWeight="600" fontSize="r1">
      {subtitle}
    </Text>
  </Box>
);

export default DetailCardContent;
