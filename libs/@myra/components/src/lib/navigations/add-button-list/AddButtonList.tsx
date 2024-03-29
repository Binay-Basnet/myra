import { AddIcon } from '@chakra-ui/icons';

import { Box, Icon, Text } from '@myra-ui/foundations';

export interface AddButtonListProps {
  onClick?: () => void;
  label?: string;
  testId?: string;
}

export const AddButtonList = ({ onClick, label, testId }: AddButtonListProps) => (
  <Box
    px="s16"
    py="s10"
    width="100%"
    display="flex"
    alignItems="center"
    _hover={{ bg: 'gray.100' }}
    cursor="pointer"
    onClick={onClick}
    data-testid={testId}
  >
    <Icon mr="s16" size="sm" color="primary.500" as={AddIcon} />
    <Text fontSize="r1" fontWeight="400" whiteSpace="initial">
      {label}
    </Text>
  </Box>
);

export default AddButtonList;
