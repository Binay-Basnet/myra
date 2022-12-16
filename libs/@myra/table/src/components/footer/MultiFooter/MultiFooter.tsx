import React, { useId } from 'react';

import { Box, Divider, Text, VStack } from '@myra-ui/foundations';

interface IMultiFooterProps {
  texts?: string[];
  childrens?: React.ReactNode[];
}

export const MultiFooter = ({ texts, childrens }: IMultiFooterProps) => {
  const id = useId();

  if (texts) {
    return (
      <VStack
        divider={<Divider />}
        spacing={0}
        textAlign="right"
        fontSize="s3"
        display="flex"
        flexDir="column"
        mx="-s16"
      >
        {texts?.map((text) => (
          <Text
            key={id}
            px="s16"
            w="100%"
            display="flex"
            alignItems="center"
            justifyContent="end"
            h="35px"
          >
            {text}
          </Text>
        ))}
      </VStack>
    );
  }

  return (
    <VStack
      divider={<Divider />}
      spacing={0}
      textAlign="right"
      fontSize="s3"
      display="flex"
      flexDir="column"
      mx="-s16"
    >
      {childrens?.map((children) => (
        <Box key={id}>{children}</Box>
      ))}
    </VStack>
  );
};
