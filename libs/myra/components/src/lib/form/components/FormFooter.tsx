import React from 'react';
import { BiSave } from 'react-icons/bi';
import { Box, Button, Text } from '@coop/shared/ui';

interface formFooter {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
export const FormFooter = (props: formFooter) => {
  const { onClick } = props;
  return (
    <Box
      position="fixed"
      minW="container.xl"
      width={1248}
      bottom={0}
      bg="gray.0"
      display="flex"
      justifyContent="space-between"
      px="s20"
      py="s16"
      boxShadow="0px -4px 60px rgba(52, 60, 70, 0.2)"
      borderTopLeftRadius="br3"
      borderTopRightRadius="br3"
    >
      <Text
        alignSelf="center"
        color="gray.600"
        fontWeight="Regular"
        fontSize="r1"
      >
        Form details saved to draft 09:41 AM
      </Text>
      <Box w="25%" display="flex" justifyContent="flex-end">
        <Button mr="10px" leftIcon={<BiSave />} variant="ghost">
          <Text
            alignSelf="center"
            color="primary.500"
            fontWeight="Medium"
            fontSize="s2"
            ml="5px"
          >
            Save Draft
          </Text>
        </Button>
        <Button onClick={onClick}>Done</Button>
      </Box>
    </Box>
  );
};
