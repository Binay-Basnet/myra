import { Box, Divider, Text } from '@myra-ui';

interface EmployeeHeaderProps {
  title: string;
  subTitle?: string;

  leftButton?: React.ReactNode;
}

export const EmployeeHeader = ({ title, subTitle, leftButton }: EmployeeHeaderProps) => (
  <>
    <Box display="flex" alignItems="center" justifyContent="space-between">
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
      {leftButton}
    </Box>

    <Divider mt="s10" />
  </>
);
