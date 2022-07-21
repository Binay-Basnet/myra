import React, { Fragment } from 'react';
import { IoArrowBack } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { Box, Icon, Text } from '@chakra-ui/react';

type Path = {
  link: string;
  label: string;
};

export interface PathBarProps {
  paths: Path[];
  button?: React.ReactNode;
}

export function PathBar({ paths, button }: PathBarProps) {
  const router = useRouter();

  return (
    <Box
      h="50px"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      borderBottom="1px"
      borderColor="border.layout"
    >
      <Box display="flex" alignItems="center" gap="s8">
        <Icon
          as={IoArrowBack}
          w="s16"
          cursor="pointer"
          color="gray.800"
          onClick={() => {
            router.back();
          }}
          h="s16"
        />

        {paths.map((path, index) => (
          <Fragment key={index}>
            <Text
              fontSize="r1"
              color="gray.800"
              fontWeight="500"
              cursor="pointer"
              onClick={() => {
                router.push(path.link);
              }}
            >
              {path.label}
            </Text>
            {paths.length !== index + 1 && (
              <Text fontSize="r3" mt="-3px" color="gray.800" fontWeight="500">
                /
              </Text>
            )}
          </Fragment>
        ))}
      </Box>
      {button}
    </Box>
  );
}

export default PathBar;
