import { Box, Divider, Text } from '@myra-ui';

interface EmployeeHeaderProps {
  title: string;
  subTitle?: string;
}

export const EmployeeHeader = ({ title, subTitle }: EmployeeHeaderProps) => (
  <>
    <Box display="flex" flexDir="column">
      <Text fontSize="l1" fontWeight={500} color="gray.800">
        {title}
      </Text>
      {subTitle && (
        <Text fontSize="r1" color="gray.600">
          {subTitle}
        </Text>
      )}
    </Box>

    <Divider mt="s10" />
  </>
);
