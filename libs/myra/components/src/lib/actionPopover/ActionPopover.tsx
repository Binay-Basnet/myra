import { useRef } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { IconButton } from '@chakra-ui/react';

import { Box, Popover, PopoverBody, PopoverContent, PopoverTrigger, Text } from '@myra-ui';
import { useTranslation } from '@coop/shared/utils';

type IPopoverType = {
  title?: string[];

  id: string;

  items?: {
    title: string;
    onClick?: (id: string) => void;
  }[];
};

export const ActionPopoverComponent = ({ title, items, id }: IPopoverType) => {
  const initialFocusRef = useRef<HTMLButtonElement | null>(null);
  const { t } = useTranslation();
  return (
    <Popover placement="bottom-start" initialFocusRef={initialFocusRef}>
      <PopoverTrigger>
        <IconButton variant="ghost" aria-label="Search database" icon={<BsThreeDots />} />
      </PopoverTrigger>
      <PopoverContent minWidth="180px" w="180px" color="white" _focus={{ boxShadow: 'none' }}>
        <PopoverBody px="0" py="s8">
          <Box display="flex" flexDirection="column" alignItems="start">
            {items
              ? items.map((item) => (
                  <Box
                    px="s16"
                    py="s10"
                    width="100%"
                    _hover={{ bg: 'gray.100' }}
                    cursor="pointer"
                    onClick={() => item?.onClick && item?.onClick(id)}
                    key={`${item.title}${Math.random()}`}
                  >
                    <Text variant="bodyRegular" color="neutralColorLight.Gray-80">
                      {t[item.title]}
                    </Text>
                  </Box>
                ))
              : title?.map((item) => (
                  <Box
                    px="s16"
                    py="s10"
                    width="100%"
                    _hover={{ bg: 'gray.100' }}
                    cursor="pointer"
                    key={`${item}${Math.random()}`}
                  >
                    <Text variant="bodyRegular" color="neutralColorLight.Gray-80">
                      {t[item]}
                    </Text>
                  </Box>
                ))}
          </Box>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
