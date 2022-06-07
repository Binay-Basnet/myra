import React, { useRef } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { IconButton } from '@chakra-ui/react';
import {
  Grid,
  GridItem,
  Popover,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@coop/myra/ui';

type popoverType = {
  title: string[];
};

export const PopoverComponent = ({ title }: popoverType) => {
  const initialFocusRef = useRef<HTMLButtonElement | null>(null);
  return (
    <Popover
      // px="s8"
      // py="s8"
      // borderRadius="br2"
      placement="bottom-start"
      initialFocusRef={initialFocusRef}
      // zIndex={1}
    >
      <PopoverTrigger>
        <IconButton
          variant="ghost"
          aria-label="Search database"
          icon={<BsThreeDots />}
        />
      </PopoverTrigger>
      <PopoverContent minWidth="180px" w="180px" color="white">
        <PopoverCloseButton />
        <PopoverBody>
          <Grid>
            {title.map((item, index) => (
              <GridItem px="s8" py="s8" key={index}>
                <Text variant="bodyRegular" color="neutralColorLight.Gray-80">
                  {item}
                </Text>
              </GridItem>
            ))}
          </Grid>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
