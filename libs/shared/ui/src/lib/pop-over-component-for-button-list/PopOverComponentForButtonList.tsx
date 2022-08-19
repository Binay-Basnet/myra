import React from 'react';
import { AddIcon } from '@chakra-ui/icons';

import {
  Box,
  Button,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
} from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

/* eslint-disable-next-line */
export interface PopOverComponentForButtonListProps {
  buttonLabel: string;
  children?: React.ReactNode;
}

export function PopOverComponentForButtonList({
  children,
  buttonLabel,
}: PopOverComponentForButtonListProps) {
  const { t } = useTranslation();
  return (
    <Popover placement="bottom-start" gutter={3}>
      <PopoverTrigger>
        <Button
          width="full"
          size="lg"
          justifyContent="start"
          leftIcon={<AddIcon h="11px" />}
        >
          {t[buttonLabel]}
        </Button>
      </PopoverTrigger>

      <PopoverContent
        // bg="gray.0"
        p={0}
        w="225px"
        _focus={{ boxShadow: 'none' }}
      >
        <PopoverBody p={0}>
          <Box display={'flex'} flexDirection={'column'} gap="s4">
            {children}
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export default PopOverComponentForButtonList;
