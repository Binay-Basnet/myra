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
<<<<<<< HEAD
  Button,
} from '@saccos/myra/ui';
=======
} from '@coop/myra/ui';
>>>>>>> 52d608daca8213567826bab8ba454ba6ca7c8d9d

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
<<<<<<< HEAD
            {title.map((item) => (
              <GridItem px="s8" py="s8">
                <Button variant="ghost">
                  <Text variant="bodyRegular" color="neutralColorLight.Gray-80">
                    {item}
                  </Text>
                </Button>
=======
            {title.map((item, index) => (
              <GridItem px="s8" py="s8" key={index}>
                <Text variant="bodyRegular" color="neutralColorLight.Gray-80">
                  {item}
                </Text>
>>>>>>> 52d608daca8213567826bab8ba454ba6ca7c8d9d
              </GridItem>
            ))}
          </Grid>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};
