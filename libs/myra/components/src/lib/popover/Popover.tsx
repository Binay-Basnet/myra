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
  Button,
} from '@saccos/myra/ui';

type popoverType = {
  title: string[];
};

export const PopoverComponent = ({ title }: popoverType) => {
  const initialFocusRef = useRef<HTMLButtonElement | null>(null);
  return (
    <Popover placement="bottom-start" initialFocusRef={initialFocusRef}>
      <PopoverTrigger>
        <IconButton
          variant="ghost"
          aria-label="Search database"
          icon={<BsThreeDots />}
        />
      </PopoverTrigger>
      <PopoverContent minWidth="180px" w="180px" color="white">
        <PopoverCloseButton />
        <PopoverBody px="s6" py="s8">
          <Grid>
            {title.map((item) => (
              <GridItem px="s8" py="s8">
                <Button variant="ghost">
                  <Text variant="bodyRegular" color="neutralColorLight.Gray-80">
                    {item}
                  </Text>
                </Button>
              </GridItem>
            ))}
          </Grid>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
