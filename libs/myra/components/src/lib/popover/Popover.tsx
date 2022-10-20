import { useRef } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { IconButton } from '@chakra-ui/react';

import { KymMemberTypesEnum, Member } from '@coop/cbs/data-access';
import { Box, Popover, PopoverBody, PopoverContent, PopoverTrigger, Text } from '@coop/shared/ui';
import { useTranslation } from '@coop/shared/utils';

type IRequiredMemberDetailType = {
  id?: string;
  type?: KymMemberTypesEnum;
};

type IPopoverType = {
  title?: string[];

  items?: {
    title: string;
    onClick?: (member?: Partial<Member> | null) => void;
  }[];

  member?: IRequiredMemberDetailType | null;
};

export const PopoverComponent = ({ title, items, member }: IPopoverType) => {
  const initialFocusRef = useRef<HTMLButtonElement | null>(null);
  const { t } = useTranslation();
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
                    onClick={() => item?.onClick && item?.onClick(member)}
                    key={`${item.title}${Math.random()}`}
                  >
                    <Text variant="bodyRegular" color="neutralColorLight.Gray-80">
                      {t[item.title] ?? item.title}
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
