import React from 'react';
import { AddIcon } from '@chakra-ui/icons';

import {
  Box,
  Icon,
  Text,
} from '@coop/shared/ui'; /* eslint-disable-next-line */
export interface AddButtonListProps {
  onClick?: () => void;
  label?: string;
}

export function AddButtonList({ onClick, label }: AddButtonListProps) {
  return (
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
      <Text variant="bodyRegular" color="neutralColorLight.Gray-80">
        {label}
      </Text>
    </Box>
  );
}

export default AddButtonList;
