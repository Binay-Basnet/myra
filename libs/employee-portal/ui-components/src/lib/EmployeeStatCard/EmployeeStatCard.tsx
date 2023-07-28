import { Box, Text } from '@myra-ui';

interface EmployeeStatCardProps {
  title: string;
  subTitle: string;
}

export const EmployeeStatCard = ({ title, subTitle }: EmployeeStatCardProps) => (
  <Box
    w="200px"
    bg="white"
    px="s16"
    py="s12"
    borderRadius="br2"
    border="1px"
    borderColor="border.layout"
  >
    <Text fontSize="s3" fontWeight="500" color="neutralColorLight.Gray-50">
      {title}
    </Text>
    <Text fontSize="r3" fontWeight="600" color="neutralColorLight.Gray-70">
      {subTitle}
    </Text>
  </Box>
);
