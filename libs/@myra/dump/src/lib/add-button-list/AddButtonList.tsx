import { AddIcon } from '@chakra-ui/icons';

import { Box, Icon, Text } from '@myra/dump';
/* eslint-disable-next-line */
export interface AddButtonListProps {
  onClick?: () => void;
  label?: string;
}

export const AddButtonList = ({ onClick, label }: AddButtonListProps) => (
  <Box
    px="s16"
    py="s10"
    width="100%"
    display="flex"
    alignItems="center"
    _hover={{ bg: 'gray.100' }}
    cursor="pointer"
    onClick={onClick}
  >
    <Icon mr="s16" size="sm" color="primary.500" as={AddIcon} />
    <Text fontSize="r1" fontWeight="400">
      {label}
    </Text>
  </Box>
);

export default AddButtonList;
