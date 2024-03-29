import { useRef } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { Portal } from '@chakra-ui/react';

import { Popover, PopoverBody, PopoverContent, PopoverTrigger } from '@myra-ui/components';
import { Box, IconButton, Text } from '@myra-ui/foundations';

import { AclKey, Actions, Can } from '@coop/cbs/utils';
import { useTranslation } from '@coop/shared/utils';

export interface TablePopoverProps<T extends Record<string, unknown>> {
  items: {
    title: string;
    onClick?: (node: T) => void;
    action?: Actions;
    aclKey?: AclKey;
  }[];

  node: T | undefined | null;
}

export const TablePopover = <T extends Record<string, unknown>>({
  node,
  items,
}: TablePopoverProps<T>) => {
  const initialFocusRef = useRef<HTMLButtonElement | null>(null);
  const { t } = useTranslation();

  if (!node) {
    return null;
  }

  return (
    <Popover placement="bottom-start" initialFocusRef={initialFocusRef}>
      <PopoverTrigger>
        <IconButton
          onClick={(e) => e.stopPropagation()}
          variant="ghost"
          aria-label="Search database"
          icon={<BsThreeDots />}
        />
      </PopoverTrigger>
      <Portal>
        <PopoverContent minWidth="180px" w="180px" color="white" _focus={{ boxShadow: 'none' }}>
          <PopoverBody px="0" py="s8">
            <Box display="flex" flexDirection="column" alignItems="start">
              {items.map((item) =>
                item?.aclKey && item?.action ? (
                  <Can a={item?.aclKey} I={item?.action}>
                    <Box
                      px="s16"
                      py="s10"
                      width="100%"
                      _hover={{ bg: 'gray.100' }}
                      cursor="pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        item?.onClick && item?.onClick(node);
                      }}
                      key={item.title}
                    >
                      <Text
                        variant="bodyRegular"
                        color="neutralColorLight.Gray-80"
                        whiteSpace="normal"
                      >
                        {t[item.title] ?? item.title}
                      </Text>
                    </Box>
                  </Can>
                ) : (
                  <Box
                    px="s16"
                    py="s10"
                    width="100%"
                    _hover={{ bg: 'gray.100' }}
                    cursor="pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      item?.onClick && item?.onClick(node);
                    }}
                    key={item.title}
                  >
                    <Text
                      variant="bodyRegular"
                      color="neutralColorLight.Gray-80"
                      whiteSpace="normal"
                    >
                      {t[item.title] ?? item.title}
                    </Text>
                  </Box>
                )
              )}
            </Box>
          </PopoverBody>
        </PopoverContent>
      </Portal>
    </Popover>
  );
};

export default TablePopover;
