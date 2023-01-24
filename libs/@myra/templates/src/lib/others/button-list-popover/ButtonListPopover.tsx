import React from 'react';
import { AddIcon } from '@chakra-ui/icons';

import { Popover, PopoverBody, PopoverContent, PopoverTrigger } from '@myra-ui/components';
import { Box, Button } from '@myra-ui/foundations';

import { useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface PopOverComponentForButtonListProps {
  buttonLabel: string;
  children?: React.ReactNode;
}

export const PopOverComponentForButtonList = ({
  children,
  buttonLabel,
}: PopOverComponentForButtonListProps) => {
  const { t } = useTranslation();
  return (
    <Popover placement="bottom-start" gutter={3}>
      <PopoverTrigger>
        <Button width="full" size="md" justifyContent="start" leftIcon={<AddIcon h="11px" />}>
          {t[buttonLabel] ?? buttonLabel}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        // bg="gray.0"
        p={0}
        w="325px"
        // maxW="300px"
        _focus={{ boxShadow: 'E1' }}
      >
        <PopoverBody p={0}>
          <Box display="flex" flexDirection="column" gap="s4">
            {children}
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default PopOverComponentForButtonList;
