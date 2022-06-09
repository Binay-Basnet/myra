import React from 'react';
import { BiSave } from 'react-icons/bi';
import { Box, Button, Icon, Text } from '@coop/myra/ui';

interface formFooter {
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
export const FormFooter = (props: formFooter) => {
  const { onClick } = props;
  return (
    <Box
      bottom={0}
      display="flex"
      bg="gray.0"
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
      <Box w="25%" display="flex" justifyContent="space-between">
        <Box display="flex" justifyContent="flex-end" alignSelf="center">
          <Button variant="ghost">
            <Icon as={BiSave} color="primary.500" />
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
        </Box>
        <Button onClick={onClick}>Done</Button>
      </Box>
    </Box>
  );
};
