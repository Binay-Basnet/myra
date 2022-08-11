import React, { Fragment } from 'react';
import { BsThreeDots } from 'react-icons/bs';
import { IoSaveOutline, IoStarOutline } from 'react-icons/io5';
import { useRouter } from 'next/router';
import { ChevronLeftIcon } from '@chakra-ui/icons';

import { Box, Button, Icon, Text, TextFields } from '@coop/shared/ui';

type Path = {
  link: string;
  label: string;
};

export interface PathBarProps {
  paths: Path[];
}

export const ReportHeader = ({ paths }: PathBarProps) => {
  const router = useRouter();

  return (
    <Box
      h="50px"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      px="s32"
      borderBottom="1px"
      borderColor="border.layout"
    >
      <Box display="flex" alignItems="center" gap="s8">
        <Button variant="ghost" color="gray.800" p="0">
          <Icon
            as={ChevronLeftIcon}
            size="xl"
            onClick={() => {
              router.back();
            }}
          />
        </Button>

        <Box display="flex" alignItems="center" gap="s8">
          {paths.map((path, index) => (
            <Fragment key={index}>
              <TextFields
                variant={
                  router.pathname === path.link ? 'pageHeader' : 'bodyLarge'
                }
                cursor="pointer"
                onClick={() => {
                  router.push(path.link);
                }}
              >
                {path.label}
              </TextFields>
              {paths.length !== index + 1 && (
                <Text fontSize="r3" mt="-3px" color="gray.800" fontWeight="500">
                  /
                </Text>
              )}
            </Fragment>
          ))}
          <Icon as={IoStarOutline} color="gray.700" pr="" />
        </Box>
      </Box>

      <Box display="flex" alignItems="center" gap="s16">
        <Button variant="ghost" gap="s8">
          <Icon as={IoSaveOutline} />
          Save Report
        </Button>
        <Button variant="ghost" gap="s8">
          <Icon as={BsThreeDots} />
          Options
        </Button>
      </Box>
    </Box>
  );
};
